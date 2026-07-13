"use client";

import { useState } from "react";
import { CotswoldsGameSimulator } from "@/components/cotswolds-game-simulator";
import { CotswoldsHeroPlayersFilm } from "@/components/cotswolds-hero-players-film";
import { CountryRoomLiveAccessGate } from "@/components/country-room-live-access-gate";
import { RoomSportsStack } from "@/components/room-sports-stack";
import {
  cotswoldsHeroQuarterSet,
  cotswoldsHollandParkWomen,
  cotswoldsHollandParkWomenFeed,
  cotswoldsLondonParkGirls,
  cotswoldsLondonParkGirlsFeed,
  type CotswoldsParkMember
} from "@/lib/cotswolds";
import { UK_ROOM_PANEL } from "@/lib/uk-room-panel";

function GameGraphBoard({ members }: { members: CotswoldsParkMember[] }) {
  const [sim, setSim] = useState<{ name: string; host: string } | null>(null);

  return (
    <div className="cotswolds-game-board mt-3 space-y-2.5" role="list">
      {members.map((member, index) => {
        const parts = member.game.split("·");
        const orderTag = parts.length > 1 ? parts[0].trim() : `Game ${index + 1}`;
        const gameName = (parts.length > 1 ? parts.slice(1).join("·") : member.game).trim();
        const ready = 46 + ((member.id * 13) % 48);
        const live = sim?.name === gameName && sim?.host === member.name.split(" ")[0];

        return (
          <button
            key={member.id}
            type="button"
            onClick={() => setSim({ name: gameName, host: member.name.split(" ")[0] })}
            aria-pressed={live}
            className={`cotswolds-game-row${live ? " cotswolds-game-row--live" : ""}${
              gameName === "Best Makeup Look" ? " cotswolds-game-row--photo" : ""
            }`}
          >
            <span className="cotswolds-hero-rank cotswolds-game-rank" aria-hidden="true">
              <span className="cotswolds-hero-rank-word">SET</span>
              <span className="cotswolds-hero-rank-num">{String(index + 1).padStart(2, "0")}</span>
            </span>
            <span className="cotswolds-game-main">
              {gameName === "Best Makeup Look" ? (
                <span className="cotswolds-game-tournament">💄 Makeup Tournament · Live 3h</span>
              ) : null}
              <span className="cotswolds-game-tag">{orderTag}</span>
              <span className="cotswolds-game-name">
                <span className="cotswolds-game-flag">{member.flag}</span>
                {gameName}
              </span>
              <span className="cotswolds-game-host">
                {member.name.split(" ")[0]} · {member.area} · {member.age}
              </span>
              <span className="cotswolds-game-graph" aria-hidden="true">
                <span
                  className="cotswolds-game-graph-fill"
                  style={{ width: `${live ? 100 : ready}%` }}
                />
              </span>
              <span className="cotswolds-game-meter">
                {live ? "In the simulator · play live" : `${ready}% ready · tap to play`}
              </span>
            </span>
            <span className={`cotswolds-game-cta${live ? " cotswolds-game-cta--live" : ""}`}>
              {live ? "● PLAYING" : "▶ PLAY GAME"}
            </span>
          </button>
        );
      })}

      {sim ? (
        <CotswoldsGameSimulator gameName={sim.name} host={sim.host} onClose={() => setSim(null)} />
      ) : null}
    </div>
  );
}

/** UK room · full games stack inside Games tab (registry + park lanes + live gate) */
export function UkRoomGamesTabPanel() {
  const [heroSim, setHeroSim] = useState<{ name: string; host: string } | null>(null);

  return (
    <div className="uk-room-games-tab-panel space-y-5">
      <RoomSportsStack roomSlug="uk-flag-cotswolds" gamesOnly />

      <CountryRoomLiveAccessGate
        roomSlug="uk-flag-cotswolds"
        countryId="uk"
        countryName="United Kingdom"
        flag="🇬🇧"
      >
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

        <section className={UK_ROOM_PANEL}>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="a2030-electric-flash a2030-micro text-[10px] font-bold uppercase text-[#b8ff3c] sm:text-xs">
              🇬🇧 UK park games
            </p>
            <span className="a2030-pulse-ring inline-flex h-2 w-2 rounded-full bg-[#b8ff3c]" />
          </div>

          <p className="a2030-electric-flash a2030-micro mt-5 text-[10px] font-bold uppercase text-[#ffb8ef]">
            {cotswoldsLondonParkGirls.map((member) => member.game.split("·").pop()?.trim()).join(" · ")}
          </p>
          <GameGraphBoard members={cotswoldsLondonParkGirls} />
          {cotswoldsLondonParkGirlsFeed.caption ? (
            <p className="mt-2 text-xs text-[#9fb4d4]">{cotswoldsLondonParkGirlsFeed.caption}</p>
          ) : null}

          <p className="a2030-micro mt-5 text-[10px] font-bold uppercase text-[#ffb8ef]">
            4 Holland Park women // ages 22 & 25 — click to play
          </p>
          <GameGraphBoard members={cotswoldsHollandParkWomen} />
          <p className="mt-2 text-xs text-[#9fb4d4]">{cotswoldsHollandParkWomenFeed.caption}</p>
        </section>
      </CountryRoomLiveAccessGate>
    </div>
  );
}