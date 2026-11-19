import { NextResponse } from "next/server";
import { clearArenaOwnerSessionCookie } from "@/lib/auth/arena-owner-session";

export async function POST() {
  const response = NextResponse.json({ ok: true });
  response.headers.append("Set-Cookie", clearArenaOwnerSessionCookie());
  response.headers.set("Cache-Control", "no-store");
  return response;
}
