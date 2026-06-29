import { NextResponse } from "next/server";
import { loadArenaWomenCreators, WOMEN_CREATOR_LANE_LABELS } from "@/lib/arena-women-creator-registry";
import { isOwnerOperatorModeEnabled } from "@/lib/command-center-access";

export async function GET() {
  if (!isOwnerOperatorModeEnabled()) {
    return NextResponse.json({ ok: false, error: "Not authorized" }, { status: 403 });
  }

  const records = await loadArenaWomenCreators();

  return NextResponse.json({
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
  });
}
