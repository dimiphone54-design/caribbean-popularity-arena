import "server-only";

import { adminDb } from "@/lib/firebase-admin";
import { createArenaEngineSeed } from "@/lib/arena-engine/seed";
import type { ArenaEngineState } from "@/lib/arena-engine/types";

const COLLECTION = "arena_engine";
const DOCUMENT = "state";

function getStateReference() {
  return adminDb.collection(COLLECTION).doc(DOCUMENT);
}

function validateState(value: unknown): ArenaEngineState {
  const state = value as ArenaEngineState;

  if (
    !state ||
    state.version !== 1 ||
    !Array.isArray(state.frontSlots) ||
    state.frontSlots.length !== 12 ||
    !Array.isArray(state.waitingSlots) ||
    state.waitingSlots.length !== 12 ||
    !state.liveSessions ||
    typeof state.liveSessions !== "object" ||
    Array.isArray(state.liveSessions)
  ) {
    throw new Error(
      "Firestore Arena Engine state is invalid. Refusing to overwrite it."
    );
  }

  return state;
}

export async function loadArenaEngineState(): Promise<ArenaEngineState> {
  const ref = getStateReference();

  return adminDb.runTransaction(async (transaction) => {
    const snapshot = await transaction.get(ref);

    if (snapshot.exists) {
      return validateState(snapshot.data());
    }

    const seed = createArenaEngineSeed();
    transaction.create(ref, seed);
    return seed;
  });
}

export async function saveArenaEngineState(state: ArenaEngineState) {
  const validated = validateState(state);
  const ref = getStateReference();

  await adminDb.runTransaction(async (transaction) => {
    const snapshot = await transaction.get(ref);

    if (!snapshot.exists) {
      throw new Error(
        "Arena Engine Firestore document disappeared. Refusing to recreate it during save."
      );
    }

    validateState(snapshot.data());
    transaction.set(ref, validated);
  });

  return validated;
}

export async function updateArenaEngineState<
  T extends {
    state: ArenaEngineState;
    result: unknown;
  }
>(
  updater: (state: ArenaEngineState) => T
): Promise<T["result"]> {
  const ref = getStateReference();

  return adminDb.runTransaction(async (transaction) => {
    const snapshot = await transaction.get(ref);
    const current = snapshot.exists
      ? validateState(snapshot.data())
      : createArenaEngineSeed();

    const updated = updater(current);
    const nextState = validateState(updated.state);

    transaction.set(ref, nextState);
    return updated.result;
  });
}

export async function resetArenaEngineState() {
  const state = createArenaEngineSeed();
  const ref = getStateReference();

  await adminDb.runTransaction(async (transaction) => {
    const snapshot = await transaction.get(ref);

    if (!snapshot.exists) {
      throw new Error(
        "Arena Engine Firestore document is missing. Refusing to reset."
      );
    }

    validateState(snapshot.data());
    transaction.set(ref, state);
  });

  return state;
}
