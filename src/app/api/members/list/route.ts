import { NextResponse } from "next/server";
import { hasArenaOwnerSession } from "@/lib/auth/arena-owner-session";
import { listMembers } from "@/lib/marketplace/members-store";

export const runtime = "nodejs";

export async function GET(request: Request) {
  if (!hasArenaOwnerSession(request)) {
    return NextResponse.json(
      { ok: false, error: "Owner authentication required" },
      { status: 401, headers: { "Cache-Control": "no-store" } }
    );
  }

  try {
    const members = await listMembers();

    return NextResponse.json(
      { ok: true, count: members.length, members },
      { headers: { "Cache-Control": "no-store" } }
    );
  } catch (error) {
    console.error("Owner member registry read failed:", error);

    return NextResponse.json(
      { ok: false, error: "Failed to load member registry" },
      { status: 500, headers: { "Cache-Control": "no-store" } }
    );
  }
}
