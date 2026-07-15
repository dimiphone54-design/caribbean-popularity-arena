"use client";

import Image from "next/image";
import { getAllDropshipProductsForCountry } from "@/lib/dropshipping";

const lanes = [
  { emoji: "🌶️", label: "Spicy challenge" },
  { emoji: "🍡", label: "Dagashi retro" },
  { emoji: "🍵", label: "Matcha sweets" },
  { emoji: "📸", label: "Share-worthy" },
];

export function JapanRoomSnacksPanel() {
  const products = getAllDropshipProductsForCountry("japan").filter(
    (p) => p.category.toLowerCase().includes("snack") || p.category.toLowerCase().includes("sweet") || p.category.toLowerCase().includes("food") || p.category.toLowerCase().includes("candy")
  );

  return (
    <div className="a2030-holo-panel rounded-[1.25rem] border border-[#ff4466]/20 p-2.5 sm:p-3">
      <header className="text-center">
        <p className="text-[9px] font-black uppercase tracking-[0.16em] text-[#ff4466]">🌶️ viral snacks · snack box</p>
        <h2 className="mt-1 font-['Bebas_Neue',sans-serif] text-lg tracking-widest text-[#eef6ff] sm:text-xl">JAPAN · snack lab</h2>
      </header>
      <div className="mt-2 flex flex-wrap justify-center gap-1.5">
        {lanes.map((l) => (
          <span key={l.label} className="east-asia-game-chip east-asia-game-chip--japan inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[9px] font-semibold">
            <span aria-hidden="true">{l.emoji}</span><span>{l.label}</span>
          </span>
        ))}
      </div>
      {products.length > 0 && (
        <div className="mt-2 grid gap-1.5 sm:grid-cols-3">
          {products.map((p) => (
            <figure key={p.id} className="overflow-hidden rounded-lg border border-[#ff2bd6]/20 bg-[#0f172a]/70">
              <div className="flex sm:flex-row">
                <div className="relative aspect-[16/9] w-full shrink-0 sm:h-20 sm:w-28">
                  <Image src={p.imageUrl} alt={p.name} fill sizes="(max-width:640px) 100vw, 112px" className="object-cover" />
                </div>
                <figcaption className="flex-1 px-2 py-1.5">
                  <p className="text-[10px] font-bold text-[#eef6ff] leading-tight">{p.flag} {p.name}</p>
                  <p className="text-[9px] text-[#9fb4d4] leading-tight">{p.description}</p>
                  <p className="text-[9px] font-semibold text-[#b8ff3c]">${p.price}</p>
                </figcaption>
              </div>
            </figure>
          ))}
        </div>
      )}
    </div>
  );
}
