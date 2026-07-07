import type { ArenaCreatorSlot } from "@/lib/arena-experience";

/** Front 12 grid · exact lineup · UK · China · Japan · Colombia · Ecuador · then rest */
export const ARENA_FRONT12_SLOT_DISPLAY_ORDER = [
  "UK",
  "CN",
  "JP",
  "CO",
  "EC",
  "LT",
  "TT",
  "JM",
  "VE",
  "PL",
  "TN",
  "GY"
] as const;

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