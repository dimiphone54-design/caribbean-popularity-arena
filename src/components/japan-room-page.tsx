"use client";

import { Arena2030Backdrop, Arena2030Header } from "@/components/arena-2030-backdrop";
import { ArenaSlotDropshipTab, JAPAN_DROPSHIP_TAB_HASH } from "@/components/arena-slot-dropship-tab";
import { ArenaSlotFashionTab, JAPAN_FASHION_TAB_HASH } from "@/components/arena-slot-fashion-tab";
import { ArenaSlotFoodTab, JAPAN_FOOD_TAB_HASH } from "@/components/arena-slot-food-tab";
import { ArenaSlotStudyHubTab, JAPAN_STUDY_HUB_TAB_HASH } from "@/components/arena-slot-study-hub-tab";
import { CountryRoomStudyHubTabPanel } from "@/components/country-room-study-hub-tab-panel";
import { ArenaSlotGamesTab, JAPAN_GAMES_TAB_HASH } from "@/components/arena-slot-games-tab";
import { DropshipAiConverter } from "@/components/dropshipping/dropship-ai-converter";
import {
  DropshipMarketPanel,
  DropshipMarketRoomIntroPanel
} from "@/components/dropshipping/dropship-market-panel";
import { JapanRoomFashionTabPanel } from "@/components/japan-room-fashion-tab-panel";
import { JapanRoomFoodTabPanel } from "@/components/japan-room-food-tab-panel";
import { JapanRoomGamesTabPanel } from "@/components/japan-room-games-tab-panel";
import { RoomCountryPageShell } from "@/components/room-country-page-shell";
import { SiteFooter } from "@/components/site-footer";
import { getArenaSlotTabLabels } from "@/lib/arena-slot-display-locale";
import { japanRoomGameLane } from "@/lib/east-asia-room-games";

/** Japan room · exact stack: header → dropship tab → games · fashion · food tabs */
export function JapanRoomPage() {
  const lane = japanRoomGameLane;
  const tabLabels = getArenaSlotTabLabels("JP");

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

            <ArenaSlotDropshipTab
              mode="room"
              sectionId={JAPAN_DROPSHIP_TAB_HASH}
              countryName={lane.countryName}
              label={tabLabels.dropshipping}
            >
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
            </ArenaSlotDropshipTab>

            <section className="country-room-section w-full">
              <div className="ai-real-slot-slot-tabs uk-room-country-tabs">
                <ArenaSlotGamesTab
                  mode="room"
                  sectionId={JAPAN_GAMES_TAB_HASH}
                  countryName={lane.countryName}
                  label={tabLabels.games}
                >
                  <JapanRoomGamesTabPanel />
                </ArenaSlotGamesTab>
                <ArenaSlotFashionTab
                  mode="room"
                  sectionId={JAPAN_FASHION_TAB_HASH}
                  countryName={lane.countryName}
                  label={tabLabels.fashion}
                >
                  <JapanRoomFashionTabPanel />
                </ArenaSlotFashionTab>
                <ArenaSlotFoodTab
                  mode="room"
                  sectionId={JAPAN_FOOD_TAB_HASH}
                  countryName={lane.countryName}
                  label={tabLabels.food}
                >
                  <JapanRoomFoodTabPanel />
                </ArenaSlotFoodTab>
                <ArenaSlotStudyHubTab
                  mode="room"
                  sectionId={JAPAN_STUDY_HUB_TAB_HASH}
                  countryName={lane.countryName}
                  label={tabLabels.studyHub}
                >
                  <CountryRoomStudyHubTabPanel countryId="japan" />
                </ArenaSlotStudyHubTab>
              </div>
            </section>
          </RoomCountryPageShell>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}