"use client";

import Link from "next/link";
import { ArenaPlusIceFrostOverlay } from "@/components/arena-plus-ice-frost-overlay";
import { ArenaPlusSnowSprinkles } from "@/components/arena-plus-snow-sprinkles";
import { EldersTableLockPanel } from "@/components/elders-table-lock-panel";

/** Frost glass over full interface · same lock panel as membership plans */
export function EldersTableComingSoonFreeze() {
  return (
    <div
      className="elders-table-coming-soon-freeze"
      role="dialog"
      aria-modal="true"
      aria-label="THE ELDERS TABLE — Coming Soon"
    >
      <div className="elders-table-coming-soon-freeze-glass luxury-plan-coming-soon" aria-hidden="true">
        <span className="luxury-plan-frost-glass elders-table-coming-soon-frost">
          <span className="luxury-plan-frost-rim" />
          <span className="luxury-plan-frost-crystals" />
          <span className="luxury-plan-frost-sheen" />
          <span className="luxury-plan-frost-darken elders-table-coming-soon-frost-darken" />
          <ArenaPlusIceFrostOverlay />
          <ArenaPlusSnowSprinkles />
        </span>
      </div>

      <div className="elders-table-coming-soon-lock-card luxury-glass-card luxury-plan-coming-soon">
        <span className="luxury-plan-frost-glass" aria-hidden="true">
          <span className="luxury-plan-frost-rim" />
          <span className="luxury-plan-frost-crystals" />
          <span className="luxury-plan-frost-sheen" />
          <span className="luxury-plan-frost-darken" />
          <ArenaPlusIceFrostOverlay />
          <ArenaPlusSnowSprinkles />
        </span>
        <div className="elders-table-coming-soon-badge">Coming Soon</div>
        <div className="elders-table-lock-panel-with-back">
          <EldersTableLockPanel />
          <div className="elders-table-lock-panel-back-wrap">
            <Link
              href="/#home"
              className="a2030-back-link a2030-micro no-underline"
              aria-label="Back to the arena"
            >
              <span className="a2030-back-arrow relative z-10" aria-hidden="true">←</span>
              <span className="relative z-10 text-[11px] font-bold uppercase tracking-[0.16em] sm:text-xs">
                Back to the arena
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
