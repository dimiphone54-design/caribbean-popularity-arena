import { arenaCreators, type ArenaCreatorSlot } from "@/lib/arena-experience";
import { getArenaEliteSlotTheme } from "@/lib/arena-elite-slot-themes";

/** Elite rankings panel · active open nations + Colombia + Japan + China */
export const eliteCreatorRankingIslandCodes = ["UK", "EC", "TT", "CO", "CN", "JP"] as const;

const rankingIslandSet = new Set<string>(eliteCreatorRankingIslandCodes);

export type EliteCreatorRankingEntry = {
  rank: number;
  frontSlotRank: number;
  name: string;
  island: string;
  category: string;
  score: number;
  trend: string;
  initials: string;
  avatarGradient: string;
  flag: string;
  badges: string[];
};

function creatorInitials(name: string) {
  return name
    .split(/\s+/)
    .map((part) => part[0] ?? "")
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function badgesForActiveSlot(slot: ArenaCreatorSlot, isLive: boolean) {
  const theme = getArenaEliteSlotTheme(slot);
  const badges = [`${theme.tier} · Elite Creative`, `Front #${slot.rank}`];
  if (isLive) badges.unshift("Live");
  return badges;
}

/** Front 12 · UK · EC · TT · Colombia · China · Japan · sorted by arena votes */
export function getActiveEliteCreatorRankings(liveIslandCodes: string[] = []) {
  const liveSet = new Set(liveIslandCodes);

  return arenaCreators
    .filter((slot) => rankingIslandSet.has(slot.islandCode))
    .sort((a, b) => b.votes - a.votes)
    .map((slot, index) => ({
      rank: index + 1,
      frontSlotRank: slot.rank,
      name: slot.name,
      island: slot.country,
      category: slot.category,
      score: slot.votes,
      trend: slot.trend,
      initials: creatorInitials(slot.name),
      avatarGradient: slot.avatarGradient,
      flag: slot.flag,
      badges: badgesForActiveSlot(slot, liveSet.has(slot.islandCode))
    }));
}
