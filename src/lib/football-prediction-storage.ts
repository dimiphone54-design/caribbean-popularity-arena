import {
  calculateFootballPredictionPoints,
  type FootballLeaderboardKind,
  type FootballPredictionRow,
  type FootballRankingRow
} from "@/lib/football-prediction-arena";
import { getDemoFootballFixtures } from "@/lib/football-prediction-fixtures";

const predictionsKey = "cpa_football_predictions";
const rankingsKey = "cpa_football_rankings";

export function readLocalFootballPredictions(): FootballPredictionRow[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(predictionsKey);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as FootballPredictionRow[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function writeLocalFootballPredictions(rows: FootballPredictionRow[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(predictionsKey, JSON.stringify(rows.slice(0, 500)));
}

export function upsertLocalFootballPrediction(row: FootballPredictionRow) {
  const existing = readLocalFootballPredictions();
  const without = existing.filter((p) => p.user_id !== row.user_id || p.match_id !== row.match_id);
  writeLocalFootballPredictions([row, ...without]);
}

export function scoreLocalPredictions(): FootballPredictionRow[] {
  const fixtures = getDemoFootballFixtures();
  const predictions = readLocalFootballPredictions();

  const scored = predictions.map((prediction) => {
    const match = fixtures.find((m) => m.id === prediction.match_id);
    if (!match || match.status !== "finished") return prediction;
    const points = calculateFootballPredictionPoints(prediction, match);
    return { ...prediction, points_awarded: points, locked: true };
  });

  writeLocalFootballPredictions(scored);
  return scored;
}

export function buildLocalFootballRankings(predictions: FootballPredictionRow[]): FootballRankingRow[] {
  const byUser = new Map<string, FootballRankingRow>();

  for (const p of predictions) {
    const current = byUser.get(p.user_id) ?? {
      id: p.user_id,
      user_id: p.user_id,
      username: p.username,
      country: p.country,
      total_points: 0,
      weekly_rank: 0,
      monthly_rank: 0,
      global_rank: 0,
      updated_at: new Date().toISOString()
    };
    current.total_points += p.points_awarded;
    byUser.set(p.user_id, current);
  }

  const sorted = [...byUser.values()].sort((a, b) => b.total_points - a.total_points);
  return sorted.map((row, index) => ({
    ...row,
    global_rank: index + 1,
    weekly_rank: index + 1,
    monthly_rank: index + 1,
    updated_at: new Date().toISOString()
  }));
}

export function filterFootballLeaderboard(
  rankings: FootballRankingRow[],
  kind: FootballLeaderboardKind,
  country?: string
): FootballRankingRow[] {
  let rows = rankings;
  if (kind === "country" && country) {
    rows = rows.filter((r) => r.country === country);
  }
  return rows.slice(0, 25);
}

export function readLocalFootballRankings(): FootballRankingRow[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(rankingsKey);
    if (raw) {
      const parsed = JSON.parse(raw) as FootballRankingRow[];
      if (Array.isArray(parsed) && parsed.length) return parsed;
    }
  } catch {
    /* fall through */
  }
  const predictions = scoreLocalPredictions();
  const rankings = buildLocalFootballRankings(predictions);
  writeLocalFootballRankings(rankings);
  return rankings;
}

export function writeLocalFootballRankings(rows: FootballRankingRow[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(rankingsKey, JSON.stringify(rows.slice(0, 200)));
}

export function computeUserFootballStats(userId: string, predictions: FootballPredictionRow[], rankings: FootballRankingRow[]) {
  const mine = predictions.filter((p) => p.user_id === userId);
  const scored = mine.filter((p) => p.points_awarded > 0);
  const total = mine.length;
  const correct = scored.length;
  const accuracy = total > 0 ? Math.round((correct / total) * 100) : 0;
  const myRank = rankings.find((r) => r.user_id === userId);
  const countryRanks = rankings.filter((r) => r.country === myRank?.country);
  const countryRank = countryRanks.findIndex((r) => r.user_id === userId) + 1;

  return {
    totalPredictions: total,
    correctPredictions: correct,
    accuracy,
    totalPoints: myRank?.total_points ?? 0,
    globalRank: myRank?.global_rank ?? 0,
    countryRank: countryRank || 0,
    championshipTitles: myRank && myRank.global_rank <= 3 ? 1 : 0
  };
}
