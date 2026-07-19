"use client";

import { ChinaWushuWarfarePanel } from "@/components/china-wushu-warfare-panel";
import { CountryRoomLiveAccessGate } from "@/components/country-room-live-access-gate";
import { RoomSportsStack } from "@/components/room-sports-stack";
import { chinaRoomGameLane } from "@/lib/east-asia-room-games";

/** China room · Wushu + sports stack inside Games tab */
export function ChinaRoomGamesTabPanel() {
  const lane = chinaRoomGameLane;

  return (
    <div className="china-room-games-tab-panel">
      <CountryRoomLiveAccessGate
        roomSlug={lane.roomSlug}
        countryId={lane.countryId}
        countryName={lane.countryName}
        flag={lane.flag}
        gateLayout="underneath"
        hideUnlockedStatus
      >
        <div className="china-room-games-inner">
          <ChinaWushuWarfarePanel />
          <RoomSportsStack
            roomSlug={lane.roomSlug}
            showStagePreview
            stageCaption={`${lane.hostLabel} · 剑 · 棍 · 对练`}
          />
        </div>
      </CountryRoomLiveAccessGate>
    </div>
  );
}