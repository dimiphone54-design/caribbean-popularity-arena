"use client";

import { useState } from "react";
import { CotswoldsGameSimulator } from "@/components/cotswolds-game-simulator";
import { getArenaSlotViralGames } from "@/lib/arena-slot-trending-topics";

const FREE_FIRE_GAME = "Free Fire";
const COLOMBIA_HOST = "Sala CO";

/** Colombia (CO) · viral online games · Free Fire ranked simulator */
export function ColombiaRoomGamesPanel() {
  const [simOpen, setSimOpen] = useState(false);
  const games = getArenaSlotViralGames("CO");
  const freeFire = games.find((game) => game.label.toLowerCase().includes("free fire"));
  const ready = 92;

  return (
    <>
      <section
        className="colombia-game-room-panel w-full rounded-2xl border border-[#fb7185]/35 bg-[#1a0208]/55 p-4 backdrop-blur-md sm:p-5"
        aria-label="Colombia (CO): Free Fire"
      >
        <header className="text-center">
          <p className="text-[9px] font-black uppercase tracking-[0.18em] text-[#fbbf24]">
            Viral games · talk-show
          </p>
          <h2 className="colombia-handwriting mt-2 text-2xl font-semibold text-[#fff1f2] sm:text-3xl">
            Colombia (CO): Free Fire
          </h2>
          <p className="colombia-handwriting-soft mx-auto mt-2 max-w-md text-sm leading-6 text-[#fda4af]/90">
            {freeFire?.hint ?? "Colombia's most-played mobile battle royale"}
          </p>
        </header>

        <div className="cotswolds-game-board mt-4 space-y-2.5" role="list">
          <button
            type="button"
            onClick={() => setSimOpen(true)}
            aria-pressed={simOpen}
            className={`cotswolds-game-row colombia-game-room-row${simOpen ? " cotswolds-game-row--live" : ""}`}
          >
            <span className="cotswolds-hero-rank cotswolds-game-rank" aria-hidden="true">
              <span className="cotswolds-hero-rank-word">SET</span>
              <span className="cotswolds-hero-rank-num">01</span>
            </span>
            <span className="cotswolds-game-main">
              <span className="cotswolds-game-tag">Ranked con la sala</span>
              <span className="cotswolds-game-name">
                <span className="cotswolds-game-flag" aria-hidden="true">🔫</span>
                {FREE_FIRE_GAME}
              </span>
              <span className="cotswolds-game-host">
                {COLOMBIA_HOST} · Bogotá · Medellín · ranked BR
              </span>
              <span className="cotswolds-game-graph" aria-hidden="true">
                <span
                  className="cotswolds-game-graph-fill"
                  style={{ width: `${simOpen ? 100 : ready}%` }}
                />
              </span>
              <span className="cotswolds-game-meter">
                {simOpen ? "In the simulator · play live" : `${ready}% ready · tap to play`}
              </span>
            </span>
            <span className={`cotswolds-game-cta${simOpen ? " cotswolds-game-cta--live" : ""}`}>
              {simOpen ? "● PLAYING" : "▶ PLAY GAME"}
            </span>
          </button>
        </div>

        <div className="colombia-game-room-chips mt-4 flex flex-wrap justify-center gap-2" role="list">
          {games
            .filter((game) => !game.label.toLowerCase().includes("free fire"))
            .map((game) => (
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

      {simOpen ? (
        <CotswoldsGameSimulator
          gameName={FREE_FIRE_GAME}
          host={COLOMBIA_HOST}
          roomKicker="Colombia (CO) · ranked con la sala"
          onClose={() => setSimOpen(false)}
        />
      ) : null}
    </>
  );
}
