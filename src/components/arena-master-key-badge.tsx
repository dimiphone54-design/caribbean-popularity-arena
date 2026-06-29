"use client";

import { useCallback, useEffect, useState } from "react";
import { ARENA_MASTER_KEY_EVENT, isArenaMasterKeyActive } from "@/lib/arena-master-key";
import { isArenaPrimaryMasterRecognized } from "@/lib/arena-master-identity";

/** Small owner badge when master key bypass is active */
export function ArenaMasterKeyBadge() {
  const [active, setActive] = useState(false);

  const sync = useCallback(() => {
    setActive(isArenaMasterKeyActive());
  }, []);

  useEffect(() => {
    sync();
    window.addEventListener(ARENA_MASTER_KEY_EVENT, sync);
    return () => window.removeEventListener(ARENA_MASTER_KEY_EVENT, sync);
  }, [sync]);

  if (!active) return null;

  const masterLabel = isArenaPrimaryMasterRecognized() ? "THE MASTER" : "Master key on";

  return (
    <div
      className="pointer-events-none fixed bottom-3 left-3 z-[240] rounded-full border border-emerald-400/35 bg-black/70 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.14em] text-emerald-300 backdrop-blur-md"
      aria-live="polite"
    >
      🔑 {masterLabel}
    </div>
  );
}
