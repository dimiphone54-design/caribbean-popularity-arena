"use client";

import Image from "next/image";

const JA_FONT =
  '"Hiragino Sans", "Hiragino Kaku Gothic ProN", "Noto Sans JP", "Yu Gothic UI", "Yu Gothic", Meiryo, sans-serif';

const foodLanes = [
  {
    emoji: "🍵",
    title: "抹茶キット",
    body: "お抹茶・茶筅・茶碗 — 本格的な日本の茶キッチン入門。",
    image:
      "https://images.unsplash.com/photo-1515823064-d6e0c04616a7?w=900&q=80&auto=format&fit=crop",
    tag: "お茶 · キッチン"
  },
  {
    emoji: "🍱",
    title: "弁当",
    body: "層になったランチクラフト — ご飯・漬物・家庭の日本のエネルギーを一つの箱に。",
    image:
      "https://images.unsplash.com/photo-1569058242567-93de6f36f8e6?w=900&q=80&auto=format&fit=crop",
    tag: "ランチ · クラフト"
  },
  {
    emoji: "🍜",
    title: "ラーメン",
    body: "出汁・麺・夜の丼の魂 — フードラボのための東京ストリートの熱。",
    image:
      "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=900&q=80&auto=format&fit=crop",
    tag: "麺 · ナイト"
  },
  {
    emoji: "🫖",
    title: "茶道",
    body: "静かな所作の流れ — 道具・静けさ・舞台上の日本のおもてなし。",
    image:
      "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=900&q=80&auto=format&fit=crop",
    tag: "お茶 · 儀式"
  }
] as const;

const lanePills = [
  { emoji: "🍵", label: "抹茶" },
  { emoji: "🍱", label: "弁当" },
  { emoji: "🍜", label: "ラーメン" },
  { emoji: "🫖", label: "茶道" }
] as const;

/** Japan room · Food Lab full panel · Japanese copy */
export function JapanRoomFoodTabPanel() {
  return (
    <div
      className="japan-room-food-tab-panel japan-food-lab space-y-3"
      aria-label="日本フードラボ"
      lang="ja"
      style={{ fontFamily: JA_FONT }}
    >
      <section className="relative overflow-hidden rounded-[1.25rem] border border-[#ff4466]/30 bg-[radial-gradient(circle_at_top_right,rgba(255,68,102,0.16),transparent_40%),linear-gradient(145deg,rgba(28,8,16,0.94),rgba(6,8,18,0.96))] p-4 sm:p-5">
        <div
          className="pointer-events-none absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,68,102,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(251,191,36,0.04) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
            maskImage: "linear-gradient(180deg, rgba(0,0,0,0.5), transparent 88%)"
          }}
          aria-hidden="true"
        />

        <header className="relative z-10 text-center" aria-labelledby="japan-food-lab-title">
          <h2
            id="japan-food-lab-title"
            className="mt-3 pt-1 text-[1.65rem] font-black leading-snug tracking-normal text-[#fef9c3] sm:mt-4 sm:text-[1.85rem]"
            style={{ fontFamily: JA_FONT }}
          >
            日本フードラボ
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-[#d4d4d8]">
            抹茶キット、弁当クラフト、ラーメンナイト、茶道の静けさ — 日本のキッチン文化をひとつのライブラボに。
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
          {foodLanes.map((lane) => (
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
