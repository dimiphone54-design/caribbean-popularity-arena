"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { chooseAiMove } from "@/components/games/domino/domino-ai";
import {
  DEFAULT_DOMINO_THEME,
  DOMINO_AI_THINK_MS,
  type DominoTheme
} from "@/components/games/domino/domino-config";
import {
  dealNewRound,
  drawUntilCanPlay,
  findMoveForTile,
  getLegalMoves,
  handPips,
  openEnds,
  passTurn,
  playMove,
  type DominoState,
  type DominoTile,
  type LegalMove,
  type Pip
} from "@/components/games/domino/domino-engine";
import { scoreFromStateResult } from "@/components/games/domino/domino-scoring";
import { DominoTournamentPanel } from "@/components/games/domino/domino-tournament-panel";
import { awardDominoPoints } from "@/components/games/domino/domino-tournament-store";
import "@/components/games/domino/domino-styles.css";

type DominoGameProps = {
  theme?: DominoTheme;
  className?: string;
};

/** Classic 3×3 pip layout · true = draw pip */
const PIP_LAYOUT: Record<Pip, boolean[][]> = {
  0: [
    [false, false, false],
    [false, false, false],
    [false, false, false]
  ],
  1: [
    [false, false, false],
    [false, true, false],
    [false, false, false]
  ],
  2: [
    [true, false, false],
    [false, false, false],
    [false, false, true]
  ],
  3: [
    [true, false, false],
    [false, true, false],
    [false, false, true]
  ],
  4: [
    [true, false, true],
    [false, false, false],
    [true, false, true]
  ],
  5: [
    [true, false, true],
    [false, true, false],
    [true, false, true]
  ],
  6: [
    [true, false, true],
    [true, false, true],
    [true, false, true]
  ]
};

function PipFace({ value }: { value: Pip }) {
  const grid = PIP_LAYOUT[value];
  return (
    <div className="domino-pips" aria-hidden="true">
      {grid.flatMap((row, ri) =>
        row.map((on, ci) => (
          <span key={`${ri}-${ci}`} className={`domino-pip${on ? " is-on" : ""}`} />
        ))
      )}
    </div>
  );
}

function DominoBone({
  tile,
  orientation = "vertical",
  leftPip,
  rightPip,
  faceDown = false,
  dimmed = false,
  playable = false,
  onClick,
  size = "hand"
}: {
  tile?: DominoTile;
  orientation?: "vertical" | "horizontal";
  /** When placed on chain */
  leftPip?: Pip;
  rightPip?: Pip;
  faceDown?: boolean;
  dimmed?: boolean;
  playable?: boolean;
  onClick?: () => void;
  size?: "hand" | "chain" | "mini";
}) {
  const top = leftPip ?? tile?.a ?? 0;
  const bottom = rightPip ?? tile?.b ?? 0;
  const horizontal = orientation === "horizontal";

  const className = [
    "domino-bone",
    horizontal ? "domino-bone--horizontal" : "",
    size === "chain" ? "domino-bone--chain" : "",
    size === "hand" ? "domino-bone--hand" : "",
    faceDown ? "domino-bone--face-down" : "",
    dimmed ? "is-dimmed" : "",
    playable ? "is-playable" : ""
  ]
    .filter(Boolean)
    .join(" ");

  const label = faceDown
    ? "Ficha oculta"
    : `Ficha ${top}-${bottom}`;

  if (onClick) {
    return (
      <button
        type="button"
        className={className}
        onClick={onClick}
        disabled={dimmed}
        aria-label={label}
        aria-disabled={dimmed}
      >
        {faceDown ? (
          <>
            <span className="domino-half" />
            <span className="domino-half" />
          </>
        ) : (
          <>
            <span className="domino-half">
              <PipFace value={top} />
            </span>
            <span className="domino-half">
              <PipFace value={bottom} />
            </span>
          </>
        )}
      </button>
    );
  }

  return (
    <div className={className} aria-label={label} role="img">
      {faceDown ? (
        <>
          <span className="domino-half" />
          <span className="domino-half" />
        </>
      ) : (
        <>
          <span className="domino-half">
            <PipFace value={top} />
          </span>
          <span className="domino-half">
            <PipFace value={bottom} />
          </span>
        </>
      )}
    </div>
  );
}

function resultCopy(state: DominoState, theme: DominoTheme): { title: string; detail: string } {
  const L = theme.locale;
  if (!state.result) return { title: "", detail: "" };
  if (state.result.kind === "domino") {
    return state.result.winner === "player"
      ? { title: L.youWinDomino, detail: L.roundOver }
      : { title: L.aiWinsDomino, detail: L.roundOver };
  }
  const { playerPips, aiPips, winner } = state.result;
  const detail = `${L.pipTotal}: tú ${playerPips} · IA ${aiPips}`;
  return winner === "player"
    ? { title: L.youWinBlocked, detail }
    : { title: L.aiWinsBlocked, detail };
}

/** Dominó Ecuatoriano · Block dominoes vs AI · original CFA game */
export function DominoGame({ theme = DEFAULT_DOMINO_THEME, className = "" }: DominoGameProps) {
  const L = theme.locale;
  const [state, setState] = useState<DominoState>(() => dealNewRound());
  const [aiBusy, setAiBusy] = useState(false);
  const [boardRefresh, setBoardRefresh] = useState(0);
  const [lastPoints, setLastPoints] = useState<number | null>(null);
  const [lastScoreLines, setLastScoreLines] = useState<string[] | null>(null);
  const scoredRoundKey = useRef<string | null>(null);

  const playerMoves = useMemo(
    () => (state.turn === "player" && !state.result ? getLegalMoves(state.playerHand, state.chain) : []),
    [state]
  );

  const playableIds = useMemo(() => new Set(playerMoves.map((m) => m.tileId)), [playerMoves]);

  const ends = openEnds(state.chain);
  const playerCanPlay = playerMoves.length > 0;
  const playerMustDraw = state.turn === "player" && !state.result && !playerCanPlay && state.boneyard.length > 0;
  const playerMustPass =
    state.turn === "player" && !state.result && !playerCanPlay && state.boneyard.length === 0;

  const newGame = useCallback(() => {
    setAiBusy(false);
    setLastPoints(null);
    setLastScoreLines(null);
    scoredRoundKey.current = null;
    setState(dealNewRound());
  }, []);

  // Award Copa points once per finished round (player win only)
  useEffect(() => {
    if (!state.result || !state.lastAction) return;
    const key = `cfa_domino_scored_${state.lastAction}`;
    if (scoredRoundKey.current === key) return;
    // Survive React Strict Mode double-invoke in one session
    try {
      if (typeof sessionStorage !== "undefined" && sessionStorage.getItem(key)) {
        scoredRoundKey.current = key;
        return;
      }
    } catch {
      /* ignore */
    }
    scoredRoundKey.current = key;
    try {
      sessionStorage?.setItem(key, "1");
    } catch {
      /* ignore */
    }

    if (state.result.winner !== "player") {
      setLastPoints(0);
      setLastScoreLines(["Sin puntos · gana la próxima"]);
      return;
    }

    const aiPips =
      state.result.kind === "blocked" ? state.result.aiPips : handPips(state.aiHand);
    const breakdown = scoreFromStateResult(state.result, aiPips);
    const { applied } = awardDominoPoints(breakdown.points, { win: true });
    setLastPoints(breakdown.points);
    setLastScoreLines(
      applied
        ? breakdown.lines
        : [...breakdown.lines, "Guarda tu nombre en la Copa para sumar a la tabla"]
    );
    setBoardRefresh((n) => n + 1);
  }, [state.result, state.lastAction, state.aiHand]);

  const applyPlayerMove = useCallback((move: LegalMove) => {
    setState((prev) => {
      if (prev.turn !== "player" || prev.result) return prev;
      return playMove(prev, move);
    });
  }, []);

  const onTileTap = useCallback(
    (tileId: string) => {
      if (state.turn !== "player" || state.result || aiBusy) return;
      const move = findMoveForTile(state.playerHand, state.chain, tileId);
      if (!move) return;
      applyPlayerMove(move);
    },
    [state, aiBusy, applyPlayerMove]
  );

  const onDraw = useCallback(() => {
    setState((prev) => {
      if (prev.turn !== "player" || prev.result) return prev;
      return drawUntilCanPlay(prev);
    });
  }, []);

  const onPass = useCallback(() => {
    setState((prev) => {
      if (prev.turn !== "player" || prev.result) return prev;
      return passTurn(prev);
    });
  }, []);

  // AI turn loop
  useEffect(() => {
    if (state.result || state.turn !== "ai") {
      setAiBusy(false);
      return;
    }

    setAiBusy(true);
    const timer = window.setTimeout(() => {
      setState((prev) => {
        if (prev.turn !== "ai" || prev.result) return prev;

        let current = prev;
        // Draw until can play or pozo empty
        current = drawUntilCanPlay(current);
        if (current.result) return current;

        const move = chooseAiMove(current);
        if (move) {
          return playMove(current, move);
        }

        // No move · pass
        return passTurn(current);
      });
      setAiBusy(false);
    }, DOMINO_AI_THINK_MS);

    return () => window.clearTimeout(timer);
  }, [state.turn, state.result, state.lastAction]);

  const statusLine = state.result
    ? L.roundOver
    : state.turn === "ai" || aiBusy
      ? L.aiThinking
      : playerMustDraw
        ? L.drawHint
        : playerMustPass
          ? L.passHint
          : L.yourTurn;

  const win = resultCopy(state, theme);

  return (
    <div className={`domino-shell${className ? ` ${className}` : ""}`}>
    <section
      className={`domino-root ${theme.themeClass}`}
      aria-label={`${theme.locale.gameTitle} · ${theme.flag}`}
    >
      <header className="domino-head">
        <div className="domino-head-copy">
          <p className="domino-kicker">
            {theme.flag} {L.copaTitle}
          </p>
          <h2 className="domino-title">{L.gameTitle}</h2>
          <p className="domino-sub">
            {L.gameSubtitle} · {L.vsAi} · {L.tablaDelMes}
          </p>
          <p className="domino-vibe">{L.vibe}</p>
        </div>
        <div className="domino-head-actions">
          <span className="domino-badge">
            {L.boneyard} · {state.boneyard.length}
          </span>
          <button type="button" className="domino-btn domino-btn--ghost" onClick={newGame}>
            {L.newGame}
          </button>
        </div>
      </header>

      <div className="domino-status" role="status" aria-live="polite">
        <span className={`domino-status-turn${state.turn === "ai" || aiBusy ? " is-ai" : ""}`}>
          {statusLine}
        </span>
        {!state.result ? (
          <span className="domino-status-meta">
            {L.aiHand}: {state.aiHand.length} · {L.yourHand}: {state.playerHand.length} · {L.pipTotal}:{" "}
            {handPips(state.playerHand)}
          </span>
        ) : null}
      </div>

      <div className="domino-ai-row">
        <span className="domino-ai-label">
          {L.aiHand} · {state.aiHand.length} {L.tiles}
        </span>
        <div className="domino-ai-bones" aria-hidden="true">
          {state.aiHand.map((tile) => (
            <DominoBone key={tile.id} tile={tile} faceDown size="mini" />
          ))}
        </div>
      </div>

      {state.chain.length > 0 ? (
        <div className="domino-ends">
          <span>
            {L.openEnds}:{" "}
            <strong>
              {ends.left} · {ends.right}
            </strong>
          </span>
          <span>
            {L.chain}: {state.chain.length}
          </span>
        </div>
      ) : null}

      <div className="domino-table-wrap">
        <div className="domino-table" aria-label={L.chain}>
          {state.chain.length === 0 ? (
            <p className="domino-table-empty">{L.playHint}</p>
          ) : (
            <div className="domino-table-inner">
              {state.chain.map((placed) => (
                <DominoBone
                  key={`${placed.tile.id}-${placed.leftPip}-${placed.rightPip}-${placed.tile.a}`}
                  tile={placed.tile}
                  leftPip={placed.leftPip}
                  rightPip={placed.rightPip}
                  orientation="horizontal"
                  size="chain"
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {state.result ? (
        <div className="domino-result" role="status">
          <p className="domino-result-title">{win.title}</p>
          <p className="domino-result-detail">{win.detail}</p>
          <button type="button" className="domino-btn domino-btn--primary" style={{ marginTop: "0.65rem" }} onClick={newGame}>
            {L.newGame}
          </button>
        </div>
      ) : (
        <>
          <div className="domino-hand-section">
            <p className="domino-hand-label">
              {L.yourHand} · {state.playerHand.length} {L.tiles}
            </p>
            <div className="domino-hand" role="list">
              {state.playerHand.map((tile) => {
                const canPlay = playableIds.has(tile.id) && state.turn === "player";
                return (
                  <div key={tile.id} role="listitem">
                    <DominoBone
                      tile={tile}
                      size="hand"
                      dimmed={!canPlay}
                      playable={canPlay}
                      onClick={() => onTileTap(tile.id)}
                    />
                  </div>
                );
              })}
            </div>
          </div>

          <div className="domino-actions">
            <button
              type="button"
              className="domino-btn domino-btn--primary"
              onClick={onDraw}
              disabled={!playerMustDraw || aiBusy}
            >
              {L.draw}
            </button>
            <button
              type="button"
              className="domino-btn"
              onClick={onPass}
              disabled={!playerMustPass || aiBusy}
            >
              {L.pass}
            </button>
          </div>
        </>
      )}

      <p className="domino-foot">
        {theme.flag} {theme.countryName} · {L.originalGame} · {L.freeEntry}
      </p>
    </section>

    <DominoTournamentPanel
      theme={theme}
      refreshKey={boardRefresh}
      lastPoints={lastPoints}
      lastScoreLines={lastScoreLines}
    />
    </div>
  );
}
