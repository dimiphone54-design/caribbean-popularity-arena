import { NextResponse } from "next/server";
import {
  registerArenaWomenCreator,
  type WomenCreatorLane
} from "@/lib/arena-women-creator-registry";

const VALID_LANES: WomenCreatorLane[] = ["dropshipping", "live-culture", "live-specialty"];

export async function POST(request: Request) {
  let body: {
    displayName?: string;
    age?: number;
    country?: string;
    islandCode?: string;
    lane?: string;
    planDescription?: string;
    slotId?: number;
    slotRank?: number;
    category?: string;
  } = {};

  try {
    body = (await request.json()) as typeof body;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request body" }, { status: 400 });
  }

  const displayName = body.displayName?.trim() ?? "";
  const age = body.age ?? 0;
  const country = body.country?.trim() ?? "";
  const islandCode = body.islandCode?.trim() ?? "";
  const lane = body.lane as WomenCreatorLane;
  const planDescription = body.planDescription?.trim() ?? "";

  if (displayName.length < 2 || age < 18 || country.length < 2 || !VALID_LANES.includes(lane)) {
    return NextResponse.json({ ok: false, error: "Invalid woman creator application" }, { status: 400 });
  }

  if (planDescription.length < 8) {
    return NextResponse.json(
      { ok: false, error: "Describe your lane plan (min 8 characters)" },
      { status: 400 }
    );
  }

  const record = await registerArenaWomenCreator({
    displayName,
    age,
    country,
    islandCode,
    lane,
    planDescription,
    slotId: body.slotId,
    slotRank: body.slotRank,
    category: body.category
  });

  return NextResponse.json({ ok: true, id: record.id, status: record.status });
}
