import { countryTeams, type CountryTeam } from "../country-teams";

export type BracketMatch = {
  id: string;
  round: number;
  home: CountryTeam | null;
  away: CountryTeam | null;
  homeScore: number;
  awayScore: number;
  status: "pending" | "live" | "completed";
};

export function generateBracket(): BracketMatch[] {
  const sorted = [...countryTeams].sort((a, b) => a.ranking - b.ranking);
  const rounds: BracketMatch[] = [];

  // Semifinals
  rounds.push(
    { id: "sf1", round: 1, home: sorted[0], away: sorted[5], homeScore: 0, awayScore: 0, status: "pending" },
    { id: "sf2", round: 1, home: sorted[1], away: sorted[4], homeScore: 0, awayScore: 0, status: "pending" },
    { id: "sf3", round: 1, home: sorted[2], away: sorted[3], homeScore: 0, awayScore: 0, status: "pending" }
  );

  // Final
  rounds.push(
    { id: "final", round: 2, home: null, away: null, homeScore: 0, awayScore: 0, status: "pending" }
  );

  return rounds;
}

export function getHeadToHead(teamAId: string, teamBId: string) {
  return { wins: 0, losses: 0, draws: 0 };
}
