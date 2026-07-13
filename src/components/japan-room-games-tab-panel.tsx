"use client";

import { CountryRoomLiveAccessGate } from "@/components/country-room-live-access-gate";
import { JapanRoomDropshipCreatorSlot } from "@/components/japan-room-dropship-creator-slot";
import { RoomSportsStack } from "@/components/room-sports-stack";
import { japanRoomGameLane } from "@/lib/east-asia-room-games";

/** Japan room · sports stack + creator slot inside Games tab */
export function JapanRoomGamesTabPanel() {
  const lane = japanRoomGameLane;

  return (
    <div className="japan-room-games-tab-panel space-y-5">
      <CountryRoomLiveAccessGate
        roomSlug={lane.roomSlug}
        countryId={lane.countryId}
        countryName={lane.countryName}
        flag={lane.flag}
        gateLayout="underneath"
        hideUnlockedStatus
        belowGate={<JapanRoomDropshipCreatorSlot />}
      >
        <RoomSportsStack
          roomSlug={lane.roomSlug}
          showStagePreview
          stageCaption={`${lane.hostLabel} · 剣 · 炎`}
        />
      </CountryRoomLiveAccessGate>
    </div>
  );
}