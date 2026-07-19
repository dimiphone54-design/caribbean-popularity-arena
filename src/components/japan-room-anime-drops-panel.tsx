"use client";

import Image from "next/image";
import { getAllDropshipProductsForCountry } from "@/lib/dropshipping";
import { isPublicDropshipVisible } from "@/lib/real-money";

const JA_FONT =
  '"Hiragino Sans", "Hiragino Kaku Gothic ProN", "Noto Sans JP", "Yu Gothic", "Meiryo", sans-serif';

const lanes = [
  { emoji: "🎌", label: "日本限定 · 数量限定" },
  { emoji: "📦", label: "ガシャポン · ブラインドボックス" },
  { emoji: "📚", label: "漫画 · コレクター" },
  { emoji: "🎁", label: "キャラクターグッズ" }
];

export function JapanRoomAnimeDropsPanel() {
  const products = getAllDropshipProductsForCountry("japan").filter(
    (p) =>
      p.category.toLowerCase().includes("anime") ||
      p.category.toLowerCase().includes("collectible") ||
      p.category.toLowerCase().includes("manga") ||
      p.category.toLowerCase().includes("accessories")
  );
  const showPrices = isPublicDropshipVisible();

  return (
    <div
      className="a2030-holo-panel rounded-[1.25rem] border border-[#ff4466]/20 p-2.5 sm:p-3"
      lang="ja"
      style={{ fontFamily: JA_FONT }}
    >
      <header className="text-center">
        <p className="text-[9px] font-black tracking-[0.16em] text-[#ff4466]">
          🎌 アニメ · 日本限定
        </p>
        <h2 className="mt-1 text-lg font-black tracking-wide text-[#eef6ff] sm:text-xl">
          日本 · 限定グッズ
        </h2>
        {!showPrices ? (
          <p className="mt-1 text-[9px] font-semibold text-[#8fa3c4]">無料閲覧</p>
        ) : null}
      </header>
      <div className="mt-2 flex flex-wrap justify-center gap-1.5">
        {lanes.map((l) => (
          <span
            key={l.label}
            className="east-asia-game-chip east-asia-game-chip--japan inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[9px] font-semibold"
          >
            <span aria-hidden="true">{l.emoji}</span>
            <span>{l.label}</span>
          </span>
        ))}
      </div>
      {products.length > 0 && (
        <div className="mt-2 grid grid-cols-2 gap-1.5 sm:grid-cols-4">
          {products.map((p) => (
            <figure
              key={p.id}
              className="overflow-hidden rounded-lg border border-[#ff2bd6]/20 bg-[#0f172a]/70"
            >
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src={p.imageUrl}
                  alt={p.name}
                  fill
                  sizes="(max-width:640px) 50vw, 180px"
                  className="object-cover"
                />
              </div>
              <figcaption className="px-2 py-1.5">
                <p className="text-[10px] font-bold leading-tight text-[#eef6ff]">
                  {p.flag} {p.name}
                </p>
                <p className="text-[9px] leading-tight text-[#9fb4d4]">{p.description}</p>
                {showPrices ? (
                  <p className="text-[9px] font-semibold text-[#b8ff3c]">${p.price}</p>
                ) : null}
              </figcaption>
            </figure>
          ))}
        </div>
      )}
    </div>
  );
}
