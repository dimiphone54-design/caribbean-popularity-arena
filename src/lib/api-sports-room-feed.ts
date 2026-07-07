import { getApiSportsFootballKey } from "@/lib/api-sports-football";
import { isFootballApiOnCooldown, markFootballApiCooldown } from "@/lib/api-sports-rate-limit";
import {
  getRoomLiveSportsConfig,
  type RoomLiveSportKind,
  type RoomLiveSportLink
} from "@/lib/room-live-sports-registry";

export type RoomLiveSportStatus = "live" | "scheduled" | "finished";

export type RoomLiveSportEvent = {
  id: string;
  gameRowId: string;
  sport: RoomLiveSportKind;
  status: RoomLiveSportStatus;
  title: string;
  scoreline: string;
  meta: string;
  kickoff?: string;
  homeLogo?: string;
  awayLogo?: string;
};

export type RoomLiveSportsFeed = {
  roomSlug: string;
  countryName: string;
  flag: string;
  panelTitle: string;
  fetchedAt: string;
  cacheSeconds: number;
  requestsUsed: number;
  events: RoomLiveSportEvent[];
  rowPulse: Record<string, { active: boolean; ready: number; tag: string; hint: string }>;
};

const CACHE_MS = 15 * 60 * 1000;
const feedCache = new Map<string, { at: number; feed: RoomLiveSportsFeed }>();

export function clearRoomLiveSportsFeedCache(roomSlug?: string) {
  if (roomSlug) feedCache.delete(roomSlug);
  else feedCache.clear();
}

function isoDate(offsetDays = 0) {
  const date = new Date();
  date.setDate(date.getDate() + offsetDays);
  return date.toISOString().slice(0, 10);
}

function mapFootballStatus(short: string): RoomLiveSportStatus {
  if (["1H", "HT", "2H", "ET", "BT", "P", "LIVE", "INT"].includes(short)) return "live";
  if (["FT", "AET", "PEN", "AWD", "WO"].includes(short)) return "finished";
  return "scheduled";
}

async function apiSportsGet<T>(
  baseUrl: string,
  path: string,
  apiKey: string,
  sport: RoomLiveSportKind
): Promise<T | null> {
  const res = await fetch(`${baseUrl}${path}`, {
    headers: { "x-apisports-key": apiKey },
    next: { revalidate: 900 }
  });
  if (!res.ok) return null;
  const json = (await res.json()) as { errors?: Record<string, string> | unknown[]; response?: T };
  const hasErrors =
    json.errors && (Array.isArray(json.errors) ? json.errors.length : Object.keys(json.errors).length);
  if (hasErrors) {
    const errorText = JSON.stringify(json.errors).toLowerCase();
    if (sport === "football" && errorText.includes("limit")) {
      markFootballApiCooldown();
    }
    return null;
  }
  return json.response ?? null;
}

type FootballFixture = {
  fixture: { id: number; date: string; status: { short: string; elapsed: number | null } };
  league: { id: number; name: string; country: string };
  teams: { home: { name: string; logo?: string }; away: { name: string; logo?: string } };
  goals: { home: number | null; away: number | null };
};

type VolleyballGame = {
  id: number;
  date: string;
  status: { short: string; long: string };
  country: { name: string };
  league: { name: string };
  teams: { home: { name: string; logo?: string }; away: { name: string; logo?: string } };
  scores: { home: number | null; away: number | null };
};

function footballScoreline(fixture: FootballFixture) {
  const home = fixture.goals.home ?? 0;
  const away = fixture.goals.away ?? 0;
  return `${home}-${away}`;
}

function volleyballScoreline(game: VolleyballGame) {
  return `${game.scores.home ?? 0}-${game.scores.away ?? 0}`;
}

function pickFootballForLink(fixtures: FootballFixture[], link: RoomLiveSportLink) {
  const filtered = fixtures.filter((fixture) => {
    if (link.footballCountry && fixture.league.country === link.footballCountry) return true;
    if (link.footballLeagueIds?.includes(fixture.league.id)) return true;
    return false;
  });
  const rank: Record<RoomLiveSportStatus, number> = { live: 0, scheduled: 1, finished: 2 };
  return [...filtered].sort((a, b) => {
    const sa = mapFootballStatus(a.fixture.status.short);
    const sb = mapFootballStatus(b.fixture.status.short);
    if (rank[sa] !== rank[sb]) return rank[sa] - rank[sb];
    return new Date(a.fixture.date).getTime() - new Date(b.fixture.date).getTime();
  });
}

function pickVolleyballForLink(games: VolleyballGame[], link: RoomLiveSportLink) {
  const preferred = games.filter((game) =>
    link.volleyballCountries?.some((country) => game.country.name.toLowerCase().includes(country.toLowerCase()))
  );
  const pool = preferred.length ? preferred : games;
  const rank: Record<RoomLiveSportStatus, number> = { live: 0, scheduled: 1, finished: 2 };
  return [...pool].sort((a, b) => {
    const sa = a.status.short === "LIVE" ? "live" : a.status.short === "FT" ? "finished" : "scheduled";
    const sb = b.status.short === "LIVE" ? "live" : b.status.short === "FT" ? "finished" : "scheduled";
    if (rank[sa] !== rank[sb]) return rank[sa] - rank[sb];
    return new Date(a.date).getTime() - new Date(b.date).getTime();
  });
}

function mapFootballEvent(link: RoomLiveSportLink, fixture: FootballFixture): RoomLiveSportEvent {
  const status = mapFootballStatus(fixture.fixture.status.short);
  const scoreline = status === "scheduled" ? "vs" : footballScoreline(fixture);
  const elapsed = fixture.fixture.status.elapsed;
  const meta =
    status === "live"
      ? `🔴 En vivo · ${elapsed ?? 0}' · ${fixture.league.name}`
      : status === "finished"
        ? `Final · ${fixture.league.name}`
        : `Próximo · ${fixture.league.name}`;

  return {
    id: `fb-${fixture.fixture.id}`,
    gameRowId: link.gameRowId,
    sport: "football",
    status,
    title: `${fixture.teams.home.name} vs ${fixture.teams.away.name}`,
    scoreline,
    meta,
    kickoff: fixture.fixture.date,
    homeLogo: fixture.teams.home.logo,
    awayLogo: fixture.teams.away.logo
  };
}

function mapVolleyballEvent(link: RoomLiveSportLink, game: VolleyballGame): RoomLiveSportEvent {
  const status: RoomLiveSportStatus =
    game.status.short === "LIVE" ? "live" : game.status.short === "FT" ? "finished" : "scheduled";
  const meta =
    status === "live"
      ? `🔴 En vivo · ${game.league.name}`
      : status === "finished"
        ? `Final · ${game.league.name} · ${game.country.name}`
        : `Próximo · ${game.country.name}`;

  return {
    id: `vb-${game.id}`,
    gameRowId: link.gameRowId,
    sport: "volleyball",
    status,
    title: `${game.teams.home.name} vs ${game.teams.away.name}`,
    scoreline: status === "scheduled" ? "vs" : volleyballScoreline(game),
    meta,
    kickoff: game.date,
    homeLogo: game.teams.home.logo,
    awayLogo: game.teams.away.logo
  };
}

function buildRowPulse(events: RoomLiveSportEvent[]) {
  const rowPulse: RoomLiveSportsFeed["rowPulse"] = {};
  for (const event of events) {
    const active = event.status === "live";
    rowPulse[event.gameRowId] = {
      active,
      ready: active ? 100 : event.status === "scheduled" ? 94 : 88,
      tag: active ? `🔴 EN VIVO · ${event.scoreline}` : event.meta,
      hint: `${event.title} · ${event.scoreline}`
    };
  }
  return rowPulse;
}

export async function fetchRoomLiveSportsFeed(roomSlug: string): Promise<RoomLiveSportsFeed | null> {
  const cached = feedCache.get(roomSlug);
  if (cached && Date.now() - cached.at < CACHE_MS) return cached.feed;

  const config = getRoomLiveSportsConfig(roomSlug);
  if (!config) return null;

  const apiKey = getApiSportsFootballKey();
  if (!apiKey) return null;

  let requestsUsed = 0;
  const events: RoomLiveSportEvent[] = [];
  const needsFootball = config.links.some((link) => link.sport === "football");
  const needsVolleyball = config.links.some((link) => link.sport === "volleyball");

  let footballFixtures: FootballFixture[] = [];
  if (needsFootball && !isFootballApiOnCooldown()) {
    const todayFixtures = await apiSportsGet<FootballFixture[]>(
      "https://v3.football.api-sports.io",
      `/fixtures?date=${isoDate(0)}`,
      apiKey,
      "football"
    );
    requestsUsed += 1;
    if (todayFixtures?.length) footballFixtures = todayFixtures;
  }

  let volleyballGames: VolleyballGame[] = [];
  if (needsVolleyball) {
    const todayVb = await apiSportsGet<VolleyballGame[]>(
      "https://v1.volleyball.api-sports.io",
      `/games?date=${isoDate(0)}`,
      apiKey,
      "volleyball"
    );
    requestsUsed += 1;
    if (todayVb?.length) volleyballGames = todayVb;

    if (!volleyballGames.length) {
      const yesterdayVb = await apiSportsGet<VolleyballGame[]>(
        "https://v1.volleyball.api-sports.io",
        `/games?date=${isoDate(-1)}`,
        apiKey,
        "volleyball"
      );
      requestsUsed += 1;
      if (yesterdayVb?.length) volleyballGames = yesterdayVb;
    }
  }

  volleyballGames = [...new Map(volleyballGames.map((game) => [game.id, game])).values()];
  footballFixtures = [
    ...new Map(footballFixtures.map((fixture) => [fixture.fixture.id, fixture])).values()
  ];

  for (const link of config.links) {
    if (link.sport === "football") {
      const picks = pickFootballForLink(footballFixtures, link).slice(0, 3);
      events.push(...picks.map((fixture) => mapFootballEvent(link, fixture)));
    }
    if (link.sport === "volleyball") {
      const picks = pickVolleyballForLink(volleyballGames, link).slice(0, 3);
      events.push(...picks.map((game) => mapVolleyballEvent(link, game)));
    }
  }

  const feed: RoomLiveSportsFeed = {
    roomSlug,
    countryName: config.countryName,
    flag: config.flag,
    panelTitle: config.panelTitle,
    fetchedAt: new Date().toISOString(),
    cacheSeconds: CACHE_MS / 1000,
    requestsUsed,
    events: events.sort((a, b) => {
      const rank: Record<RoomLiveSportStatus, number> = { live: 0, scheduled: 1, finished: 2 };
      return rank[a.status] - rank[b.status];
    }),
    rowPulse: buildRowPulse(events)
  };

  feedCache.set(roomSlug, { at: Date.now(), feed });
  return feed;
}