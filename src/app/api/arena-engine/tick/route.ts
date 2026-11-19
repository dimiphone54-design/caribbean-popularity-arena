import { NextResponse } from "next/server";
import { ARENA_ENGINE_BOT_SECRET_HEADER } from "@/lib/arena-engine/constants";
import { arenaEngineConfig, isArenaBotSecretValid } from "@/lib/arena-engine/config";
import { runArenaEngineRotationIfDue, getArenaEnginePublicState } from "@/lib/arena-engine";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Scheduled tick · rotates only when due · requires the configured bot secret header. */
export async function GET(request: Request) {
  const secret = request.headers.get(ARENA_ENGINE_BOT_SECRET_HEADER);

  if (!isArenaBotSecretValid(secret)) {
    return NextResponse.json({ ok: false, error: "Invalid bot secret" }, { status: 401 });
  }

  try {
    const result = await runArenaEngineRotationIfDue("arena_engine_cron");
    return NextResponse.json({
      pollSeconds: arenaEngineConfig.botPollSeconds,
      legalMode: arenaEngineConfig.botLegalMode,
      rotated: result.rotated,
      event: result.rotated ? result.event : null,
      stats: result.publicState.stats,
      nextRotationAt: result.publicState.nextRotationAt,
      shouldRotate: result.publicState.shouldRotate,
      ok: result.publicState.ok
    }, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    console.error("Arena Engine scheduled tick failed:", error);
    return NextResponse.json({ ok: false, error: "Arena Engine tick failed." }, { status: 503 });
  }
}

export async function POST(request: Request) {
  const secret = request.headers.get(ARENA_ENGINE_BOT_SECRET_HEADER);
  if (!isArenaBotSecretValid(secret)) {
    return NextResponse.json({ ok: false, error: "Invalid bot secret" }, { status: 401 });
  }

  try {
    const publicState = await getArenaEnginePublicState();
    return NextResponse.json(publicState, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    console.error("Arena Engine tick state read failed:", error);
    return NextResponse.json({ ok: false, error: "Arena Engine state is unavailable." }, { status: 503 });
  }
}
