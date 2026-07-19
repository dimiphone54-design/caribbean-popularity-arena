"use client";

import Image from "next/image";
import { getAllDropshipProductsForCountry } from "@/lib/dropshipping";

const JA_FONT =
  '"Hiragino Sans", "Hiragino Kaku Gothic ProN", "Noto Sans JP", "Yu Gothic", "Meiryo", sans-serif';

const lanes = [
  { emoji: "👘", label: "ストリート · 着物" },
  { emoji: "🎌", label: "剣道スタイル" },
  { emoji: "🛍️", label: "ライフスタイルボックス" },
];

export function JapanRoomFashionTabPanel() {
  const products = getAllDropshipProductsForCountry("japan").filter((p) =>
    p.category.toLowerCase().includes("fashion") || p.category.toLowerCase().includes("lifestyle")
  );

  return (
    <div
      className="a2030-holo-panel rounded-[1.25rem] border border-[#ff4466]/20 p-2.5 sm:p-3"
      aria-label="日本 · ストリート"
      lang="ja"
      style={{ fontFamily: JA_FONT }}
    >
      <header className="text-center">
        <p className="text-[9px] font-black tracking-[0.12em] text-[#fbbf24]">👘 ファッション · ストリートクチュール</p>
        <h2 className="mt-1 text-lg font-black tracking-wide text-[#eef6ff] sm:text-xl">日本 · ストリート</h2>
      </header>
      <div className="mt-2 flex flex-wrap justify-center gap-1.5">
        {lanes.map((l) => (
          <span key={l.label} className="east-asia-game-chip east-asia-game-chip--japan inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[9px] font-semibold">
            <span aria-hidden="true">{l.emoji}</span><span>{l.label}</span>
          </span>
        ))}
      </div>
      {products.length > 0 && (
        <div className="mt-2 grid gap-1.5 sm:grid-cols-2">
          {products.map((p) => (
            <figure key={p.id} className="overflow-hidden rounded-lg border border-[#ff2bd6]/20 bg-[#0f172a]/70">
              <div className="relative aspect-[4/3] w-full">
                <Image src={p.imageUrl} alt={p.name} fill sizes="(max-width:640px) 50vw, 220px" className="object-cover" />
              </div>
              <figcaption className="px-2 py-1.5">
                <p className="text-[10px] font-bold text-[#eef6ff] leading-tight">{p.flag} {p.name}</p>
                <p className="text-[9px] text-[#9fb4d4] leading-tight">{p.description}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      )}
    </div>
  );
}
