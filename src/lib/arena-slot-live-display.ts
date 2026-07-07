import { arenaCreators } from "@/lib/arena-experience";
import type { ArenaSlotOccupancy } from "@/lib/arena-slot-occupancy";

/** Keep in sync with ARENA_PRIMARY_MASTER · avoid importing arena-master-identity (circular via arena-master-key) */
const ownerPreviewNames = new Set(["dimitri", "arena owner"]);

export function isArenaOwnerPreviewDisplayName(displayName: string) {
  const normalized = displayName.trim().toLowerCase();
  if (!normalized) return true;
  return ownerPreviewNames.has(normalized);
}

export function getArenaSlotCreatorName(slotId: number) {
  return arenaCreators.find((creator) => creator.id === slotId)?.name ?? "";
}

/** Front 12 live card · show nation creator, not owner preview name */
export function resolveArenaSlotLiveDisplayName(slotId: number, occupancy: ArenaSlotOccupancy) {
  if (isArenaOwnerPreviewDisplayName(occupancy.displayName)) {
    return getArenaSlotCreatorName(slotId) || occupancy.displayName;
  }
  return occupancy.displayName;
}

export function normalizeArenaSlotOccupancyDisplayName(occupancy: ArenaSlotOccupancy) {
  if (!isArenaOwnerPreviewDisplayName(occupancy.displayName)) return occupancy;
  const creatorName = getArenaSlotCreatorName(occupancy.slotId);
  if (!creatorName) return occupancy;
  return { ...occupancy, displayName: creatorName };
}