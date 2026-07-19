export type PlayerStats = {
  id: string;
  name: string;
  countryId: string;
  kills: number;
  deaths: number;
  wins: number;
  matchesPlayed: number;
  xp: number;
  rank: string;
};

export type Season = {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  status: "upcoming" | "active" | "completed";
  description: string;
};

export type TournamentMatch = {
  id: string;
  seasonId: string;
  homeTeamId: string;
  awayTeamId: string;
  homeScore: number;
  awayScore: number;
  status: "scheduled" | "live" | "completed";
  scheduledAt: string;
  completedAt?: string;
};

export const currentSeason: Season = {
  id: "s1-2026",
  name: "Season 1 — Global Offensive",
  startDate: "2026-07-01",
  endDate: "2026-09-30",
  status: "active",
  description: "The inaugural Vanguard Zero global tournament. Six nations battle for supremacy."
};

export const tournamentMatches: TournamentMatch[] = [
  { id: "m1", seasonId: "s1-2026", homeTeamId: "trinidad", awayTeamId: "ecuador", homeScore: 3, awayScore: 1, status: "completed", scheduledAt: "2026-07-05T18:00:00Z", completedAt: "2026-07-05T19:30:00Z" },
  { id: "m2", seasonId: "s1-2026", homeTeamId: "colombia", awayTeamId: "china", homeScore: 2, awayScore: 2, status: "completed", scheduledAt: "2026-07-06T18:00:00Z", completedAt: "2026-07-06T19:45:00Z" },
  { id: "m3", seasonId: "s1-2026", homeTeamId: "japan", awayTeamId: "united_kingdom", homeScore: 4, awayScore: 1, status: "completed", scheduledAt: "2026-07-07T10:00:00Z", completedAt: "2026-07-07T11:30:00Z" },
  { id: "m4", seasonId: "s1-2026", homeTeamId: "trinidad", awayTeamId: "colombia", homeScore: 0, awayScore: 0, status: "scheduled", scheduledAt: "2026-07-18T18:00:00Z" },
  { id: "m5", seasonId: "s1-2026", homeTeamId: "japan", awayTeamId: "ecuador", homeScore: 0, awayScore: 0, status: "scheduled", scheduledAt: "2026-07-19T10:00:00Z" },
  { id: "m6", seasonId: "s1-2026", homeTeamId: "china", awayTeamId: "united_kingdom", homeScore: 0, awayScore: 0, status: "scheduled", scheduledAt: "2026-07-20T12:00:00Z" }
];

export function generateLeaderboard() {
  const { countryTeams } = require("../country-teams");
  return [...countryTeams].sort((a: any, b: any) => b.points - a.points);
}
