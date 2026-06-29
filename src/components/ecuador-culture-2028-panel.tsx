"use client";

import Image from "next/image";
import { ecuadorCulturePanel } from "@/lib/ecuador-country";

/** Ecuador · Elite 2028 badass · cities & culture */
export function EcuadorCulture2028Panel() {
  return (
    <section
      className="ecuador-elite-2028-panel country-room-section relative w-full overflow-hidden rounded-[1.5rem] px-4 py-5 sm:px-6 sm:py-6"
      aria-label={ecuadorCulturePanel.title}
    >
      <div className="ecuador-elite-2028-panel-shine pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="ecuador-elite-2028-panel-grid pointer-events-none absolute inset-0" aria-hidden="true" />

      <header className="relative z-[1] text-center">
        <h2 className="ecuador-elite-2028-title">{ecuadorCulturePanel.title}</h2>
      </header>

      <div className="relative z-[1] mt-4 grid gap-2 sm:grid-cols-2">
        {ecuadorCulturePanel.items.map((item) => (
          <div
            key={item.label}
            className={`ecuador-elite-2028-chip${item.imageUrl ? " ecuador-elite-2028-chip--photo" : ""}`}
          >
            {item.imageUrl ? (
              <div className="ecuador-elite-2028-chip-photo">
                <Image
                  src={item.imageUrl}
                  alt={item.label}
                  width={120}
                  height={80}
                  className="ecuador-elite-2028-chip-photo-img"
                />
              </div>
            ) : (
              <span className="ecuador-elite-2028-chip-dot" aria-hidden="true" />
            )}
            <span className="ecuador-elite-2028-chip-label">{item.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
