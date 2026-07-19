"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { canShowCommandCenterUi, isCommandCenterEnabled } from "@/lib/command-center-access";
import { isArenaPrimaryMasterRecognized } from "@/lib/arena-master-identity";
import {
  ARENA_MASTER_KEY_EVENT,
  ensurePrimaryMasterDeviceRecognized
} from "@/lib/arena-master-key";

/**
 * Command Center nav · MASTER only (you).
 * Requires NEXT_PUBLIC_COMMAND_CENTER_ENABLED=true (local .env.local)
 * + recognized primary MASTER on this device.
 * Fans never see this link.
 */
export function CommandCenterOwnerNavLink() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!isCommandCenterEnabled) {
      setVisible(false);
      return;
    }

    const sync = () => {
      ensurePrimaryMasterDeviceRecognized();
      setVisible(canShowCommandCenterUi(isArenaPrimaryMasterRecognized()));
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
  }, []);

  if (!visible) return null;

  return (
    <Link
      href="/command-center"
      className="a2030-lounge-link a2030-micro hidden rounded-lg px-3 py-2 text-[11px] font-bold uppercase tracking-[0.1em] lg:inline-flex sm:px-4"
      title="MASTER only"
    >
      Command Center
    </Link>
  );
}
