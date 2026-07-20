import { NextResponse } from "next/server";
import { listMembers } from "@/lib/marketplace/members-store";

export async function GET() {
  try {
    const members = await listMembers();
    return NextResponse.json({ ok: true, members });
  } catch {
    return NextResponse.json({ ok: false, error: "Failed to load members" }, { status: 500 });
  }
}