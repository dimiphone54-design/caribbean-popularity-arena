import { NextResponse } from "next/server";
import { fetchApiSportsFootballFixtures, isApiSportsConfigured } from "@/lib/api-sports-football";
import { getDemoFootballFixtures } from "@/lib/football-prediction-fixtures";

export const dynamic = "force-dynamic";

export async function GET() {
  if (isApiSportsConfigured()) {
    try {
      const matches = await fetchApiSportsFootballFixtures();
      if (matches.length > 0) {
        const liveCount = matches.filter((match) => match.status === "live").length;
        return NextResponse.json({
          source: "api-sports",
          liveCount,
          matches
        });
      }
    } catch {
      /* fall through to demo */
    }
  }

  const matches = getDemoFootballFixtures();
  return NextResponse.json({
    source: "demo",
    liveCount: matches.filter((match) => match.status === "live").length,
    matches
  });
}