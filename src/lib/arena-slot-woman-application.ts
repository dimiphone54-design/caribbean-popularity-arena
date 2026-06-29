export type ArenaSlotWomanApplication = {
  slotId: number;
  rank: number;
  country: string;
  islandCode: string;
  displayName: string;
  age: number;
  category: string;
  appliedAt: number;
};

const storageKey = "cpa_arena_slot_woman_applications";

export function saveArenaSlotWomanApplication(application: ArenaSlotWomanApplication) {
  if (typeof window === "undefined") return;
  const existing = readArenaSlotWomanApplications().filter((entry) => entry.slotId !== application.slotId);
  existing.push(application);
  window.localStorage.setItem(storageKey, JSON.stringify(existing));
}

export function readArenaSlotWomanApplications(): ArenaSlotWomanApplication[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(storageKey);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as ArenaSlotWomanApplication[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}
