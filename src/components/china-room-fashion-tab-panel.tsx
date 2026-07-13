"use client";

import Image from "next/image";
import { getAllDropshipProductsForCountry } from "@/lib/dropshipping";

const chinaFashionLanes = [
  { emoji: "👘", label: "Shanghai street style · neon lane", hint: "East Asia content merch" },
  { emoji: "🧥", label: "Cyberpunk editorial · arena lights", hint: "Shanghai supplier wired" },
  { emoji: "📱", label: "Tech skin packs · city print", hint: "Phone skin · neon city" },
  { emoji: "🛍️", label: "Mandarin live · shop the fit", hint: "China room · dropship lane" }
] as const;

/** China room · fashion + dropship inside Fashion tab */
export function ChinaRoomFashionTabPanel() {
  const fashionProducts = getAllDropshipProductsForCountry("china").filter((product) =>
    product.category.toLowerCase().includes("fashion")
  );

  return (
    <div className="china-room-fashion-tab-panel space-y-5">
      <section className="a2030-holo-panel country-room-section" aria-label="China fashion">
        <header className="text-center">
          <p className="text-[9px] font-black uppercase tracking-[0.18em] text-[#fbbf24]">
            China fashion · Shanghai · street style
          </p>
          <h2 className="mt-2 font-['Bebas_Neue',sans-serif] text-2xl tracking-widest text-[#eef6ff] sm:text-3xl">
            China · Shanghai street couture
          </h2>
          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#c4d4ef]/90">
            East Asia content lane merch, neon city prints, and arena-ready fits wired for the China room.
          </p>
        </header>

        <div className="mt-4 flex flex-wrap justify-center gap-2" role="list">
          {chinaFashionLanes.map((lane) => (
            <span
              key={lane.label}
              className="east-asia-game-chip east-asia-game-chip--china inline-flex max-w-full items-start gap-1.5 rounded-full px-3 py-1.5 text-[10px] font-semibold"
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
                className="overflow-hidden rounded-xl border border-[#00f5ff]/20 bg-[#0f172a]/70"
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