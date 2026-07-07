import type { FootballCompetitionId, FootballMatch, FootballMatchStatus } from "@/lib/football-prediction-arena";

const API_SPORTS_BASE = "https://v3.football.api-sports.io";

type ApiSportsFixture = {
  fixture: {
    id: number;
    date: string;
    status: { short: string; long: string; elapsed: number | null };
  };
  league: {
    id: number;
    name: string;
    country: string;
    logo?: string;
    flag?: string;
  };
  teams: {
    home: { id: number; name: string; logo?: string };
    away: { id: number; name: string; logo?: string };
  };
  goals: { home: number | null; away: number | null };
  score: {
    fulltime: { home: number | null; away: number | null };
  };
  events?: Array<{
    type: string;
    detail: string;
    player?: { name?: string };
    team?: { id?: number };
    time?: { elapsed?: number };
  }>;
};

type ApiSportsResponse = {
  errors?: Record<string, string> | string[];
  results: number;
  response: ApiSportsFixture[];
};

const LEAGUE_COMPETITION_MAP: Record<number, FootballCompetitionId> = {
  39: "premier-league",
  2: "champions-league",
  3: "europa-league",
  45: "fa-cup",
  48: "fa-cup",
  1: "world-cup",
  4: "euro",
  5: "euro",
  10: "international",
  9: "international",
  32: "world-cup",
  29: "world-cup",
  240: "international",
  242: "international",
  239: "international"
};

const LIVE_STATUS = new Set(["1H", "HT", "2H", "ET", "BT", "P", "LIVE", "INT"]);
const FINISHED_STATUS = new Set(["FT", "AET", "PEN", "AWD", "WO"]);
const SCHEDULED_STATUS = new Set(["NS", "TBD", "PST"]);

const COUNTRY_FLAG: Record<string, string> = {
  England: "🇬🇧",
  Spain: "🇪🇸",
  Germany: "🇩🇪",
  Italy: "🇮🇹",
  France: "🇫🇷",
  Brazil: "🇧🇷",
  Ecuador: "🇪🇨",
  Colombia: "🇨🇴",
  Japan: "🇯🇵",
  China: "🇨🇳",
  USA: "🇺🇸",
  Mexico: "🇲🇽"
};

export function getApiSportsFootballKey() {
  return (
    process.env.API_FOOTBALL_KEY?.trim() ??
    process.env.API_SPORTS_KEY?.trim() ??
    process.env.FOOTBALL_DATA_API_KEY?.trim() ??
    ""
  );
}

export function isApiSportsConfigured() {
  return getApiSportsFootballKey().length >= 16;
}

function mapStatus(short: string): FootballMatchStatus {
  if (LIVE_STATUS.has(short)) return "live";
  if (FINISHED_STATUS.has(short)) return "finished";
  if (SCHEDULED_STATUS.has(short)) return "scheduled";
  return "scheduled";
}

function mapCompetition(leagueId: number, leagueName: string): FootballCompetitionId {
  if (LEAGUE_COMPETITION_MAP[leagueId]) return LEAGUE_COMPETITION_MAP[leagueId];
  const name = leagueName.toLowerCase();
  if (name.includes("premier league")) return "premier-league";
  if (name.includes("champions")) return "champions-league";
  if (name.includes("europa")) return "europa-league";
  if (name.includes("fa cup")) return "fa-cup";
  if (name.includes("world cup")) return "world-cup";
  if (name.includes("euro")) return "euro";
  return "international";
}

function countryFlag(country: string) {
  return COUNTRY_FLAG[country] ?? "⚽";
}

function firstGoalScorer(fixture: ApiSportsFixture) {
  const goals = (fixture.events ?? []).filter((event) => event.type === "Goal");
  goals.sort((a, b) => (a.time?.elapsed ?? 0) - (b.time?.elapsed ?? 0));
  return goals[0]?.player?.name;
}

function mapFixture(fixture: ApiSportsFixture): FootballMatch {
  const status = mapStatus(fixture.fixture.status.short);
  const homeScore = fixture.goals.home ?? fixture.score.fulltime.home ?? undefined;
  const awayScore = fixture.goals.away ?? fixture.score.fulltime.away ?? undefined;
  const competition = mapCompetition(fixture.league.id, fixture.league.name);

  return {
    id: `apisports-${fixture.fixture.id}`,
    competition,
    competitionLabel: fixture.league.name,
    league: String(fixture.league.id),
    homeTeam: fixture.teams.home.name,
    awayTeam: fixture.teams.away.name,
    homeFlag: countryFlag(fixture.league.country),
    awayFlag: countryFlag(fixture.league.country),
    homeCrestUrl: fixture.teams.home.logo,
    awayCrestUrl: fixture.teams.away.logo,
    kickoff: fixture.fixture.date,
    status,
    homeScore: homeScore ?? undefined,
    awayScore: awayScore ?? undefined,
    firstGoalScorer: status === "finished" ? firstGoalScorer(fixture) : undefined
  };
}

async function fetchApiSportsFixtures(path: string, apiKey: string) {
  const res = await fetch(`${API_SPORTS_BASE}${path}`, {
    headers: { "x-apisports-key": apiKey },
    next: { revalidate: 60 }
  });
  if (!res.ok) return [] as ApiSportsFixture[];
  const json = (await res.json()) as ApiSportsResponse;
  if (json.errors && Object.keys(json.errors).length > 0) return [];
  return json.response ?? [];
}

function isoDate(offsetDays = 0) {
  const date = new Date();
  date.setDate(date.getDate() + offsetDays);
  return date.toISOString().slice(0, 10);
}

function mergeFixtures(batches: ApiSportsFixture[]) {
  const byId = new Map<number, ApiSportsFixture>();
  for (const fixture of batches) {
    byId.set(fixture.fixture.id, fixture);
  }
  return [...byId.values()];
}

function sortFixtures(matches: FootballMatch[]) {
  const rank: Record<FootballMatchStatus, number> = { live: 0, scheduled: 1, finished: 2 };
  return [...matches].sort((a, b) => {
    const statusDiff = rank[a.status] - rank[b.status];
    if (statusDiff !== 0) return statusDiff;
    return new Date(a.kickoff).getTime() - new Date(b.kickoff).getTime();
  });
}

/** Live + today + tomorrow fixtures from api-sports.io */
export async function fetchApiSportsFootballFixtures(): Promise<FootballMatch[]> {
  const apiKey = getApiSportsFootballKey();
  if (!apiKey) return [];

  const [live, today, tomorrow] = await Promise.all([
    fetchApiSportsFixtures("/fixtures?live=all", apiKey),
    fetchApiSportsFixtures(`/fixtures?date=${isoDate(0)}`, apiKey),
    fetchApiSportsFixtures(`/fixtures?date=${isoDate(1)}`, apiKey)
  ]);

  const merged = mergeFixtures([...live, ...today, ...tomorrow]);
  return sortFixtures(merged.map(mapFixture)).slice(0, 40);
}