"use client";

import { useEffect } from "react";
import { RoomCountryPageShell } from "@/components/room-country-page-shell";
import { SiteFooter } from "@/components/site-footer";
import { TRINIDAD_DROPSHIP_TAB_HASH } from "@/components/arena-slot-dropship-tab";
import { TRINIDAD_FASHION_TAB_HASH } from "@/components/arena-slot-fashion-tab";
import { TRINIDAD_FOOD_TAB_HASH } from "@/components/arena-slot-food-tab";
import { TRINIDAD_GAMES_TAB_HASH } from "@/components/arena-slot-games-tab";
import { ArenaSlotAiPowerhouseTab } from "@/components/arena-slot-ai-powerhouse-tab";
import { TRINIDAD_STUDY_HUB_TAB_HASH } from "@/components/arena-slot-study-hub-tab";
import { DropshipMarketPanel } from "@/components/dropshipping/dropship-market-panel";
import { PublicDropshipGate } from "@/components/dropshipping/public-dropship-gate";
import { TrinidadStudyHubTabPanel } from "@/components/trinidad-study-hub-tab-panel";
import { TrinidadRoomGamesPanel } from "@/components/trinidad-room-games-panel";
import { TrinidadRoomFashionTabPanel } from "@/components/trinidad-room-fashion-tab-panel";
import { TrinidadRoomFoodTabPanel } from "@/components/trinidad-room-food-tab-panel";
import { getArenaSlotTabLabels } from "@/lib/arena-slot-display-locale";

const TRINIDAD_ROOM_BG = "#080312";

export function TrinidadRoomPage() {
  const tabLabels = getArenaSlotTabLabels("TT");

  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    const prevHtml = html.style.backgroundColor;
    const prevBody = body.style.backgroundColor;
    html.style.backgroundColor = TRINIDAD_ROOM_BG;
    body.style.backgroundColor = TRINIDAD_ROOM_BG;
    return () => {
      html.style.backgroundColor = prevHtml;
      body.style.backgroundColor = prevBody;
    };
  }, []);

  return (
    <>
      <main
        className="arena-2030 trinidad-room relative flex min-h-screen flex-col overflow-hidden"
        style={{ backgroundColor: TRINIDAD_ROOM_BG }}
        lang="en-TT"
      >
        <div
          className="absolute inset-0 z-0"
          style={{ backgroundImage: 'url("/trinidad-maracas-bay.jpg")', backgroundSize: "cover", backgroundPosition: "center" }}
          aria-hidden="true"
        />
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#080312]/60 via-transparent to-[#080312]" />
        <div className="trinidad-room-backdrop-veil" aria-hidden="true" />

        <div className="relative z-10">
          <RoomCountryPageShell>
            <header className="text-center">
              <h1 className="mt-4 text-4xl font-black text-white sm:text-6xl">
                <span className="mr-3 text-5xl sm:text-7xl">🇹🇹</span>
                Trinidad &amp; Tobago
              </h1>
              <p className="mt-2 mx-auto max-w-xl text-center text-base italic leading-7 text-white/60 sm:text-lg">
                &ldquo;The twin-island republic where calypso rhythm meets carnival colour.&rdquo;
              </p>
            </header>

            <section className="w-full">
              <TrinidadRoomGamesPanel />
            </section>

            <PublicDropshipGate>
              <section
                id={TRINIDAD_DROPSHIP_TAB_HASH}
                className="w-full scroll-mt-24"
                aria-label={`${tabLabels.dropshipping} · Trinidad & Tobago`}
              >
                <DropshipMarketPanel
                  countryId="trinidad"
                  countryName="Trinidad & Tobago"
                  flag="🇹🇹"
                  layout="room"
                />
              </section>
            </PublicDropshipGate>

            <section
              id={TRINIDAD_FASHION_TAB_HASH}
              className="w-full scroll-mt-24"
              aria-label={`Culture · Trinidad & Tobago`}
            >
              <TrinidadRoomFashionTabPanel />
            </section>

            <section
              id={TRINIDAD_FOOD_TAB_HASH}
              className="w-full scroll-mt-24"
              aria-label={`${tabLabels.food} · Trinidad & Tobago`}
            >
              <TrinidadRoomFoodTabPanel />
            </section>

            <section
              id={TRINIDAD_STUDY_HUB_TAB_HASH}
              className="w-full scroll-mt-24"
              aria-label={`${tabLabels.studyHub} · Trinidad & Tobago`}
            >
              <TrinidadStudyHubTabPanel />
            </section>

            <section className="w-full px-1" aria-label="AI Powerhouse · Trinidad & Tobago">
              <ArenaSlotAiPowerhouseTab mode="link" label={tabLabels.aiPowerhouse} />
            </section>
          </RoomCountryPageShell>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
