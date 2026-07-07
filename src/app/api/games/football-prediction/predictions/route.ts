import { NextResponse } from "next/server";
import type { FootballPredictionInput } from "@/lib/football-prediction-arena";

type PredictionBody = FootballPredictionInput & {
  user_id?: string;
  username?: string;
  country?: string;
  match_id?: string;
};

export async function POST(request: Request) {
  let body: PredictionBody;
  try {
    body = (await request.json()) as PredictionBody;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const userId = body.user_id?.trim();
  const matchId = body.match_id?.trim();
  if (!userId || !matchId) {
    return NextResponse.json({ error: "Missing user_id or match_id" }, { status: 400 });
  }

  const prediction = {
    id: `srv-${matchId}-${Date.now()}`,
    user_id: userId,
    username: body.username?.trim() || "Player",
    country: body.country?.trim() || "global",
    match_id: matchId,
    predicted_winner: body.predicted_winner,
    predicted_score_home: Number(body.predicted_score_home) || 0,
    predicted_score_away: Number(body.predicted_score_away) || 0,
    first_goal_scorer: body.first_goal_scorer?.trim() ?? "",
    total_goals: Number(body.total_goals) || 0,
    clean_sheet: Boolean(body.clean_sheet),
    points_awarded: 0,
    created_at: new Date().toISOString(),
    locked: false
  };

  return NextResponse.json({ ok: true, prediction });
}