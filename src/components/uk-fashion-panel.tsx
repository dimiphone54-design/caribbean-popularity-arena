"use client";

import { useState } from "react";
import { CotswoldsGameSimulator } from "@/components/cotswolds-game-simulator";
import { CotswoldsHeroPlayersFilm } from "@/components/cotswolds-hero-players-film";
import { fashionMonthLooks } from "@/lib/fashion-month";
import {
  cotswoldsHeroQuarterSet,
  cotswoldsHollandParkWomenFeed,
  cotswoldsLondonParkGirlsFeed,
} from "@/lib/cotswolds";

const UK_LOOKS = fashionMonthLooks.filter(
  (l) => l.flag === "🇬🇧" || l.city === "London"
);

export function UkFashionPanel() {
  const [heroSim, setHeroSim] = useState<{ name: string; host: string } | null>(null);

  return (
    <div className="space-y-3">
      {/* ── Looks ── */}
      <div className="a2030-holo-panel rounded-[1.25rem] border border-[#ff2bd6]/18 p-3">
        <p className="text-[10px] font-bold uppercase tracking-wider text-[#ff2bd6]">Looks</p>
        <div className="mt-2 grid grid-cols-3 gap-1.5" role="list">
          {UK_LOOKS.map((look) => (
            <div
              key={look.id}
              className="flex min-h-[50px] items-center rounded-lg border border-[#ff2bd6]/10 bg-[#0a0010]/55 px-2 py-1.5"
              role="listitem"
            >
              <div className="min-w-0">
                <p className="truncate text-[11px] font-black text-[#fef9c3]">{look.name}</p>
                <p className="mt-0.5 truncate text-[9px] text-[#ff2bd6]">{look.style}</p>
                <p className="mt-0.5 truncate text-[8px] text-[#8fa3c4]">{look.flag} {look.city}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Tournament ── */}
      <div className="a2030-holo-panel rounded-[1.25rem] border border-[#d7b46a]/25 p-3">
        <p className="text-[10px] font-bold uppercase tracking-wider text-[#d7b46a]">Tournament</p>
        <div className="mt-2 space-y-1.5" role="list">
          {cotswoldsHeroQuarterSet.map((feed, index) => (
            <div
              key={feed.id}
              className="rounded-lg border border-white/8 bg-[#0a0010]/50 px-2.5 py-2"
              role="listitem"
            >
              {feed.id === cotswoldsLondonParkGirlsFeed.id ? <CotswoldsHeroPlayersFilm /> : null}
              <div className="flex items-start gap-2">
                <span className="shrink-0 rounded-full border border-[#d7b46a]/25 bg-[#d7b46a]/10 px-1.5 py-0.5 text-[9px] font-bold text-[#d7b46a]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[11px] font-bold text-[#fef9c3]">{feed.label}</span>
                  {feed.caption ? <span className="block mt-0.5 text-[9px] leading-4 text-[#8fa3c4]">{feed.caption}</span> : null}
                  {feed.id === cotswoldsLondonParkGirlsFeed.id ? (
                    <button
                      type="button"
                      onClick={() => setHeroSim({ name: "Park Relay", host: "Manchester live · Tessa" })}
                      className="mt-1.5 inline-flex items-center gap-1 rounded-full bg-[#b8ff3c]/10 px-2 py-0.5 text-[9px] font-bold text-[#b8ff3c]"
                    >
                      <span className="h-1 w-1 rounded-full bg-[#b8ff3c]" />
                      LIVE
                    </button>
                  ) : null}
                  {feed.id === cotswoldsHollandParkWomenFeed.id ? (
                    <span className="mt-1.5 flex flex-wrap gap-1">
                      {[
                        { game: "Croquet", emoji: "🏑", host: "Margot · Holland Park" },
                        { game: "Badminton", emoji: "🏸", host: "Freya · Holland Park" },
                        { game: "Boules", emoji: "🟢", host: "Imogen · Holland Park" }
                      ].map((entry) => (
                        <button
                          key={entry.game}
                          type="button"
                          onClick={() => setHeroSim({ name: entry.game, host: entry.host })}
                          className="inline-flex items-center gap-0.5 rounded-full border border-white/10 bg-white/5 px-1.5 py-0.5 text-[9px] text-white/70 hover:text-white"
                        >
                          <span aria-hidden="true">{entry.emoji}</span>
                          {entry.game}
                        </button>
                      ))}
                    </span>
                  ) : null}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {heroSim ? (
        <CotswoldsGameSimulator
          gameName={heroSim.name}
          host={heroSim.host}
          onClose={() => setHeroSim(null)}
        />
      ) : null}
    </div>
  );
}
