"use client";

import { ColombiaRoomSpotlightPhotos } from "@/components/colombia-room-spotlight-photos";
import { colombiaCulturePanelItems } from "@/lib/colombia-room-live";

const colombiaFashionLanes = [
  { emoji: "💃", label: "Cali salsa culture · dance floors", hint: "Salsa capital energy" },
  { emoji: "🌃", label: "Medellín nightlife · rooftop lights", hint: "Reggaeton · eternal spring" },
  { emoji: "🏛️", label: "Bogotá city vibes · Andes skyline", hint: "Late-night culture lane" },
  { emoji: "🎵", label: "Colombian music · vallenato lane", hint: "Salsa · Reggaeton · Vallenato" }
] as const;

/** Colombia room · culture + spotlight inside Fashion tab */
export function ColombiaRoomFashionTabPanel() {
  return (
    <div className="colombia-room-fashion-tab-panel space-y-5">
      <section className="country-room-section" aria-label="Colombia fashion and culture">
        <header className="text-center">
          <p className="text-[9px] font-black uppercase tracking-[0.18em] text-[#fb7185]">
            Colombia fashion · cities · music · culture
          </p>
          <h2 className="mt-2 font-['Bebas_Neue',sans-serif] text-2xl tracking-widest text-[#fff1f2] sm:text-3xl">
            Colombia · salsa & street couture
          </h2>
          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#fecdd3]/90">
            Rooftop nights, salsa floors, and Colombian culture wired for the Colombia room.
          </p>
        </header>

        <div className="mt-4 flex flex-wrap justify-center gap-2" role="list">
          {colombiaFashionLanes.map((lane) => (
            <span
              key={lane.label}
              className="inline-flex max-w-full items-start gap-1.5 rounded-full border border-[#fb7185]/25 px-3 py-1.5 text-[10px] font-semibold text-[#fecdd3]"
              role="listitem"
              title={lane.hint}
            >
              <span aria-hidden="true">{lane.emoji}</span>
              <span>{lane.label}</span>
            </span>
          ))}
        </div>

        <div className="mt-4">
          <ColombiaRoomSpotlightPhotos />
        </div>

        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          {colombiaCulturePanelItems.map((item) => (
            <figure
              key={item.id}
              className="relative overflow-hidden rounded-xl border border-[#fb7185]/20 bg-black/40"
            >
              <img src={item.image} alt={item.title} className="aspect-[5/3] w-full object-cover" />
              <figcaption className="px-3 py-2">
                <p className="text-[11px] font-bold text-[#fff1f2]">{item.title}</p>
                <p className="mt-1 text-[10px] leading-5 text-[#fda4af]/85">{item.vibe}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>
    </div>
  );
}