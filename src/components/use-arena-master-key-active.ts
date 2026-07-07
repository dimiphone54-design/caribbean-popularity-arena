"use client";

import { useCallback, useEffect, useLayoutEffect, useState } from "react";
import { ARENA_MASTER_KEY_EVENT, isArenaMasterKeyActive } from "@/lib/arena-master-key";

/** SSR-safe master key flag · inactive until client session is read post-hydration. */
export function useArenaMasterKeyActive() {
  const [active, setActive] = useState(false);
  const [ready, setReady] = useState(false);

  const sync = useCallback(() => {
    setActive(isArenaMasterKeyActive());
    setReady(true);
  }, []);

  useLayoutEffect(() => {
    sync();
  }, [sync]);

  useEffect(() => {
    window.addEventListener(ARENA_MASTER_KEY_EVENT, sync);
    return () => window.removeEventListener(ARENA_MASTER_KEY_EVENT, sync);
  }, [sync]);

  return ready && active;
}