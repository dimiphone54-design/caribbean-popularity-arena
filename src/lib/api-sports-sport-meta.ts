export type ApiSportsNavSportId =
  | "football"
  | "volleyball"
  | "basketball"
  | "nba"
  | "baseball"
  | "hockey"
  | "rugby"
  | "nfl"
  | "handball"
  | "afl"
  | "mma"
  | "formula-1";

export const API_SPORTS_NAV_SPORT_META: Record<
  ApiSportsNavSportId,
  { emoji: string; label: string }
> = {
  football: { emoji: "⚽", label: "Football" },
  volleyball: { emoji: "🏐", label: "Volleyball" },
  basketball: { emoji: "🏀", label: "Basketball" },
  nba: { emoji: "🏀", label: "NBA" },
  baseball: { emoji: "⚾", label: "Baseball" },
  hockey: { emoji: "🏒", label: "Hockey" },
  rugby: { emoji: "🏉", label: "Rugby" },
  nfl: { emoji: "🏈", label: "NFL" },
  handball: { emoji: "🤾", label: "Handball" },
  afl: { emoji: "🏉", label: "AFL" },
  mma: { emoji: "🥊", label: "MMA" },
  "formula-1": { emoji: "🏎️", label: "Formula 1" }
};

export function sportEmoji(sport: ApiSportsNavSportId) {
  return API_SPORTS_NAV_SPORT_META[sport].emoji;
}