import { ArrowRight, Crown, Heart, Sparkles } from "lucide-react";

export function HeroSection() {
  return (
    <section
      id="home"
      className="relative isolate min-h-[calc(100vh-4.75rem)] overflow-hidden bg-[#061126] px-4 py-20 sm:px-6 lg:px-8 lg:py-28"
    >
      <style>
        {`
          @keyframes alpineDrift {
            0%, 100% { transform: translate3d(0, 0, 0) scale(1); opacity: 0.76; }
            50% { transform: translate3d(1.5rem, -0.75rem, 0) scale(1.04); opacity: 0.96; }
          }

          @keyframes goldShimmer {
            0% { transform: translateX(-120%) rotate(10deg); }
            55%, 100% { transform: translateX(220%) rotate(10deg); }
          }

          @keyframes slowReveal {
            from { opacity: 0; transform: translateY(1rem); }
            to { opacity: 1; transform: translateY(0); }
          }

          @keyframes snowFall {
            from { transform: translateY(-12%); }
            to { transform: translateY(12%); }
          }
        `}
      </style>

      <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_18%_18%,rgba(245,211,122,0.2),transparent_28rem),radial-gradient(circle_at_84%_20%,rgba(135,168,210,0.22),transparent_30rem),linear-gradient(135deg,#041024_0%,#071833_45%,#0f172a_100%)]" />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_bottom,rgba(6,17,38,0.08)_0%,rgba(6,17,38,0.28)_45%,rgba(6,17,38,0.94)_100%)]" />

      <div
        className="absolute inset-x-[-10%] bottom-0 -z-10 h-[58%] bg-gradient-to-t from-[#061126] via-[#132744]/80 to-transparent"
        aria-hidden="true"
      >
        <div className="absolute bottom-0 left-0 h-[72%] w-full bg-[#152641] [clip-path:polygon(0_88%,8%_54%,17%_76%,28%_22%,40%_69%,52%_30%,64%_78%,78%_18%,91%_70%,100%_38%,100%_100%,0_100%)]" />
        <div className="absolute bottom-0 left-0 h-[84%] w-full bg-[#edf4ff]/90 [clip-path:polygon(0_92%,8%_56%,13%_68%,28%_18%,35%_46%,52%_26%,59%_52%,78%_14%,85%_43%,100%_34%,100%_100%,0_100%)]" />
        <div className="absolute bottom-0 left-0 h-[65%] w-full bg-[#0a1830] [clip-path:polygon(0_72%,11%_46%,25%_78%,38%_32%,49%_70%,62%_38%,74%_80%,88%_40%,100%_64%,100%_100%,0_100%)]" />
      </div>

      <div
        className="absolute inset-0 -z-10 opacity-40 [background-image:radial-gradient(circle,rgba(255,255,255,0.75)_1px,transparent_1px)] [background-size:3.5rem_3.5rem]"
        style={{ animation: "snowFall 11s ease-in-out infinite alternate" }}
        aria-hidden="true"
      />

      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.02fr_0.98fr]">
        <div style={{ animation: "slowReveal 900ms ease-out both" }}>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#d7b46a]/45 bg-[#081a35]/70 px-4 py-2 text-sm font-semibold text-[#f8e7b7] shadow-2xl shadow-black/20 backdrop-blur-xl">
            <Sparkles className="size-4" aria-hidden="true" />
            Swiss Luxury Romantic Edition
          </div>

          <h1 className="max-w-5xl font-serif text-5xl font-black leading-[0.95] tracking-[-0.04em] text-white sm:text-6xl lg:text-8xl">
            A golden romance above the Swiss Alps.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[#dce8f7] sm:text-xl">
            Discover a cinematic arena experience dressed in midnight navy,
            alpine light, and champagne-gold detail for creators who deserve a
            grand entrance.
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <a
              href="#vote"
              className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-[#f7e7aa] via-[#d7b46a] to-[#9f7a2d] px-7 py-4 text-base font-black text-[#071326] shadow-2xl shadow-[#d7b46a]/25 transition duration-500 hover:-translate-y-1"
            >
              <span
                className="absolute inset-y-[-30%] left-0 w-12 bg-white/50 blur-md"
                style={{ animation: "goldShimmer 4.5s ease-in-out infinite" }}
                aria-hidden="true"
              />
              <span className="relative">Enter the arena</span>
              <ArrowRight className="relative size-5 transition group-hover:translate-x-1" aria-hidden="true" />
            </a>
            <a
              href="#leaderboard"
              className="inline-flex items-center justify-center rounded-full border border-[#d7b46a]/35 bg-[#071833]/55 px-7 py-4 text-base font-bold text-[#f8e7b7] shadow-xl shadow-black/10 backdrop-blur-xl transition duration-500 hover:-translate-y-1 hover:border-[#f7e7aa]/70 hover:bg-[#0d2448]/70"
            >
              View the crown list
            </a>
          </div>

          <dl className="mt-12 grid max-w-3xl grid-cols-1 gap-4 sm:grid-cols-3">
            {[
              { label: "Backdrop", value: "Swiss Alps" },
              { label: "Mood", value: "Romantic" },
              { label: "Finish", value: "Gold Luxe" }
            ].map((stat) => (
              <div key={stat.label} className="rounded-3xl border border-white/10 bg-[#071833]/55 p-5 shadow-2xl shadow-black/15 backdrop-blur-xl">
                <dt className="text-sm text-[#b8c9e1]">{stat.label}</dt>
                <dd className="mt-2 font-serif text-2xl font-black text-[#f8e7b7]">{stat.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative min-h-[34rem]" style={{ animation: "slowReveal 900ms 140ms ease-out both" }}>
          <div
            className="absolute left-1/2 top-8 h-72 w-72 -translate-x-1/2 rounded-full bg-[#f7e7aa]/20 blur-3xl"
            style={{ animation: "alpineDrift 8s ease-in-out infinite" }}
            aria-hidden="true"
          />

          <div className="absolute right-0 top-0 hidden h-40 w-40 rounded-full border border-[#d7b46a]/30 md:block" />
          <div className="absolute bottom-10 left-4 hidden h-24 w-24 rounded-full border border-white/15 md:block" />

          <article className="relative mx-auto max-w-lg rounded-[2.25rem] border border-[#d7b46a]/35 bg-[#071326]/70 p-4 shadow-2xl shadow-black/35 backdrop-blur-2xl">
            <div className="overflow-hidden rounded-[1.75rem] border border-white/10 bg-gradient-to-br from-[#10284d] via-[#071833] to-[#030915] p-6">
              <div className="relative min-h-80 rounded-[1.35rem] bg-[radial-gradient(circle_at_50%_14%,rgba(248,231,183,0.3),transparent_7rem),linear-gradient(to_bottom,#132e52_0%,#061126_72%)] p-5">
                <div className="absolute inset-x-0 bottom-0 h-44 bg-[#f4f8ff] [clip-path:polygon(0_78%,16%_40%,28%_60%,45%_18%,58%_58%,72%_30%,88%_68%,100%_42%,100%_100%,0_100%)]" />
                <div className="absolute inset-x-0 bottom-0 h-36 bg-[#091a34] [clip-path:polygon(0_74%,14%_48%,32%_72%,45%_30%,59%_70%,73%_40%,88%_76%,100%_56%,100%_100%,0_100%)]" />

                <div className="relative z-10 flex items-center justify-between">
                  <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-2 text-xs font-black uppercase tracking-[0.25em] text-[#f8e7b7] backdrop-blur">
                    <Crown className="size-4" aria-hidden="true" />
                    Alpine suite
                  </span>
                  <span className="grid size-12 place-items-center rounded-2xl bg-[#d7b46a] text-[#071326] shadow-lg shadow-[#d7b46a]/30">
                    <Heart className="size-5 fill-current" aria-hidden="true" />
                  </span>
                </div>

                <div className="relative z-10 mt-24 max-w-xs">
                  <p className="font-serif text-3xl font-black leading-tight text-white">
                    Midnight navy meets champagne light.
                  </p>
                  <p className="mt-4 text-sm leading-6 text-[#dce8f7]">
                    A refined, cinematic first impression designed for premium
                    creator storytelling.
                  </p>
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
