import "server-only";

import { createHash } from "node:crypto";
import { adminDb } from "@/lib/firebase-admin";

const COLLECTION = "arena_engine_claim_limits";
const WINDOW_MS = 60_000;
const MAX_REQUESTS = 8;

function getClientAddress(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for");
  const vercelForwarded = request.headers.get("x-vercel-forwarded-for");
  const address = forwarded?.split(",")[0]?.trim() || vercelForwarded?.trim() || "unknown";
  return createHash("sha256").update(address).digest("hex");
}

/** Firestore-backed rate limit shared across serverless instances. */
export async function checkArenaClaimRateLimit(request: Request) {
  const key = getClientAddress(request);
  const ref = adminDb.collection(COLLECTION).doc(key);
  const now = Date.now();

  return adminDb.runTransaction(async (transaction) => {
    const snapshot = await transaction.get(ref);
    const data = snapshot.data() as { windowStartedAt?: number; count?: number } | undefined;
    const windowStartedAt = Number(data?.windowStartedAt);
    const count = Number(data?.count);
    const inWindow =
      Number.isFinite(windowStartedAt) &&
      now - windowStartedAt >= 0 &&
      now - windowStartedAt < WINDOW_MS;

    if (inWindow && Number.isFinite(count) && count >= MAX_REQUESTS) {
      return {
        allowed: false as const,
        retryAfterSeconds: Math.max(1, Math.ceil((WINDOW_MS - (now - windowStartedAt)) / 1000))
      };
    }

    transaction.set(ref, inWindow
      ? { windowStartedAt, count: (Number.isFinite(count) ? count : 0) + 1, updatedAt: now }
      : { windowStartedAt: now, count: 1, updatedAt: now });

    return { allowed: true as const, retryAfterSeconds: 0 };
  });
}
