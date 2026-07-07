import type { ApiSportsNavSportId } from "@/lib/api-sports-sport-meta";
import { API_SPORTS_NAV_SPORT_META } from "@/lib/api-sports-sport-meta";
import type { NavSportsRecapMode } from "@/lib/nav-sports-recap-feed";

export type NavSportsRecapLane = {
  sport: ApiSportsNavSportId;
  label: string;
  mode: NavSportsRecapMode;
  theme?: "f1";
};

export const NAV_SPORTS_PRIMARY_RECAP_LANES: NavSportsRecapLane[] = [
  { sport: "football", label: "Football - Recaps", mode: "pitch-slideshow" },
  { sport: "basketball", label: "Basketball - Recaps", mode: "highlights" },
  { sport: "formula-1", label: "F1 - Recaps", mode: "highlights", theme: "f1" }
];

export const NAV_SPORTS_MORE_RECAP_LANES: NavSportsRecapLane[] = [
  { sport: "volleyball", label: "Volleyball - Recaps", mode: "highlights" },
  { sport: "nba", label: "NBA - Recaps", mode: "highlights" },
  { sport: "baseball", label: "Baseball - Recaps", mode: "highlights" },
  { sport: "hockey", label: "Hockey - Recaps", mode: "highlights" },
  { sport: "rugby", label: "Rugby - Recaps", mode: "highlights" },
  { sport: "nfl", label: "NFL - Recaps", mode: "highlights" },
  { sport: "handball", label: "Handball - Recaps", mode: "highlights" },
  { sport: "afl", label: "AFL - Recaps", mode: "highlights" },
  { sport: "mma", label: "MMA - Recaps", mode: "highlights" }
];

export const NAV_SPORTS_RECAP_LANES: NavSportsRecapLane[] = [
  ...NAV_SPORTS_PRIMARY_RECAP_LANES,
  ...NAV_SPORTS_MORE_RECAP_LANES
];

export function navSportsRecapLaneLabel(sport: ApiSportsNavSportId) {
  return `${API_SPORTS_NAV_SPORT_META[sport].label} - Recaps`;
}