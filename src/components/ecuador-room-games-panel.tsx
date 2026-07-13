"use client";

import { useEffect, useState } from "react";
import { CotswoldsGameSimulator } from "@/components/cotswolds-game-simulator";
import { getArenaSlotViralGames } from "@/lib/arena-slot-trending-topics";
import type { EcuadorRoomGameSelection } from "@/lib/ecuador-country";

type EcuadorRoomGamesPanelProps = {
  requestedGame?: EcuadorRoomGameSelection | null;
  onRequestedGameHandled?: () => void;
};

const ECUAVOLEY_GAME = "Ecuavoley" as const;
const ECUADOR_HOST = "Sala EC";

type PlayableRow = {
  id: EcuadorRoomGameSelection;
  set: string;
  tag: string;
  emoji: string;
  name: string;
  host: string;
  hint: string;
  ready: number;
};

/** Ecuador (EC) · Ecuavoley */
export function EcuadorRoomGamesPanel({
  requestedGame = null,
  onRequestedGameHandled
}: EcuadorRoomGamesPanelProps) {
  const [activeGame, setActiveGame] = useState<EcuadorRoomGameSelection | null>(null);
  const games = getArenaSlotViralGames("EC");
  const ecuavoley = games.find((game) => game.label.toLowerCase().includes("ecuavoley"));

  const playableRows: PlayableRow[] = [
    {
      id: ECUAVOLEY_GAME,
      set: "01",
      tag: "Vóley a tres · cancha de barrio",
      emoji: "🏐",
      name: "Ecuavoley",
      host: `${ECUADOR_HOST} · Quito · Guayaquil`,
      hint: ecuavoley?.hint ?? "Ecuador's three-player volleyball classic",
      ready: 88
    }
  ];

  useEffect(() => {
    if (!requestedGame) return;
    setActiveGame(requestedGame);
    onRequestedGameHandled?.();
  }, [requestedGame, onRequestedGameHandled]);

  return (
    <>
      <section
        id="ecuador-live-games"
        className="ecuador-game-room-panel w-full rounded-2xl border border-[#fcd116]/35 bg-[#040a08]/65 p-4 backdrop-blur-md sm:p-5"
        aria-label="Ecuador (EC): Ecuavoley"
      >
        <header className="text-center">
          <p className="text-[9px] font-black uppercase tracking-[0.18em] text-[#fcd116]">
            Juegos virales · talk-show · en vivo
          </p>
          <h2 className="ecuador-room-title mt-2 text-2xl font-black text-[#fef9c3] sm:text-3xl">
            🇪🇨 Ecuador · Ecuavoley
          </h2>
          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#d4d4d8]">
            ¡Dale pues! · elige un juego · toca para jugar en la sala
          </p>
        </header>

        <div className="cotswolds-game-board mt-4 space-y-2.5">
          {playableRows.map((row) => {
            const playing = activeGame === row.id;

            return (
              <button
                key={row.id}
                type="button"
                onClick={() => setActiveGame(row.id)}
                aria-pressed={playing}
                className={`cotswolds-game-row ecuador-game-room-row${playing ? " cotswolds-game-row--live" : ""}`}
              >
                <span className="cotswolds-hero-rank cotswolds-game-rank" aria-hidden="true">
                  <span className="cotswolds-hero-rank-word">SET</span>
                  <span className="cotswolds-hero-rank-num">{row.set}</span>
                </span>
                <span className="cotswolds-game-main">
                  <span className="cotswolds-game-tag">{row.tag}</span>
                  <span className="cotswolds-game-name">
                    <span className="cotswolds-game-flag" aria-hidden="true">
                      {row.emoji}
                    </span>
                    {row.name}
                  </span>
                  <span className="cotswolds-game-host">{row.host}</span>
                  <span className="cotswolds-game-graph" aria-hidden="true">
                    <span className="cotswolds-game-graph-fill" style={{ width: `${row.ready}%` }} />
                  </span>
                  <span className="cotswolds-game-meter">
                    {playing ? "En simulador · juega en vivo" : `${row.ready}% listo · toca para jugar`}
                  </span>
                </span>
                <span className="cotswolds-game-cta">{playing ? "● PLAYING" : "▶ PLAY GAME"}</span>
              </button>
            );
          })}
        </div>
      </section>

      {activeGame ? (
        <CotswoldsGameSimulator
          gameName={activeGame}
          host={ECUADOR_HOST}
          roomKicker="Ecuador · juegos en vivo"
          onClose={() => setActiveGame(null)}
        />
      ) : null}
    </>
  );
}
