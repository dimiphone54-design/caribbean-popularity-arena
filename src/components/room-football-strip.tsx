"use client";

import { FootballPredictionArena } from "@/components/football-prediction/football-prediction-arena";

type RoomFootballStripProps = {
  countryId: string;
  countryName: string;
  flag: string;
  roomSlug: string;
};

/** Football strip for non-Colombia rooms (Colombia uses RoomColombiaFootballPanel) */
export function RoomFootballStrip({ countryId, countryName, flag, roomSlug }: RoomFootballStripProps) {
  return (
    <section
      id={`${roomSlug}-football`}
      className="room-football-strip country-room-section w-full"
      aria-label={`${countryName} football prediction arena`}
    >
      <header className="room-football-strip-head">
        <p className="room-football-strip-kicker">{flag} Football · every room</p>
        <h2 className="room-football-strip-title">{countryName} match-day lane</h2>
        <p className="room-football-strip-sub">
          API-Sports live fixtures · predictions · leaderboard · every country room
        </p>
      </header>
      <FootballPredictionArena countryId={countryId} countryName={countryName} flag={flag} />
    </section>
  );
}
