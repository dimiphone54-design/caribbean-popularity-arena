import { NextResponse } from "next/server";
import {
  buildNavSportsRecapFeed,
  type NavSportsRecapMode,
  type NavSportsRecapSportFilter
} from "@/lib/nav-sports-recap-feed";

export const dynamic = "force-dynamic";

function parseSportFilter(value: string | null): NavSportsRecapSportFilter {
  if (!value || value === "all") return "all";
  if (value === "basketball") return "basketball";
  return value as NavSportsRecapSportFilter;
}

function parseMode(value: string | null, sport: NavSportsRecapSportFilter): NavSportsRecapMode {
  if (value === "pitch-slideshow") return "pitch-slideshow";
  if (value === "highlights") return "highlights";
  if (sport === "football") return "pitch-slideshow";
  if (sport !== "all") return "highlights";
  return "default";
}

export async function GET(request: Request) {
  const params = new URL(request.url).searchParams;
  const sport = parseSportFilter(params.get("sport"));
  const mode = parseMode(params.get("mode"), sport);
  const feed = await buildNavSportsRecapFeed(new Date(), sport, mode);
  return NextResponse.json(feed);
}