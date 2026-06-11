import { BadgeCheck, TrendingUp } from "lucide-react";
import { creators } from "@/lib/data";

const topScore = creators[0]?.score ?? 1;

export function CreatorLeaderboard() {
  return (
    <section id="leaderboard" className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.35em] text-amber-200">
              Creator leaderboard
            </p>
            <h2 className="mt-3 text-4xl font-black tracking-tight text-white sm:text-5xl">
              The islands are watching.
            </h2>
          </div>
          <p className="max-w-xl text-base leading-7 text-slate-300">
            Weekly rankings combine fan votes, vote streaks, verified creator
            activity, and category momentum into one arena score.
          </p>
        </div>

        <div className="mt-10 grid gap-4">
          {creators.map((creator) => (
            <article
              key={creator.name}
              className="group rounded-[2rem] border border-white/10 bg-white/[0.07] p-5 shadow-xl shadow-black/10 backdrop-blur transition hover:-translate-y-1 hover:bg-white/[0.1]"
            >
              <div className="grid gap-5 lg:grid-cols-[auto_1fr_auto] lg:items-center">
                <div className="flex items-center gap-4">
                  <span className="grid size-12 place-items-center rounded-2xl border border-white/10 bg-slate-950 text-xl font-black text-amber-200">
                    #{creator.rank}
                  </span>
                  <div
                    className={`grid size-16 place-items-center rounded-3xl bg-gradient-to-br ${creator.accent} text-xl font-black text-slate-950 shadow-lg`}
                  >
                    {creator.initials}
                  </div>
                </div>

                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="text-2xl font-black text-white">{creator.name}</h3>
                    {creator.badges.map((badge) => (
                      <span
                        key={badge}
                        className="inline-flex items-center gap-1 rounded-full bg-white/10 px-3 py-1 text-xs font-bold text-cyan-100"
                      >
                        <BadgeCheck className="size-3.5" aria-hidden="true" />
                        {badge}
                      </span>
                    ))}
                  </div>
                  <p className="mt-1 text-sm font-semibold text-amber-100">
                    {creator.island} · {creator.category}
                  </p>
                  <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-300">
                    {creator.bio}
                  </p>
                  <div className="mt-4 h-2 rounded-full bg-white/10">
                    <div
                      className="h-2 rounded-full bg-gradient-to-r from-cyan-300 via-amber-300 to-orange-400"
                      style={{ width: `${Math.round((creator.score / topScore) * 100)}%` }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3 text-center lg:min-w-72">
                  <div className="rounded-2xl bg-slate-950/60 p-4">
                    <p className="text-xs text-slate-400">Score</p>
                    <p className="mt-1 text-xl font-black">{creator.score.toLocaleString()}</p>
                  </div>
                  <div className="rounded-2xl bg-slate-950/60 p-4">
                    <p className="text-xs text-slate-400">Votes</p>
                    <p className="mt-1 text-xl font-black">{creator.votes}</p>
                  </div>
                  <div className="rounded-2xl bg-emerald-400/10 p-4 text-emerald-200">
                    <p className="text-xs text-emerald-100/70">Trend</p>
                    <p className="mt-1 flex items-center justify-center gap-1 text-xl font-black">
                      <TrendingUp className="size-4" aria-hidden="true" />
                      {creator.trend}
                    </p>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
