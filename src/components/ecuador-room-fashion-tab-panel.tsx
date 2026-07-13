"use client";

import { EcuadorCulture2028Panel } from "@/components/ecuador-culture-2028-panel";
import { getAllDropshipProductsForCountry } from "@/lib/dropshipping";

/** Ecuador room · culture panel + festival fashion inside Fashion tab */
export function EcuadorRoomFashionTabPanel() {
  const fashionProducts = getAllDropshipProductsForCountry("ecuador").filter((product) =>
    product.category.toLowerCase().includes("fashion")
  );

  return (
    <div className="ecuador-room-fashion-tab-panel space-y-5">
      <EcuadorCulture2028Panel />

      {fashionProducts.length > 0 ? (
        <section className="country-room-section w-full">
          <p className="text-center text-[10px] font-bold uppercase tracking-[0.14em] text-[#b8ff3c]">
            Festival fashion · dropship lane
          </p>
          <div className="mt-3 flex flex-col gap-2">
            {fashionProducts.map((product) => (
              <div
                key={product.id}
                className="rounded-lg border border-[#22c55e]/20 bg-[#040a08]/80 px-3 py-2"
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