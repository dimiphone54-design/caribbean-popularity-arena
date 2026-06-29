"use client";

import { useEffect, useState } from "react";
import { RoomCountryPageShell } from "@/components/room-country-page-shell";
import { SiteFooter } from "@/components/site-footer";
import { CountryRoomLiveAccessGate } from "@/components/country-room-live-access-gate";
import { DropshipMarketPanel } from "@/components/dropshipping/dropship-market-panel";
import { EcuadorRoomLiveSlot } from "@/components/ecuador-room-live-slot";
import { EcuadorRoomGamesPanel } from "@/components/ecuador-room-games-panel";
import { EcuadorThePit } from "@/components/ecuador-the-pit";
import { FreedomDriveSimulatorLazy } from "@/components/freedom-drive/freedom-drive-simulator-lazy";
import { EcuadorIronFangStatPanelCard } from "@/components/ecuador-iron-fang-stat-panel";
import { EcuadorCulture2028Panel } from "@/components/ecuador-culture-2028-panel";
import { EcuadorFoodPanel } from "@/components/ecuador-food-panel";
import { ecuadorIronFangStatPanels, ecuadorRoomBrand, type EcuadorRoomGameSelection } from "@/lib/ecuador-country";

const ECUADOR_ROOM_SLUG = "ecuador-room";
const ECUADOR_LIVE_GAMES_ID = "ecuador-live-games";
const ECUADOR_FREEDOM_DRIVE_ID = "ecuador-freedom-drive";
const ECUADOR_ROOM_BG = "#040a08";

const ecuadorBackdrops = [
  "/ecuador-room-banco-guayaquil.png",
  "/ecuador-room-indurama-team.png",
  "/ecuador-room-gaming-party.png",
  "/ecuador-room-crein-meeting.png"
];

export function EcuadorRoomPage() {
  const [slide, setSlide] = useState(0);
  const [requestedGame, setRequestedGame] = useState<EcuadorRoomGameSelection | null>(null);
  const [driveExpanded, setDriveExpanded] = useState(false);

  const launchLiveGame = (gameId: EcuadorRoomGameSelection) => {
    setRequestedGame(gameId);
    const targetId = gameId === "Ecuador Drive" ? ECUADOR_FREEDOM_DRIVE_ID : ECUADOR_LIVE_GAMES_ID;
    window.setTimeout(() => {
      document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 0);
  };

  useEffect(() => {
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const id = window.setInterval(() => {
      setSlide((current) => (current + 1) % ecuadorBackdrops.length);
    }, 5200);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    const prevHtml = html.style.backgroundColor;
    const prevBody = body.style.backgroundColor;

    html.style.backgroundColor = ECUADOR_ROOM_BG;
    body.style.backgroundColor = ECUADOR_ROOM_BG;

    return () => {
      html.style.backgroundColor = prevHtml;
      body.style.backgroundColor = prevBody;
    };
  }, []);

  return (
    <>
      <main
        className="arena-2030 ecuador-room relative flex min-h-screen flex-col overflow-hidden"
        style={{ backgroundColor: ECUADOR_ROOM_BG }}
      >
        <div className="ecuador-room-slideshow" aria-hidden="true">
          {ecuadorBackdrops.map((src, index) => (
            <div
              key={src}
              className={`ecuador-room-slide${index === slide ? " ecuador-room-slide--active" : ""}`}
              style={{ backgroundImage: `url("${src}")` }}
            />
          ))}
        </div>
        <div className="ecuador-room-backdrop-veil" aria-hidden="true" />
        <div className="ecuador-room-aurora" aria-hidden="true" />

        <div className="relative z-10">
          <RoomCountryPageShell>

            <header className="country-room-header mt-6 text-center">
              <h1 className="ecuador-room-title ecuador-letters-flash flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-4xl font-black sm:text-6xl">
                <span className="ecuador-flag-rotate" aria-hidden="true">
                  🇪🇨
                </span>
                <span>{ecuadorRoomBrand.welcomeTitle}</span>
              </h1>
              <p className="mx-auto mt-3 max-w-xl text-base italic leading-7 text-[#d4d4d8] sm:text-lg">
                &ldquo;{ecuadorRoomBrand.tagline}&rdquo;
              </p>
            </header>

            <div className="ecuador-room-body mx-auto flex w-full flex-col">
              <section className="country-room-section country-room-live-stack w-full">
                <div id="ecuador-live-gift-gate" className="w-full">
                  <CountryRoomLiveAccessGate
                    roomSlug={ECUADOR_ROOM_SLUG}
                    countryId="ecuador"
                    countryName="Ecuador"
                    flag="🇪🇨"
                    variant="romantic"
                    hideUnlockedStatus
                  >
                    <EcuadorRoomLiveSlot />
                  </CountryRoomLiveAccessGate>
                </div>
              </section>

              <DropshipMarketPanel
                countryId="ecuador"
                countryName="Ecuador"
                flag="🇪🇨"
                layout="room"
              />

              <section className="country-room-section ecuador-stat-panels-section w-full">
                <div className="ecuador-stat-panels-grid">
                  {ecuadorIronFangStatPanels.map((panel) => (
                    <EcuadorIronFangStatPanelCard
                      key={panel.kicker + panel.title}
                      panel={panel}
                      onPlayGame={launchLiveGame}
                      onLaunchFreedomDrive={() => launchLiveGame("Ecuador Drive")}
                    />
                  ))}
                </div>
              </section>

              <section className="country-room-section w-full">
                <EcuadorThePit>
                  <EcuadorRoomGamesPanel
                    requestedGame={requestedGame}
                    onRequestedGameHandled={() => setRequestedGame(null)}
                  />
                </EcuadorThePit>
              </section>

              <section
                id={ECUADOR_FREEDOM_DRIVE_ID}
                className="country-room-section ecuador-freedom-drive-section w-full"
                aria-label="Ecuador Drive Simulator"
              >
                <FreedomDriveSimulatorLazy
                  embedInRoom
                  locale="ecuador"
                  expanded={driveExpanded}
                  onToggleExpand={() => setDriveExpanded((open) => !open)}
                />
              </section>

              <EcuadorCulture2028Panel />

              <EcuadorFoodPanel />
            </div>
          </RoomCountryPageShell>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
