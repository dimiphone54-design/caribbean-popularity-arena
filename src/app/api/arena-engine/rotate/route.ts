import { NextResponse } from "next/server";
import { ARENA_ENGINE_BOT_SECRET_HEADER } from "@/lib/arena-engine/constants";
import { isArenaBotSecretValid } from "@/lib/arena-engine/config";
import { runArenaEngineRotation, runArenaEngineRotationIfDue } from "@/lib/arena-engine";

type RotateBody = {
  source?: string;
  force?: boolean;
};

function readBotSecret(request: Request) {
  return request.headers.get(ARENA_ENGINE_BOT_SECRET_HEADER);
}

export async function POST(request: Request) {
  const secret = readBotSecret(request);
  if (!isArenaBotSecretValid(secret)) {
    return NextResponse.json({ ok: false, error: "Invalid bot secret" }, { status: 401 });
  }

  let body: RotateBody = {};
  try {
    body = (await request.json()) as RotateBody;
  } catch {
    body = {};
  }

  const source = body.source?.trim() || "legal_placeholder_bot";

  if (body.force) {
    const { publicState, event } = await runArenaEngineRotation(source);
    return NextResponse.json({ rotated: true, event, ...publicState });
  }

  const result = await runArenaEngineRotationIfDue(source);
  return NextResponse.json({
    rotated: result.rotated,
    event: result.rotated ? result.event : null,
    ...result.publicState
  });
}
