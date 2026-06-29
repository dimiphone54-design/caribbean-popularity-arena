import { arenaCreators, waitingSlots } from "@/lib/arena-experience";
import { arenaSlotSignInOpenIslandCodes } from "@/lib/arena-slot-sign-in-access";
import {
  ARENA_ENGINE_FRONT_COUNT,
  ARENA_ENGINE_LIVE_SESSION_HOURS,
  ARENA_ENGINE_ROTATION_HOURS,
  ARENA_ENGINE_STATE_VERSION,
  ARENA_ENGINE_WAITING_COUNT
} from "@/lib/arena-engine/constants";
import type { ArenaEngineState } from "@/lib/arena-engine/types";

function buildInitialRotationWindow(now = new Date()) {
  const next = new Date(now.getTime() + ARENA_ENGINE_ROTATION_HOURS * 60 * 60 * 1000);
  return {
    lastRotationAt: now.toISOString(),
    nextRotationAt: next.toISOString()
  };
}

export function createArenaEngineSeed(now = new Date()): ArenaEngineState {
  const rotation = buildInitialRotationWindow(now);

  return {
    version: ARENA_ENGINE_STATE_VERSION,
    mode: "legal_placeholder",
    frontSlots: arenaCreators.slice(0, ARENA_ENGINE_FRONT_COUNT).map((slot) => ({
      slotRank: slot.rank,
      templateIslandCode: slot.islandCode,
      name: slot.name,
      age: slot.age,
      country: slot.country,
      flag: slot.flag,
      category: slot.category,
      quote: slot.quote,
      language: slot.language,
      likes: slot.likes,
      comments: slot.comments,
      votes: slot.votes
    })),
    waitingSlots: waitingSlots.slice(0, ARENA_ENGINE_WAITING_COUNT).map((slot) => ({
      queuePosition: slot.queuePosition,
      name: slot.name,
      age: slot.age,
      country: slot.country,
      flag: slot.flag,
      category: slot.category,
      quote: slot.quote,
      language: slot.language,
      likes: 0,
      comments: 0,
      votes: 0
    })),
    liveSessions: {},
    lastRotationAt: rotation.lastRotationAt,
    nextRotationAt: rotation.nextRotationAt,
    rotationIntervalHours: ARENA_ENGINE_ROTATION_HOURS,
    liveSessionHours: ARENA_ENGINE_LIVE_SESSION_HOURS,
    openLiveIslandCodes: [...arenaSlotSignInOpenIslandCodes],
    lastRotationEvent: null,
    updatedAt: now.toISOString()
  };
}
