"use client";

import { RoomCountryGamesPanel } from "@/components/room-country-games-panel";
import { RoomFootballStrip } from "@/components/room-football-strip";
import { getRoomGamesConfig, ROOM_FOOTBALL_BY_SLUG } from "@/lib/room-games-registry";

type RoomSportsStackProps = {
  roomSlug: string;
  requestedGameId?: string | null | undefined;
  onRequestedGameHandled?: () => void;
  showStagePreview?: boolean;
  stageCaption?: string;
  /** Hide country games panel (football-lads uses predictions as primary) */
  gamesOnly?: boolean;
  footballOnly?: boolean;
};

/** Football in every room + country-specific sports wired from registry */
export function RoomSportsStack({
  roomSlug,
  requestedGameId,
  onRequestedGameHandled,
  showStagePreview,
  stageCaption,
  gamesOnly = false,
  footballOnly = false
}: RoomSportsStackProps) {
  const football = ROOM_FOOTBALL_BY_SLUG[roomSlug];
  const games = getRoomGamesConfig(roomSlug);

  return (
    <div className="room-sports-stack space-y-6 w-full">
      {football && !gamesOnly ? (
        <RoomFootballStrip
          countryId={football.countryId}
          countryName={football.countryName}
          flag={football.flag}
          roomSlug={roomSlug}
        />
      ) : null}

      {games && !footballOnly ? (
        <RoomCountryGamesPanel
          config={games}
          requestedGameId={requestedGameId}
          onRequestedGameHandled={onRequestedGameHandled}
          showStagePreview={showStagePreview}
          stageCaption={stageCaption}
        />
      ) : null}
    </div>
  );
}