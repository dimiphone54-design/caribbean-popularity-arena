"use client";

import { ArenaAgoraLiveStage } from "@/components/arena-agora-live-stage";
import { Arena2030Backdrop, Arena2030Header } from "@/components/arena-2030-backdrop";
import { CountryRoomLiveAccessGate } from "@/components/country-room-live-access-gate";
import { ArenaSlotDropshipTab, CHINA_DROPSHIP_TAB_HASH } from "@/components/arena-slot-dropship-tab";
import { ArenaSlotFashionTab, CHINA_FASHION_TAB_HASH } from "@/components/arena-slot-fashion-tab";
import { ArenaSlotFoodTab, CHINA_FOOD_TAB_HASH } from "@/components/arena-slot-food-tab";
import { ArenaSlotStudyHubTab, CHINA_STUDY_HUB_TAB_HASH } from "@/components/arena-slot-study-hub-tab";
import { CountryRoomStudyHubTabPanel } from "@/components/country-room-study-hub-tab-panel";
import { ArenaSlotGamesTab, CHINA_GAMES_TAB_HASH } from "@/components/arena-slot-games-tab";
import { ChinaDropshipRatesPanel } from "@/components/dropshipping/china-dropship-rates-panel";
import { DropshipMarketPanel } from "@/components/dropshipping/dropship-market-panel";
import { ChinaRoomFashionTabPanel } from "@/components/china-room-fashion-tab-panel";
import { ChinaRoomFoodTabPanel } from "@/components/china-room-food-tab-panel";
import { ChinaRoomGamesTabPanel } from "@/components/china-room-games-tab-panel";
import { RoomCountryPageShell } from "@/components/room-country-page-shell";
import { SiteFooter } from "@/components/site-footer";
import { getArenaSlotTabLabels } from "@/lib/arena-slot-display-locale";
import { chinaRoomGameLane } from "@/lib/east-asia-room-games";

export function ChinaRoomPage() {
  const lane = chinaRoomGameLane;
  const tabLabels = getArenaSlotTabLabels("CN");

  return (
    <>
      <main className="arena-2030 arena-2030-china-room relative min-h-screen overflow-hidden pb-56">
        <Arena2030Backdrop
          image={lane.backdropImage}
          imageOpacity="opacity-100"
          intensity="deep"
          photoFocus
        />

        <div className="relative z-10">
          <RoomCountryPageShell>
            <Arena2030Header
              liveBadge={lane.titleKickerZh ?? "中国 · 上海 · 直播舞台"}
              title={lane.title}
              titleVariant="china"
              description={lane.descriptionZh ?? lane.description}
              showYearBadge={false}
            />

            <section className="country-room-section country-room-live-stack w-full">
              <CountryRoomLiveAccessGate
                roomSlug={lane.roomSlug}
                countryId={lane.countryId}
                countryName={lane.countryName}
                flag={lane.flag}
                gateLayout="underneath"
              >
                <ArenaAgoraLiveStage
                  roomSlug={lane.roomSlug}
                  countryName={lane.countryName}
                  flag={lane.flag}
                  variant="china"
                  layout="hero"
                  gameLabel="Wushu Duilian · 武术对练"
                />
              </CountryRoomLiveAccessGate>
            </section>

            <ArenaSlotDropshipTab
              mode="room"
              sectionId={CHINA_DROPSHIP_TAB_HASH}
              countryName={lane.countryName}
              label={tabLabels.dropshipping}
            >
              <ChinaDropshipRatesPanel />
              <DropshipMarketPanel
                countryId={lane.countryId}
                countryName={lane.countryName}
                flag={lane.flag}
                layout="room"
              />
            </ArenaSlotDropshipTab>

            <section className="country-room-section w-full">
              <div className="ai-real-slot-slot-tabs uk-room-country-tabs">
                <ArenaSlotGamesTab
                  mode="room"
                  sectionId={CHINA_GAMES_TAB_HASH}
                  countryName={lane.countryName}
                  label={tabLabels.games}
                >
                  <ChinaRoomGamesTabPanel />
                </ArenaSlotGamesTab>
                <ArenaSlotFashionTab
                  mode="room"
                  sectionId={CHINA_FASHION_TAB_HASH}
                  countryName={lane.countryName}
                  label={tabLabels.fashion}
                >
                  <ChinaRoomFashionTabPanel />
                </ArenaSlotFashionTab>
                <ArenaSlotFoodTab
                  mode="room"
                  sectionId={CHINA_FOOD_TAB_HASH}
                  countryName={lane.countryName}
                  label={tabLabels.food}
                >
                  <ChinaRoomFoodTabPanel />
                </ArenaSlotFoodTab>
                <ArenaSlotStudyHubTab
                  mode="room"
                  sectionId={CHINA_STUDY_HUB_TAB_HASH}
                  countryName={lane.countryName}
                  label={tabLabels.studyHub}
                >
                  <CountryRoomStudyHubTabPanel countryId="china" />
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