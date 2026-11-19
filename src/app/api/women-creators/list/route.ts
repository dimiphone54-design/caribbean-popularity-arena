import { NextResponse } from "next/server";
import { hasArenaOwnerSession } from "@/lib/auth/arena-owner-session";
import {
  loadArenaWomenCreators,
  WOMEN_CREATOR_LANE_LABELS
} from "@/lib/arena-women-creator-registry";

export const runtime = "nodejs";

export async function GET(request: Request) {
  if (!hasArenaOwnerSession(request)) {
    return NextResponse.json(
      { ok: false, error: "Owner authentication required" },
      {
        status: 401,
        headers: { "Cache-Control": "no-store" }
      }
    );
  }

  try {
    const records = await loadArenaWomenCreators();

    return NextResponse.json(
      {
        ok: true,
        count: records.length,
        creators: records.map((record) => ({
          id: record.id,
          displayName: record.displayName,
          age: record.age,
          country: record.country,
          islandCode: record.islandCode,
          lane: record.lane,
          laneTitle: WOMEN_CREATOR_LANE_LABELS[record.lane].title,
          planDescription: record.planDescription,
          slotId: record.slotId,
          slotRank: record.slotRank,
          category: record.category,
          status: record.status,
          createdAt: record.createdAt,
          updatedAt: record.updatedAt
        }))
      },
      { headers: { "Cache-Control": "no-store" } }
    );
  } catch {
    return NextResponse.json(
      { ok: false, error: "Failed to load creator registry" },
      { status: 500, headers: { "Cache-Control": "no-store" } }
    );
  }
}
