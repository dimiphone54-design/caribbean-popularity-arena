"use client";

import Image from "next/image";
import { getAllDropshipProductsForCountry } from "@/lib/dropshipping";
import { UK_ROOM_PANEL } from "@/lib/uk-room-panel";

const ukFoodScenes = [
  {
    id: "fish-chips-park",
    label: "Fish & chips · Hyde Park bench",
    caption: "Charlotte & Rosie — classic UK park lunch on the bench.",
    imageUrl: "/cotswolds-park-feed-uk-dish.png"
  },
  {
    id: "national-dish-crowd",
    label: "UK national dish · fish & chips",
    caption: "Everybody eating fish & chips — crowd lane in the park.",
    imageUrl: "/cotswolds-uk-national-dish-crowd.png"
  }
] as const;

const ukFoodLanes = [
  { emoji: "🐟", label: "Fish & chips · national favourite", hint: "Classic UK park lunch" },
  { emoji: "🫖", label: "Afternoon tea · park picnic", hint: "Holland Park · Hyde Park lanes" },
  { emoji: "🥧", label: "Sunday roast vibes · pub lane", hint: "Manchester · London wired" },
  { emoji: "🍟", label: "Bench lunch · games night fuel", hint: "Cotswolds park · live eat-along" }
] as const;

/** UK room · dishes + dropship food inside Food tab */
export function UkRoomFoodTabPanel() {
  const foodProducts = getAllDropshipProductsForCountry("uk").filter((product) =>
    product.category.toLowerCase().includes("food")
  );

  return (
    <div className="uk-room-food-tab-panel space-y-5">
      <section className={`uk-room-food-panel ${UK_ROOM_PANEL}`} aria-label="United Kingdom food">
        <header className="text-center">
          <p className="text-[9px] font-black uppercase tracking-[0.18em] text-[#fbbf24]">
            UK food · park lunch · national dish
          </p>
          <h2 className="mt-2 font-['Bebas_Neue',sans-serif] text-2xl tracking-widest text-[#eef6ff] sm:text-3xl">
            United Kingdom · fish & chips
          </h2>
          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#c4d4ef]/90">
            Classic UK national dish, park bench lunches, and food kits wired for the Cotswolds room.
          </p>
        </header>

        <div className="mt-4 flex flex-wrap justify-center gap-2" role="list">
          {ukFoodLanes.map((lane) => (
            <span
              key={lane.label}
              className="cotswolds-extra-game-chip inline-flex max-w-full items-start gap-1.5 rounded-full border border-[#94a3b8]/25 px-3 py-1.5 text-[10px] font-semibold text-[#cbd5e1]"
              role="listitem"
              title={lane.hint}
            >
              <span aria-hidden="true">{lane.emoji}</span>
              <span>{lane.label}</span>
            </span>
          ))}
        </div>

        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          {ukFoodScenes.map((scene) => (
            <figure
              key={scene.id}
              className="uk-room-food-chip overflow-hidden rounded-xl border border-[#94a3b8]/25 bg-[#0f172a]/70"
            >
              <div className="relative aspect-[5/3] w-full">
                <Image
                  src={scene.imageUrl}
                  alt={scene.label}
                  fill
                  sizes="(max-width: 640px) 100vw, 280px"
                  className="object-cover"
                />
              </div>
              <figcaption className="px-3 py-2">
                <p className="text-[11px] font-bold text-[#eef6ff]">{scene.label}</p>
                <p className="mt-1 text-[10px] leading-5 text-[#9fb4d4]">{scene.caption}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {foodProducts.length > 0 ? (
        <section className={UK_ROOM_PANEL}>
          <p className="a2030-electric-flash a2030-micro text-[10px] font-bold uppercase text-[#b8ff3c] sm:text-xs">
            Food kits · dropship lane
          </p>
          <div className="mt-3 flex flex-col gap-2">
            {foodProducts.map((product) => (
              <div
                key={product.id}
                className="uk-room-food-product rounded-lg border border-[#94a3b8]/20 bg-[#0f172a]/55 px-3 py-2"
              >
                <p className="text-[11px] font-bold text-[#eef6ff]">
                  {product.flag} {product.name}
                </p>
                <p className="mt-1 text-[10px] leading-5 text-[#9fb4d4]">{product.description}</p>
                <p className="mt-1 text-[10px] font-semibold text-[#b8ff3c]">
                  {product.currency} {product.price} · {product.shipsFrom}
                </p>
              </div>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}