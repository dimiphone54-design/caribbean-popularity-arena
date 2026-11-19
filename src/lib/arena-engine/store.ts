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

function requireExistingState(snapshot: FirebaseFirestore.DocumentSnapshot) {
  if (!snapshot.exists) {
    throw new Error(
      'Firestore Arena Engine document "arena_engine/state" is missing. Refusing to seed or recreate live production state.'
    );
  }
  return validateState(snapshot.data());
}

/** Read the migrated document only. Seeding is an explicit administrative action, never an implicit read fallback. */
export async function loadArenaEngineState(): Promise<ArenaEngineState> {
  const snapshot = await getStateReference().get();
  return requireExistingState(snapshot);
}

export async function saveArenaEngineState(state: ArenaEngineState) {
  const validated = validateState(state);
  const ref = getStateReference();

  await adminDb.runTransaction(async (transaction) => {
    const snapshot = await transaction.get(ref);
    requireExistingState(snapshot);
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
    const current = requireExistingState(snapshot);
    const updated = updater(current);
    const nextState = validateState(updated.state);

    // Avoid a Firestore write for polls or rejected operations that made no state change.
    if (JSON.stringify(nextState) !== JSON.stringify(current)) {
      transaction.set(ref, nextState);
    }

    return updated.result;
  });
}

/** Explicit destructive reset retained for owner-only maintenance; never called by request paths. */
export async function resetArenaEngineState() {
  const state = createArenaEngineSeed();
  const ref = getStateReference();

  await adminDb.runTransaction(async (transaction) => {
    const snapshot = await transaction.get(ref);
    requireExistingState(snapshot);
    transaction.set(ref, state);
  });

  return state;
}
