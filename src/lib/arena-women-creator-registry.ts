import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import type { WomenCreatorLane } from "@/lib/arena-women-creator-lanes";

export type { WomenCreatorLane } from "@/lib/arena-women-creator-lanes";
export { WOMEN_CREATOR_LANE_LABELS } from "@/lib/arena-women-creator-lanes";

export type ArenaWomenCreatorRecord = {
  id: string;
  displayName: string;
  age: number;
  country: string;
  islandCode: string;
  lane: WomenCreatorLane;
  planDescription: string;
  slotId?: number;
  slotRank?: number;
  category?: string;
  genderConfirmed: true;
  status: "pending" | "approved" | "live";
  createdAt: string;
  updatedAt: string;
};

export type ArenaWomenCreatorDraft = {
  displayName: string;
  age: number;
  country: string;
  islandCode: string;
  lane: WomenCreatorLane;
  planDescription: string;
  slotId?: number;
  slotRank?: number;
  category?: string;
};

const DATA_FILE = path.join(process.cwd(), ".data", "arena-women-creators.json");

const globalStore = globalThis as typeof globalThis & {
  __arenaWomenCreators?: ArenaWomenCreatorRecord[];
};

async function readFromDisk(): Promise<ArenaWomenCreatorRecord[]> {
  try {
    const raw = await readFile(DATA_FILE, "utf8");
    const parsed = JSON.parse(raw) as ArenaWomenCreatorRecord[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

async function writeToDisk(records: ArenaWomenCreatorRecord[]) {
  await mkdir(path.dirname(DATA_FILE), { recursive: true });
  await writeFile(DATA_FILE, JSON.stringify(records.slice(0, 5000), null, 2), "utf8");
}

export async function loadArenaWomenCreators(): Promise<ArenaWomenCreatorRecord[]> {
  if (globalStore.__arenaWomenCreators) return globalStore.__arenaWomenCreators;
  const records = await readFromDisk();
  globalStore.__arenaWomenCreators = records;
  return records;
}

export async function saveArenaWomenCreators(records: ArenaWomenCreatorRecord[]) {
  globalStore.__arenaWomenCreators = records.slice(0, 5000);
  await writeToDisk(globalStore.__arenaWomenCreators);
}

function newWomenCreatorId() {
  return `woman-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export async function registerArenaWomenCreator(draft: ArenaWomenCreatorDraft) {
  const records = await loadArenaWomenCreators();
  const now = new Date().toISOString();

  const record: ArenaWomenCreatorRecord = {
    id: newWomenCreatorId(),
    displayName: draft.displayName.trim(),
    age: draft.age,
    country: draft.country.trim(),
    islandCode: draft.islandCode.trim(),
    lane: draft.lane,
    planDescription: draft.planDescription.trim(),
    slotId: draft.slotId,
    slotRank: draft.slotRank,
    category: draft.category,
    genderConfirmed: true,
    status: "pending",
    createdAt: now,
    updatedAt: now
  };

  records.unshift(record);
  await saveArenaWomenCreators(records);
  return record;
}
