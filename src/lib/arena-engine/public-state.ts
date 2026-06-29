import { isArenaSlotSignInOpen } from "@/lib/arena-slot-sign-in-access";
import { getActiveLiveSessions } from "@/lib/arena-engine/live-sessions";
import { shouldRotateArenaEngine } from "@/lib/arena-engine/rotate";
import type { ArenaEnginePublicState, ArenaEngineState } from "@/lib/arena-engine/types";
import { arenaEngineConfig } from "@/lib/arena-engine/config";

export function toArenaEnginePublicState(
  state: ArenaEngineState,
  nowMs = Date.now()
): ArenaEnginePublicState {
  const liveSessions = getActiveLiveSessions(state, nowMs);
  const openLiveCount = state.openLiveIslandCodes.length;
  const frozenFrontCount = state.frontSlots.filter(
    (slot) => !isArenaSlotSignInOpen(slot.templateIslandCode)
  ).length;

  return {
    ok: true,
    engineEnabled: arenaEngineConfig.clientEnabled,
    mode: state.mode,
    frontSlots: state.frontSlots,
    waitingSlots: state.waitingSlots,
    liveSessions,
    lastRotationAt: state.lastRotationAt,
    nextRotationAt: state.nextRotationAt,
    shouldRotate: shouldRotateArenaEngine(state, nowMs),
    rotationIntervalHours: state.rotationIntervalHours,
    liveSessionHours: state.liveSessionHours,
    openLiveIslandCodes: state.openLiveIslandCodes,
    openLiveCount,
    frozenFrontCount,
    stats: {
      frontCount: state.frontSlots.length,
      waitingCount: state.waitingSlots.length,
      liveNow: liveSessions.length
    }
  };
}
