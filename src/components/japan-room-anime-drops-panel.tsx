"use client";

import Image from "next/image";
import { getAllDropshipProductsForCountry } from "@/lib/dropshipping";

const lanes = [
  { emoji: "🎌", label: "Japan-exclusive · limited" },
  { emoji: "📦", label: "Gashapon · blind box" },
  { emoji: "📚", label: "Manga · collector" },
  { emoji: "🎁", label: "Character goods" },
];

export function JapanRoomAnimeDropsPanel() {
  const products = getAllDropshipProductsForCountry("japan").filter(
    (p) => p.category.toLowerCase().includes("anime") || p.category.toLowerCase().includes("collectible") || p.category.toLowerCase().includes("manga") || p.category.toLowerCase().includes("accessories")
  );

  return (
    <div className="a2030-holo-panel rounded-[1.25rem] border border-[#ff4466]/20 p-2.5 sm:p-3">
      <header className="text-center">
        <p className="text-[9px] font-black uppercase tracking-[0.16em] text-[#ff4466]">🎌 anime · japan-exclusive</p>
        <h2 className="mt-1 font-['Bebas_Neue',sans-serif] text-lg tracking-widest text-[#eef6ff] sm:text-xl">JAPAN · limited merch</h2>
      </header>
      <div className="mt-2 flex flex-wrap justify-center gap-1.5">
        {lanes.map((l) => (
          <span key={l.label} className="east-asia-game-chip east-asia-game-chip--japan inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[9px] font-semibold">
            <span aria-hidden="true">{l.emoji}</span><span>{l.label}</span>
          </span>
        ))}
      </div>
      {products.length > 0 && (
        <div className="mt-2 grid grid-cols-2 gap-1.5 sm:grid-cols-4">
          {products.map((p) => (
            <figure key={p.id} className="overflow-hidden rounded-lg border border-[#ff2bd6]/20 bg-[#0f172a]/70">
              <div className="relative aspect-[4/3] w-full">
                <Image src={p.imageUrl} alt={p.name} fill sizes="(max-width:640px) 50vw, 180px" className="object-cover" />
              </div>
              <figcaption className="px-2 py-1.5">
                <p className="text-[10px] font-bold text-[#eef6ff] leading-tight">{p.flag} {p.name}</p>
                <p className="text-[9px] text-[#9fb4d4] leading-tight">{p.description}</p>
                <p className="text-[9px] font-semibold text-[#b8ff3c]">${p.price}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      )}
    </div>
  );
}
