import { NextResponse } from "next/server";
import { clearNavLiveSportsCache, fetchNavLiveSportsFeed } from "@/lib/api-sports-nav-feed";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  if (new URL(request.url).searchParams.get("refresh") === "1") {
    clearNavLiveSportsCache();
  }
  const feed = await fetchNavLiveSportsFeed();
  return NextResponse.json(feed);
}