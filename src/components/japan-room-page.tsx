"use client";

import { Arena2030Backdrop, Arena2030Header } from "@/components/arena-2030-backdrop";
import { CountryRoomLiveAccessGate } from "@/components/country-room-live-access-gate";
import { DropshipAiConverter } from "@/components/dropshipping/dropship-ai-converter";
import {
  DropshipMarketPanel,
  DropshipMarketRoomIntroPanel
} from "@/components/dropshipping/dropship-market-panel";
import { EastAsiaRoomGamesPanel } from "@/components/east-asia-room-games-panel";
import { JapanRoomDropshipCreatorSlot } from "@/components/japan-room-dropship-creator-slot";
import { RoomCountryPageShell } from "@/components/room-country-page-shell";
import { SiteFooter } from "@/components/site-footer";
import { japanRoomGameLane } from "@/lib/east-asia-room-games";

/** Japan room · exact stack: header → AI FX → dropship intro → market → FREEDOM GATEWAY → games */
export function JapanRoomPage() {
  const lane = japanRoomGameLane;

  return (
    <>
      <main className="arena-2030 arena-2030-japan-room relative min-h-screen overflow-hidden pb-56">
        <Arena2030Backdrop
          image={lane.backdropImage}
          imageOpacity="opacity-[0.82] sm:opacity-[0.95]"
          intensity="deep"
          photoFocus
        />

        <div className="relative z-10">
          <RoomCountryPageShell>
            <Arena2030Header
              liveBadge={lane.titleKickerJa}
              japanTitleKicker={lane.titleKickerJa}
              title={lane.title}
              titleVariant="japan"
              description={lane.descriptionJa ?? lane.description}
              showYearBadge={false}
            />

            <div className="japan-room-dropship-head-stack country-room-section">
              <DropshipAiConverter
                defaultCountryId={lane.countryId}
                defaultToCountryId="colombia"
                defaultUsd={29}
                variant="full"
              />

              <DropshipMarketRoomIntroPanel
                countryId={lane.countryId}
                countryName={lane.countryName}
                flag={lane.flag}
                stackUnderAi
              />
            </div>

            <DropshipMarketPanel
              countryId={lane.countryId}
              countryName={lane.countryName}
              flag={lane.flag}
              layout="room"
              hideRoomIntro
              hideAiConverter
            />

            <section className="country-room-section country-room-live-stack w-full">
              <div id="japan-live-gift-gate" className="w-full">
                <CountryRoomLiveAccessGate
                  roomSlug={lane.roomSlug}
                  countryId={lane.countryId}
                  countryName={lane.countryName}
                  flag={lane.flag}
                  gateLayout="underneath"
                  hideUnlockedStatus
                  belowGate={<JapanRoomDropshipCreatorSlot />}
                >
                  <EastAsiaRoomGamesPanel lane={lane} />
                </CountryRoomLiveAccessGate>
              </div>
            </section>
          </RoomCountryPageShell>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
