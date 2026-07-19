"use client";

import { RoomColombiaGamingHub } from "@/components/room-colombia-gaming-hub";
import { RoomSportsStack } from "@/components/room-sports-stack";
import { useRoomLocale } from "@/components/room-locale-provider";
import { isSpanishContentLocale } from "@/lib/room-locale";

const COLOMBIA_ROOM_SLUG = "colombia-room";

/** Colombia room · compact 🎮 Juegos panel · Español (CO) public · English for MASTER */
export function ColombiaRoomGamesTabPanel() {
  const { locale } = useRoomLocale();
  const es = isSpanishContentLocale(locale);

  return (
    <div
      className="colombia-room-games-tab-panel colombia-juegos-panel space-y-1.5"
      aria-label={es ? "Colombia Juegos panel" : "Colombia Games panel"}
      lang={es ? "es-CO" : "en"}
    >
      <RoomColombiaGamingHub />

      <section
        className="overflow-hidden rounded-lg border border-[#fb7185]/25 bg-[#0d0104]/60 p-1.5 sm:p-2"
        aria-label="Colombia live sports board"
      >
        <p className="mb-1 text-center text-[8px] font-black uppercase tracking-[0.14em] text-[#fbbf24]">
          {es ? "En la sala · juego gratis" : "In the room · free play"}
        </p>
        <RoomSportsStack roomSlug={COLOMBIA_ROOM_SLUG} />
      </section>
    </div>
  );
}
