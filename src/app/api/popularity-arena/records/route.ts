import { NextResponse } from "next/server";
import {
  getSeedPopularityDropshipSales,
  getSeedPopularityMatchScores,
  getSeedPopularitySportsRecords,
  mergePopularityDropshipSales
} from "@/lib/popularity-arena-records";

/** Popularity records · seed display only · no paid order pipeline */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const roomSlug = searchParams.get("roomSlug")?.trim() || "all";

  const seedSales = getSeedPopularityDropshipSales(roomSlug === "all" ? undefined : roomSlug);
  const matchScores = getSeedPopularityMatchScores(roomSlug === "all" ? undefined : roomSlug);
  const sportsRecords = getSeedPopularitySportsRecords(roomSlug === "all" ? undefined : roomSlug);
  const dropshipSales = mergePopularityDropshipSales(seedSales, []).slice(0, 24);

  return NextResponse.json({
    ok: true,
    roomSlug,
    matchScores,
    sportsRecords,
    dropshipSales
  });
}
