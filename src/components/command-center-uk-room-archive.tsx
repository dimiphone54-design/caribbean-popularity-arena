"use client";

import { useCallback, useEffect, useState } from "react";
import { UkRoomArchivePanel } from "@/components/uk-room-archive-panel";
import { ARENA_MASTER_KEY_EVENT, isArenaMasterKeyActive } from "@/lib/arena-master-key";

/** Command Center · locked UK room archive · Master Key opens full park database */
export function CommandCenterUkRoomArchive() {
  const [unlocked, setUnlocked] = useState(false);

  const sync = useCallback(() => {
    setUnlocked(isArenaMasterKeyActive());
  }, []);

  useEffect(() => {
    sync();
    window.addEventListener(ARENA_MASTER_KEY_EVENT, sync);
    window.addEventListener("cpa:arena-master-key", sync);
    return () => {
      window.removeEventListener(ARENA_MASTER_KEY_EVENT, sync);
      window.removeEventListener("cpa:arena-master-key", sync);
    };
  }, [sync]);

  return (
    <section className="command-center-room-panel mt-8 rounded-[1.5rem] border border-[#00f5ff]/22 p-5 sm:p-6">
      <p className="text-xs font-black uppercase tracking-[0.2em] text-[#00f5ff]">Locked room</p>
      <h2 className="mt-2 font-['Bebas_Neue',sans-serif] text-4xl tracking-[0.06em] text-[#f7efe0]">
        UK Room Archive
      </h2>
      <p className="mt-2 max-w-2xl text-sm leading-7 text-[#b8c0d8]">
        Full UK park database moved off the public room — quarter slides, movie archive, member lanes, and men&apos;s
        entry copy. Unlock Master Key above to open this room.
      </p>

      {!unlocked ? (
        <div className="mt-5 rounded-xl border border-[#ff5c2b]/35 bg-[#ff5c2b]/8 px-4 py-4">
          <p className="text-xs font-black uppercase tracking-[0.16em] text-[#ff8c42]">🔒 Room locked</p>
          <p className="mt-2 text-sm leading-6 text-[#d8deef]">
            Enter your owner Master Key in the panel above. UK fans keep the live Freedom Gateway, football hub,
            dropship shop, Freedom Drive, and bottom dock only.
          </p>
        </div>
      ) : (
        <div className="mt-6 rounded-xl border border-[#00f5ff]/18 bg-[#040810]/55 p-4 sm:p-5">
          <p className="mb-4 text-xs font-black uppercase tracking-[0.14em] text-[#b8ff3c]">
            🔓 Archive open · owner view
          </p>
          <UkRoomArchivePanel />
        </div>
      )}
    </section>
  );
}
