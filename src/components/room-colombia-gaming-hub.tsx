"use client";

import { useEffect, useState } from "react";
import { CotswoldsGameSimulator } from "@/components/cotswolds-game-simulator";
import { useRoomLocale } from "@/components/room-locale-provider";
import { isSpanishContentLocale } from "@/lib/room-locale";

const COLOMBIA_HOST = "Sala CO";

const COLOMBIA_LIVE_LANES = [
  { emoji: "⚽", title: "Fútbol", gameName: "Fútbol" as string | null },
  { emoji: "🏐", title: "Voleibol", gameName: "Voleibol" as string | null },
  { emoji: "💃", title: "Salsa", gameName: "Salsa" as string | null },
  { emoji: "🎮", title: "Hub", gameName: null as string | null, scrollTo: "colombia-concepts-grid" }
] as const;

const COLOMBIA_GAMING_SECTIONS = [
  { icon: "🦅", title: "Leyendas de los Andes", gameName: "Leyendas de los Andes" },
  { icon: "🎫", title: "Pase Dorado", gameName: "Pase Dorado Colombiano" },
  { icon: "⚔️", title: "Fuerza Urbana", gameName: "Fuerza Urbana Bogotá" },
  { icon: "🏗️", title: "Ciudad Creadora", gameName: "Ciudad Creadora" },
  { icon: "🎁", title: "Cápsula Esmeralda", gameName: "Cápsula Esmeralda" },
  { icon: "🎉", title: "Fiesta Colombiana", gameName: "Fiesta Colombiana" },
  { icon: "🧩", title: "Paraíso Cafetero", gameName: "Paraíso Cafetero" },
  { icon: "👑", title: "Imperio del Cóndor", gameName: "Imperio del Cóndor" },
  { icon: "🏆", title: "Liga Andina", gameName: "Liga Profesional Andina" },
  { icon: "💎", title: "Joyas de Colombia", gameName: "Joyas de Colombia" }
] as const;

export const COLOMBIA_GAMING_HUB_FREEZE_NOTES = [
  "Pase Dorado premium reward track",
  "Cápsula Esmeralda paid cosmetic packs (future)",
  "Liga Profesional paid tournament entry (when enabled)",
  "Booster packs / skins as paid IAPs (future)"
] as const;

type RoomColombiaGamingHubProps = {
  requestedGameName?: string | null;
  onRequestedGameHandled?: () => void;
};

/** Compact 🎮 Juegos · Colombia Gaming Hub · Español (CO) public · English for MASTER */
export function RoomColombiaGamingHub({
  requestedGameName = null,
  onRequestedGameHandled
}: RoomColombiaGamingHubProps = {}) {
  const { locale } = useRoomLocale();
  const es = isSpanishContentLocale(locale);
  const [activeGame, setActiveGame] = useState<string | null>(null);

  useEffect(() => {
    if (!requestedGameName) return;
    setActiveGame(requestedGameName);
    onRequestedGameHandled?.();
  }, [requestedGameName, onRequestedGameHandled]);

  const playGame = (gameName: string) => setActiveGame(gameName);

  return (
    <>
      <section
        id="colombia-room-gaming-hub"
        className="room-colombia-gaming-hub relative w-full overflow-hidden rounded-lg border border-[#fb7185]/35 bg-[#1a0208]/90"
        aria-label={es ? "Hub de juegos Colombia" : "Colombia Games Hub"}
        lang={es ? "es-CO" : "en"}
      >
        <div
          className="pointer-events-none absolute inset-0 bg-cover bg-center brightness-[1.05] opacity-50"
          style={{ backgroundImage: "url('/colombia-gaming-hub-people-2026.jpg')" }}
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#0d0104]/55 via-[#1a0208]/65 to-[#0d0104]/8"
          aria-hidden="true"
        />

        {/* Title row */}
        <header className="relative z-10 flex flex-wrap items-center gap-x-2 gap-y-0.5 border-b border-[#fb7185]/20 px-2.5 py-1.5 sm:px-3">
          <h2 className="flex flex-wrap items-baseline gap-x-1.5">
            <span className="font-['Bebas_Neue',sans-serif] text-lg tracking-[0.06em] text-[#fff1f2] sm:text-xl">
              {es ? "🎮 Juegos" : "🎮 Games"}
            </span>
            <span className="text-[#fb7185]/70" aria-hidden="true">
              ·
            </span>
            <span
              className="font-['Bebas_Neue',sans-serif] text-lg font-black uppercase tracking-[0.1em] sm:text-xl"
              style={{
                backgroundImage: "linear-gradient(105deg, #fff1f2 0%, #fda4af 45%, #fbbf24 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent"
              }}
            >
              {es ? "Hub de juegos Colombia" : "Colombia Games Hub"}
            </span>
          </h2>
          <span className="ml-auto text-[8px] font-black uppercase tracking-[0.1em] text-[#fda4af]/90">
            {es ? "juego gratis" : "free play"}
          </span>
        </header>

        {/* Live lanes — chip row */}
        <div className="relative z-10 flex flex-wrap gap-1 border-b border-white/5 px-2 py-1.5 sm:px-2.5">
          {COLOMBIA_LIVE_LANES.map((lane) => {
            const playing = Boolean(lane.gameName && activeGame === lane.gameName);
            return (
              <button
                key={lane.title}
                type="button"
                onClick={() => {
                  if ("scrollTo" in lane && lane.scrollTo && !lane.gameName) {
                    document
                      .getElementById(lane.scrollTo)
                      ?.scrollIntoView({ behavior: "smooth", block: "start" });
                    return;
                  }
                  if (lane.gameName) playGame(lane.gameName);
                }}
                className={`rounded-md border px-2 py-0.5 text-[10px] font-black transition ${
                  playing
                    ? "border-[#fbbf24] bg-[#fbbf24]/20 text-[#fef9c3]"
                    : "border-[#fb7185]/25 bg-black/50 text-[#fecdd3] hover:border-[#fda4af]/50"
                }`}
              >
                {lane.emoji} {lane.title}
              </button>
            );
          })}
        </div>

        {/* 10 games — dense grid */}
        <div
          id="colombia-concepts-grid"
          className="relative z-10 grid grid-cols-2 gap-1 p-1.5 sm:grid-cols-5 sm:gap-1 sm:p-2"
        >
          {COLOMBIA_GAMING_SECTIONS.map((section) => {
            const playing = activeGame === section.gameName;
            return (
              <button
                key={section.gameName}
                type="button"
                onClick={() => playGame(section.gameName)}
                aria-pressed={playing}
                className={`flex items-center gap-1 rounded-md border px-1.5 py-1 text-left transition ${
                  playing
                    ? "border-[#fda4af] bg-[#480b20]/80 text-[#fff1f2]"
                    : "border-white/10 bg-black/45 text-[#fecdd3] hover:border-[#fb7185]/45"
                }`}
              >
                <span className="text-sm" aria-hidden="true">
                  {section.icon}
                </span>
                <span className="min-w-0 flex-1 truncate text-[9px] font-black leading-tight sm:text-[10px]">
                  {section.title}
                </span>
                <span className="shrink-0 text-[8px] font-black text-[#fbbf24]">
                  {playing ? "●" : "▶"}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {activeGame ? (
        <CotswoldsGameSimulator
          gameName={activeGame}
          host={COLOMBIA_HOST}
          roomKicker={COLOMBIA_ROOM_KICKER}
          onClose={() => setActiveGame(null)}
        />
      ) : null}
    </>
  );
}
