"use client";

import { getAllDropshipProductsForCountry } from "@/lib/dropshipping";
import { colombiaFoodPanelItems } from "@/lib/colombia-room-live";

const colombiaFoodLanes = [
  { emoji: "🫓", label: "Arepas · golden corn comfort", hint: "Street to table · Cartagena lane" },
  { emoji: "🥟", label: "Empanadas · crispy fold", hint: "Salsa on the side" },
  { emoji: "🍲", label: "Bandeja Paisa · mountain soul", hint: "Medellín hearty platter" },
  { emoji: "🍜", label: "Ajiaco · Bogotá soup lane", hint: "Capers · cream swirl" }
] as const;

/** Colombia room · regional dishes + dropship inside Food tab */
export function ColombiaRoomFoodTabPanel() {
  const foodProducts = getAllDropshipProductsForCountry("colombia").filter(
    (product) =>
      product.category.toLowerCase().includes("food") || product.category.toLowerCase().includes("coffee")
  );

  return (
    <div className="colombia-room-food-tab-panel space-y-5">
      <section className="country-room-section" aria-label="Colombia food">
        <header className="text-center">
          <p className="text-[9px] font-black uppercase tracking-[0.18em] text-[#fbbf24]">
            Colombia food · arepas · bandeja · ajiaco
          </p>
          <h2 className="mt-2 font-['Bebas_Neue',sans-serif] text-2xl tracking-widest text-[#fff1f2] sm:text-3xl">
            Colombia · street kitchen
          </h2>
          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#fecdd3]/90">
            Arepas, bandeja paisa, ajiaco, and Colombian street food wired for the Colombia room.
          </p>
        </header>

        <div className="mt-4 flex flex-wrap justify-center gap-2" role="list">
          {colombiaFoodLanes.map((lane) => (
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

        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          {colombiaFoodPanelItems.map((item) => (
            <figure
              key={item.id}
              className="relative overflow-hidden rounded-xl border border-[#fb7185]/20 bg-black/40"
            >
              <img src={item.image} alt={item.name} className="aspect-[5/3] w-full object-cover" />
              <figcaption className="px-3 py-2">
                <p className="text-[11px] font-bold text-[#fff1f2]">{item.name}</p>
                <p className="mt-1 text-[10px] leading-5 text-[#fda4af]/85">{item.vibe}</p>
              </figcaption>
            </figure>
          ))}
        </div>

        {foodProducts.length > 0 ? (
          <div className="mt-4 flex flex-col gap-2">
            <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#b8ff3c]">
              Food kits · dropship lane
            </p>
            {foodProducts.map((product) => (
              <div
                key={product.id}
                className="rounded-lg border border-[#fb7185]/20 bg-black/40 px-3 py-2"
              >
                <p className="text-[11px] font-bold text-[#fff1f2]">
                  {product.flag} {product.name}
                </p>
                <p className="mt-1 text-[10px] leading-5 text-[#fda4af]/85">{product.description}</p>
                <p className="mt-1 text-[10px] font-semibold text-[#b8ff3c]">
                  {product.currency} {product.price} · {product.shipsFrom}
                </p>
              </div>
            ))}
          </div>
        ) : null}
      </section>
    </div>
  );
}