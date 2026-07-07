import { getApiSportsFootballKey } from "@/lib/api-sports-football";
import { isFootballApiOnCooldown, markFootballApiCooldown } from "@/lib/api-sports-rate-limit";
import { API_SPORTS_NAV_SPORT_META, type ApiSportsNavSportId } from "@/lib/api-sports-sport-meta";
import { NAV_SPORTS_RECAP_LANES } from "@/lib/nav-sports-recap-lanes";

export type NavLiveSportStatus = "live" | "scheduled" | "finished";
export type NavSportBucket = "live" | "recent" | "upcoming";

export type NavLiveSportEvent = {
  id: string;
  sport: ApiSportsNavSportId;
  status: NavLiveSportStatus;
  bucket: NavSportBucket;
  title: string;
  scoreline: string;
  meta: string;
  kickoff?: string;
  homeLogo?: string;
  awayLogo?: string;
};

export type NavUpcomingSportLine = {
  sport: ApiSportsNavSportId;
  label: string;
  emoji: string;
  sentence: string;
  kickoff?: string;
};

export type NavLiveSportsFeed = {
  fetchedAt: string;
  cacheSeconds: number;
  requestsUsed: number;
  sportsWired: ApiSportsNavSportId[];
  liveCount: number;
  recentCount: number;
  upcomingCount: number;
  events: NavLiveSportEvent[];
  live: NavLiveSportEvent[];
  recent: NavLiveSportEvent[];
  upcoming: NavLiveSportEvent[];
  upcomingBySport: NavUpcomingSportLine[];
  notice?: string;
};

const CACHE_MS = 30 * 60 * 1000;
const F1_NAV_SEASON = 2024;
const MAX_PER_SPORT = 4;
const RECENT_DAY_OFFSETS = [-1, 0] as const;
const UPCOMING_DAY_OFFSETS = [1, 2, 3, 4, 5, 6, 7] as const;
let feedCache: { at: number; feed: NavLiveSportsFeed } | null = null;
let staleFeedCache: NavLiveSportsFeed | null = null;
let apiRateLimited = false;

type DateGamesSource = {
  id: ApiSportsNavSportId;
  baseUrl: string;
  pathPrefix: string;
  extraPaths?: string[];
};

export const ALL_NAV_API_SPORTS: ApiSportsNavSportId[] = [
  "football",
  "volleyball",
  "basketball",
  "nba",
  "baseball",
  "hockey",
  "rugby",
  "nfl",
  "handball",
  "afl",
  "mma",
  "formula-1"
];

const DATE_GAME_SOURCES: DateGamesSource[] = [
  { id: "volleyball", baseUrl: "https://v1.volleyball.api-sports.io", pathPrefix: "/games" },
  { id: "basketball", baseUrl: "https://v1.basketball.api-sports.io", pathPrefix: "/games" },
  { id: "nba", baseUrl: "https://v2.nba.api-sports.io", pathPrefix: "/games" },
  { id: "baseball", baseUrl: "https://v1.baseball.api-sports.io", pathPrefix: "/games" },
  { id: "hockey", baseUrl: "https://v1.hockey.api-sports.io", pathPrefix: "/games" },
  { id: "rugby", baseUrl: "https://v1.rugby.api-sports.io", pathPrefix: "/games" },
  { id: "nfl", baseUrl: "https://v1.american-football.api-sports.io", pathPrefix: "/games" },
  { id: "handball", baseUrl: "https://v1.handball.api-sports.io", pathPrefix: "/games" },
  { id: "afl", baseUrl: "https://v1.afl.api-sports.io", pathPrefix: "/games" },
  { id: "mma", baseUrl: "https://v1.mma.api-sports.io", pathPrefix: "/fights" }
];

function isoDate(offsetDays = 0) {
  const date = new Date();
  date.setDate(date.getDate() + offsetDays);
  return date.toISOString().slice(0, 10);
}

function formatKickoff(iso: string) {
  try {
    return new Intl.DateTimeFormat(undefined, {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}

function bucketForStatus(status: NavLiveSportStatus): NavSportBucket {
  if (status === "live") return "live";
  if (status === "finished") return "recent";
  return "upcoming";
}

function mapStatusShort(short: string): NavLiveSportStatus {
  const code = short.toUpperCase();
  if (["LIVE", "1H", "2H", "HT", "ET", "BT", "P", "INT", "Q1", "Q2", "3Q", "Q3", "Q4", "OT"].includes(code)) {
    return "live";
  }
  if (["FT", "AET", "PEN", "AWD", "WO", "AOT", "FINISHED", "POST", "COMPLETED"].includes(code)) {
    return "finished";
  }
  return "scheduled";
}

function extractScoreTotals(scores: unknown): { home: number; away: number } | null {
  if (!scores || typeof scores !== "object") return null;
  const row = scores as { home?: unknown; away?: unknown };
  if (typeof row.home === "number" && typeof row.away === "number") {
    return { home: row.home, away: row.away };
  }
  const home = row.home as { total?: number } | undefined;
  const away = row.away as { total?: number } | undefined;
  if (home?.total != null && away?.total != null) {
    return { home: home.total, away: away.total };
  }
  return null;
}

async function apiGet<T>(url: string, apiKey: string, trackFootballLimit = false) {
  const res = await fetch(url, {
    headers: { "x-apisports-key": apiKey },
    cache: "no-store"
  });
  if (!res.ok) return null;
  const json = (await res.json()) as { errors?: Record<string, string> | unknown[]; response?: T };
  const hasErrors =
    json.errors && (Array.isArray(json.errors) ? json.errors.length : Object.keys(json.errors).length);
  if (hasErrors) {
    const errorText = JSON.stringify(json.errors).toLowerCase();
    if (errorText.includes("limit")) {
      apiRateLimited = true;
      if (trackFootballLimit) markFootballApiCooldown();
    }
    return null;
  }
  return json.response ?? null;
}

type FootballFixture = {
  fixture: { id: number; date: string; status: { short: string; elapsed: number | null } };
  league: { name: string; country: string };
  teams: { home: { name: string; logo?: string }; away: { name: string; logo?: string } };
  goals: { home: number | null; away: number | null };
};

type GenericGame = {
  id: number;
  date: string;
  status: { short: string; long?: string };
  teams?: {
    home: { name: string; logo?: string };
    away: { name: string; logo?: string };
  };
  scores?: unknown;
  league?: { name: string };
  country?: { name: string };
  fighters?: {
    first?: { name: string; logo?: string };
    second?: { name: string; logo?: string };
  };
};

type F1Race = {
  id: number;
  date: string;
  time: string;
  status: string;
  type: string;
  competition: { name: string };
  circuit: { name: string; country: string };
  season: number;
};

function mapFootball(fixture: FootballFixture): NavLiveSportEvent {
  const status = mapStatusShort(fixture.fixture.status.short);
  const home = fixture.goals.home ?? 0;
  const away = fixture.goals.away ?? 0;

  return {
    id: `football-${fixture.fixture.id}`,
    sport: "football",
    status,
    bucket: bucketForStatus(status),
    title: `${fixture.teams.home.name} vs ${fixture.teams.away.name}`,
    scoreline: status === "scheduled" ? "vs" : `${home}-${away}`,
    meta:
      status === "live"
        ? `${fixture.fixture.status.elapsed ?? 0}' · ${fixture.league.name}`
        : status === "scheduled"
          ? `${formatKickoff(fixture.fixture.date)} · ${fixture.league.country}`
          : `Final · ${fixture.league.name}`,
    kickoff: fixture.fixture.date,
    homeLogo: fixture.teams.home.logo,
    awayLogo: fixture.teams.away.logo
  };
}

function mapGenericGame(sport: ApiSportsNavSportId, game: GenericGame): NavLiveSportEvent | null {
  let homeName = game.teams?.home?.name;
  let awayName = game.teams?.away?.name;
  let homeLogo = game.teams?.home?.logo;
  let awayLogo = game.teams?.away?.logo;

  if (sport === "mma" && game.fighters) {
    homeName = game.fighters.first?.name;
    awayName = game.fighters.second?.name;
    homeLogo = game.fighters.first?.logo;
    awayLogo = game.fighters.second?.logo;
  }

  if (!homeName || !awayName) return null;

  const status = mapStatusShort(game.status.short);
  const totals = extractScoreTotals(game.scores);
  const bucket = bucketForStatus(status);
  const league = game.league?.name ?? sport.toUpperCase();
  const country = game.country?.name ?? "";

  return {
    id: `${sport}-${game.id}`,
    sport,
    status,
    bucket,
    title: `${homeName} vs ${awayName}`,
    scoreline: status === "scheduled" || !totals ? "vs" : `${totals.home}-${totals.away}`,
    meta:
      status === "scheduled"
        ? `${formatKickoff(game.date)}${country ? ` · ${country}` : ""}`
        : status === "live"
          ? `En vivo · ${league}`
          : `Final · ${league}`,
    kickoff: game.date,
    homeLogo,
    awayLogo
  };
}

function mapF1Race(race: F1Race): NavLiveSportEvent {
  const kickoff = `${race.date}T${race.time || "00:00:00"}`;
  const raceDate = new Date(kickoff);
  const now = Date.now();
  let status: NavLiveSportStatus = "scheduled";
  if (race.status?.toLowerCase().includes("live")) status = "live";
  else if (raceDate.getTime() < now - 3 * 60 * 60 * 1000) status = "finished";

  return {
    id: `formula-1-${race.id}`,
    sport: "formula-1",
    status,
    bucket: bucketForStatus(status),
    title: `${race.competition.name} · ${race.circuit.name}`,
    scoreline: race.type,
    meta:
      status === "scheduled"
        ? `${formatKickoff(kickoff)} · ${race.circuit.country}`
        : status === "live"
          ? `En vivo · ${race.season}`
          : `Final · ${race.season}`,
    kickoff
  };
}

export function buildUpcomingSportLines(upcoming: NavLiveSportEvent[]): NavUpcomingSportLine[] {
  const sorted = [...upcoming].sort(
    (a, b) => new Date(a.kickoff ?? 0).getTime() - new Date(b.kickoff ?? 0).getTime()
  );
  const usedIds = new Set<string>();

  return NAV_SPORTS_RECAP_LANES.map((lane) => {
    const meta = API_SPORTS_NAV_SPORT_META[lane.sport];
    const match = sorted.find((event) => event.sport === lane.sport && !usedIds.has(event.id));
    if (match) usedIds.add(match.id);

    const sentence = match ? `${match.title} · ${match.meta}` : "No upcoming fixture";

    return {
      sport: lane.sport,
      label: meta.label,
      emoji: meta.emoji,
      sentence,
      kickoff: match?.kickoff
    };
  });
}

function splitFeed(events: NavLiveSportEvent[]): Pick<
  NavLiveSportsFeed,
  "events" | "live" | "recent" | "upcoming" | "liveCount" | "recentCount" | "upcomingCount"
> {
  const byId = new Map<string, NavLiveSportEvent>();
  const bucketRank: Record<NavSportBucket, number> = { live: 0, upcoming: 1, recent: 2 };

  for (const event of events) {
    const existing = byId.get(event.id);
    if (!existing || bucketRank[event.bucket] < bucketRank[existing.bucket]) {
      byId.set(event.id, event);
    }
  }

  const unique = [...byId.values()];
  const live = unique.filter((event) => event.bucket === "live").slice(0, 16);
  const recent = unique
    .filter((event) => event.bucket === "recent")
    .sort((a, b) => new Date(b.kickoff ?? 0).getTime() - new Date(a.kickoff ?? 0).getTime())
    .slice(0, 16);
  const upcoming = unique
    .filter((event) => event.bucket === "upcoming")
    .sort((a, b) => new Date(a.kickoff ?? 0).getTime() - new Date(b.kickoff ?? 0).getTime())
    .slice(0, 16);

  return {
    events: [...live, ...recent, ...upcoming],
    live,
    recent,
    upcoming,
    liveCount: live.length,
    recentCount: recent.length,
    upcomingCount: upcoming.length
  };
}

async function fetchFootballEvents(apiKey: string, requestsUsed: { n: number }) {
  const events: NavLiveSportEvent[] = [];
  if (isFootballApiOnCooldown()) return events;

  const live = await apiGet<FootballFixture[]>(
    "https://v3.football.api-sports.io/fixtures?live=all",
    apiKey,
    true
  );
  requestsUsed.n += 1;
  if (live?.length) events.push(...live.map(mapFootball));

  for (const offset of [...RECENT_DAY_OFFSETS, ...UPCOMING_DAY_OFFSETS]) {
    if (apiRateLimited) break;
    const day = await apiGet<FootballFixture[]>(
      `https://v3.football.api-sports.io/fixtures?date=${isoDate(offset)}`,
      apiKey,
      true
    );
    requestsUsed.n += 1;
    if (day?.length) events.push(...day.map(mapFootball));
  }

  return events.slice(0, MAX_PER_SPORT * 4);
}

async function fetchDateGameSport(
  source: DateGamesSource,
  apiKey: string,
  requestsUsed: { n: number }
) {
  const events: NavLiveSportEvent[] = [];

  for (const offset of [...RECENT_DAY_OFFSETS, ...UPCOMING_DAY_OFFSETS]) {
    if (apiRateLimited) break;
    const rows = await apiGet<GenericGame[]>(
      `${source.baseUrl}${source.pathPrefix}?date=${isoDate(offset)}`,
      apiKey
    );
    requestsUsed.n += 1;
    if (!rows?.length) continue;

    for (const row of rows) {
      const mapped = mapGenericGame(source.id, row);
      if (mapped) events.push(mapped);
    }
  }

  return events.slice(0, MAX_PER_SPORT * 3);
}

async function fetchF1Events(apiKey: string, requestsUsed: { n: number }) {
  const races = await apiGet<F1Race[]>(
    `https://v1.formula-1.api-sports.io/races?season=${F1_NAV_SEASON}`,
    apiKey
  );
  requestsUsed.n += 1;
  if (!races?.length) return [];

  return races
    .filter((race) => race.type?.toLowerCase() === "race")
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, MAX_PER_SPORT * 2)
    .map(mapF1Race);
}

export function clearNavLiveSportsCache() {
  feedCache = null;
  apiRateLimited = false;
}

export async function fetchNavLiveSportsFeed(): Promise<NavLiveSportsFeed> {
  if (feedCache && Date.now() - feedCache.at < CACHE_MS && feedCache.feed.events.length > 0) {
    return feedCache.feed;
  }

  apiRateLimited = false;
  const apiKey = getApiSportsFootballKey();
  const events: NavLiveSportEvent[] = [];
  const requestsUsed = { n: 0 };
  if (apiKey) {
    events.push(...(await fetchFootballEvents(apiKey, requestsUsed)));

    for (const source of DATE_GAME_SOURCES) {
      if (apiRateLimited) break;
      events.push(...(await fetchDateGameSport(source, apiKey, requestsUsed)));
    }

    if (!apiRateLimited) {
      events.push(...(await fetchF1Events(apiKey, requestsUsed)));
    }
  }

  const split = splitFeed(events);
  const notice = apiRateLimited
    ? "API daily limit reached · fixtures return when quota resets"
    : undefined;
  const feed: NavLiveSportsFeed = {
    fetchedAt: new Date().toISOString(),
    cacheSeconds: CACHE_MS / 1000,
    requestsUsed: requestsUsed.n,
    sportsWired: ALL_NAV_API_SPORTS,
    ...split,
    upcomingBySport: buildUpcomingSportLines(split.upcoming),
    notice
  };

  if (feed.events.length > 0) {
    feedCache = { at: Date.now(), feed };
    staleFeedCache = feed;
    return feed;
  }

  if (staleFeedCache?.events.length) {
    return {
      ...staleFeedCache,
      fetchedAt: new Date().toISOString(),
      upcomingBySport: buildUpcomingSportLines(staleFeedCache.upcoming)
    };
  }

  return feed;
}