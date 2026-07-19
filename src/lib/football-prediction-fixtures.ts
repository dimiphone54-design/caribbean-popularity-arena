import type { FootballMatch } from "@/lib/football-prediction-arena";

/**
 * Fixed ISO kickoffs — never use Date.now() here.
 * Relative times cause SSR HTML ≠ client hydration text.
 */

/** Colombia room only · real Liga BetPlay / Copa / Selección sides */
export function getColombiaFootballFixtures(): FootballMatch[] {
  return [
    {
      id: "co-millonarios-santafe",
      competition: "liga-betplay",
      competitionLabel: "Liga BetPlay · Superclásico capitalino",
      league: "liga-betplay",
      homeTeam: "Millonarios",
      awayTeam: "Independiente Santa Fe",
      homeFlag: "🇨🇴",
      awayFlag: "🇨🇴",
      kickoff: "2026-07-26T01:00:00.000Z",
      status: "scheduled"
    },
    {
      id: "co-nacional-dim",
      competition: "liga-betplay",
      competitionLabel: "Liga BetPlay · Clásico paisa",
      league: "liga-betplay",
      homeTeam: "Atlético Nacional",
      awayTeam: "Independiente Medellín",
      homeFlag: "🇨🇴",
      awayFlag: "🇨🇴",
      kickoff: "2026-07-26T22:30:00.000Z",
      status: "scheduled"
    },
    {
      id: "co-america-cali",
      competition: "liga-betplay",
      competitionLabel: "Liga BetPlay · Clásico vallecaucano",
      league: "liga-betplay",
      homeTeam: "América de Cali",
      awayTeam: "Deportivo Cali",
      homeFlag: "🇨🇴",
      awayFlag: "🇨🇴",
      kickoff: "2026-07-27T01:10:00.000Z",
      status: "scheduled"
    },
    {
      id: "co-junior-tolima",
      competition: "liga-betplay",
      competitionLabel: "Liga BetPlay Dimayor",
      league: "liga-betplay",
      homeTeam: "Junior de Barranquilla",
      awayTeam: "Deportes Tolima",
      homeFlag: "🇨🇴",
      awayFlag: "🇨🇴",
      kickoff: "2026-07-28T00:00:00.000Z",
      status: "scheduled"
    },
    {
      id: "co-bucaramanga-once",
      competition: "copa-colombia",
      competitionLabel: "Copa Colombia",
      league: "copa-colombia",
      homeTeam: "Atlético Bucaramanga",
      awayTeam: "Once Caldas",
      homeFlag: "🇨🇴",
      awayFlag: "🇨🇴",
      kickoff: "2026-07-29T23:00:00.000Z",
      status: "scheduled"
    },
    {
      id: "co-seleccion-ecuador",
      competition: "international",
      competitionLabel: "Eliminatorias · Selección Colombia",
      league: "international",
      homeTeam: "Colombia",
      awayTeam: "Ecuador",
      homeFlag: "🇨🇴",
      awayFlag: "🇪🇨",
      kickoff: "2026-08-05T00:30:00.000Z",
      status: "scheduled"
    },
    {
      id: "co-nacional-america-finished",
      competition: "liga-betplay",
      competitionLabel: "Liga BetPlay · clásico",
      league: "liga-betplay",
      homeTeam: "Atlético Nacional",
      awayTeam: "América de Cali",
      homeFlag: "🇨🇴",
      awayFlag: "🇨🇴",
      kickoff: "2026-07-12T01:00:00.000Z",
      status: "finished",
      homeScore: 2,
      awayScore: 1,
      firstGoalScorer: "Morelos",
      homeScorers: ["Morelos", "Duque"],
      awayScorers: ["Ramos"]
    }
  ];
}

/** Demo fixtures · UK focus lane · replace with sports API when FOOTBALL_DATA_API_KEY is set */
export function getDemoFootballFixtures(countryId?: string): FootballMatch[] {
  if (countryId === "colombia") {
    return getColombiaFootballFixtures();
  }

  return [
    {
      id: "pl-city-liverpool",
      competition: "premier-league",
      competitionLabel: "Premier League",
      league: "premier-league",
      homeTeam: "Manchester City",
      awayTeam: "Liverpool",
      homeFlag: "🇬🇧",
      awayFlag: "🇬🇧",
      kickoff: "2026-07-25T14:30:00.000Z",
      status: "scheduled"
    },
    {
      id: "pl-arsenal-chelsea",
      competition: "premier-league",
      competitionLabel: "London Derby · Premier League",
      league: "premier-league",
      homeTeam: "Arsenal",
      awayTeam: "Chelsea",
      homeFlag: "🇬🇧",
      awayFlag: "🇬🇧",
      kickoff: "2026-07-25T17:15:00.000Z",
      status: "scheduled"
    },
    {
      id: "fac-manutd-tottenham",
      competition: "fa-cup",
      competitionLabel: "FA Cup",
      league: "fa-cup",
      homeTeam: "Manchester United",
      awayTeam: "Tottenham",
      homeFlag: "🇬🇧",
      awayFlag: "🇬🇧",
      kickoff: "2026-07-26T19:00:00.000Z",
      status: "scheduled"
    },
    {
      id: "ucl-villa-newcastle",
      competition: "champions-league",
      competitionLabel: "Champions League",
      league: "champions-league",
      homeTeam: "Aston Villa",
      awayTeam: "Newcastle",
      homeFlag: "🇬🇧",
      awayFlag: "🇬🇧",
      kickoff: "2026-07-24T20:00:00.000Z",
      status: "scheduled"
    },
    {
      id: "efl-leeds-sunderland",
      competition: "championship",
      competitionLabel: "EFL Championship",
      league: "championship",
      homeTeam: "Leeds United",
      awayTeam: "Sunderland",
      homeFlag: "🇬🇧",
      awayFlag: "🇬🇧",
      kickoff: "2026-07-28T14:00:00.000Z",
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
      kickoff: "2026-07-27T19:00:00.000Z",
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
      kickoff: "2026-08-02T18:00:00.000Z",
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
      kickoff: "2026-07-10T14:00:00.000Z",
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
  const { fetchApiSportsFootballFixtures, isApiSportsConfigured } = await import("@/lib/api-sports-football");
  if (!isApiSportsConfigured()) return getDemoFootballFixtures();

  try {
    const matches = await fetchApiSportsFootballFixtures();
    return matches.length ? matches : getDemoFootballFixtures();
  } catch {
    return getDemoFootballFixtures();
  }
}
