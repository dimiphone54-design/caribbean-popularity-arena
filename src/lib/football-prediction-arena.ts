/** Football Prediction Arena · Game Module #4 · Caribbean Freedom Arena */

export type FootballCompetitionId =
  | "premier-league"
  | "champions-league"
  | "europa-league"
  | "fa-cup"
  | "international"
  | "world-cup"
  | "euro";

export type FootballMatchStatus = "scheduled" | "live" | "finished";

export type FootballPredictedWinner = "home" | "away" | "draw";

export type FootballMatch = {
  id: string;
  competition: FootballCompetitionId;
  competitionLabel: string;
  league: string;
  homeTeam: string;
  awayTeam: string;
  homeFlag: string;
  awayFlag: string;
  /** Club crest / flag asset in public folder */
  homeCrestUrl?: string;
  awayCrestUrl?: string;
  kickoff: string;
  status: FootballMatchStatus;
  homeScore?: number;
  awayScore?: number;
  firstGoalScorer?: string;
  homeScorers?: string[];
  awayScorers?: string[];
};

export type FootballPredictionInput = {
  predicted_winner: FootballPredictedWinner;
  predicted_score_home: number;
  predicted_score_away: number;
  first_goal_scorer: string;
  total_goals: number;
  clean_sheet: boolean;
};

export type FootballPredictionRow = FootballPredictionInput & {
  id: string;
  user_id: string;
  username: string;
  country: string;
  match_id: string;
  points_awarded: number;
  created_at: string;
  locked: boolean;
};

export type FootballRankingRow = {
  id: string;
  user_id: string;
  username: string;
  country: string;
  total_points: number;
  weekly_rank: number;
  monthly_rank: number;
  global_rank: number;
  updated_at: string;
};

export type FootballLeaderboardKind = "global" | "country" | "league" | "monthly" | "season";

export const FOOTBALL_PREDICTION_POINTS = {
  matchWinner: 10,
  draw: 15,
  correctScore: 50,
  firstGoalScorer: 25,
  totalGoals: 15,
  perfectBonus: 100
} as const;

export const FOOTBALL_COMPETITIONS: Array<{ id: FootballCompetitionId; label: string }> = [
  { id: "premier-league", label: "Premier League" },
  { id: "champions-league", label: "Champions League" },
  { id: "europa-league", label: "Europa League" },
  { id: "fa-cup", label: "FA Cup" },
  { id: "international", label: "International" },
  { id: "world-cup", label: "World Cup" },
  { id: "euro", label: "European Championships" }
];

export function isMatchLocked(match: FootballMatch, nowMs = Date.now()) {
  if (match.status !== "scheduled") return true;
  return new Date(match.kickoff).getTime() <= nowMs;
}

export function calculateFootballPredictionPoints(
  prediction: FootballPredictionInput,
  match: FootballMatch
): number {
  if (match.status !== "finished" || match.homeScore === undefined || match.awayScore === undefined) {
    return 0;
  }

  const hs = match.homeScore;
  const as = match.awayScore;
  const actualWinner: FootballPredictedWinner =
    hs === as ? "draw" : hs > as ? "home" : "away";
  const actualTotal = hs + as;
  const actualScorer = match.firstGoalScorer?.trim().toLowerCase() ?? "";
  const predictedScorer = prediction.first_goal_scorer.trim().toLowerCase();

  let points = 0;
  let winnerCorrect = false;
  let scoreCorrect = false;
  let scorerCorrect = false;
  let totalGoalsCorrect = false;

  if (prediction.predicted_winner === "draw" && actualWinner === "draw") {
    points += FOOTBALL_PREDICTION_POINTS.draw;
    winnerCorrect = true;
  } else if (prediction.predicted_winner === actualWinner && actualWinner !== "draw") {
    points += FOOTBALL_PREDICTION_POINTS.matchWinner;
    winnerCorrect = true;
  }

  if (
    prediction.predicted_score_home === hs &&
    prediction.predicted_score_away === as
  ) {
    points += FOOTBALL_PREDICTION_POINTS.correctScore;
    scoreCorrect = true;
  }

  if (predictedScorer && actualScorer && predictedScorer === actualScorer) {
    points += FOOTBALL_PREDICTION_POINTS.firstGoalScorer;
    scorerCorrect = true;
  }

  if (prediction.total_goals === actualTotal) {
    points += FOOTBALL_PREDICTION_POINTS.totalGoals;
    totalGoalsCorrect = true;
  }

  const cleanSheetActual =
    actualWinner === "home" ? as === 0 : actualWinner === "away" ? hs === 0 : false;
  if (prediction.clean_sheet && cleanSheetActual) {
    points += 10;
  }

  if (winnerCorrect && scoreCorrect && scorerCorrect && totalGoalsCorrect) {
    points += FOOTBALL_PREDICTION_POINTS.perfectBonus;
  }

  return points;
}

export function formatKickoffCountdown(kickoffIso: string, nowMs = Date.now()) {
  const diff = new Date(kickoffIso).getTime() - nowMs;
  if (diff <= 0) return "Locked · kickoff passed";
  const hours = Math.floor(diff / 3600000);
  const mins = Math.floor((diff % 3600000) / 60000);
  if (hours >= 48) return `${Math.floor(hours / 24)}d ${hours % 24}h to lock`;
  if (hours > 0) return `${hours}h ${mins}m to lock`;
  return `${mins}m to lock`;
}
