"use client";

import Image from "next/image";
import { getAllDropshipProductsForCountry } from "@/lib/dropshipping";

const japanFashionLanes = [
  { emoji: "👘", label: "JAPAN street fashion · kimono lane", hint: "Japanese culture street print" },
  { emoji: "🧥", label: "Minimal editorial · arena stage", hint: "JAPAN pick · live wired" },
  { emoji: "🎌", label: "Kendo stage fits · duel night", hint: "Sword clash · flame burst lane" },
  { emoji: "🛍️", label: "Lifestyle box · shop the fit", hint: "JAPAN dropship supplier" }
] as const;

/** Japan room · fashion + dropship inside Fashion tab */
export function JapanRoomFashionTabPanel() {
  const fashionProducts = getAllDropshipProductsForCountry("japan").filter((product) =>
    product.category.toLowerCase().includes("fashion")
  );

  return (
    <div className="japan-room-fashion-tab-panel space-y-5">
      <section className="a2030-holo-panel country-room-section" aria-label="Japan fashion">
        <header className="text-center">
          <p className="text-[9px] font-black uppercase tracking-[0.18em] text-[#fbbf24]">
            JAPAN fashion · street · kimono lane
          </p>
          <h2 className="mt-2 font-['Bebas_Neue',sans-serif] text-2xl tracking-widest text-[#eef6ff] sm:text-3xl">
            JAPAN · street couture
          </h2>
          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#c4d4ef]/90">
            Japanese culture street prints, minimalist goods, and arena-ready fits wired for the JAPAN room.
          </p>
        </header>

        <div className="mt-4 flex flex-wrap justify-center gap-2" role="list">
          {japanFashionLanes.map((lane) => (
            <span
              key={lane.label}
              className="east-asia-game-chip east-asia-game-chip--japan inline-flex max-w-full items-start gap-1.5 rounded-full px-3 py-1.5 text-[10px] font-semibold"
              role="listitem"
              title={lane.hint}
            >
              <span aria-hidden="true">{lane.emoji}</span>
              <span>{lane.label}</span>
            </span>
          ))}
        </div>

        {fashionProducts.length > 0 ? (
          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            {fashionProducts.map((product) => (
              <figure
                key={product.id}
                className="overflow-hidden rounded-xl border border-[#ff2bd6]/20 bg-[#0f172a]/70"
              >
                <div className="relative aspect-[5/3] w-full">
                  <Image
                    src={product.imageUrl}
                    alt={product.name}
                    fill
                    sizes="(max-width: 640px) 100vw, 280px"
                    className="object-cover"
                  />
                </div>
                <figcaption className="px-3 py-2">
                  <p className="text-[11px] font-bold text-[#eef6ff]">
                    {product.flag} {product.name}
                  </p>
                  <p className="mt-1 text-[10px] leading-5 text-[#9fb4d4]">{product.description}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        ) : null}
      </section>
    </div>
  );
}