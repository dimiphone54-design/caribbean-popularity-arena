import {
  ARENA_ENGINE_FRONT_COUNT,
  ARENA_ENGINE_ROTATION_HOURS,
  ARENA_ENGINE_WAITING_COUNT
} from "@/lib/arena-engine/constants";
import type {
  ArenaEngineFrontSlot,
  ArenaEngineRotationEvent,
  ArenaEngineState,
  ArenaEngineWaitingSlot
} from "@/lib/arena-engine/types";

function swapProfileFields(
  front: ArenaEngineFrontSlot,
  waiting: ArenaEngineWaitingSlot
): { front: ArenaEngineFrontSlot; waiting: ArenaEngineWaitingSlot } {
  return {
    front: {
      ...front,
      name: waiting.name,
      age: waiting.age,
      country: waiting.country,
      flag: waiting.flag,
      category: waiting.category,
      quote: waiting.quote,
      language: waiting.language,
      likes: waiting.likes,
      comments: waiting.comments,
      votes: waiting.votes
    },
    waiting: {
      ...waiting,
      name: front.name,
      age: front.age,
      country: front.country,
      flag: front.flag,
      category: front.category,
      quote: front.quote,
      language: front.language,
      likes: front.likes,
      comments: front.comments,
      votes: front.votes
    }
  };
}

export function shouldRotateArenaEngine(state: ArenaEngineState, nowMs = Date.now()) {
  if (!state.nextRotationAt) return true;
  return nowMs >= Date.parse(state.nextRotationAt);
}

export function rotateArenaEngineState(
  state: ArenaEngineState,
  source = "legal_placeholder_bot",
  now = new Date()
): { state: ArenaEngineState; event: ArenaEngineRotationEvent } {
  if (state.frontSlots.length !== ARENA_ENGINE_FRONT_COUNT) {
    throw new Error(`Rotation requires ${ARENA_ENGINE_FRONT_COUNT} front slots`);
  }
  if (state.waitingSlots.length !== ARENA_ENGINE_WAITING_COUNT) {
    throw new Error(`Rotation requires ${ARENA_ENGINE_WAITING_COUNT} waiting slots`);
  }

  const nextFront: ArenaEngineFrontSlot[] = [];
  const nextWaiting: ArenaEngineWaitingSlot[] = [];

  for (let index = 0; index < ARENA_ENGINE_FRONT_COUNT; index += 1) {
    const front = state.frontSlots[index];
    const waiting = state.waitingSlots[index];
    const swapped = swapProfileFields(front, waiting);
    nextFront.push(swapped.front);
    nextWaiting.push(swapped.waiting);
  }

  const rotatedAt = now.toISOString();
  const nextRotationAt = new Date(
    now.getTime() + state.rotationIntervalHours * 60 * 60 * 1000
  ).toISOString();

  const event: ArenaEngineRotationEvent = {
    rotatedAt,
    source,
    frontCount: ARENA_ENGINE_FRONT_COUNT,
    waitingCount: ARENA_ENGINE_WAITING_COUNT
  };

  return {
    state: {
      ...state,
      frontSlots: nextFront,
      waitingSlots: nextWaiting,
      lastRotationAt: rotatedAt,
      nextRotationAt,
      lastRotationEvent: event,
      updatedAt: rotatedAt
    },
    event
  };
}

export function pruneExpiredLiveSessions(state: ArenaEngineState, nowMs = Date.now()) {
  const liveSessions: ArenaEngineState["liveSessions"] = {};
  let changed = false;

  for (const [key, session] of Object.entries(state.liveSessions)) {
    if (Date.parse(session.expiresAt) > nowMs) {
      liveSessions[key] = session;
    } else {
      changed = true;
    }
  }

  if (!changed) return state;

  return {
    ...state,
    liveSessions,
    updatedAt: new Date(nowMs).toISOString()
  };
}

/** Guard constant used in docs · rotation interval default */
export const ARENA_ENGINE_DEFAULT_ROTATION_MS = ARENA_ENGINE_ROTATION_HOURS * 60 * 60 * 1000;
