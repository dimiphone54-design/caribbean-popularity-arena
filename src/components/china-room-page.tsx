"use client";

import { ArenaAgoraLiveStage } from "@/components/arena-agora-live-stage";
import { Arena2030Backdrop, Arena2030Header } from "@/components/arena-2030-backdrop";
import { CountryRoomLiveAccessGate } from "@/components/country-room-live-access-gate";
import { ArenaSlotDropshipTab, CHINA_DROPSHIP_TAB_HASH } from "@/components/arena-slot-dropship-tab";
import { CHINA_FASHION_TAB_HASH } from "@/components/arena-slot-fashion-tab";
import { CHINA_FOOD_TAB_HASH } from "@/components/arena-slot-food-tab";
import { ArenaSlotAiPowerhouseTab } from "@/components/arena-slot-ai-powerhouse-tab";
import { CHINA_STUDY_HUB_TAB_HASH } from "@/components/arena-slot-study-hub-tab";
import { ChinaStudyHubTabPanel } from "@/components/china-study-hub-tab-panel";
import { CHINA_GAMES_TAB_HASH } from "@/components/arena-slot-games-tab";
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
      <main className="arena-2030 arena-2030-china-room relative min-h-screen overflow-hidden">
        <Arena2030Backdrop
          image={lane.backdropImage}
          imageOpacity="opacity-100"
          intensity="deep"
          photoFocus
        />

        <div className="relative z-10">
          <RoomCountryPageShell className="china-room-page-shell">
            <div className="china-room-stack" lang="zh-CN">
              <header className="china-room-stack-head w-full" lang="en">
                <Arena2030Header
                  liveBadge={lane.titleKickerZh ?? "中国 · 上海 · 直播舞台"}
                  title={lane.title || "CHINA ROOM"}
                  titleVariant="china"
                  description={lane.descriptionZh ?? lane.description}
                  showYearBadge={false}
                />
              </header>

              <section className="china-room-block country-room-live-stack w-full">
                <CountryRoomLiveAccessGate
                  roomSlug={lane.roomSlug}
                  countryId={lane.countryId}
                  countryName={lane.countryName}
                  flag={lane.flag}
                  gateLayout="underneath"
                  hideUnlockedStatus
                >
                  <ArenaAgoraLiveStage
                    roomSlug={lane.roomSlug}
                    countryName={lane.countryName}
                    flag={lane.flag}
                    variant="china"
                    layout="hero"
                    gameLabel="武术对练"
                  />
                </CountryRoomLiveAccessGate>
              </section>

              <section id={CHINA_FASHION_TAB_HASH} className="china-room-block w-full">
                <p className="china-room-block-label">{tabLabels.fashion}</p>
                <ChinaRoomFashionTabPanel />
              </section>

              <div className="china-room-block w-full">
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
              </div>

              <section id={CHINA_GAMES_TAB_HASH} className="china-room-block w-full">
                <p className="china-room-block-label">{tabLabels.games}</p>
                <ChinaRoomGamesTabPanel />
              </section>

              {/* 🤖 AI Powerhouse — right under Games */}
              <section className="china-room-block w-full" aria-label="AI Powerhouse · China">
                <p className="china-room-block-label">{tabLabels.aiPowerhouse}</p>
                <ArenaSlotAiPowerhouseTab mode="link" label={tabLabels.aiPowerhouse} />
              </section>

              <section id={CHINA_FOOD_TAB_HASH} className="china-room-block w-full">
                <p className="china-room-block-label">{tabLabels.food}</p>
                <ChinaRoomFoodTabPanel />
              </section>

              <section id={CHINA_STUDY_HUB_TAB_HASH} className="china-room-block w-full">
                <p className="china-room-block-label">{tabLabels.studyHub}</p>
                <ChinaStudyHubTabPanel />
              </section>
            </div>
          </RoomCountryPageShell>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}