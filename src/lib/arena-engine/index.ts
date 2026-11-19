export * from "@/lib/arena-engine/types";
export * from "@/lib/arena-engine/constants";
export * from "@/lib/arena-engine/config";
export * from "@/lib/arena-engine/seed";
export * from "@/lib/arena-engine/rotate";
export * from "@/lib/arena-engine/live-sessions";
export * from "@/lib/arena-engine/public-state";

export {
  loadArenaEngineState,
  saveArenaEngineState,
  resetArenaEngineState
} from "@/lib/arena-engine/store";

import { claimArenaEngineLiveSession } from "@/lib/arena-engine/live-sessions";
import { toArenaEnginePublicState } from "@/lib/arena-engine/public-state";
import {
  pruneExpiredLiveSessions,
  rotateArenaEngineState,
  shouldRotateArenaEngine
} from "@/lib/arena-engine/rotate";
import { loadArenaEngineState, updateArenaEngineState } from "@/lib/arena-engine/store";

/** Read-only snapshot for public polling. Expired sessions are filtered for display, not pruned here. */
export async function getArenaEnginePublicState() {
  const state = await loadArenaEngineState();
  return toArenaEnginePublicState(state);
}

export async function runArenaEngineRotation(source = "legal_placeholder_bot") {
  return updateArenaEngineState((current) => {
    const state = pruneExpiredLiveSessions(current);
    const { state: rotated, event } = rotateArenaEngineState(state, source);

    return {
      state: rotated,
      result: {
        publicState: toArenaEnginePublicState(rotated),
        event
      }
    };
  });
}

export async function runArenaEngineRotationIfDue(source = "legal_placeholder_bot") {
  return updateArenaEngineState((current) => {
    const state = pruneExpiredLiveSessions(current);

    if (!shouldRotateArenaEngine(state)) {
      return {
        state,
        result: {
          rotated: false as const,
          publicState: toArenaEnginePublicState(state)
        }
      };
    }

    const { state: rotated, event } = rotateArenaEngineState(state, source);

    return {
      state: rotated,
      result: {
        rotated: true as const,
        publicState: toArenaEnginePublicState(rotated),
        event
      }
    };
  });
}

export async function claimArenaEngineLive(input: {
  slotId: number;
  islandCode: string;
  displayName: string;
}) {
  return updateArenaEngineState((current) => {
    const state = pruneExpiredLiveSessions(current);
    const result = claimArenaEngineLiveSession(state, input);

    if (!result.ok) {
      return { state, result };
    }

    return {
      state: result.state,
      result: {
        ok: true as const,
        session: result.session,
        publicState: toArenaEnginePublicState(result.state)
      }
    };
  });
}
