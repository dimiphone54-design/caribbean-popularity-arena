import { NextResponse } from "next/server";
import { loadFreedomDriveLeaderboard, saveFreedomDriveLeaderboardEntry } from "@/lib/freedom-drive/leaderboard-store";

export async function GET() {
  const entries = await loadFreedomDriveLeaderboard(25);
  return NextResponse.json({ ok: true, entries });
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      username?: string;
      country?: string;
      distance_driven?: number;
      top_speed?: number;
      arena_points?: number;
    };

    const username = body.username?.trim().slice(0, 48);
    const country = body.country?.trim().slice(0, 64) || "United Kingdom";
    const distance_driven = Number(body.distance_driven);
    const top_speed = Number(body.top_speed);
    const arena_points = Number(body.arena_points);

    if (!username || username.length < 2) {
      return NextResponse.json({ ok: false, error: "Username required" }, { status: 400 });
    }
    if (!Number.isFinite(distance_driven) || distance_driven < 0 || distance_driven > 1_000_000) {
      return NextResponse.json({ ok: false, error: "Invalid distance" }, { status: 400 });
    }
    if (!Number.isFinite(top_speed) || top_speed < 0 || top_speed > 250) {
      return NextResponse.json({ ok: false, error: "Invalid speed" }, { status: 400 });
    }
    if (!Number.isFinite(arena_points) || arena_points < 0 || arena_points > 5_000_000) {
      return NextResponse.json({ ok: false, error: "Invalid points" }, { status: 400 });
    }

    const result = await saveFreedomDriveLeaderboardEntry({
      username,
      country,
      distance_driven: Math.round(distance_driven),
      top_speed: Math.round(top_speed * 10) / 10,
      arena_points: Math.round(arena_points)
    });

    if (!result.ok) {
      return NextResponse.json({ ok: false, error: "error" in result ? result.error : "Save failed" }, { status: 500 });
    }

    return NextResponse.json({ ok: true, id: result.id, fallback: "fallback" in result ? result.fallback : false });
  } catch {
    return NextResponse.json({ ok: false, error: "Bad request" }, { status: 400 });
  }
}
