"use client";

import Image from "next/image";

const deskLanes = [
  {
    emoji: "🖊️",
    title: "Monozukuri Pens",
    titleJa: "ものづくりペン",
    body: "Gel pens, fine-liners, and monozukuri craft — Japan desk tools built for focus.",
    image:
      "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=900&q=80&auto=format&fit=crop",
    tag: "Pens · Craft"
  },
  {
    emoji: "📓",
    title: "Traveler's Notebook",
    titleJa: "トラベラーズノート",
    body: "Refillable notebooks, leather covers, and analog planning for the Japan desk.",
    image:
      "https://images.unsplash.com/photo-1531346680769-a1d79b57de5c?w=900&q=80&auto=format&fit=crop",
    tag: "Notebook · Analog"
  },
  {
    emoji: "🎨",
    title: "Kawaii Stickers",
    titleJa: "かわいいシール",
    body: "Sticker sheets, washi energy, and cute desk decoration from Japan makers.",
    image:
      "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=900&q=80&auto=format&fit=crop",
    tag: "Stickers · Kawaii"
  },
  {
    emoji: "✏️",
    title: "Desk Ritual",
    titleJa: "デスク習慣",
    body: "Calm study setup — pens, paper, and quiet Japan focus on the room stage.",
    image:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=900&q=80&auto=format&fit=crop",
    tag: "Study · Focus"
  }
] as const;

const lanePills = [
  { emoji: "🖊️", en: "Pens", ja: "ペン" },
  { emoji: "📓", en: "Notebook", ja: "ノート" },
  { emoji: "🎨", en: "Stickers", ja: "シール" },
  { emoji: "✏️", en: "Desk", ja: "机" }
] as const;

/** Japan room · Desk Lab full panel (same scale as Snack Lab) */
export function JapanRoomStationeryPanel() {
  return (
    <div className="japan-room-stationery-panel japan-desk-lab space-y-3" aria-label="Japan Desk Lab">
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

        <header className="relative z-10 text-center" aria-labelledby="japan-desk-lab-title">
          <h2
            id="japan-desk-lab-title"
            className="mt-3 pt-1 text-[1.65rem] font-black leading-snug tracking-normal text-[#fef9c3] sm:mt-4 sm:text-[1.85rem]"
            style={{
              fontFamily:
                '"Hiragino Sans", "Hiragino Kaku Gothic ProN", "Noto Sans JP", "Yu Gothic UI", "Yu Gothic", Meiryo, sans-serif'
            }}
            lang="ja"
          >
            日本デスクラボ
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-[#d4d4d8]">
            Monozukuri pens, traveler&apos;s notebooks, kawaii stickers, and calm desk ritual — analog Japan for the study
            stage.
          </p>

          <ul className="mt-4 flex flex-wrap items-center justify-center gap-2" role="list">
            {lanePills.map((pill) => (
              <li
                key={pill.en}
                className="inline-flex items-center gap-1.5 rounded-full border border-[#ff4466]/30 bg-black/35 px-3 py-1.5"
                role="listitem"
              >
                <span aria-hidden="true">{pill.emoji}</span>
                <span className="text-[11px] font-black uppercase tracking-[0.08em] text-[#fef9c3]">
                  {pill.en}
                </span>
                <span
                  className="text-[12px] font-semibold text-[#fbbf24]"
                  style={{
                    fontFamily:
                      '"Hiragino Sans", "Hiragino Kaku Gothic ProN", "Noto Sans JP", "Yu Gothic", sans-serif'
                  }}
                >
                  {pill.ja}
                </span>
              </li>
            ))}
          </ul>
        </header>

        <div className="relative z-10 mt-5 grid gap-3 sm:grid-cols-2">
          {deskLanes.map((lane) => (
            <article
              key={lane.title}
              className="group overflow-hidden rounded-xl border border-[#ff4466]/25 bg-[#0a0610]/75 shadow-[0_12px_32px_rgba(0,0,0,0.35)] transition hover:border-[#fbbf24]/45 hover:brightness-110"
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden">
                <Image
                  src={lane.image}
                  alt={`${lane.title} · ${lane.titleJa}`}
                  fill
                  sizes="(max-width: 640px) 100vw, 360px"
                  className="object-cover transition duration-500 group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
                <span className="absolute left-2.5 top-2.5 rounded-full border border-white/15 bg-black/50 px-2 py-0.5 text-[9px] font-black uppercase tracking-[0.1em] text-[#fef9c3] backdrop-blur-sm">
                  {lane.emoji} {lane.tag}
                </span>
                <div className="absolute inset-x-0 bottom-0 p-3">
                  <p
                    className="text-[13px] font-semibold text-[#fbbf24]"
                    style={{
                      fontFamily:
                        '"Hiragino Sans", "Hiragino Kaku Gothic ProN", "Noto Sans JP", "Yu Gothic", sans-serif'
                    }}
                  >
                    {lane.titleJa}
                  </p>
                  <h3 className="mt-0.5 text-lg font-black text-[#fef9c3]">
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
