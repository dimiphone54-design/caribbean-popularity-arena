import { NextResponse } from "next/server";
import { claimArenaEngineLive } from "@/lib/arena-engine";
import { checkArenaClaimRateLimit } from "@/lib/arena-engine/claim-rate-limit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_BODY_BYTES = 2_048;

type ClaimBody = {
  slotId?: number;
  islandCode?: string;
  displayName?: string;
};

export async function POST(request: Request) {
  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (Number.isFinite(contentLength) && contentLength > MAX_BODY_BYTES) {
    return NextResponse.json({ ok: false, error: "Request body too large." }, { status: 413 });
  }

  let rawBody: string;
  try {
    rawBody = await request.text();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request body." }, { status: 400 });
  }
  if (new TextEncoder().encode(rawBody).byteLength > MAX_BODY_BYTES) {
    return NextResponse.json({ ok: false, error: "Request body too large." }, { status: 413 });
  }

  let body: ClaimBody;
  try {
    body = JSON.parse(rawBody) as ClaimBody;
    if (!body || typeof body !== "object" || Array.isArray(body)) throw new Error("Invalid body");
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const slotId = Number(body.slotId);
  const islandCode = typeof body.islandCode === "string" ? body.islandCode.trim() : "";
  const displayName = typeof body.displayName === "string" ? body.displayName.trim() : "";

  if (!Number.isInteger(slotId) || slotId < 1 || slotId > 12) {
    return NextResponse.json({ ok: false, error: "Invalid slot id" }, { status: 400 });
  }
  if (!/^[A-Z]{2}$/.test(islandCode) || displayName.length < 2 || displayName.length > 40) {
    return NextResponse.json({ ok: false, error: "Missing islandCode or displayName" }, { status: 400 });
  }

  try {
    const limit = await checkArenaClaimRateLimit(request);
    if (!limit.allowed) {
      return NextResponse.json(
        { ok: false, error: "Too many sign-in attempts. Please wait before trying again." },
        {
          status: 429,
          headers: {
            "Cache-Control": "no-store",
            "Retry-After": String(limit.retryAfterSeconds)
          }
        }
      );
    }

    const result = await claimArenaEngineLive({ slotId, islandCode, displayName });
    if (!result.ok) {
      return NextResponse.json(
        { ok: false, error: result.error },
        { status: 409, headers: { "Cache-Control": "no-store" } }
      );
    }

    return NextResponse.json({
      ok: true,
      session: result.session,
      stats: result.publicState.stats,
      liveSessions: result.publicState.liveSessions
    }, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    console.error("Arena Engine live claim failed:", error);
    return NextResponse.json(
      { ok: false, error: "Live sign-in is temporarily unavailable." },
      { status: 503, headers: { "Cache-Control": "no-store" } }
    );
  }
}
