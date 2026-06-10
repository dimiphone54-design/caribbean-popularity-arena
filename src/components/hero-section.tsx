import { ArrowRight, Flame, Radio, Star } from "lucide-react";
import { platformStats } from "@/lib/data";

export function HeroSection() {
  return (
    <section id="home" className="relative overflow-hidden px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
      <div className="absolute inset-x-0 top-24 -z-10 mx-auto h-72 max-w-4xl rounded-full bg-cyan-400/20 blur-3xl" />

      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.08fr_0.92fr]">
        <div>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-amber-200/30 bg-amber-200/10 px-4 py-2 text-sm font-semibold text-amber-100">
            <Radio className="size-4" aria-hidden="true" />
            Live weekly creator rankings across the Caribbean
          </div>

          <h1 className="max-w-4xl text-5xl font-black tracking-tight text-white sm:text-6xl lg:text-7xl">
            Vote your favorite island creators to the top.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-200 sm:text-xl">
            Caribbean Popularity Arena is a fan-powered discovery platform for
            music, dance, comedy, fashion, food, and travel creators competing
            for regional bragging rights.
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <a
              href="#vote"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-amber-300 to-orange-500 px-7 py-4 text-base font-black text-slate-950 shadow-xl shadow-orange-500/25 transition hover:-translate-y-1"
            >
              Start voting
              <ArrowRight className="size-5" aria-hidden="true" />
            </a>
            <a
              href="#leaderboard"
              className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/10 px-7 py-4 text-base font-bold text-white backdrop-blur transition hover:-translate-y-1 hover:bg-white/15"
            >
              View leaderboard
            </a>
          </div>

          <dl className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {platformStats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-3xl border border-white/10 bg-white/[0.07] p-5 backdrop-blur"
              >
                <dt className="text-sm text-slate-300">{stat.label}</dt>
                <dd className="mt-2 text-2xl font-black text-white">{stat.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative">
          <div className="rounded-[2rem] border border-white/15 bg-white/[0.08] p-5 shadow-2xl shadow-black/30 backdrop-blur-xl">
            <div className="rounded-[1.5rem] bg-slate-950/80 p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold uppercase tracking-[0.3em] text-cyan-200">
                    Live pulse
                  </p>
                  <h2 className="mt-2 text-2xl font-black">Carnival week surge</h2>
                </div>
                <span className="grid size-14 place-items-center rounded-2xl bg-rose-500/20 text-rose-200">
                  <Flame className="size-7" aria-hidden="true" />
                </span>
              </div>

              <div className="mt-8 space-y-4">
                {["Soca", "Dancehall", "Food", "Travel"].map((label, index) => (
                  <div key={label} className="rounded-2xl bg-white/[0.06] p-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-bold">{label}</span>
                      <span className="text-amber-200">+{24 - index * 4}%</span>
                    </div>
                    <div className="mt-3 h-2 rounded-full bg-white/10">
                      <div
                        className="h-2 rounded-full bg-gradient-to-r from-cyan-300 to-amber-300"
                        style={{ width: `${88 - index * 12}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-3xl bg-gradient-to-r from-cyan-400/15 to-orange-400/15 p-5">
                <div className="flex items-start gap-4">
                  <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-amber-300 text-slate-950">
                    <Star className="size-5 fill-current" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="font-black">Tonight&apos;s spotlight</p>
                    <p className="mt-1 text-sm leading-6 text-slate-300">
                      Fans unlock bonus vote boosts when their island crosses a
                      weekly support milestone.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
