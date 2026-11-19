import { timingSafeEqual } from "node:crypto";
import { NextResponse } from "next/server";
import { createArenaOwnerSessionCookie } from "@/lib/auth/arena-owner-session";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const masterKey = process.env.ARENA_MASTER_KEY?.trim();

  if (!masterKey) {
    return NextResponse.json({ ok: false, error: "Master key is not configured" }, { status: 503 });
  }

  let submitted = "";
  try {
    const body = (await request.json()) as { key?: string };
    submitted = typeof body.key === "string" ? body.key.trim() : "";
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request" }, { status: 400 });
  }

  const expected = Buffer.from(masterKey, "utf8");
  const actual = Buffer.from(submitted, "utf8");

  if (!submitted || expected.length !== actual.length || !timingSafeEqual(expected, actual)) {
    return NextResponse.json({ ok: false, error: "Invalid master key" }, { status: 401 });
  }

  try {
    const response = NextResponse.json({ ok: true, message: "Owner session established" });
    response.headers.append("Set-Cookie", createArenaOwnerSessionCookie());
    response.headers.set("Cache-Control", "no-store");
    return response;
  } catch {
    return NextResponse.json({ ok: false, error: "Owner session is not configured on the server" }, { status: 503 });
  }
}
