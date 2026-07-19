"use client";

import { Arena2030Backdrop, Arena2030Header } from "@/components/arena-2030-backdrop";
import { CountryRoomStudyHubTabPanel } from "@/components/country-room-study-hub-tab-panel";
import {
  DropshipMarketPanel,
  DropshipMarketRoomIntroPanel
} from "@/components/dropshipping/dropship-market-panel";
import { PublicDropshipGate } from "@/components/dropshipping/public-dropship-gate";
import { JapanGachaCapsulePanel } from "@/components/japan-gacha-capsule-panel";
import { JapanRoomAnimeDropsPanel } from "@/components/japan-room-anime-drops-panel";
import { JapanRoomFashionTabPanel } from "@/components/japan-room-fashion-tab-panel";
import { JapanRoomFoodTabPanel } from "@/components/japan-room-food-tab-panel";
import { JapanRoomGamesTabPanel } from "@/components/japan-room-games-tab-panel";
import { JapanRoomJBeautyPanel } from "@/components/japan-room-jbeauty-panel";
import { JapanRoomSnacksPanel } from "@/components/japan-room-snacks-panel";
import { JapanRoomStationeryPanel } from "@/components/japan-room-stationery-panel";
import { ArenaSlotAiPowerhouseTab } from "@/components/arena-slot-ai-powerhouse-tab";
import { RoomCountryPageShell } from "@/components/room-country-page-shell";
import { SiteFooter } from "@/components/site-footer";
import { japanRoomGameLane } from "@/lib/east-asia-room-games";

/** Japan room · standalone panels: header → dropship → gacha → anime → jbeauty → study hub → games → stationery → snacks → fashion → food */
export function JapanRoomPage() {
  const lane = japanRoomGameLane;

  return (
    <div className="flex min-h-screen flex-col">
      <main className="arena-2030 arena-2030-japan-room relative flex-1 overflow-hidden">
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

            <div className="space-y-1.5">
            {/* ── Japan Dropshipping (public hidden · Command Center only) ── */}
            <PublicDropshipGate>
              <section className="w-full px-1" aria-label="Japan Dropshipping market">
                <div className="a2030-holo-panel rounded-[1.25rem] border border-[#ff4466]/20 p-2.5 sm:p-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="text-[9px] font-black uppercase tracking-[0.16em] text-[#ff4466]">🇯🇵 Japan dropshipping</p>
                    <span className="inline-flex h-1.5 w-1.5 rounded-full bg-[#ff4466]" />
                  </div>
                  <div className="japan-room-dropship-head-stack mt-2">
                    <DropshipMarketRoomIntroPanel
                      countryId={lane.countryId}
                      countryName={lane.countryName}
                      flag={lane.flag}
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
                </div>
              </section>
            </PublicDropshipGate>

            {/* ── Gacha + Marketplace row ── */}
            <section className="w-full px-1" aria-label="日本ガチャ · マーケット">
              <div className="grid gap-1.5 sm:grid-cols-2">
                {/* Gacha */}
                <JapanGachaCapsulePanel />
                {/* Anime + J-Beauty stacked */}
                <div className="flex flex-col gap-1.5">
                  <JapanRoomAnimeDropsPanel />
                  <JapanRoomJBeautyPanel />
                </div>
              </div>
            </section>

            {/* ── Study Hub ── */}
            <section className="w-full px-1" aria-label="Japan Study Hub">
              <CountryRoomStudyHubTabPanel countryId="japan" />
            </section>

            <section className="w-full px-1 -mt-12" aria-label="Japan Food close to study hub">
              <JapanRoomFoodTabPanel />
            </section>

            <div className="-mt-6 space-y-1.5">
              {/* ── Sports Arena + Kendo live stage · full width ── */}
              <section className="w-full px-1" aria-label="バイラルゲーム · ライブステージ · Japan sports">
                <JapanRoomGamesTabPanel />
              </section>

              {/* ── Desk Lab · full width ── */}
              <section className="w-full px-1" aria-label="Japan Desk Lab">
                <JapanRoomStationeryPanel />
              </section>

              {/* ── Snack Lab · full width ── */}
              <section className="w-full px-1" aria-label="Japan Snack Lab">
                <JapanRoomSnacksPanel />
              </section>

              {/* ── Fashion ── */}
              <section className="w-full px-1" aria-label="Japan Fashion">
                <JapanRoomFashionTabPanel />
              </section>
            </div>

            <section className="w-full px-1" aria-label="AI Powerhouse · Japan">
              <ArenaSlotAiPowerhouseTab mode="link" label="AI POWERHOUSE" />
            </section>
            </div>
          </RoomCountryPageShell>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
