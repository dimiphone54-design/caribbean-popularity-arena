"use client";

import { useEffect, useState } from "react";
import { RoomCountryPageShell } from "@/components/room-country-page-shell";
import { SiteFooter } from "@/components/site-footer";
import { ECUADOR_DROPSHIP_TAB_HASH } from "@/components/arena-slot-dropship-tab";
import { ECUADOR_FASHION_TAB_HASH } from "@/components/arena-slot-fashion-tab";
import { ECUADOR_FOOD_TAB_HASH } from "@/components/arena-slot-food-tab";
import { ArenaSlotAiPowerhouseTab } from "@/components/arena-slot-ai-powerhouse-tab";
import { ECUADOR_STUDY_HUB_TAB_HASH } from "@/components/arena-slot-study-hub-tab";
import { CountryRoomStudyHubTabPanel } from "@/components/country-room-study-hub-tab-panel";
import { ECUADOR_GAMES_TAB_HASH } from "@/components/arena-slot-games-tab";
import { DropshipMarketPanel } from "@/components/dropshipping/dropship-market-panel";
import { PublicDropshipGate } from "@/components/dropshipping/public-dropship-gate";
import { EcuadorRoomFashionTabPanel } from "@/components/ecuador-room-fashion-tab-panel";
import { EcuadorRoomFoodTabPanel } from "@/components/ecuador-room-food-tab-panel";
import { EcuadorRoomGamesTabPanel } from "@/components/ecuador-room-games-tab-panel";
import { EcuadorRoomLiveSlot } from "@/components/ecuador-room-live-slot";
import { EcuadorIronFangStatPanelCard } from "@/components/ecuador-iron-fang-stat-panel";
import { getArenaSlotTabLabels } from "@/lib/arena-slot-display-locale";
import { ecuadorIronFangStatPanels, ecuadorRoomBrand, type EcuadorRoomGameSelection } from "@/lib/ecuador-country";

const ECUADOR_LIVE_GAMES_ID = "ecuador-live-games";
const ECUADOR_ROOM_BG = "#040a08";

const ecuadorBackdrops = [
  "/ecuador-room-banco-guayaquil.png",
  "/ecuador-room-indurama-team.png",
  "/ecuador-room-gaming-party.png",
  "/ecuador-room-crein-meeting.png"
];

export function EcuadorRoomPage() {
  const tabLabels = getArenaSlotTabLabels("EC");
  const [slide, setSlide] = useState(0);
  const [requestedGame, setRequestedGame] = useState<EcuadorRoomGameSelection | null>(null);

  const launchLiveGame = (gameId: EcuadorRoomGameSelection) => {
    setRequestedGame(gameId);
    // Open Juegos tab (hash) so Dominó / Ecuavoley panels are visible
    if (typeof window !== "undefined") {
      window.location.hash = ECUADOR_GAMES_TAB_HASH;
    }
    window.setTimeout(() => {
      const target =
        gameId === "Dominó Ecuatoriano"
          ? document.querySelector(".domino-root")
          : document.getElementById(ECUADOR_LIVE_GAMES_ID);
      target?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 120);
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
        lang="es-EC"
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
          <RoomCountryPageShell className="ecuador-room-page-shell">
            <div className="ecuador-room-stack">
              {/* Bienvenidos + dual Arena Flash live · tight stack */}
              <div className="ecuador-welcome-live-cluster w-full">
                <header className="ecuador-room-stack-head w-full text-center">
                  <h1 className="ecuador-room-title ecuador-letters-flash flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-4xl font-black sm:text-6xl">
                    <span className="ecuador-flag-rotate" aria-hidden="true">
                      🇪🇨
                    </span>
                    <span>{ecuadorRoomBrand.welcomeTitle}</span>
                  </h1>
                  <p className="ecuador-room-tagline mx-auto max-w-xl text-base italic leading-7 text-[#d4d4d8] sm:text-lg">
                    &ldquo;{ecuadorRoomBrand.tagline}&rdquo;
                  </p>
                </header>

                <section className="ecuador-room-block country-room-live-stack w-full">
                  <EcuadorRoomLiveSlot />
                </section>
              </div>

              <PublicDropshipGate>
                <section
                  id={ECUADOR_DROPSHIP_TAB_HASH}
                  className="ecuador-room-block ecuador-dropship-section w-full scroll-mt-24"
                  aria-label={`${tabLabels.dropshipping} · Ecuador`}
                >
                  <DropshipMarketPanel
                    countryId="ecuador"
                    countryName="Ecuador"
                    flag="🇪🇨"
                    layout="room"
                  />
                </section>
              </PublicDropshipGate>

              <section
                id={ECUADOR_GAMES_TAB_HASH}
                className="ecuador-room-block ecuador-juegos-section w-full scroll-mt-24"
                aria-label={`${tabLabels.games} · Ecuador`}
              >
                <EcuadorRoomGamesTabPanel
                  requestedGameId={requestedGame}
                  onRequestedGameHandled={() => setRequestedGame(null)}
                />
              </section>

              <section
                id={ECUADOR_STUDY_HUB_TAB_HASH}
                className="ecuador-room-block ecuador-study-hub-section w-full scroll-mt-24"
                aria-label={`${tabLabels.studyHub} · Ecuador`}
              >
                <CountryRoomStudyHubTabPanel countryId="ecuador" />
              </section>

              <section className="ecuador-room-block ecuador-stat-panels-section w-full">
                <div className="ecuador-stat-panels-grid">
                  {ecuadorIronFangStatPanels.map((panel) => (
                    <EcuadorIronFangStatPanelCard
                      key={panel.kicker + panel.title}
                      panel={panel}
                      onPlayGame={launchLiveGame}
                      onLaunchFootball={() => {
                        document.getElementById(ECUADOR_LIVE_GAMES_ID)?.scrollIntoView({
                          behavior: "smooth",
                          block: "center"
                        });
                        if (typeof window !== "undefined") {
                          window.location.hash = ECUADOR_GAMES_TAB_HASH;
                        }
                      }}
                    />
                  ))}
                </div>
              </section>

              <section
                id={ECUADOR_FASHION_TAB_HASH}
                className="ecuador-room-block ecuador-moda-section w-full scroll-mt-24"
                aria-label={`${tabLabels.fashion} · Ecuador`}
              >
                <EcuadorRoomFashionTabPanel />
              </section>

              <section
                id={ECUADOR_FOOD_TAB_HASH}
                className="ecuador-room-block ecuador-comida-section w-full scroll-mt-24"
                aria-label={`${tabLabels.food} · Ecuador`}
              >
                <EcuadorRoomFoodTabPanel />
              </section>

              <section className="w-full px-1" aria-label="AI Powerhouse · Ecuador">
                <ArenaSlotAiPowerhouseTab mode="link" label={tabLabels.aiPowerhouse} />
              </section>
            </div>
          </RoomCountryPageShell>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
