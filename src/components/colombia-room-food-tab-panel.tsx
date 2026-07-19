"use client";

import { useRoomLocale } from "@/components/room-locale-provider";
import { getAllDropshipProductsForCountry } from "@/lib/dropshipping";
import { isPublicDropshipVisible } from "@/lib/real-money";
import { colombiaFoodPanelItems } from "@/lib/colombia-room-live";
import { isSpanishContentLocale } from "@/lib/room-locale";

const colombiaFoodLanes = [
  { emoji: "🫓", title: "Arepas" },
  { emoji: "🥟", title: "Empanadas" },
  { emoji: "🍲", title: "Bandeja" },
  { emoji: "🍜", title: "Ajiaco" }
] as const;

/** Food kit SKUs · Command Center FREEZE COMING SOON only when public dropship off */
export function getColombiaFoodDropshipProducts() {
  return getAllDropshipProductsForCountry("colombia").filter(
    (product) =>
      product.category.toLowerCase().includes("food") || product.category.toLowerCase().includes("coffee")
  );
}

/** Money catalog · Command Center FREEZE COMING SOON */
export const COLOMBIA_FOOD_FREEZE_CATALOG = {
  panelTitle: "🇨🇴 Colombia food · arepas · bandeja · coffee kits",
  publicStatus: "LIVE free culture browse · kit prices removed from public",
  room: "/rooms/colombia-room#colombia-food",
  freePublic: [
    "Arepas · empanadas · bandeja paisa · ajiaco culture lanes",
    "Regional dish photo grid (free browse)",
    "No USD prices / buy CTAs when dropship frozen"
  ],
  frozenMoney: [
    "Food kits dropship lane with USD prices",
    "Cartagena Arepa Starter Kit · $28",
    "Medellín Bandeja Paisa Box · $35",
    "Huila Specialty Coffee Box · $32",
    "Platform checkout / dropship buy for Colombia food SKUs"
  ],
  reopenNote:
    "When ready: set NEXT_PUBLIC_SHOW_DROPSHIP_PANELS=true and NEXT_PUBLIC_REAL_MONEY_ENABLED=true to restore food kit checkout."
} as const;

/** Colombia room · compact 🍽️ Comida panel · Español (CO) public · English for MASTER */
export function ColombiaRoomFoodTabPanel() {
  const { locale } = useRoomLocale();
  const es = isSpanishContentLocale(locale);
  const foodProducts = getColombiaFoodDropshipProducts();
  const showDropshipFood = isPublicDropshipVisible() && foodProducts.length > 0;
  const dishes = colombiaFoodPanelItems.slice(0, 4);

  return (
    <div
      className="colombia-room-food-tab-panel colombia-comida-panel"
      aria-label={es ? "Colombia Comida panel" : "Colombia Food panel"}
      lang={es ? "es-CO" : "en"}
    >
      <section className="relative overflow-hidden rounded-lg border border-[#fb7185]/35 bg-[#1a0208]">
        <div
          className="pointer-events-none absolute inset-0 bg-cover bg-center brightness-[1.05] opacity-55"
          style={{ backgroundImage: "url('/colombia-comida-people-eating-2026.jpg')" }}
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#0d0104]/55 via-[#1a0208]/6 to-[#0d0104]/85"
          aria-hidden="true"
        />

        <header className="relative z-10 flex flex-wrap items-center gap-x-2 gap-y-0.5 border-b border-[#fb7185]/20 px-2.5 py-1.5 sm:px-3">
          <h2 className="font-['Bebas_Neue',sans-serif] text-lg tracking-[0.06em] text-[#fff1f2] drop-shadow sm:text-xl">
            {es ? "🍽️ Comida" : "🍽️ Food"}
          </h2>
          <span className="text-[8px] font-black uppercase tracking-[0.12em] text-[#fbbf24]">
            Arepas · bandeja · ajiaco
          </span>
          <span className="ml-auto text-[8px] font-black uppercase tracking-[0.1em] text-[#fda4af]/90">
            {es ? "explorar gratis" : "free browse"}
          </span>
        </header>

        <div className="relative z-10 flex flex-wrap gap-1 px-2 py-1.5 sm:px-2.5">
          {colombiaFoodLanes.map((lane) => (
            <span
              key={lane.title}
              className="rounded-md border border-[#fb7185]/25 bg-black/55 px-2 py-0.5 text-[10px] font-black text-[#fecdd3] backdrop-blur-sm"
            >
              {lane.emoji} {lane.title}
            </span>
          ))}
        </div>

        <div className="relative z-10 grid grid-cols-4 gap-1 p-1.5 sm:p-2">
          {dishes.map((item) => (
            <figure
              key={item.id}
              className="overflow-hidden rounded-md border border-[#fb7185]/20 bg-black/50"
            >
              <img src={item.image} alt={item.name} className="aspect-[4/3] w-full object-cover" />
              <figcaption className="truncate px-1 py-0.5 text-center text-[8px] font-bold text-[#fff1f2] sm:text-[9px]">
                {item.name}
              </figcaption>
            </figure>
          ))}
        </div>

        {showDropshipFood ? (
          <div className="relative z-10 space-y-1 border-t border-white/5 px-2 py-1.5">
            {foodProducts.slice(0, 2).map((product) => (
              <p key={product.id} className="truncate text-[9px] font-semibold text-[#b8ff3c]">
                {product.flag} {product.name} · {product.currency} {product.price}
              </p>
            ))}
          </div>
        ) : null}
      </section>
    </div>
  );
}
