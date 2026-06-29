export * from "@/lib/arena-engine/types";
export * from "@/lib/arena-engine/constants";
export * from "@/lib/arena-engine/config";
export * from "@/lib/arena-engine/seed";
export * from "@/lib/arena-engine/rotate";
export * from "@/lib/arena-engine/live-sessions";
export * from "@/lib/arena-engine/public-state";
export { loadArenaEngineState, saveArenaEngineState, resetArenaEngineState } from "@/lib/arena-engine/store";

import { claimArenaEngineLiveSession } from "@/lib/arena-engine/live-sessions";
import { toArenaEnginePublicState } from "@/lib/arena-engine/public-state";
import { pruneExpiredLiveSessions, rotateArenaEngineState, shouldRotateArenaEngine } from "@/lib/arena-engine/rotate";
import { loadArenaEngineState, saveArenaEngineState } from "@/lib/arena-engine/store";

export async function getArenaEnginePublicState() {
  const state = pruneExpiredLiveSessions(await loadArenaEngineState());
  await saveArenaEngineState(state);
  return toArenaEnginePublicState(state);
}

export async function runArenaEngineRotation(source = "legal_placeholder_bot") {
  const state = pruneExpiredLiveSessions(await loadArenaEngineState());
  const { state: rotated, event } = rotateArenaEngineState(state, source);
  await saveArenaEngineState(rotated);
  return { publicState: toArenaEnginePublicState(rotated), event };
}

export async function runArenaEngineRotationIfDue(source = "legal_placeholder_bot") {
  const state = pruneExpiredLiveSessions(await loadArenaEngineState());
  if (!shouldRotateArenaEngine(state)) {
    return { rotated: false as const, publicState: toArenaEnginePublicState(state) };
  }
  const { state: rotated, event } = rotateArenaEngineState(state, source);
  await saveArenaEngineState(rotated);
  return { rotated: true as const, publicState: toArenaEnginePublicState(rotated), event };
}

export async function claimArenaEngineLive(input: {
  slotId: number;
  islandCode: string;
  displayName: string;
}) {
  const state = pruneExpiredLiveSessions(await loadArenaEngineState());
  const result = claimArenaEngineLiveSession(state, input);
  if (!result.ok) {
    return result;
  }
  await saveArenaEngineState(result.state);
  return {
    ok: true as const,
    session: result.session,
    publicState: toArenaEnginePublicState(result.state)
  };
}
