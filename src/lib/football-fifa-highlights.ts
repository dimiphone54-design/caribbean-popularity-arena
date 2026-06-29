import { FIFA_RECENT_RESULTS, formatFifaPlayedAt, type FifaRecentResult } from "@/lib/football-fifa-recent";

export type FifaHighlightClip = {
  id: string;
  gameId: string;
  league: string;
  mode: FifaRecentResult["mode"];
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  playedAt: string;
  playedLabel: string;
  posterUrl: string;
  flagStripUrl?: string;
  flagStripAwayLeft?: boolean;
  highlightLine: string;
};

const FALLBACK_POSTER = "/manchester-united-live-action.png";

function posterForGame(game: FifaRecentResult) {
  if (game.flagStripUrl) return game.flagStripUrl;
  if (game.id === "fifa-ars-che") return FALLBACK_POSTER;
  if (game.id === "fifa-tt-jam") return "/trinidad-tobago-flag-map.png";
  if (game.id === "fifa-real-barca") return "/colombia-bg-football-match.png";
  return FALLBACK_POSTER;
}

function highlightLine(game: FifaRecentResult) {
  if (game.homeScore > game.awayScore) {
    return `${game.homeTeam} take it · ${game.homeScore}–${game.awayScore} full time`;
  }
  if (game.awayScore > game.homeScore) {
    return `${game.awayTeam} edge it · ${game.homeScore}–${game.awayScore} full time`;
  }
  return `Level at ${game.homeScore}–${game.awayScore} · arena draw`;
}

export const FIFA_HIGHLIGHTS_WINDOW_LABEL = "Wed 24 Jun – Fri 26 Jun · FIFA arena recap";

export function getFifaHighlightClips(): FifaHighlightClip[] {
  return FIFA_RECENT_RESULTS.map((game) => ({
    id: `${game.id}-highlight`,
    gameId: game.id,
    league: game.league,
    mode: game.mode,
    homeTeam: game.homeTeam,
    awayTeam: game.awayTeam,
    homeScore: game.homeScore,
    awayScore: game.awayScore,
    playedAt: game.playedAt,
    playedLabel: formatFifaPlayedAt(game.playedAt),
    posterUrl: posterForGame(game),
    flagStripUrl: game.flagStripUrl,
    flagStripAwayLeft: game.flagStripAwayLeft,
    highlightLine: highlightLine(game)
  }));
}
