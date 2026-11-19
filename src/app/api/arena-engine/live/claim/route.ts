import { NextResponse } from "next/server";
import { claimArenaEngineLive } from "@/lib/arena-engine";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type ClaimBody = {
  slotId?: number;
  islandCode?: string;
  displayName?: string;
};

export async function POST(request: Request) {
  let body: ClaimBody;
  try {
    body = (await request.json()) as ClaimBody;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const slotId = Number(body.slotId);
  const islandCode = body.islandCode?.trim() ?? "";
  const displayName = body.displayName?.trim() ?? "";

  if (!Number.isInteger(slotId) || slotId < 1 || slotId > 12) {
    return NextResponse.json({ ok: false, error: "Invalid slot id" }, { status: 400 });
  }
  if (!/^[A-Z]{2}$/.test(islandCode) || !displayName || displayName.length > 40) {
    return NextResponse.json({ ok: false, error: "Missing islandCode or displayName" }, { status: 400 });
  }

  try {
    const result = await claimArenaEngineLive({ slotId, islandCode, displayName });
    if (!result.ok) {
      return NextResponse.json({ ok: false, error: result.error }, { status: 409 });
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
