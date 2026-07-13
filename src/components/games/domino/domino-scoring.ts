/**
 * Copa Dominó Ecuatoriano · transparent points for beating the AI.
 * Status only — no cash, no paid entry.
 */

import type { RoundResult } from "@/components/games/domino/domino-engine";

export type ScoreBreakdown = {
  points: number;
  /** Human-readable Spanish lines */
  lines: string[];
  winKind: "domino" | "blocked" | "loss";
};

/** Base for emptying hand (¡Dominó!) */
export const SCORE_DOMINO_BASE = 100;
/** Per pip left in the AI hand when you Dominó */
export const SCORE_DOMINO_PIP_BONUS = 5;

/** Base for winning a blocked board by lower pips */
export const SCORE_BLOCKED_BASE = 50;
/** Per pip you beat the AI by on a blocked board */
export const SCORE_BLOCKED_MARGIN = 3;

/**
 * Points earned by the human player from a finished round.
 * Losses award 0 (climb by winning).
 */
export function scoreRoundForPlayer(result: RoundResult): ScoreBreakdown {
  if (result.winner !== "player") {
    return {
      points: 0,
      winKind: "loss",
      lines: ["Sin puntos · gana la próxima"]
    };
  }

  if (result.kind === "domino") {
    // Opponent hand pips aren't on RoundResult for domino — use 0 if unknown.
    // Callers can pass enhanced result; we recompute from optional field.
    const oppPips = "aiPips" in result && typeof (result as { aiPips?: number }).aiPips === "number"
      ? (result as { aiPips: number }).aiPips
      : 0;
    const bonus = oppPips * SCORE_DOMINO_PIP_BONUS;
    const points = SCORE_DOMINO_BASE + bonus;
    return {
      points,
      winKind: "domino",
      lines: [
        `¡Dominó! +${SCORE_DOMINO_BASE}`,
        oppPips > 0 ? `Pips IA restantes ×${SCORE_DOMINO_PIP_BONUS} = +${bonus}` : "IA sin pips restantes",
        `Total +${points} puntos`
      ]
    };
  }

  const margin = Math.max(0, result.aiPips - result.playerPips);
  const bonus = margin * SCORE_BLOCKED_MARGIN;
  const points = SCORE_BLOCKED_BASE + bonus;
  return {
    points,
    winKind: "blocked",
    lines: [
      `Bloqueo ganado +${SCORE_BLOCKED_BASE}`,
      margin > 0
        ? `Margen de pips ${margin} ×${SCORE_BLOCKED_MARGIN} = +${bonus}`
        : "Empate en pips (tú ganas)",
      `Total +${points} puntos`
    ]
  };
}

/** Enrich ¡Dominó! result with AI remaining pips for scoring */
export function scoreFromStateResult(
  result: RoundResult,
  aiHandPipsWhenPlayerDominos: number
): ScoreBreakdown {
  if (result.kind === "domino" && result.winner === "player") {
    const bonus = aiHandPipsWhenPlayerDominos * SCORE_DOMINO_PIP_BONUS;
    const points = SCORE_DOMINO_BASE + bonus;
    return {
      points,
      winKind: "domino",
      lines: [
        `¡Dominó! +${SCORE_DOMINO_BASE}`,
        `Pips IA restantes ${aiHandPipsWhenPlayerDominos} ×${SCORE_DOMINO_PIP_BONUS} = +${bonus}`,
        `Total +${points} puntos`
      ]
    };
  }
  return scoreRoundForPlayer(result);
}
