"use client";

import { useEffect } from "react";
import { ensurePrimaryMasterDeviceRecognized } from "@/lib/arena-master-key";
import { dispatchArenaWelcomeEnter } from "@/lib/member-username-storage";

/** THE MASTER · auto master-key + all country corners on recognition. */
export function ArenaPrimaryMasterAutoUnlock() {
  useEffect(() => {
    const sync = () => {
      const activated = ensurePrimaryMasterDeviceRecognized();
      if (activated) dispatchArenaWelcomeEnter();
    };

    sync();
    window.addEventListener("cpa:member-username", sync);
    window.addEventListener("storage", sync);

    return () => {
      window.removeEventListener("cpa:member-username", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  return null;
}
