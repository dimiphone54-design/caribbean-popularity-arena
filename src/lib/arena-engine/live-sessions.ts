import { arenaSlotSignInOpenLabel, isArenaSlotSignInOpen } from "@/lib/arena-slot-sign-in-access";
import { shouldKeepArenaActiveSlotsOpen } from "@/lib/arena-slot-keep-open";
import type { ArenaEngineLiveSession, ArenaEngineState } from "@/lib/arena-engine/types";

export function getActiveLiveSessions(state: ArenaEngineState, nowMs = Date.now()) {
  const sessions = Object.values(state.liveSessions);
  if (shouldKeepArenaActiveSlotsOpen()) return sessions;
  return sessions.filter((session) => Date.parse(session.expiresAt) > nowMs);
}

export function claimArenaEngineLiveSession(
  state: ArenaEngineState,
  input: { slotId: number; islandCode: string; displayName: string },
  now = new Date()
): { ok: true; state: ArenaEngineState; session: ArenaEngineLiveSession } | { ok: false; error: string } {
  const name = input.displayName.trim();
  if (name.length < 2) {
    return { ok: false, error: "Display name is too short." };
  }

  if (!isArenaSlotSignInOpen(input.islandCode)) {
    return {
      ok: false,
      error: `Slot frozen · girl sign-in open for ${arenaSlotSignInOpenLabel} only.`
    };
  }

  const nowMs = now.getTime();
  const pruned = { ...state, liveSessions: { ...state.liveSessions } };
  if (!shouldKeepArenaActiveSlotsOpen()) {
    for (const [key, session] of Object.entries(pruned.liveSessions)) {
      if (Date.parse(session.expiresAt) <= nowMs) {
        delete pruned.liveSessions[key];
      }
    }
  }

  if (pruned.liveSessions[String(input.slotId)]) {
    return { ok: false, error: "This slot is already live." };
  }

  const duplicate = Object.values(pruned.liveSessions).some(
    (session) => session.displayName.toLowerCase() === name.toLowerCase()
  );
  if (duplicate) {
    return { ok: false, error: "This name is already live in another slot." };
  }

  const expiresAt = new Date(nowMs + state.liveSessionHours * 60 * 60 * 1000).toISOString();
  const session: ArenaEngineLiveSession = {
    slotId: input.slotId,
    islandCode: input.islandCode,
    displayName: name,
    signedInAt: now.toISOString(),
    expiresAt
  };

  pruned.liveSessions[String(input.slotId)] = session;
  pruned.updatedAt = now.toISOString();

  return { ok: true, state: pruned, session };
}

export function releaseArenaEngineLiveSession(state: ArenaEngineState, slotId: number) {
  const liveSessions = { ...state.liveSessions };
  delete liveSessions[String(slotId)];
  return {
    ...state,
    liveSessions,
    updatedAt: new Date().toISOString()
  };
}

export function liveSessionRemainingSeconds(session: ArenaEngineLiveSession, nowMs = Date.now()) {
  if (shouldKeepArenaActiveSlotsOpen()) {
    return 3 * 60 * 60;
  }
  return Math.max(0, Math.floor((Date.parse(session.expiresAt) - nowMs) / 1000));
}
