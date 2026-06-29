"use client";

import { ArenaMicroRightRailStack } from "@/components/arena-micro-right-rail-stack";

/** Fixed lower-right ✦ AI rail · Welcome · Guide · Auto-detect · Voice */
export function ArenaMicroRightRail() {
  return (
    <aside className="arena-micro-right-rail" aria-label="Arena micro panels · right rail">
      <ArenaMicroRightRailStack />
    </aside>
  );
}
