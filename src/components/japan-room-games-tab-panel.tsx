"use client";

import { CountryRoomLiveAccessGate } from "@/components/country-room-live-access-gate";
import { JapanSportsTrendsPanel } from "@/components/japan-sports-trends-panel";
import { RoomCountryGamesPanel } from "@/components/room-country-games-panel";
import { japanRoomGameLane } from "@/lib/east-asia-room-games";
import { getRoomGamesConfig } from "@/lib/room-games-registry";

/** Japan room · sports trends + games only */
export function JapanRoomGamesTabPanel() {
  const lane = japanRoomGameLane;
  const games = getRoomGamesConfig(lane.roomSlug);

  return (
    <div className="japan-room-games-tab-panel space-y-5">
      <JapanSportsTrendsPanel />

      {games ? (
        <CountryRoomLiveAccessGate
          roomSlug={lane.roomSlug}
          countryId={lane.countryId}
          countryName={lane.countryName}
          flag={lane.flag}
          gateLayout="underneath"
          hideUnlockedStatus
        >
          <RoomCountryGamesPanel
            config={games}
            showStagePreview
            stageCaption={`${lane.hostLabel} · 剣 · 炎`}
          />
        </CountryRoomLiveAccessGate>
      ) : null}
    </div>
  );
}
