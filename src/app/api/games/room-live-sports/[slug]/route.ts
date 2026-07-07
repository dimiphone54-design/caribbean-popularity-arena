import { NextResponse } from "next/server";
import { fetchRoomLiveSportsFeed } from "@/lib/api-sports-room-feed";
import { getRoomLiveSportsConfig } from "@/lib/room-live-sports-registry";

export const dynamic = "force-dynamic";

type RouteContext = { params: Promise<{ slug: string }> };

export async function GET(_request: Request, context: RouteContext) {
  const { slug } = await context.params;
  const config = getRoomLiveSportsConfig(slug);

  if (!config) {
    return NextResponse.json({ error: "Room has no live sports feed" }, { status: 404 });
  }

  const feed = await fetchRoomLiveSportsFeed(slug);
  if (!feed) {
    return NextResponse.json({
      roomSlug: slug,
      events: [],
      rowPulse: {},
      message: "API-Sports unavailable · using game simulators"
    });
  }

  return NextResponse.json(feed);
}