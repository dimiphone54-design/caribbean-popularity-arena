"use client";

import { useState } from "react";
import { CotswoldsGameSimulator } from "@/components/cotswolds-game-simulator";
import { CotswoldsHeroPlayersFilm } from "@/components/cotswolds-hero-players-film";
import {
  cotswoldsHeroQuarterSet,
  cotswoldsHollandParkWomenFeed,
  cotswoldsLondonParkGirlsFeed,
} from "@/lib/cotswolds";
import { UK_ROOM_PANEL } from "@/lib/uk-room-panel";

export function UkRoomFashionTabPanel() {
  const [heroSim, setHeroSim] = useState<{ name: string; host: string } | null>(null);

  return (
    <div className="uk-room-fashion-tab-panel space-y-6">

      {/* ── ACTIVITYS Tournament ───────────────────────────── */}
      <section className={UK_ROOM_PANEL}>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="a2030-electric-flash a2030-micro text-[10px] font-bold uppercase sm:text-xs">
            ACTIVITYS
          </p>
          <span className="a2030-pulse-ring inline-flex h-2 w-2 rounded-full bg-[#b8ff3c]" />
        </div>
        <ol className="cotswolds-hero-board mt-3" role="list">
          {cotswoldsHeroQuarterSet.map((feed, index) => (
            <li
              key={feed.id}
              className={`cotswolds-hero-card${
                feed.id === cotswoldsLondonParkGirlsFeed.id ? " cotswolds-hero-card--players" : ""
              }`}
              role="listitem"
            >
              {feed.id === cotswoldsLondonParkGirlsFeed.id ? <CotswoldsHeroPlayersFilm /> : null}
              <span className="cotswolds-hero-rank" aria-hidden="true">
                <span className="cotswolds-hero-rank-word">SET</span>
                <span className="cotswolds-hero-rank-num">{String(index + 1).padStart(2, "0")}</span>
              </span>
              <span className="cotswolds-hero-card-main">
                <span className="cotswolds-hero-label">{feed.label}</span>
                {feed.caption ? <span className="cotswolds-hero-caption">{feed.caption}</span> : null}
                {feed.id === cotswoldsLondonParkGirlsFeed.id ? (
                  <button
                    type="button"
                    onClick={() => setHeroSim({ name: "Park Relay", host: "Manchester live · Tessa" })}
                    className="cotswolds-hero-live-cta mt-2"
                  >
                    <span className="cotswolds-hero-live-dot" aria-hidden="true" />
                    ▶ LIVE
                  </button>
                ) : null}
                {feed.id === cotswoldsHollandParkWomenFeed.id ? (
                  <span className="cotswolds-hero-games mt-2">
                    {[
                      { game: "Croquet", emoji: "🏑", host: "Margot · Holland Park" },
                      { game: "Badminton", emoji: "🏸", host: "Freya · Holland Park" },
                      { game: "Boules", emoji: "🟢", host: "Imogen · Holland Park" }
                    ].map((entry) => (
                      <button
                        key={entry.game}
                        type="button"
                        onClick={() => setHeroSim({ name: entry.game, host: entry.host })}
                        className="cotswolds-hero-game-pill"
                      >
                        <span aria-hidden="true">{entry.emoji}</span>
                        {entry.game}
                        <span className="cotswolds-hero-game-play" aria-hidden="true">
                          ▶ Play
                        </span>
                      </button>
                    ))}
                  </span>
                ) : null}
              </span>
            </li>
          ))}
        </ol>
      </section>

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
