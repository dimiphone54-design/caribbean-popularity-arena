import { NextResponse } from "next/server";
import { getArenaEnginePublicState } from "@/lib/arena-engine";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const state = await getArenaEnginePublicState();
    return NextResponse.json(state, {
      headers: { "Cache-Control": "no-store, max-age=0" }
    });
  } catch (error) {
    console.error("Arena Engine state read failed:", error);
    return NextResponse.json(
      { ok: false, error: "Arena Engine state is temporarily unavailable." },
      { status: 503, headers: { "Cache-Control": "no-store" } }
    );
  }
}
