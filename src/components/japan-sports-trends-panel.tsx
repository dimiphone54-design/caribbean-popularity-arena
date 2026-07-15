"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const SPORT_PHOTOS = [
  { sport: "Baseball · プロ野球", emoji: "⚾", photo: "https://images.unsplash.com/photo-1529768167801-9173d94c2a42?w=800&q=80&auto=format&fit=crop" },
  { sport: "Soccer · Jリーグ", emoji: "⚽", photo: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=800&q=80&auto=format&fit=crop" },
  { sport: "Sumo · 大相撲", emoji: "🤼", photo: "https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=800&q=80&auto=format&fit=crop" },
  { sport: "Judo · 柔道", emoji: "🥋", photo: "https://images.unsplash.com/photo-1562088287-bde35a1ea917?w=800&q=80&auto=format&fit=crop" },
  { sport: "Figure Skating · フィギュア", emoji: "⛸️", photo: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800&q=80&auto=format&fit=crop" },
  { sport: "Tennis · テニス", emoji: "🎾", photo: "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=800&q=80&auto=format&fit=crop" },
  { sport: "Golf · ゴルフ", emoji: "⛳", photo: "https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=800&q=80&auto=format&fit=crop" },
  { sport: "Basketball · Bリーグ", emoji: "🏀", photo: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800&q=80&auto=format&fit=crop" },
  { sport: "Volleyball · Vリーグ", emoji: "🏐", photo: "https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?w=800&q=80&auto=format&fit=crop" },
  { sport: "Swimming · 水泳", emoji: "🏊", photo: "https://images.unsplash.com/photo-1530549387789-4c1017266635?w=800&q=80&auto=format&fit=crop" },
];

export function JapanSportsTrendsPanel() {
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setSlide((prev) => (prev + 1) % SPORT_PHOTOS.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="rounded-[1.25rem] border border-[#ff4466]/20 overflow-hidden">
      {/* ── Slideshow ── */}
      <div className="relative h-48 sm:h-56 lg:h-64 overflow-hidden">
        {SPORT_PHOTOS.map((item, i) => (
          <div
            key={item.sport}
            className={`absolute inset-0 transition-opacity duration-700 ${i === slide ? "opacity-100" : "opacity-0"}`}
          >
            <Image
              src={item.photo}
              alt={item.sport}
              fill
              sizes="(max-width: 640px) 100vw, 800px"
              className="object-cover"
              priority={i === 0}
            />
          </div>
        ))}
        {/* dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0408] via-[#0a0408]/50 to-transparent" aria-hidden="true" />
        {/* current sport label */}
        <div className="absolute bottom-4 left-0 right-0 z-10 text-center">
          <p className="text-2xl font-black text-[#fef9c3] drop-shadow-lg sm:text-3xl">
            {SPORT_PHOTOS[slide].emoji} {SPORT_PHOTOS[slide].sport}
          </p>
        </div>
        {/* dots */}
        <div className="absolute bottom-1 left-0 right-0 z-10 flex justify-center gap-1.5">
          {SPORT_PHOTOS.map((item, i) => (
            <button
              key={item.sport}
              type="button"
              className={`h-1.5 w-1.5 rounded-full transition-colors ${i === slide ? "bg-[#ff4466]" : "bg-white/25"}`}
              onClick={() => setSlide(i)}
              aria-label={`Slide ${i + 1}: ${item.sport}`}
              aria-current={i === slide ? "true" : undefined}
            />
          ))}
        </div>
      </div>

      {/* ── Top 10 list ── */}
      <div className="relative bg-[#0a0408]/80 p-3 sm:p-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-[10px] font-black uppercase tracking-[0.16em] text-[#ff4466] sm:text-xs">
            🇯🇵 Top 10 sports trends · Japan
          </p>
          <span className="inline-flex h-2 w-2 rounded-full bg-[#ff4466]" />
        </div>
        <p className="mt-2 text-[11px] leading-5 text-[#94a3b8]">
          Real-time trending sports across Japan — what fans are watching, betting on, and talking about right now.
        </p>

        <div className="mt-3 space-y-1.5" role="list">
          {JAPAN_SPORTS_TRENDS.map((sport) => (
            <button
              key={sport.rank}
              type="button"
              className="flex w-full items-center gap-2.5 rounded-lg border border-white/5 bg-[#09111f]/60 px-3 py-2.5 text-left transition hover:border-[#ff4466]/25 hover:bg-[#ff4466]/5"
              role="listitem"
            >
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[#ff4466]/30 bg-[#1a0810] text-[10px] font-black text-[#ff4466]">
                {sport.rank}
              </span>
              <span className="text-lg" aria-hidden="true">{sport.emoji}</span>
              <span className="min-w-0 flex-1">
                <span className="block text-[12px] font-bold text-[#fef9c3]">{sport.label}</span>
                <span className="block text-[10px] text-[#8fa3c4]">{sport.tag}</span>
              </span>
              <span className="shrink-0 rounded-full bg-[#ff4466]/10 px-2 py-0.5 text-[9px] font-bold text-[#ff4466]">
                Trending
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

const JAPAN_SPORTS_TRENDS = [
  { rank: 1, emoji: "⚾", label: "Baseball · プロ野球", tag: "NPB · Japanese professional baseball league" },
  { rank: 2, emoji: "⚽", label: "Soccer · Jリーグ", tag: "J-League · Japan professional football" },
  { rank: 3, emoji: "🤼", label: "Sumo · 大相撲", tag: "Grand tournament · national sport" },
  { rank: 4, emoji: "🥋", label: "Judo · 柔道", tag: "Olympic martial art · Kodokan" },
  { rank: 5, emoji: "⛸️", label: "Figure Skating · フィギュア", tag: "NHK Trophy · Grand Prix series" },
  { rank: 6, emoji: "🎾", label: "Tennis · テニス", tag: "Rakuten Open · ATP/WTA circuit" },
  { rank: 7, emoji: "⛳", label: "Golf · ゴルフ", tag: "JGTO Tour · top Asian circuit" },
  { rank: 8, emoji: "🏀", label: "Basketball · Bリーグ", tag: "B.League · Japan pro basketball" },
  { rank: 9, emoji: "🏐", label: "Volleyball · Vリーグ", tag: "V.League · top domestic league" },
  { rank: 10, emoji: "🏊", label: "Swimming · 水泳", tag: "National championship · Olympic qualifiers" },
];
