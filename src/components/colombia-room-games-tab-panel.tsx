"use client";

import { RoomSportsStack } from "@/components/room-sports-stack";

const COLOMBIA_ROOM_SLUG = "colombia-room";

/** Colombia room · sports stack inside Games tab */
export function ColombiaRoomGamesTabPanel() {
  return (
    <div className="colombia-room-games-tab-panel space-y-5">
      <RoomSportsStack roomSlug={COLOMBIA_ROOM_SLUG} />
    </div>
  );
}