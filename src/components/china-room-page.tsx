"use client";

import { ArenaAgoraLiveStage } from "@/components/arena-agora-live-stage";
import { Arena2030Backdrop, Arena2030Header } from "@/components/arena-2030-backdrop";
import { ChinaWushuWarfarePanel } from "@/components/china-wushu-warfare-panel";
import { CountryRoomLiveAccessGate } from "@/components/country-room-live-access-gate";
import { DropshipMarketPanel } from "@/components/dropshipping/dropship-market-panel";
import { EastAsiaRoomGamesPanel } from "@/components/east-asia-room-games-panel";
import { RoomCountryPageShell } from "@/components/room-country-page-shell";
import { SiteFooter } from "@/components/site-footer";
import { chinaRoomGameLane } from "@/lib/east-asia-room-games";

export function ChinaRoomPage() {
  const lane = chinaRoomGameLane;

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
                <ChinaWushuWarfarePanel />
                <EastAsiaRoomGamesPanel lane={lane} />
              </CountryRoomLiveAccessGate>
            </section>

            <DropshipMarketPanel
              countryId={lane.countryId}
              countryName={lane.countryName}
              flag={lane.flag}
              layout="room"
            />
          </RoomCountryPageShell>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
