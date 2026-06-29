import { NextResponse } from "next/server";
import { runArenaEngineRotationIfDue } from "@/lib/arena-engine";

export async function GET() {
  const result = await runArenaEngineRotationIfDue("arena_engine_state_poll");
  return NextResponse.json(result.publicState);
}
