"use client";

import { useState } from "react";
import { CotswoldsAtmosphereOverlay } from "@/components/cotswolds-atmosphere-overlay";
import { CotswoldsGameSimulator } from "@/components/cotswolds-game-simulator";
import { CotswoldsParkVideoBackdrop } from "@/components/cotswolds-park-video-backdrop";
import { CotswoldsHeroPlayersFilm } from "@/components/cotswolds-hero-players-film";
import { CountryRoomLiveAccessGate } from "@/components/country-room-live-access-gate";
import { FreedomDriveSimulatorLazy } from "@/components/freedom-drive/freedom-drive-simulator-lazy";
import { RoomCountryPageShell } from "@/components/room-country-page-shell";
import { UkFootballHubStack } from "@/components/uk-football-hub-stack";
import { UkRoomCornerScroll } from "@/components/uk-room-corner-scroll";
import { useRoomLocale } from "@/components/room-locale-provider";
import { SiteFooter } from "@/components/site-footer";
import { UkFlagJumpingTitle, UkWindFlag } from "@/components/uk-wind-flag";
import {
  cotswoldsHeroQuarterSet,
  cotswoldsHollandParkWomen,
  cotswoldsHollandParkWomenFeed,
  cotswoldsLondonParkGirls,
  cotswoldsLondonParkGirlsFeed,
  cotswoldsMenActivityPanels,
} from "@/lib/cotswolds";
import { UK_ROOM_PANEL } from "@/lib/uk-room-panel";

function GameGraphBoard({ members }: { members: typeof cotswoldsLondonParkGirls }) {
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

export function CotswoldsPage() {
  const { t } = useRoomLocale();
  const uk = t.uk;
  const [panelOpen, setPanelOpen] = useState(true);
  const [heroSim, setHeroSim] = useState<{ name: string; host: string } | null>(null);
  const [menSim, setMenSim] = useState<{ name: string; host: string } | null>(null);
  const [driveExpanded, setDriveExpanded] = useState(false);

  return (
    <>
      <main className="arena-2030 arena-2030-cotswolds relative flex min-h-screen flex-col overflow-x-hidden pb-56">
        <UkRoomCornerScroll hidden={driveExpanded} />

        <div className="relative z-10">
          <RoomCountryPageShell topPadding="compact">
            <header className="cotswolds-hero-stack">
              <div className="cotswolds-quote-row">
                <p className="cotswolds-quote-text a2030-micro text-[10px] font-bold sm:text-xs">
                  &quot;Oi, Have you seen where that bird went, Or did she head down the road, my duck.&quot;
                </p>
                <span className="a2030-live a2030-micro inline-flex shrink-0 items-center gap-2 rounded-full border border-[#00f5ff]/30 bg-[#00f5ff]/8 px-3 py-1 text-[10px] font-bold uppercase text-[#b8ff3c]">
                  <span className="a2030-pulse-ring inline-flex h-1.5 w-1.5 rounded-full bg-[#b8ff3c]" />
                  {uk.cotswoldsSeasonsLive}
                </span>
              </div>

              <div className="cotswolds-slideshow-stage cotswolds-slideshow-stage--below-quote">
                <CotswoldsParkVideoBackdrop />
                <CotswoldsAtmosphereOverlay />
                <div className="cotswolds-slideshow-border" aria-hidden="true" />
              </div>

              <h1
                className="cotswolds-room-title flex flex-wrap items-end gap-x-3 gap-y-2 text-4xl font-black sm:gap-x-4 sm:text-6xl"
                aria-label="United Kingdom"
              >
                <UkWindFlag className="mb-1 sm:mb-1.5" />
                <UkFlagJumpingTitle text="United Kingdom" />
              </h1>
            </header>

            <figure className="cotswolds-museum-box country-room-section">
              <div className="cotswolds-museum-box-inner">
                <figcaption className="cotswolds-museum-box-label">{uk.cotswoldsMuseumLabel}</figcaption>
                <p className="cotswolds-museum-box-text">{uk.cotswoldsDescription}</p>
              </div>
            </figure>

            <UkFootballHubStack countryId="uk" countryName="United Kingdom" flag="🇬🇧" />

            <div className="w-full">
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

            <section className={UK_ROOM_PANEL} aria-label="Freedom Drive Simulator">
              <FreedomDriveSimulatorLazy
                embedInRoom
                expanded={driveExpanded}
                onToggleExpand={() => setDriveExpanded((open) => !open)}
              />
            </section>
          </RoomCountryPageShell>
        </div>

        <div className="a2030-dock a2030-dock-glass fixed inset-x-0 bottom-0 z-20">
          <div className="mx-auto max-w-3xl px-4 py-4 sm:px-6">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="a2030-uk-flag-flash" aria-hidden="true">
                  🇬🇧
                </span>
                <p className="a2030-uk-title-flash a2030-micro text-[10px] font-bold uppercase text-[#b8ff3c] sm:text-xs">
                  Men&apos;s entry // UK games
                </p>
              </div>
              <button
                type="button"
                onClick={() => setPanelOpen((open) => !open)}
                className={`cotswolds-dock-toggle a2030-micro rounded-lg border px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.12em] transition sm:text-xs${
                  panelOpen
                    ? " cotswolds-dock-toggle--hide a2030-hide-blink"
                    : " border-[#00f5ff]/30 bg-[#00f5ff]/8 text-[#00f5ff] hover:border-[#b8ff3c]/45"
                }`}
              >
                {panelOpen ? (
                  <>
                    <span className="cotswolds-dock-hide-blinker" aria-hidden="true" />
                    Hide
                  </>
                ) : (
                  "Show"
                )}
              </button>
            </div>

            {panelOpen ? (
              <div className="a2030-men-scroll mt-3 flex max-h-[min(38vh,18rem)] flex-col gap-2 overflow-y-auto overscroll-contain pr-1">
                {cotswoldsMenActivityPanels.map((panel) => (
                  <button
                    key={panel.id}
                    type="button"
                    onClick={() => setMenSim({ name: panel.simGame, host: panel.simHost })}
                    className="cotswolds-men-game-dock-link a2030-prompt rounded-lg px-3 py-2 text-left"
                  >
                    <span className="cotswolds-men-game-dock-link-title">{panel.title}</span>
                    <span className="cotswolds-men-game-dock-link-question">{panel.question}</span>
                  </button>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </main>
      {menSim ? (
        <CotswoldsGameSimulator
          gameName={menSim.name}
          host={menSim.host}
          roomKicker="Men's entry · UK games · live"
          onClose={() => setMenSim(null)}
        />
      ) : null}
      <SiteFooter />
    </>
  );
}
