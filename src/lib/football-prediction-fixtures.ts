import type { FootballMatch } from "@/lib/football-prediction-arena";

function hoursFromNow(h: number) {
  return new Date(Date.now() + h * 3600000).toISOString();
}

function daysFromNow(d: number, hour = 15) {
  const date = new Date();
  date.setDate(date.getDate() + d);
  date.setHours(hour, 0, 0, 0);
  return date.toISOString();
}

/** Demo fixtures · replace with sports API when FOOTBALL_DATA_API_KEY is set */
export function getDemoFootballFixtures(): FootballMatch[] {
  return [
    {
      id: "pl-arsenal-chelsea",
      competition: "premier-league",
      competitionLabel: "Premier League",
      league: "premier-league",
      homeTeam: "Arsenal",
      awayTeam: "Chelsea",
      homeFlag: "🇬🇧",
      awayFlag: "🇬🇧",
      homeCrestUrl: "/football-clubs/arsenal-fc.svg",
      awayCrestUrl: "/football-clubs/chelsea-fc.svg",
      kickoff: daysFromNow(2, 17),
      status: "scheduled"
    },
    {
      id: "ucl-real-bayern",
      competition: "champions-league",
      competitionLabel: "Champions League",
      league: "champions-league",
      homeTeam: "Real Madrid",
      awayTeam: "Bayern Munich",
      homeFlag: "🇪🇸",
      awayFlag: "🇩🇪",
      homeCrestUrl: "/football-clubs/real-madrid-fc.svg",
      awayCrestUrl: "/football-clubs/bayern-munich-fc.svg",
      kickoff: daysFromNow(3, 20),
      status: "scheduled"
    },
    {
      id: "uel-roma-sevilla",
      competition: "europa-league",
      competitionLabel: "Europa League",
      league: "europa-league",
      homeTeam: "Roma",
      awayTeam: "Sevilla",
      homeFlag: "🇮🇹",
      awayFlag: "🇪🇸",
      homeCrestUrl: "/football-clubs/roma-fc.svg",
      awayCrestUrl: "/football-clubs/sevilla-fc.svg",
      kickoff: hoursFromNow(8),
      status: "scheduled"
    },
    {
      id: "fac-manutd-liverpool",
      competition: "fa-cup",
      competitionLabel: "FA Cup",
      league: "fa-cup",
      homeTeam: "Man United",
      awayTeam: "Liverpool",
      homeFlag: "🇬🇧",
      awayFlag: "🇬🇧",
      homeCrestUrl: "/football-clubs/man-united-fc.svg",
      awayCrestUrl: "/football-clubs/liverpool-fc.svg",
      kickoff: hoursFromNow(26),
      status: "scheduled"
    },
    {
      id: "intl-england-trinidad",
      competition: "international",
      competitionLabel: "International Friendly",
      league: "international",
      homeTeam: "England",
      awayTeam: "Trinidad & Tobago",
      homeFlag: "🇬🇧",
      awayFlag: "🇹🇹",
      homeCrestUrl: "/football-clubs/england-national.svg",
      awayCrestUrl: "/football-clubs/trinidad-tobago-national.svg",
      kickoff: daysFromNow(5, 19),
      status: "scheduled"
    },
    {
      id: "wc-brazil-france",
      competition: "world-cup",
      competitionLabel: "World Cup",
      league: "world-cup",
      homeTeam: "Brazil",
      awayTeam: "France",
      homeFlag: "🇧🇷",
      awayFlag: "🇫🇷",
      homeCrestUrl: "/football-clubs/brazil-national.svg",
      awayCrestUrl: "/football-clubs/france-national.svg",
      kickoff: daysFromNow(12, 18),
      status: "scheduled"
    },
    {
      id: "euro-spain-germany",
      competition: "euro",
      competitionLabel: "European Championships",
      league: "euro",
      homeTeam: "Spain",
      awayTeam: "Germany",
      homeFlag: "🇪🇸",
      awayFlag: "🇩🇪",
      kickoff: daysFromNow(9, 20),
      status: "scheduled"
    },
    {
      id: "pl-finished-demo",
      competition: "premier-league",
      competitionLabel: "Premier League",
      league: "premier-league",
      homeTeam: "Newcastle",
      awayTeam: "Tottenham",
      homeFlag: "🇬🇧",
      awayFlag: "🇬🇧",
      kickoff: hoursFromNow(-48),
      status: "finished",
      homeScore: 2,
      awayScore: 1,
      firstGoalScorer: "Isak",
      homeScorers: ["Isak", "Guimaraes"],
      awayScorers: ["Son"]
    }
  ];
}

export async function fetchFootballFixtures(): Promise<FootballMatch[]> {
  const apiKey = process.env.FOOTBALL_DATA_API_KEY ?? process.env.NEXT_PUBLIC_FOOTBALL_DATA_API_KEY;
  if (!apiKey || apiKey.length < 8) {
    return getDemoFootballFixtures();
  }

  try {
    const res = await fetch("https://api.football-data.org/v4/matches?status=SCHEDULED,FINISHED&limit=12", {
      headers: { "X-Auth-Token": apiKey },
      next: { revalidate: 300 }
    });
    if (!res.ok) return getDemoFootballFixtures();
    const json = (await res.json()) as { matches?: Array<Record<string, unknown>> };
    if (!json.matches?.length) return getDemoFootballFixtures();
    return json.matches.slice(0, 12).map((m, i) => ({
      id: String(m.id ?? `api-${i}`),
      competition: "premier-league" as const,
      competitionLabel: String((m.competition as { name?: string })?.name ?? "League"),
      league: "premier-league",
      homeTeam: String((m.homeTeam as { name?: string })?.name ?? "Home"),
      awayTeam: String((m.awayTeam as { name?: string })?.name ?? "Away"),
      homeFlag: "⚽",
      awayFlag: "⚽",
      kickoff: String(m.utcDate ?? new Date().toISOString()),
      status: m.status === "FINISHED" ? "finished" : "scheduled",
      homeScore: (m.score as { fullTime?: { home?: number } })?.fullTime?.home,
      awayScore: (m.score as { fullTime?: { away?: number } })?.fullTime?.away
    }));
  } catch {
    return getDemoFootballFixtures();
  }
}
