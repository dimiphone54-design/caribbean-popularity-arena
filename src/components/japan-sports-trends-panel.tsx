"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const JA_FONT =
  '"Hiragino Sans", "Hiragino Kaku Gothic ProN", "Noto Sans JP", "Yu Gothic", "Meiryo", sans-serif';

/** Japan Sports Arena · public trends (fee % lives in Command Center) */
const JAPAN_SPORTS_TRENDS = [
  {
    rank: 1,
    emoji: "🏸",
    label: "バドミントン",
    tag: "若者の間で急成長",
    photo: "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=900&q=80&auto=format&fit=crop"
  },
  {
    rank: 2,
    emoji: "⚾",
    label: "プロ野球",
    tag: "NPBプロリーグ · 甲子園の熱狂",
    photo: "https://images.unsplash.com/photo-1529768167801-9173d94c2a42?w=900&q=80&auto=format&fit=crop"
  },
  {
    rank: 3,
    emoji: "🏀",
    label: "Bリーグ",
    tag: "B.League急上昇 · ストリートバスケ文化",
    photo: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=900&q=80&auto=format&fit=crop"
  },
  {
    rank: 4,
    emoji: "🥋",
    label: "柔道 · 武道",
    tag: "伝統と現代のトレーニング",
    photo: "https://images.unsplash.com/photo-1562088287-bde35a1ea917?w=900&q=80&auto=format&fit=crop"
  },
  {
    rank: 5,
    emoji: "🏃‍♂️",
    label: "ランニング · マラソン",
    tag: "都市型マラソンが活況",
    photo: "https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?w=900&q=80&auto=format&fit=crop"
  },
  {
    rank: 6,
    emoji: "🏐",
    label: "バレーボール",
    tag: "Vリーグ · ビーチバレー",
    photo: "https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?w=900&q=80&auto=format&fit=crop"
  },
  {
    rank: 7,
    emoji: "🚴",
    label: "サイクリング",
    tag: "ロード · 都市サイクリング文化",
    photo: "https://images.unsplash.com/photo-1541625602330-2277a4c46182?w=900&q=80&auto=format&fit=crop"
  },
  {
    rank: 8,
    emoji: "🎾",
    label: "テニス",
    tag: "日本人スターの活躍で盛り上がり",
    photo: "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=900&q=80&auto=format&fit=crop"
  },
  {
    rank: 9,
    emoji: "🧘",
    label: "フィットネス · トレーニング",
    tag: "ファンクショナルジムが拡大",
    photo: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=900&q=80&auto=format&fit=crop"
  },
  {
    rank: 10,
    emoji: "🗡️",
    label: "剣道",
    tag: "伝統の武のスポーツが再熱",
    photo: "https://images.unsplash.com/photo-1555597673-b21d5c935865?w=900&q=80&auto=format&fit=crop"
  },
  {
    rank: 11,
    emoji: "⚽",
    label: "サッカー",
    tag: "Jリーグ · 日本スポーツの熱",
    photo: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=900&q=80&auto=format&fit=crop"
  },
  {
    rank: 12,
    emoji: "🏓",
    label: "卓球",
    tag: "クラブ戦 · 国内サーキットの熱",
    photo: "https://images.unsplash.com/photo-1609710228159-0fa9bd7c0827?w=900&q=80&auto=format&fit=crop"
  },
  {
    rank: 13,
    emoji: "⛳",
    label: "ゴルフ",
    tag: "JGTOツアー · アジアサーキット",
    photo: "https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=900&q=80&auto=format&fit=crop"
  },
  {
    rank: 14,
    emoji: "🎮",
    label: "eスポーツ",
    tag: "競技ゲーミング · 日本シーン",
    photo: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=900&q=80&auto=format&fit=crop"
  },
  {
    rank: 15,
    emoji: "🤼",
    label: "大相撲",
    tag: "本場所 · 国技の熱狂",
    photo: "https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=900&q=80&auto=format&fit=crop"
  }
] as const;

/** Money earn lanes · Command Center FREEZE COMING SOON only (not public) */
export const JAPAN_SPORTS_EARN_LANES_FROZEN = [
  {
    emoji: "🎯",
    title: "Prediction Games",
    body: "Pay a small entry fee to predict matches"
  },
  {
    emoji: "📺",
    title: "Live Watch Parties",
    body: "Premium rooms with gifting to hosts"
  },
  {
    emoji: "🛍️",
    title: "Sports Merch Lane",
    body: "Japan team jerseys, equipment, gadgets"
  },
  {
    emoji: "🥋",
    title: "Coaching Sessions",
    body: "Live training with Japanese coaches"
  },
  {
    emoji: "⚔️",
    title: "Creator Battles",
    body: "Top predictors go live and get gifted"
  }
] as const;

export function JapanSportsTrendsPanel() {
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setSlide((prev) => (prev + 1) % JAPAN_SPORTS_TRENDS.length);
    }, 4000);
    return () => window.clearInterval(timer);
  }, []);

  const current = JAPAN_SPORTS_TRENDS[slide]!;

  return (
    <section
      className="japan-sports-arena space-y-3 overflow-hidden rounded-[1.25rem] border border-[#ff4466]/30 bg-[radial-gradient(circle_at_top_right,rgba(255,68,102,0.14),transparent_42%),linear-gradient(155deg,rgba(20,6,12,0.96),rgba(6,8,16,0.96))]"
      aria-label="日本スポーツアリーナ"
      lang="ja"
      style={{ fontFamily: JA_FONT }}
    >
      {/* Hero slideshow */}
      <div className="relative h-48 overflow-hidden sm:h-56 lg:h-64">
        {JAPAN_SPORTS_TRENDS.map((item, i) => (
          <div
            key={item.label}
            className={`absolute inset-0 transition-opacity duration-700 ${i === slide ? "opacity-100" : "opacity-0"}`}
          >
            <Image
              src={item.photo}
              alt={item.label}
              fill
              sizes="(max-width: 640px) 100vw, 800px"
              className="object-cover"
              priority={i === 0}
            />
          </div>
        ))}
        <div
          className="absolute inset-0 bg-gradient-to-t from-[#0a0408] via-[#0a0408]/55 to-transparent"
          aria-hidden="true"
        />
        <div className="absolute bottom-4 left-0 right-0 z-10 px-3 text-center">
          <p className="text-[10px] font-black tracking-[0.12em] text-[#ff4466]">
            🔥 人気スポーツトレンド
          </p>
          <p className="mt-1 text-xl font-black text-[#fef9c3] drop-shadow-lg sm:text-2xl">
            {current.emoji} {current.label}
          </p>
          <p className="mt-1 text-[11px] font-semibold text-[#d4d4d8]">{current.tag}</p>
        </div>
        <div className="absolute bottom-1 left-0 right-0 z-10 flex justify-center gap-1">
          {JAPAN_SPORTS_TRENDS.map((item, i) => (
            <button
              key={item.label}
              type="button"
              className={`h-1.5 w-1.5 rounded-full transition-colors ${i === slide ? "bg-[#ff4466]" : "bg-white/25"}`}
              onClick={() => setSlide(i)}
              aria-label={`スライド ${i + 1}: ${item.label}`}
              aria-current={i === slide ? "true" : undefined}
            />
          ))}
        </div>
      </div>

      <div className="space-y-4 px-3 pb-4 sm:px-4">
        {/* Header */}
        <header className="text-center">
          <h2 className="text-2xl font-black tracking-wide text-[#fef9c3] sm:text-3xl">
            🇯🇵 日本スポーツアリーナ
          </h2>
          <p className="mt-1 text-[12px] font-black tracking-[0.08em] text-[#67e8f9]">
            日本がプレイし、観て、鍛えているもの
          </p>
          <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-[#d4d4d8]">
            日本のライブ・スポーツ文化 — トレンド、予想、リアルなコミュニティ参加。
          </p>
        </header>

        {/* Trends list */}
        <div>
          <p className="text-center text-[10px] font-black tracking-[0.12em] text-[#ff4466]">
            🔥 日本の人気スポーツトレンド
          </p>
          <div className="mt-2 max-h-[18rem] space-y-1.5 overflow-y-auto pr-0.5" role="list">
            {JAPAN_SPORTS_TRENDS.map((sport) => (
              <button
                key={sport.rank}
                type="button"
                className="flex w-full items-center gap-2.5 rounded-lg border border-white/5 bg-[#09111f]/60 px-3 py-2.5 text-left transition hover:border-[#ff4466]/25 hover:bg-[#ff4466]/5"
                role="listitem"
                onClick={() => setSlide(sport.rank - 1)}
              >
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[#ff4466]/30 bg-[#1a0810] text-[10px] font-black text-[#ff4466]">
                  {sport.rank}
                </span>
                <span className="text-lg" aria-hidden="true">
                  {sport.emoji}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[12px] font-bold text-[#fef9c3]">
                    {sport.label}
                  </span>
                  <span className="block text-[10px] leading-4 text-[#8fa3c4]">{sport.tag}</span>
                </span>
              </button>
            ))}
          </div>
          <p className="mt-2 text-center text-[11px] leading-5 text-[#9fb4d4]">
            さらに：サッカー（Jリーグ）、卓球、ゴルフ、eスポーツ
          </p>
        </div>
      </div>
    </section>
  );
}
