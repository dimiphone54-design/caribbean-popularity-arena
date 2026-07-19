"use client";

import { CountryRoomLiveAccessGate } from "@/components/country-room-live-access-gate";
import { JapanSportsTrendsPanel } from "@/components/japan-sports-trends-panel";
import { RoomCountryGamesPanel } from "@/components/room-country-games-panel";
import { japanRoomGameLane } from "@/lib/east-asia-room-games";
import { getRoomGamesConfig } from "@/lib/room-games-registry";

/** Japan room · Sports Arena + Kendo live stage (full width, working play) */
export function JapanRoomGamesTabPanel() {
  const lane = japanRoomGameLane;
  const games = getRoomGamesConfig(lane.roomSlug);

  return (
    <div className="japan-room-games-tab-panel space-y-4" aria-label="Japan sports and live stage">
      <JapanSportsTrendsPanel />

      {games ? (
        <section className="w-full" aria-label="バイラルゲーム · ライブステージ">
          <CountryRoomLiveAccessGate
            roomSlug={lane.roomSlug}
            countryId={lane.countryId}
            countryName={lane.countryName}
            flag={lane.flag}
            gateLayout="underneath"
            hideUnlockedStatus
          >
            {/* One Kendo in-room: stage preview + single PLAY row (no auto-popup on enter) */}
            <RoomCountryGamesPanel
              config={games}
              showStagePreview
              stageCaption={`${lane.hostLabel} · 剣 · 炎`}
            />
          </CountryRoomLiveAccessGate>
        </section>
      ) : null}
    </div>
  );
}
