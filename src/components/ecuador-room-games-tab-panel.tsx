"use client";

import { EcuadorThePit } from "@/components/ecuador-the-pit";
import { RoomSportsStack } from "@/components/room-sports-stack";
import type { EcuadorRoomGameSelection } from "@/lib/ecuador-country";

const ECUADOR_ROOM_SLUG = "ecuador-room";

type EcuadorRoomGamesTabPanelProps = {
  requestedGameId?: EcuadorRoomGameSelection | null;
  onRequestedGameHandled?: () => void;
};

/** Ecuador room · The Pit + sports stack inside Games tab */
export function EcuadorRoomGamesTabPanel({
  requestedGameId = null,
  onRequestedGameHandled
}: EcuadorRoomGamesTabPanelProps) {
  return (
    <div className="ecuador-room-games-tab-panel space-y-5">
      <EcuadorThePit>
        <RoomSportsStack
          roomSlug={ECUADOR_ROOM_SLUG}
          requestedGameId={requestedGameId}
          onRequestedGameHandled={onRequestedGameHandled}
        />
      </EcuadorThePit>
    </div>
  );
}