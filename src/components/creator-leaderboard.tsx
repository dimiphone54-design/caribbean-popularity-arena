"use client";

import { BadgeCheck, TrendingUp } from "lucide-react";
import { useArenaEngineState } from "@/components/use-arena-engine";
import { getActiveEliteCreatorRankings } from "@/lib/elite-creator-rankings";

export function CreatorLeaderboard() {
  const { state: engine } = useArenaEngineState();
  const liveIslandCodes = engine?.liveSessions.map((session) => session.islandCode) ?? [];
  const creators = getActiveEliteCreatorRankings(liveIslandCodes);
  const topScore = creators[0]?.score ?? 1;

  return (
    <section id="leaderboard" className="w-full py-20">
      <div className="w-full">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="luxury-section-eyebrow">Elite creator rankings</p>
            <h2 className="luxury-section-title mt-3 text-4xl sm:text-5xl">
              The inner circle is watching.
            </h2>
          </div>
          <p className="max-w-xl text-base leading-7 text-[var(--luxury-mist)]">
            Weekly rankings blend fan votes, streaks, verified activity, and category
            momentum into one exclusive arena score.
          </p>
        </div>

        <div className="mt-10 grid gap-4">
          {creators.map((creator) => (
            <article key={`${creator.frontSlotRank}-${creator.name}`} className="luxury-glass-card p-5">
              <div className="relative z-[1] grid gap-5 lg:grid-cols-[auto_1fr_auto] lg:items-center">
                <div className="flex items-center gap-4">
                  <span className="grid size-12 place-items-center rounded-2xl border border-[var(--glass-border)] bg-[var(--glass-bg-deep)] font-luxury-serif text-xl text-[var(--luxury-gold-bright)]">
                    #{creator.rank}
                  </span>
                  <div
                    className="grid size-16 place-items-center rounded-3xl text-xl font-black text-slate-950 shadow-lg"
                    style={{ background: creator.avatarGradient }}
                  >
                    {creator.initials}
                  </div>
                </div>

                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="font-luxury-serif text-2xl text-[var(--luxury-champagne)]">
                      {creator.name}
                    </h3>
                    {creator.badges.map((badge) => (
                      <span
                        key={badge}
                        className="inline-flex items-center gap-1 rounded-full border border-[var(--glass-border)] bg-[var(--luxury-gold)]/8 px-3 py-1 text-xs font-bold text-[var(--luxury-gold-bright)]"
                      >
                        <BadgeCheck className="size-3.5" aria-hidden="true" />
                        {badge}
                      </span>
                    ))}
                  </div>
                  <p className="mt-2 text-sm text-[var(--luxury-mist)]">
                    {creator.island} · {creator.category}
                  </p>
                  <div className="mt-4 h-2 overflow-hidden rounded-full bg-[var(--glass-bg-deep)]">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-[var(--luxury-gold-deep)] via-[var(--luxury-gold)] to-[var(--luxury-gold-bright)]"
                      style={{ width: `${Math.round((creator.score / topScore) * 100)}%` }}
                    />
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--luxury-gold)]/80">
                    Arena score
                  </p>
                  <p className="mt-1 font-luxury-serif text-3xl text-[var(--luxury-champagne)]">
                    {creator.score.toLocaleString()}
                  </p>
                  <p className="mt-1 inline-flex items-center gap-1 text-sm font-bold text-emerald-300/90">
                    <TrendingUp className="size-4" aria-hidden="true" />
                    {creator.trend}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
