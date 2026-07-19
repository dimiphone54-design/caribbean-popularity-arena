"use client";

import Image from "next/image";

const JA_FONT =
  '"Hiragino Sans", "Hiragino Kaku Gothic ProN", "Noto Sans JP", "Yu Gothic UI", "Yu Gothic", Meiryo, sans-serif';

const snackLanes = [
  {
    emoji: "🌶️",
    title: "激辛チャレンジ",
    body: "バイラル激辛スナックパック — 辛さレベル、度胸ボックス、シェアしたくなる熱さ。",
    image:
      "https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=900&q=80&auto=format&fit=crop",
    tag: "バイラル · ヒート"
  },
  {
    emoji: "🍡",
    title: "駄菓子レトロ",
    body: "レトロな日本のお菓子レーン — 20種バラエティ、子どもの頃のノスタルジー、駄菓子屋の空気。",
    image:
      "https://images.unsplash.com/photo-1582058091505-f87a2e55a40f?w=900&q=80&auto=format&fit=crop",
    tag: "お菓子 · レトロ"
  },
  {
    emoji: "🍵",
    title: "抹茶スイーツ",
    body: "抹茶チョコ、餅、緑のキットカット — ギフト向きの箱に詰めた甘い日本。",
    image:
      "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=900&q=80&auto=format&fit=crop",
    tag: "スイーツ · 抹茶"
  },
  {
    emoji: "📸",
    title: "映えスナック",
    body: "カメラ映えするスナックスタック — カラフルな袋、開封の瞬間、フィード映えの日本。",
    image:
      "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=900&q=80&auto=format&fit=crop",
    tag: "ソーシャル · 開封"
  }
] as const;

const lanePills = [
  { emoji: "🌶️", label: "激辛" },
  { emoji: "🍡", label: "駄菓子" },
  { emoji: "🍵", label: "抹茶" },
  { emoji: "📸", label: "映え" }
] as const;

/** Japan room · Snack Lab full panel · Japanese copy */
export function JapanRoomSnacksPanel() {
  return (
    <div
      className="japan-room-snacks-panel japan-snack-lab space-y-3"
      aria-label="日本スナックラボ"
      lang="ja"
      style={{ fontFamily: JA_FONT }}
    >
      <section className="relative overflow-hidden rounded-[1.25rem] border border-[#ff4466]/30 bg-[radial-gradient(circle_at_top_left,rgba(255,68,102,0.18),transparent_42%),linear-gradient(155deg,rgba(32,6,18,0.95),rgba(6,8,18,0.96))] p-4 sm:p-5">
        <div
          className="pointer-events-none absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,68,102,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(251,191,36,0.05) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
            maskImage: "linear-gradient(180deg, rgba(0,0,0,0.5), transparent 88%)"
          }}
          aria-hidden="true"
        />

        <header className="relative z-10 text-center" aria-labelledby="japan-snack-lab-title">
          <h2
            id="japan-snack-lab-title"
            className="mt-3 pt-1 text-[1.65rem] font-black leading-snug tracking-normal text-[#fef9c3] sm:mt-4 sm:text-[1.85rem]"
            style={{ fontFamily: JA_FONT }}
          >
            日本スナックラボ
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-[#d4d4d8]">
            激辛チャレンジ、レトロ駄菓子、抹茶スイーツ、映えスナックボックス — 日本のスナック文化をひとつのライブラボに。
          </p>

          <ul className="mt-4 flex flex-wrap items-center justify-center gap-2" role="list">
            {lanePills.map((pill) => (
              <li
                key={pill.label}
                className="inline-flex items-center gap-1.5 rounded-full border border-[#ff4466]/30 bg-black/35 px-3 py-1.5"
                role="listitem"
              >
                <span aria-hidden="true">{pill.emoji}</span>
                <span className="text-[12px] font-black tracking-[0.06em] text-[#fef9c3]">
                  {pill.label}
                </span>
              </li>
            ))}
          </ul>
        </header>

        <div className="relative z-10 mt-5 grid gap-3 sm:grid-cols-2">
          {snackLanes.map((lane) => (
            <article
              key={lane.title}
              className="group overflow-hidden rounded-xl border border-[#ff4466]/25 bg-[#0a0610]/75 shadow-[0_12px_32px_rgba(0,0,0,0.35)] transition hover:border-[#fbbf24]/45 hover:brightness-110"
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden">
                <Image
                  src={lane.image}
                  alt={lane.title}
                  fill
                  sizes="(max-width: 640px) 100vw, 360px"
                  className="object-cover transition duration-500 group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
                <span className="absolute left-2.5 top-2.5 rounded-full border border-white/15 bg-black/50 px-2 py-0.5 text-[9px] font-black tracking-[0.08em] text-[#fef9c3] backdrop-blur-sm">
                  {lane.emoji} {lane.tag}
                </span>
                <div className="absolute inset-x-0 bottom-0 p-3">
                  <h3 className="text-lg font-black text-[#fef9c3]">
                    <span aria-hidden="true">{lane.emoji} </span>
                    {lane.title}
                  </h3>
                </div>
              </div>
              <p className="px-3 py-2.5 text-[12px] leading-5 text-[#c4b89a]">{lane.body}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
