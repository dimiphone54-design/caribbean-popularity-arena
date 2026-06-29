import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import {
  fetchFreedomDriveLeaderboard,
  insertFreedomDriveScore,
  type FreedomDriveLeaderboardRow
} from "@/lib/supabase/client";
import type { FreedomDriveLeaderboardEntry } from "@/lib/freedom-drive/types";

const DATA_FILE = path.join(process.cwd(), ".data/freedom-drive-leaderboard.json");

async function readLocalLeaderboard(): Promise<FreedomDriveLeaderboardEntry[]> {
  try {
    const raw = await readFile(DATA_FILE, "utf8");
    const parsed = JSON.parse(raw) as FreedomDriveLeaderboardEntry[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

async function writeLocalLeaderboard(entries: FreedomDriveLeaderboardEntry[]) {
  await mkdir(path.dirname(DATA_FILE), { recursive: true });
  await writeFile(DATA_FILE, JSON.stringify(entries.slice(0, 100), null, 2), "utf8");
}

export async function loadFreedomDriveLeaderboard(limit = 20) {
  const remote = await fetchFreedomDriveLeaderboard(limit);
  if (remote.length > 0) return remote.slice(0, limit);
  const local = await readLocalLeaderboard();
  return local
    .sort((a, b) => b.arena_points - a.arena_points)
    .slice(0, limit);
}

export async function saveFreedomDriveLeaderboardEntry(row: FreedomDriveLeaderboardRow) {
  const remote = await insertFreedomDriveScore(row);
  if (remote.ok) return remote;

  const local = await readLocalLeaderboard();
  const entry: FreedomDriveLeaderboardEntry = {
    id: `local-${Date.now()}`,
    username: row.username,
    country: row.country,
    distance_driven: row.distance_driven,
    top_speed: row.top_speed,
    arena_points: row.arena_points,
    created_at: new Date().toISOString()
  };
  local.push(entry);
  await writeLocalLeaderboard(local);
  return { ok: true as const, id: entry.id, fallback: true as const };
}
