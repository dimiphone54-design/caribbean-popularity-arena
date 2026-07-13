"use client";

import Image from "next/image";
import { getAllDropshipProductsForCountry } from "@/lib/dropshipping";

const chinaFoodLanes = [
  { emoji: "🍵", label: "Tea ceremony · Mandarin card", hint: "Loose leaf · cups · Shanghai lane" },
  { emoji: "🥟", label: "Shanghai night market · street bites", hint: "Live eat-along · arena fuel" },
  { emoji: "🍜", label: "Noodle lanes · talk-show night", hint: "Mandarin game night wired" },
  { emoji: "🫖", label: "Ceremony set · dropship lane", hint: "Tea partner · ships from Shanghai" }
] as const;

/** China room · food kits + dishes inside Food tab */
export function ChinaRoomFoodTabPanel() {
  const foodProducts = getAllDropshipProductsForCountry("china").filter((product) =>
    product.category.toLowerCase().includes("food")
  );

  return (
    <div className="china-room-food-tab-panel space-y-5">
      <section className="a2030-holo-panel country-room-section" aria-label="China food">
        <header className="text-center">
          <p className="text-[9px] font-black uppercase tracking-[0.18em] text-[#fbbf24]">
            China food · tea ceremony · Shanghai
          </p>
          <h2 className="mt-2 font-['Bebas_Neue',sans-serif] text-2xl tracking-widest text-[#eef6ff] sm:text-3xl">
            China · tea & street kitchen
          </h2>
          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#c4d4ef]/90">
            Tea ceremony sets, Shanghai street bites, and food kits wired for the China room.
          </p>
        </header>

        <div className="mt-4 flex flex-wrap justify-center gap-2" role="list">
          {chinaFoodLanes.map((lane) => (
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

        {foodProducts.length > 0 ? (
          <div className="mt-4 flex flex-col gap-2">
            {foodProducts.map((product) => (
              <figure
                key={product.id}
                className="overflow-hidden rounded-xl border border-[#00f5ff]/20 bg-[#0f172a]/70"
              >
                <div className="relative aspect-[16/7] w-full sm:aspect-[5/2]">
                  <Image
                    src={product.imageUrl}
                    alt={product.name}
                    fill
                    sizes="(max-width: 640px) 100vw, 560px"
                    className="object-cover"
                  />
                </div>
                <figcaption className="px-3 py-2">
                  <p className="text-[11px] font-bold text-[#eef6ff]">
                    {product.flag} {product.name}
                  </p>
                  <p className="mt-1 text-[10px] leading-5 text-[#9fb4d4]">{product.description}</p>
                  <p className="mt-1 text-[10px] font-semibold text-[#b8ff3c]">
                    {product.currency} {product.price} · {product.shipsFrom}
                  </p>
                </figcaption>
              </figure>
            ))}
          </div>
        ) : null}
      </section>
    </div>
  );
}