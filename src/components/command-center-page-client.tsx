"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { isCommandCenterEnabled } from "@/lib/command-center-access";
import { isArenaPrimaryMasterRecognized } from "@/lib/arena-master-identity";
import {
  ARENA_MASTER_KEY_EVENT,
  ensurePrimaryMasterDeviceRecognized
} from "@/lib/arena-master-key";

const CommandCenterPage = dynamic(
  () => import("@/components/command-center-page").then((m) => m.CommandCenterPage),
  { ssr: false }
);

/**
 * Command Center shell · MASTER only.
 * Env flag alone is not enough — must be recognized THE MASTER on this device.
 * Everyone else is sent home.
 */
export function CommandCenterPageClient() {
  const router = useRouter();
  const [allowed, setAllowed] = useState(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (!isCommandCenterEnabled) {
      setAllowed(false);
      setChecked(true);
      router.replace("/");
      return;
    }

    const sync = () => {
      ensurePrimaryMasterDeviceRecognized();
      const master = isArenaPrimaryMasterRecognized();
      setAllowed(master);
      setChecked(true);
      if (!master) {
        router.replace("/");
      }
    };

    sync();
    window.addEventListener(ARENA_MASTER_KEY_EVENT, sync);
    window.addEventListener("cpa:member-username", sync);
    window.addEventListener("storage", sync);

    return () => {
      window.removeEventListener(ARENA_MASTER_KEY_EVENT, sync);
      window.removeEventListener("cpa:member-username", sync);
      window.removeEventListener("storage", sync);
    };
  }, [router]);

  if (!isCommandCenterEnabled || !checked || !allowed) {
    return (
      <div className="grid min-h-dvh place-items-center bg-[#050208] px-4 text-center">
        <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#7dd3fc]/70">
          Command Center · MASTER only
        </p>
      </div>
    );
  }

  return <CommandCenterPage />;
}
