"use client";

import { useState } from "react";
import { CotswoldsGameSimulator } from "@/components/cotswolds-game-simulator";
import { getArenaSlotViralGames } from "@/lib/arena-slot-trending-topics";

const COLOMBIA_HOST = "Sala CO";

const PLAYABLE = [
  {
    id: "Fútbol",
    set: "01",
    tag: "Liga · noche de partido",
    emoji: "⚽",
    host: `${COLOMBIA_HOST} · Bogotá · Medellín`,
    ready: 90
  },
  {
    id: "Volleyball",
    set: "02",
    tag: "Parque abierto · red al aire libre",
    emoji: "🏐",
    host: `${COLOMBIA_HOST} · parque · picnic`,
    ready: 86
  },
  {
    id: "Salsa",
    set: "03",
    tag: "Cali · pista en vivo",
    emoji: "💃",
    host: `${COLOMBIA_HOST} · Cali · Bogotá`,
    ready: 84
  }
] as const;

/** Colombia (CO) · sports & party games in the room */
export function ColombiaRoomGamesPanel() {
  const [activeGame, setActiveGame] = useState<string | null>(null);
  const games = getArenaSlotViralGames("CO");

  return (
    <>
      <section
        className="colombia-game-room-panel w-full rounded-2xl border border-[#fb7185]/35 bg-[#1a0208]/55 p-4 backdrop-blur-md sm:p-5"
        aria-label="Colombia (CO): deportes y juegos"
      >
        <header className="text-center">
          <p className="text-[9px] font-black uppercase tracking-[0.18em] text-[#fbbf24]">
            Deportes · talk-show
          </p>
          <h2 className="colombia-handwriting mt-2 text-2xl font-semibold text-[#fff1f2] sm:text-3xl">
            Colombia (CO) · en la sala
          </h2>
          <p className="colombia-handwriting-soft mx-auto mt-2 max-w-md text-sm leading-6 text-[#fda4af]/90">
            Fútbol · voleibol · salsa · toca para jugar
          </p>
        </header>

        <div className="cotswolds-game-board mt-4 space-y-2.5" role="list">
          {PLAYABLE.map((row) => {
            const playing = activeGame === row.id;
            return (
              <button
                key={row.id}
                type="button"
                onClick={() => setActiveGame(row.id)}
                aria-pressed={playing}
                className={`cotswolds-game-row colombia-game-room-row${playing ? " cotswolds-game-row--live" : ""}`}
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
                    {row.id}
                  </span>
                  <span className="cotswolds-game-host">{row.host}</span>
                  <span className="cotswolds-game-graph" aria-hidden="true">
                    <span
                      className="cotswolds-game-graph-fill"
                      style={{ width: `${playing ? 100 : row.ready}%` }}
                    />
                  </span>
                  <span className="cotswolds-game-meter">
                    {playing ? "In the simulator · play live" : `${row.ready}% ready · tap to play`}
                  </span>
                </span>
                <span className={`cotswolds-game-cta${playing ? " cotswolds-game-cta--live" : ""}`}>
                  {playing ? "● PLAYING" : "▶ PLAY GAME"}
                </span>
              </button>
            );
          })}
        </div>

        <div className="colombia-game-room-chips mt-4 flex flex-wrap justify-center gap-2" role="list">
          {games.map((game) => (
            <span
              key={game.id}
              className="colombia-game-room-chip inline-flex items-center gap-1.5 rounded-full border border-[#fb7185]/30 px-3 py-1.5 text-[10px] font-semibold text-[#fecdd3]"
              role="listitem"
              title={game.hint}
            >
              <span aria-hidden="true">{game.emoji}</span>
              <span>{game.label}</span>
            </span>
          ))}
        </div>
      </section>

      {activeGame ? (
        <CotswoldsGameSimulator
          gameName={activeGame}
          host={COLOMBIA_HOST}
          roomKicker="Colombia (CO) · en la sala"
          onClose={() => setActiveGame(null)}
        />
      ) : null}
    </>
  );
}
