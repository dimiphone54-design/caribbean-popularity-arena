"use client";

import type { ReactNode } from "react";

/** Ecuador room · live games stack below dropship market */
export function EcuadorThePit({ children }: { children: ReactNode }) {
  return (
    <section className="ecuador-the-pit w-full" aria-label="Ecuador live games">
      <div className="ecuador-the-pit-body w-full">{children}</div>
    </section>
  );
}
