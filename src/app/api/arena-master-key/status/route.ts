import { NextResponse } from "next/server";
import { hasArenaOwnerSession } from "@/lib/auth/arena-owner-session";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const authenticated = hasArenaOwnerSession(request);
  return NextResponse.json(
    { ok: true, authenticated },
    { headers: { "Cache-Control": "no-store" } }
  );
}
