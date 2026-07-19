import type { ArenaCreatorSlot } from "@/lib/arena-experience";

/**
 * Front 12 nation slots · exact public lineup (all READY for girl sign-in).
 * Order matches arenaCreators ranks 1–12.
 */
export const ARENA_FRONT12_SLOT_DISPLAY_ORDER = [
  "CO",
  "UK",
  "EC",
  "TT",
  "ES",
  "CN",
  "JP"
] as const;

/** Owner catalog only · frozen country lanes removed from public */
export const ARENA_COMMAND_CENTER_ONLY_ISLAND_CODES = ["LT", "JM", "PL", "TN", "GY", "VE"] as const;

export type ArenaFront12VisibleIslandCode = (typeof ARENA_FRONT12_SLOT_DISPLAY_ORDER)[number];

export const ARENA_FRONT12_VISIBLE_ISLAND_CODES = new Set<string>(ARENA_FRONT12_SLOT_DISPLAY_ORDER);

export function isArenaFront12VisibleSlot(islandCode: string) {
  return ARENA_FRONT12_VISIBLE_ISLAND_CODES.has(islandCode);
}

export function filterArenaFront12Slots<T extends Pick<ArenaCreatorSlot, "islandCode">>(slots: T[]) {
  return slots.filter((slot) => isArenaFront12VisibleSlot(slot.islandCode));
}

const displayOrderIndex = new Map<string, number>(
  ARENA_FRONT12_SLOT_DISPLAY_ORDER.map((code, index) => [code, index])
);

export function getArenaFront12DisplayOrderIndex(islandCode: string) {
  return displayOrderIndex.get(islandCode) ?? ARENA_FRONT12_SLOT_DISPLAY_ORDER.length;
}

export function getArenaFront12DisplayRank(islandCode: string) {
  const index = displayOrderIndex.get(islandCode);
  return index === undefined ? ARENA_FRONT12_SLOT_DISPLAY_ORDER.length + 1 : index + 1;
}

export function compareArenaFront12SlotOrder(a: Pick<ArenaCreatorSlot, "islandCode">, b: Pick<ArenaCreatorSlot, "islandCode">) {
  return getArenaFront12DisplayOrderIndex(a.islandCode) - getArenaFront12DisplayOrderIndex(b.islandCode);
}

export function sortArenaFront12Slots<T extends Pick<ArenaCreatorSlot, "islandCode">>(slots: T[]) {
  return [...slots].sort(compareArenaFront12SlotOrder);
}

export type ArenaFront12OrderedSlot<T extends ArenaCreatorSlot = ArenaCreatorSlot> = T & {
  displayRank: number;
};

export function withArenaFront12DisplayRanks<T extends ArenaCreatorSlot>(slots: T[]): ArenaFront12OrderedSlot<T>[] {
  return sortArenaFront12Slots(slots).map((slot, index) => ({
    ...slot,
    displayRank: index + 1
  }));
}