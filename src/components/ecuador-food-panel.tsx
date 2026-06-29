"use client";

import Image from "next/image";
import { ecuadorFoodPanel } from "@/lib/ecuador-country";

/** Ecuador · food panel · dish photos */
export function EcuadorFoodPanel() {
  return (
    <section
      className="ecuador-food-panel ecuador-elite-2028-panel country-room-section relative w-full overflow-hidden rounded-[1.5rem] px-4 py-5 sm:px-6 sm:py-6"
      aria-label={ecuadorFoodPanel.title}
    >
      <div className="ecuador-elite-2028-panel-shine pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="ecuador-elite-2028-panel-grid pointer-events-none absolute inset-0" aria-hidden="true" />

      <header className="relative z-[1] text-center">
        <h2 className="ecuador-elite-2028-title ecuador-food-panel-title">{ecuadorFoodPanel.title}</h2>
      </header>

      <div className="relative z-[1] mt-4 grid gap-2 sm:grid-cols-2">
        {ecuadorFoodPanel.items.map((item) => (
          <div key={item.label} className="ecuador-elite-2028-chip ecuador-elite-2028-chip--photo ecuador-food-panel-chip">
            <div className="ecuador-elite-2028-chip-photo">
              <Image
                src={item.imageUrl}
                alt={item.label}
                width={120}
                height={80}
                className="ecuador-elite-2028-chip-photo-img"
              />
            </div>
            <span className="ecuador-elite-2028-chip-label">{item.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
