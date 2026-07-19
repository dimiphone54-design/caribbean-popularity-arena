import dynamic from "next/dynamic";

export const VanguardZeroGame = dynamic(
  () => import("./vanguard-zero-game").then((mod) => mod.VanguardZeroGame),
  { ssr: false }
);

export const VanguardZeroPanel = dynamic(
  () => import("./vanguard-zero-panel").then((mod) => mod.VanguardZeroPanel),
  { ssr: false }
);

export type { MatchMode } from "./missions/ghost-tide";
export { countryTeams } from "./country-teams";
export { countryMissions } from "./missions/country-missions";
export { countryMaps } from "./maps/country-maps";
export { currentSeason, tournamentMatches } from "./tournament/tournament-data";
export { TournamentPanel } from "./ui/tournament-panel";
export { TournamentLeaderboard } from "./ui/tournament-leaderboard";
