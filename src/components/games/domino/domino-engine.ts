/**
 * Block dominoes · double-six set · pure logic (no React).
 * Open: player may place any tile first (consistent simple rule).
 */

export type Pip = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export type DominoTile = {
  id: string;
  /** End A (0–6) */
  a: Pip;
  /** End B (0–6) · for doubles a === b */
  b: Pip;
};

/** Tile as placed on the chain · leftPip faces left open, rightPip faces right open */
export type PlacedTile = {
  tile: DominoTile;
  leftPip: Pip;
  rightPip: Pip;
};

export type Side = "left" | "right";

export type LegalMove = {
  tileId: string;
  side: Side;
  /** How the tile sits after play */
  leftPip: Pip;
  rightPip: Pip;
};

export type PlayerId = "player" | "ai";

export type RoundResult =
  | { kind: "domino"; winner: PlayerId }
  | { kind: "blocked"; winner: PlayerId; playerPips: number; aiPips: number };

export type DominoState = {
  playerHand: DominoTile[];
  aiHand: DominoTile[];
  boneyard: DominoTile[];
  chain: PlacedTile[];
  turn: PlayerId;
  /** null until first tile */
  result: RoundResult | null;
  /** true after first move */
  started: boolean;
  lastAction: string | null;
};

function pip(n: number): Pip {
  return Math.max(0, Math.min(6, n)) as Pip;
}

/** Double-six set · 28 bones */
export function buildDoubleSixDeck(): DominoTile[] {
  const tiles: DominoTile[] = [];
  for (let a = 0; a <= 6; a++) {
    for (let b = a; b <= 6; b++) {
      tiles.push({ id: `${a}-${b}`, a: pip(a), b: pip(b) });
    }
  }
  return tiles;
}

export function shuffleTiles<T>(items: T[], rng: () => number = Math.random): T[] {
  const next = [...items];
  for (let i = next.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [next[i], next[j]] = [next[j], next[i]];
  }
  return next;
}

export function tilePips(tile: DominoTile): number {
  return tile.a + tile.b;
}

export function handPips(hand: DominoTile[]): number {
  return hand.reduce((sum, tile) => sum + tilePips(tile), 0);
}

export function isDouble(tile: DominoTile): boolean {
  return tile.a === tile.b;
}

export function openEnds(chain: PlacedTile[]): { left: Pip | null; right: Pip | null } {
  if (chain.length === 0) return { left: null, right: null };
  return {
    left: chain[0].leftPip,
    right: chain[chain.length - 1].rightPip
  };
}

/**
 * All legal placements for a hand.
 * Empty chain → any tile (open freely on "right" for bookkeeping).
 */
export function getLegalMoves(hand: DominoTile[], chain: PlacedTile[]): LegalMove[] {
  if (chain.length === 0) {
    return hand.map((tile) => ({
      tileId: tile.id,
      side: "right" as const,
      leftPip: tile.a,
      rightPip: tile.b
    }));
  }

  const { left, right } = openEnds(chain);
  if (left === null || right === null) return [];

  const moves: LegalMove[] = [];

  for (const tile of hand) {
    // Match left open end · new tile's right must equal left
    if (tile.a === left) {
      moves.push({ tileId: tile.id, side: "left", leftPip: tile.b, rightPip: tile.a });
    }
    if (tile.b === left && tile.a !== tile.b) {
      moves.push({ tileId: tile.id, side: "left", leftPip: tile.a, rightPip: tile.b });
    }
    // Match right open end · new tile's left must equal right
    if (tile.a === right) {
      moves.push({ tileId: tile.id, side: "right", leftPip: tile.a, rightPip: tile.b });
    }
    if (tile.b === right && tile.a !== tile.b) {
      moves.push({ tileId: tile.id, side: "right", leftPip: tile.b, rightPip: tile.a });
    }
  }

  // Dedupe identical orientations (doubles only one orientation per side)
  const seen = new Set<string>();
  return moves.filter((move) => {
    const key = `${move.tileId}:${move.side}:${move.leftPip}:${move.rightPip}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

export function dealNewRound(rng: () => number = Math.random): DominoState {
  const deck = shuffleTiles(buildDoubleSixDeck(), rng);
  const playerHand = deck.slice(0, 7);
  const aiHand = deck.slice(7, 14);
  const boneyard = deck.slice(14);

  return {
    playerHand,
    aiHand,
    boneyard,
    chain: [],
    turn: "player",
    result: null,
    started: false,
    lastAction: null
  };
}

function takeFromHand(hand: DominoTile[], tileId: string): { next: DominoTile[]; tile: DominoTile | null } {
  const idx = hand.findIndex((t) => t.id === tileId);
  if (idx < 0) return { next: hand, tile: null };
  const tile = hand[idx];
  return { next: [...hand.slice(0, idx), ...hand.slice(idx + 1)], tile };
}

function attachMove(chain: PlacedTile[], move: LegalMove, tile: DominoTile): PlacedTile[] {
  const placed: PlacedTile = {
    tile,
    leftPip: move.leftPip,
    rightPip: move.rightPip
  };
  if (chain.length === 0) return [placed];
  if (move.side === "left") return [placed, ...chain];
  return [...chain, placed];
}

function resolveIfOver(state: DominoState): DominoState {
  if (state.playerHand.length === 0) {
    return {
      ...state,
      result: { kind: "domino", winner: "player" },
      lastAction: "player_domino"
    };
  }
  if (state.aiHand.length === 0) {
    return {
      ...state,
      result: { kind: "domino", winner: "ai" },
      lastAction: "ai_domino"
    };
  }

  const playerMoves = getLegalMoves(state.playerHand, state.chain);
  const aiMoves = getLegalMoves(state.aiHand, state.chain);
  const canDraw = state.boneyard.length > 0;

  if (
    playerMoves.length === 0 &&
    aiMoves.length === 0 &&
    !canDraw
  ) {
    const playerPips = handPips(state.playerHand);
    const aiPips = handPips(state.aiHand);
    const winner: PlayerId = playerPips <= aiPips ? "player" : "ai";
    return {
      ...state,
      result: { kind: "blocked", winner, playerPips, aiPips },
      lastAction: "blocked"
    };
  }

  return state;
}

/** Play a legal move for the current turn player */
export function playMove(state: DominoState, move: LegalMove): DominoState {
  if (state.result) return state;

  const handKey = state.turn === "player" ? "playerHand" : "aiHand";
  const hand = state[handKey];
  const legal = getLegalMoves(hand, state.chain);
  const ok = legal.some(
    (m) =>
      m.tileId === move.tileId &&
      m.side === move.side &&
      m.leftPip === move.leftPip &&
      m.rightPip === move.rightPip
  );
  if (!ok) return state;

  const { next, tile } = takeFromHand(hand, move.tileId);
  if (!tile) return state;

  const chain = attachMove(state.chain, move, tile);
  const nextState: DominoState = {
    ...state,
    [handKey]: next,
    chain,
    started: true,
    turn: state.turn === "player" ? "ai" : "player",
    lastAction: `${state.turn}_play_${move.tileId}_${move.side}`
  };

  return resolveIfOver(nextState);
}

/** Draw one from boneyard into current player's hand (if legal to draw) */
export function drawTile(state: DominoState): DominoState {
  if (state.result || state.boneyard.length === 0) return state;

  const handKey = state.turn === "player" ? "playerHand" : "aiHand";
  const hand = state[handKey];
  const legal = getLegalMoves(hand, state.chain);
  // Only draw when no legal play
  if (legal.length > 0) return state;

  const [drawn, ...rest] = state.boneyard;
  const nextState: DominoState = {
    ...state,
    boneyard: rest,
    [handKey]: [...hand, drawn],
    lastAction: `${state.turn}_draw_${drawn.id}`
  };
  return nextState;
}

/**
 * Pass turn when no legal moves and boneyard empty.
 * After pass, check blocked.
 */
export function passTurn(state: DominoState): DominoState {
  if (state.result) return state;
  const hand = state.turn === "player" ? state.playerHand : state.aiHand;
  const legal = getLegalMoves(hand, state.chain);
  if (legal.length > 0 || state.boneyard.length > 0) return state;

  const nextState: DominoState = {
    ...state,
    turn: state.turn === "player" ? "ai" : "player",
    lastAction: `${state.turn}_pass`
  };
  return resolveIfOver(nextState);
}

/** Keep drawing for current player until they can play or boneyard empty */
export function drawUntilCanPlay(state: DominoState): DominoState {
  let current = state;
  let guard = 20;
  while (guard-- > 0) {
    if (current.result) return current;
    const hand = current.turn === "player" ? current.playerHand : current.aiHand;
    const legal = getLegalMoves(hand, current.chain);
    if (legal.length > 0) return current;
    if (current.boneyard.length === 0) return current;
    current = drawTile(current);
  }
  return current;
}

export function findMoveForTile(
  hand: DominoTile[],
  chain: PlacedTile[],
  tileId: string,
  preferredSide?: Side
): LegalMove | null {
  const moves = getLegalMoves(hand, chain).filter((m) => m.tileId === tileId);
  if (moves.length === 0) return null;
  if (preferredSide) {
    const sideHit = moves.find((m) => m.side === preferredSide);
    if (sideHit) return sideHit;
  }
  return moves[0];
}
