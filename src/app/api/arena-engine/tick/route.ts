import { NextResponse } from "next/server";
import { ARENA_ENGINE_BOT_SECRET_HEADER } from "@/lib/arena-engine/constants";
import { arenaEngineConfig, isArenaBotSecretValid } from "@/lib/arena-engine/config";
import { runArenaEngineRotationIfDue, getArenaEnginePublicState } from "@/lib/arena-engine";

/** Cron-friendly tick · rotates when due · secured by bot secret */
export async function GET(request: Request) {
  const url = new URL(request.url);
  const secret =
    request.headers.get(ARENA_ENGINE_BOT_SECRET_HEADER) ?? url.searchParams.get("secret");

  if (!isArenaBotSecretValid(secret)) {
    return NextResponse.json({ ok: false, error: "Invalid bot secret" }, { status: 401 });
  }

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
  });
}

export async function POST(request: Request) {
  const secret = request.headers.get(ARENA_ENGINE_BOT_SECRET_HEADER);
  if (!isArenaBotSecretValid(secret)) {
    return NextResponse.json({ ok: false, error: "Invalid bot secret" }, { status: 401 });
  }

  const publicState = await getArenaEnginePublicState();
  return NextResponse.json(publicState);
}
