import { NextResponse } from "next/server";
import { isOwnerOperatorModeEnabled } from "@/lib/command-center-access";

export async function POST(request: Request) {
  if (!isOwnerOperatorModeEnabled()) {
    return NextResponse.json({ ok: false, error: "Owner operator mode disabled" }, { status: 403 });
  }

  const masterKey = process.env.ARENA_MASTER_KEY?.trim();
  if (!masterKey) {
    return NextResponse.json(
      { ok: false, error: "Master key not configured · set ARENA_MASTER_KEY in .env.local" },
      { status: 503 }
    );
  }

  let key = "";
  try {
    const body = (await request.json()) as { key?: string };
    key = body.key?.trim() ?? "";
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request" }, { status: 400 });
  }

  if (key !== masterKey) {
    return NextResponse.json({ ok: false, error: "Invalid master key" }, { status: 401 });
  }

  return NextResponse.json({ ok: true, message: "Master key accepted · owner bypass active" });
}
