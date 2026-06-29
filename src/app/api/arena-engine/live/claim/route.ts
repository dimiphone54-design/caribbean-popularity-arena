import { NextResponse } from "next/server";
import { claimArenaEngineLive } from "@/lib/arena-engine";

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

  if (!Number.isFinite(slotId) || slotId < 1 || slotId > 12) {
    return NextResponse.json({ ok: false, error: "Invalid slot id" }, { status: 400 });
  }
  if (!islandCode || !displayName) {
    return NextResponse.json({ ok: false, error: "Missing islandCode or displayName" }, { status: 400 });
  }

  const result = await claimArenaEngineLive({ slotId, islandCode, displayName });
  if (!result.ok) {
    return NextResponse.json({ ok: false, error: result.error }, { status: 409 });
  }

  return NextResponse.json({
    ok: true,
    session: result.session,
    stats: result.publicState.stats,
    liveSessions: result.publicState.liveSessions
  });
}
