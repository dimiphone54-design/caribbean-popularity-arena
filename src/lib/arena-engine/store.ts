import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { arenaEngineConfig } from "@/lib/arena-engine/config";
import { createArenaEngineSeed } from "@/lib/arena-engine/seed";
import type { ArenaEngineState } from "@/lib/arena-engine/types";

const globalStore = globalThis as typeof globalThis & {
  __arenaEngineState?: ArenaEngineState;
};

function resolveDataPath() {
  return path.isAbsolute(arenaEngineConfig.dataFile)
    ? arenaEngineConfig.dataFile
    : path.join(process.cwd(), arenaEngineConfig.dataFile);
}

async function readStateFromDisk(): Promise<ArenaEngineState | null> {
  try {
    const raw = await readFile(resolveDataPath(), "utf8");
    const parsed = JSON.parse(raw) as ArenaEngineState;
    if (parsed?.version !== 1 || !Array.isArray(parsed.frontSlots)) {
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

async function writeStateToDisk(state: ArenaEngineState) {
  const filePath = resolveDataPath();
  await mkdir(path.dirname(filePath), { recursive: true });
  await writeFile(filePath, JSON.stringify(state, null, 2), "utf8");
}

export async function loadArenaEngineState(): Promise<ArenaEngineState> {
  if (globalStore.__arenaEngineState) {
    return globalStore.__arenaEngineState;
  }

  const fromDisk = await readStateFromDisk();
  const state = fromDisk ?? createArenaEngineSeed();
  globalStore.__arenaEngineState = state;

  if (!fromDisk) {
    await writeStateToDisk(state);
  }

  return state;
}

export async function saveArenaEngineState(state: ArenaEngineState) {
  globalStore.__arenaEngineState = state;
  await writeStateToDisk(state);
  return state;
}

export async function resetArenaEngineState() {
  const state = createArenaEngineSeed();
  await saveArenaEngineState(state);
  return state;
}
