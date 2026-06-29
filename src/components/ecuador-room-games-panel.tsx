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
const FREE_FIRE_GAME = "Free Fire EC" as const;
const ECUADOR_DRIVE_GAME = "Ecuador Drive" as const;
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

/** Ecuador (EC) · Ecuavoley + Free Fire + Ecuador Drive */
export function EcuadorRoomGamesPanel({
  requestedGame = null,
  onRequestedGameHandled
}: EcuadorRoomGamesPanelProps) {
  const [activeGame, setActiveGame] = useState<EcuadorRoomGameSelection | null>(null);
  const games = getArenaSlotViralGames("EC");
  const ecuavoley = games.find((game) => game.label.toLowerCase().includes("ecuavoley"));
  const freeFire = games.find((game) => game.label.toLowerCase().includes("free fire"));

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
    },
    {
      id: FREE_FIRE_GAME,
      set: "02",
      tag: "Sala ecuatoriana · ranked BR",
      emoji: "🔫",
      name: "Free Fire",
      host: `${ECUADOR_HOST} · ranked · squad live`,
      hint: freeFire?.hint ?? "Most viral mobile shooter in the region",
      ready: 94
    },
    {
      id: ECUADOR_DRIVE_GAME,
      set: "03",
      tag: "Arena Ecuador Drive · Quito · Guayaquil 2030",
      emoji: "🏎️",
      name: "Ecuador Drive",
      host: "🇪🇨 Mundo abierto · cámara chase · derrape",
      hint: "Simulador 3D · W/A/S/D · tabla arena · puntos",
      ready: 96
    }
  ];

  useEffect(() => {
    if (!requestedGame) return;
    if (requestedGame === ECUADOR_DRIVE_GAME) {
      onRequestedGameHandled?.();
      return;
    }
    setActiveGame(requestedGame);
    onRequestedGameHandled?.();
  }, [requestedGame, onRequestedGameHandled]);

  return (
    <>
      <section
        id="ecuador-live-games"
        className="ecuador-game-room-panel w-full rounded-2xl border border-[#fcd116]/35 bg-[#040a08]/65 p-4 backdrop-blur-md sm:p-5"
        aria-label="Ecuador (EC): Ecuavoley, Free Fire y Ecuador Drive"
      >
        <header className="text-center">
          <p className="text-[9px] font-black uppercase tracking-[0.18em] text-[#fcd116]">
            Juegos virales · talk-show · en vivo
          </p>
          <h2 className="ecuador-room-title mt-2 text-2xl font-black text-[#fef9c3] sm:text-3xl">
            🇪🇨 Ecuador · Ecuavoley · Free Fire · Ecuador Drive
          </h2>
          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#d4d4d8]">
            ¡Dale pues! · elige un juego · toca para jugar en la sala
          </p>
        </header>

        <div className="cotswolds-game-board mt-4 space-y-2.5">
          {playableRows.map((row) => {
            const playing = activeGame === row.id;
            const isDrive = row.id === ECUADOR_DRIVE_GAME;

            if (isDrive) {
              return (
                <a
                  key={row.id}
                  href="#ecuador-freedom-drive"
                  className="cotswolds-game-row ecuador-game-room-row ecuador-game-room-row--drive block no-underline"
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
                    <span className="cotswolds-game-meter">{row.ready}% listo · abrir simulador 3D</span>
                  </span>
                  <span className="cotswolds-game-cta">▶ DRIVE</span>
                </a>
              );
            }

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
                  {playing ? <span className="cotswolds-game-host">{row.hint}</span> : null}
                  <span className="cotswolds-game-graph" aria-hidden="true">
                    <span
                      className="cotswolds-game-graph-fill"
                      style={{ width: `${playing ? 100 : row.ready}%` }}
                    />
                  </span>
                  <span className="cotswolds-game-meter">
                    {playing ? "En el simulador · jugando en vivo" : `${row.ready}% listo · toca para jugar`}
                  </span>
                </span>
                <span className={`cotswolds-game-cta${playing ? " cotswolds-game-cta--live" : ""}`}>
                  {playing ? "● JUGANDO" : "▶ JUGAR"}
                </span>
              </button>
            );
          })}
        </div>

        <div className="ecuador-game-room-chips mt-4 flex flex-wrap justify-center gap-2" role="list">
          {games
            .filter(
              (game) =>
                !game.label.toLowerCase().includes("ecuavoley") &&
                !game.label.toLowerCase().includes("free fire")
            )
            .map((game) => (
              <span
                key={game.id}
                className="ecuador-game-room-chip inline-flex items-center gap-1.5 rounded-full border border-[#fcd116]/30 px-3 py-1.5 text-[10px] font-semibold text-[#fef08a]"
                role="listitem"
                title={game.hint}
              >
                <span aria-hidden="true">{game.emoji}</span>
                <span>{game.label}</span>
              </span>
            ))}
        </div>
      </section>

      {activeGame === ECUAVOLEY_GAME ? (
        <CotswoldsGameSimulator
          gameName={ECUAVOLEY_GAME}
          host={ECUADOR_HOST}
          roomKicker="Ecuador (EC) · Ecuavoley dominical"
          onClose={() => setActiveGame(null)}
        />
      ) : null}

      {activeGame === FREE_FIRE_GAME ? (
        <CotswoldsGameSimulator
          gameName={FREE_FIRE_GAME}
          host={ECUADOR_HOST}
          roomKicker="Ecuador (EC) · Free Fire · sala ecuatoriana"
          onClose={() => setActiveGame(null)}
        />
      ) : null}
    </>
  );
}
