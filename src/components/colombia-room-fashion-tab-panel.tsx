"use client";

import { useRoomLocale } from "@/components/room-locale-provider";
import { colombiaCulturePanelItems } from "@/lib/colombia-room-live";
import { isSpanishContentLocale } from "@/lib/room-locale";

const colombiaFashionLanes = [
  { emoji: "💃", title: "Cali" },
  { emoji: "🌃", title: "Medellín" },
  { emoji: "🏛️", title: "Bogotá" },
  { emoji: "🎵", title: "Vallenato" }
] as const;

/** Colombia room · compact 👗 Moda panel · Español (CO) public · English for MASTER */
export function ColombiaRoomFashionTabPanel() {
  const { locale } = useRoomLocale();
  const es = isSpanishContentLocale(locale);
  const culture = colombiaCulturePanelItems.slice(0, 4);

  return (
    <div
      className="colombia-room-fashion-tab-panel colombia-moda-panel"
      aria-label={es ? "Colombia Moda panel" : "Colombia Fashion panel"}
      lang={es ? "es-CO" : "en"}
    >
      <section className="relative overflow-hidden rounded-lg border border-[#fb7185]/35 bg-[#12040a]">
        <div
          className="pointer-events-none absolute inset-0 bg-cover bg-center opacity-40"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1200&q=80&auto=format&fit=crop')"
          }}
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#12040a]/6 via-[#1a050c]/7 to-[#050208]/9"
          aria-hidden="true"
        />

        <header className="relative z-10 flex flex-wrap items-center gap-x-2 gap-y-0.5 border-b border-[#fb7185]/20 px-2.5 py-1.5 sm:px-3">
          <h2
            className="font-['Bebas_Neue',sans-serif] text-lg uppercase tracking-[0.08em] sm:text-xl"
            style={{
              backgroundImage: "linear-gradient(105deg, #fff1f2 0%, #fda4af 50%, #fbbf24 100%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent"
            }}
          >
            {es ? "👗 Moda" : "👗 Fashion"}
          </h2>
          <span className="text-[8px] font-black uppercase tracking-[0.12em] text-[#fda4af]">
            {es ? "Salsa · calle · noche" : "Salsa · street · night"}
          </span>
          <span className="ml-auto text-[8px] font-black uppercase tracking-[0.1em] text-[#fecdd3]/85">
            {es ? "explorar gratis" : "free browse"}
          </span>
        </header>

        <div className="relative z-10 flex flex-wrap gap-1 px-2 py-1.5 sm:px-2.5">
          {colombiaFashionLanes.map((lane) => (
            <span
              key={lane.title}
              className="rounded-md border border-[#fb7185]/25 bg-black/55 px-2 py-0.5 text-[10px] font-black text-[#fecdd3] backdrop-blur-sm"
            >
              {lane.emoji} {lane.title}
            </span>
          ))}
        </div>

        <div className="relative z-10 grid grid-cols-4 gap-1 p-1.5 sm:p-2">
          {culture.map((item) => (
            <figure
              key={item.id}
              className="overflow-hidden rounded-md border border-[#fb7185]/20 bg-black/50"
            >
              <img src={item.image} alt={item.title} className="aspect-[4/3] w-full object-cover" />
              <figcaption className="truncate px-1 py-0.5 text-center text-[8px] font-bold text-[#fff1f2] sm:text-[9px]">
                {item.title}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>
    </div>
  );
}
