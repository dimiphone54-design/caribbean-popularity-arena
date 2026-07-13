"use client";

import { useEffect, useState } from "react";
import { RoomCountryPageShell } from "@/components/room-country-page-shell";
import { SiteFooter } from "@/components/site-footer";
import { ArenaSlotDropshipTab, ECUADOR_DROPSHIP_TAB_HASH } from "@/components/arena-slot-dropship-tab";
import { ArenaSlotFashionTab, ECUADOR_FASHION_TAB_HASH } from "@/components/arena-slot-fashion-tab";
import { ArenaSlotFoodTab, ECUADOR_FOOD_TAB_HASH } from "@/components/arena-slot-food-tab";
import { ArenaSlotStudyHubTab, ECUADOR_STUDY_HUB_TAB_HASH } from "@/components/arena-slot-study-hub-tab";
import { CountryRoomStudyHubTabPanel } from "@/components/country-room-study-hub-tab-panel";
import { ArenaSlotGamesTab, ECUADOR_GAMES_TAB_HASH } from "@/components/arena-slot-games-tab";
import { DropshipMarketPanel } from "@/components/dropshipping/dropship-market-panel";
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
    window.setTimeout(() => {
      document.getElementById(ECUADOR_LIVE_GAMES_ID)?.scrollIntoView({ behavior: "smooth", block: "center" });
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
                <div className="w-full">
                  <EcuadorRoomLiveSlot />
                </div>
              </section>

              <ArenaSlotDropshipTab
                mode="room"
                sectionId={ECUADOR_DROPSHIP_TAB_HASH}
                countryName="Ecuador"
                label={tabLabels.dropshipping}
              >
                <DropshipMarketPanel
                  countryId="ecuador"
                  countryName="Ecuador"
                  flag="🇪🇨"
                  layout="room"
                />
              </ArenaSlotDropshipTab>

              <section className="country-room-section ecuador-stat-panels-section w-full">
                <div className="ecuador-stat-panels-grid">
                  {ecuadorIronFangStatPanels.map((panel) => (
                    <EcuadorIronFangStatPanelCard
                      key={panel.kicker + panel.title}
                      panel={panel}
                      onPlayGame={launchLiveGame}
                      onLaunchFootball={() => {
                        document.getElementById("ecuador-room-football")?.scrollIntoView({
                          behavior: "smooth",
                          block: "center"
                        });
                      }}
                    />
                  ))}
                </div>
              </section>

              <section className="country-room-section w-full">
                <div className="ai-real-slot-slot-tabs uk-room-country-tabs">
                  <ArenaSlotGamesTab
                    mode="room"
                    sectionId={ECUADOR_GAMES_TAB_HASH}
                    countryName="Ecuador"
                    label={tabLabels.games}
                  >
                    <EcuadorRoomGamesTabPanel
                      requestedGameId={requestedGame}
                      onRequestedGameHandled={() => setRequestedGame(null)}
                    />
                  </ArenaSlotGamesTab>
                  <ArenaSlotFashionTab
                    mode="room"
                    sectionId={ECUADOR_FASHION_TAB_HASH}
                    countryName="Ecuador"
                    label={tabLabels.fashion}
                  >
                    <EcuadorRoomFashionTabPanel />
                  </ArenaSlotFashionTab>
                  <ArenaSlotFoodTab
                    mode="room"
                    sectionId={ECUADOR_FOOD_TAB_HASH}
                    countryName="Ecuador"
                    label={tabLabels.food}
                  >
                    <EcuadorRoomFoodTabPanel />
                  </ArenaSlotFoodTab>
                  <ArenaSlotStudyHubTab
                    mode="room"
                    sectionId={ECUADOR_STUDY_HUB_TAB_HASH}
                    countryName="Ecuador"
                    label={tabLabels.studyHub}
                  >
                    <CountryRoomStudyHubTabPanel countryId="ecuador" />
                  </ArenaSlotStudyHubTab>
                </div>
              </section>

            </div>
          </RoomCountryPageShell>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
