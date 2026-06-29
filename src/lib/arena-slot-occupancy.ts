import { ARENA_SLOT_COUNTDOWN_SECONDS } from "@/lib/arena-slot-countdown";
import { shouldKeepArenaActiveSlotsOpen } from "@/lib/arena-slot-keep-open";

export type ArenaSlotOccupancy = {
  slotId: number;
  islandCode: string;
  displayName: string;
  signedInAt: number;
};

export const ARENA_SLOT_OCCUPANCY_EVENT = "cpa:arena-slot-occupancy";

const storageKey = "cpa_arena_slot_occupancy";

function readRawOccupancies(): Record<string, ArenaSlotOccupancy> {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(storageKey);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as Record<string, ArenaSlotOccupancy>;
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

function writeOccupancies(map: Record<string, ArenaSlotOccupancy>) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(storageKey, JSON.stringify(map));
  window.dispatchEvent(new CustomEvent(ARENA_SLOT_OCCUPANCY_EVENT));
}

export function isArenaSlotOccupancyActive(occupancy: ArenaSlotOccupancy, nowMs = Date.now()) {
  if (shouldKeepArenaActiveSlotsOpen()) return true;
  return nowMs - occupancy.signedInAt < ARENA_SLOT_COUNTDOWN_SECONDS * 1000;
}

export function getArenaSlotOccupancyRemainingSeconds(occupancy: ArenaSlotOccupancy, nowMs = Date.now()) {
  if (shouldKeepArenaActiveSlotsOpen()) {
    return ARENA_SLOT_COUNTDOWN_SECONDS;
  }
  const endMs = occupancy.signedInAt + ARENA_SLOT_COUNTDOWN_SECONDS * 1000;
  return Math.max(0, Math.floor((endMs - nowMs) / 1000));
}

/** Drop expired sessions · return active occupancies keyed by slot id */
export function readArenaSlotOccupancies(nowMs = Date.now()): Record<number, ArenaSlotOccupancy> {
  const raw = readRawOccupancies();
  const active: Record<number, ArenaSlotOccupancy> = {};
  let changed = false;

  for (const entry of Object.values(raw)) {
    if (!entry?.slotId) continue;
    if (isArenaSlotOccupancyActive(entry, nowMs)) {
      active[entry.slotId] = entry;
    } else {
      changed = true;
    }
  }

  if (changed) {
    const next: Record<string, ArenaSlotOccupancy> = {};
    for (const entry of Object.values(active)) {
      next[String(entry.slotId)] = entry;
    }
    writeOccupancies(next);
  }

  return active;
}

export function claimArenaSlot(input: {
  slotId: number;
  islandCode: string;
  displayName: string;
}) {
  if (typeof window === "undefined") return false;

  const name = input.displayName.trim();
  if (name.length < 2) return false;

  const occupancies = readArenaSlotOccupancies();
  if (occupancies[input.slotId]) return false;

  const alreadyLive = Object.values(occupancies).some(
    (entry) => entry.displayName.toLowerCase() === name.toLowerCase()
  );
  if (alreadyLive) return false;

  const next = readRawOccupancies();
  next[String(input.slotId)] = {
    slotId: input.slotId,
    islandCode: input.islandCode,
    displayName: name,
    signedInAt: Date.now()
  };
  writeOccupancies(next);
  return true;
}

export function releaseArenaSlot(slotId: number) {
  if (typeof window === "undefined") return;
  const next = readRawOccupancies();
  delete next[String(slotId)];
  writeOccupancies(next);
}
