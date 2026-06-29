/** Recent FIFA / football results · UK Freedom Arena */

export type FifaRecentResult = {
  id: string;
  league: string;
  homeTeam: string;
  awayTeam: string;
  homeFlag: string;
  awayFlag: string;
  /** Single wide image · full panel background (both sides visible) */
  flagStripUrl?: string;
  /** Image left side shows away team (e.g. Liverpool | Man City crest strip) */
  flagStripAwayLeft?: boolean;
  homeScore: number;
  awayScore: number;
  playedAt: string;
  mode: "FIFA Pro Clubs" | "FIFA Ultimate Team" | "FIFA Friendly" | "Premier League FIFA";
};

export const FIFA_RECENT_RESULTS: FifaRecentResult[] = [
  {
    id: "fifa-eng-ger",
    league: "International FIFA Night",
    homeTeam: "England",
    awayTeam: "Germany",
    homeFlag: "🇬🇧",
    awayFlag: "🇩🇪",
    flagStripUrl: "/arena-football/uk-germany-flags-linen.png",
    homeScore: 3,
    awayScore: 1,
    playedAt: "2026-06-24T21:00:00Z",
    mode: "FIFA Friendly"
  },
  {
    id: "fifa-mci-liv",
    league: "Premier League FIFA",
    homeTeam: "Man City",
    awayTeam: "Liverpool",
    homeFlag: "🇬🇧",
    awayFlag: "🇬🇧",
    flagStripUrl: "/arena-football/liverpool-man-city-crests.png",
    flagStripAwayLeft: true,
    homeScore: 2,
    awayScore: 2,
    playedAt: "2026-06-25T19:30:00Z",
    mode: "FIFA Ultimate Team"
  },
  {
    id: "fifa-ars-che",
    league: "London Derby FIFA",
    homeTeam: "Arsenal",
    awayTeam: "Chelsea",
    homeFlag: "🇬🇧",
    awayFlag: "🇬🇧",
    homeScore: 1,
    awayScore: 0,
    playedAt: "2026-06-25T22:15:00Z",
    mode: "FIFA Pro Clubs"
  },
  {
    id: "fifa-tt-jam",
    league: "Caribbean Freedom Cup",
    homeTeam: "Trinidad",
    awayTeam: "Jamaica",
    homeFlag: "🇹🇹",
    awayFlag: "🇯🇲",
    homeScore: 2,
    awayScore: 2,
    playedAt: "2026-06-26T18:00:00Z",
    mode: "FIFA Friendly"
  },
  {
    id: "fifa-real-barca",
    league: "Champions FIFA",
    homeTeam: "Real Madrid",
    awayTeam: "Barcelona",
    homeFlag: "🇪🇸",
    awayFlag: "🇪🇸",
    homeScore: 4,
    awayScore: 3,
    playedAt: "2026-06-26T20:45:00Z",
    mode: "FIFA Ultimate Team"
  }
];

export function formatFifaPlayedAt(iso: string) {
  const date = new Date(iso);
  const day = date.toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short"
  });
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return `${day} · ${hours}:${minutes}`;
}

export function fifaWinLabel(game: FifaRecentResult) {
  if (game.homeScore > game.awayScore) return `${game.homeTeam} win`;
  if (game.awayScore > game.homeScore) return `${game.awayTeam} win`;
  return "Draw";
}
