/**
 * AI opponent for Block dominoes · simple heuristics, not random.
 * Prefer: doubles early, high-pip plays, keep number variety in hand.
 */

import {
  getLegalMoves,
  isDouble,
  tilePips,
  type DominoState,
  type DominoTile,
  type LegalMove
} from "@/components/games/domino/domino-engine";

function countPipInHand(hand: DominoTile[], pip: number): number {
  let n = 0;
  for (const tile of hand) {
    if (tile.a === pip) n++;
    if (tile.b === pip && tile.a !== tile.b) n++;
  }
  return n;
}

/** Higher score = better move for AI */
function scoreMove(move: LegalMove, hand: DominoTile[], tile: DominoTile): number {
  let score = 0;

  // Prefer high pips off the hand
  score += tilePips(tile) * 3;

  // Prefer doubles early
  if (isDouble(tile)) score += 12;

  // Prefer not exhausting the last copy of a pip (keep variety)
  const remaining = hand.filter((t) => t.id !== tile.id);
  const pipsUsed = new Set([move.leftPip, move.rightPip]);
  for (const p of pipsUsed) {
    const left = countPipInHand(remaining, p);
    if (left === 0) score -= 4;
    else score += 1;
  }

  // Prefer playing toward the side that matches more of remaining hand (slight bias)
  // already encoded via variety above

  return score;
}

/**
 * Choose best legal AI move, or null if none.
 * Caller should draw/pass via engine when null.
 */
export function chooseAiMove(state: DominoState): LegalMove | null {
  const hand = state.aiHand;
  const moves = getLegalMoves(hand, state.chain);
  if (moves.length === 0) return null;

  let best = moves[0];
  let bestScore = -Infinity;

  for (const move of moves) {
    const tile = hand.find((t) => t.id === move.tileId);
    if (!tile) continue;
    const s = scoreMove(move, hand, tile);
    if (s > bestScore) {
      bestScore = s;
      best = move;
    }
  }

  return best;
}
