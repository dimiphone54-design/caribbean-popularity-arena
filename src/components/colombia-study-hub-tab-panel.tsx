"use client";

import { useRoomLocale } from "@/components/room-locale-provider";
import { getArenaSlotStudyHubPanel } from "@/lib/arena-slot-study-hub-lanes";
import { isSpanishContentLocale } from "@/lib/room-locale";

/**
 * Colombia room · 📚 Centro de estudio · Español (CO) public · English for MASTER
 * Paid model stays in Command Center FREEZE COMING SOON
 */
export function ColombiaStudyHubTabPanel() {
  const { locale } = useRoomLocale();
  const es = isSpanishContentLocale(locale);
  const panel = getArenaSlotStudyHubPanel("colombia");

  return (
    <div
      className="colombia-study-hub-tab-panel colombia-estudio-panel"
      aria-label={es ? "Colombia Centro de estudio panel" : "Colombia Study Hub panel"}
      lang={es ? "es-CO" : "en"}
    >
      <section className="relative overflow-hidden rounded-xl border border-[#fbbf24]/40 bg-[#05080f] shadow-[0_0_40px_rgba(251,191,36,0.12)]">
        {/* Flag stripe */}
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#ce1126] via-[#fcd116] to-[#003893]"
          aria-hidden="true"
        />

        {/* Campus backdrop */}
        <div
          className="pointer-events-none absolute inset-0 bg-cover bg-center brightness-[1.05] saturate-[1.05]"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1400&q=80&auto=format&fit=crop')"
          }}
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#05080f]/72 via-[#0a1628]/78 to-[#1a0508]/88"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(251,191,36,0.2),transparent_45%),radial-gradient(ellipse_at_bottom_left,rgba(251,113,133,0.15),transparent_50%)]"
          aria-hidden="true"
        />

        {/* Giant watermark */}
        <div
          className="pointer-events-none absolute -right-4 -top-6 select-none text-[7rem] opacity-[0.07] sm:text-[9rem]"
          aria-hidden="true"
        >
          📚
        </div>

        <div className="relative z-10 p-3 sm:p-4">
          <header className="mb-3 text-center sm:mb-3.5 sm:text-left">
            <p className="text-[9px] font-black uppercase tracking-[0.28em] text-[#fbbf24]">
              {es ? "🇨🇴 Campus gratis · Bogotá · Medellín" : "🇨🇴 Free campus · Bogotá · Medellín"}
            </p>
            <h2 className="mt-1 flex flex-wrap items-baseline justify-center gap-x-2 gap-y-0 sm:justify-start">
              <span className="text-2xl sm:text-3xl" aria-hidden="true">
                📚
              </span>
              <span
                className="font-['Bebas_Neue',sans-serif] text-3xl uppercase leading-none tracking-[0.1em] sm:text-4xl md:text-5xl"
                style={{
                  backgroundImage:
                    "linear-gradient(105deg, #fff8e7 0%, #fde68a 40%, #fbbf24 70%, #fda4af 100%)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                  filter:
                    "drop-shadow(0 0 20px rgba(251,191,36,0.55)) drop-shadow(0 2px 0 rgba(0,0,0,0.6))"
                }}
              >
                {es ? "Centro de estudio" : "Study Hub"}
              </span>
            </h2>
            <p className="mt-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-[#fecdd3]/90">
              {es
                ? "Clases · amigos · café estudio · únete gratis"
                : "Classes · friends · study café · join free"}
            </p>
          </header>

          <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-4 sm:gap-2">
            {panel.lanes.map((lane, index) => (
              <article
                key={lane.label}
                className="group relative overflow-hidden rounded-lg border border-[#fbbf24]/25 bg-black/55 px-2.5 py-2.5 backdrop-blur-md transition hover:-translate-y-0.5 hover:border-[#fbbf24]/55 hover:bg-[#1a1208]/75 hover:shadow-[0_8px_24px_rgba(251,191,36,0.18)]"
                title={lane.hint}
              >
                <div
                  className="pointer-events-none absolute -right-1 -top-1 text-3xl opacity-15 transition group-hover:opacity-30"
                  aria-hidden="true"
                >
                  {lane.emoji}
                </div>
                <p className="text-[8px] font-black uppercase tracking-[0.16em] text-[#fbbf24]/90">
                  Pista {String(index + 1).padStart(2, "0")}
                </p>
                <p className="mt-1 text-[12px] font-black leading-tight text-[#fff8e7] sm:text-[13px]">
                  <span className="mr-1" aria-hidden="true">
                    {lane.emoji}
                  </span>
                  {lane.label.split("·")[0]?.trim() ?? lane.label}
                </p>
                <p className="mt-1 line-clamp-2 text-[9px] leading-4 text-[#fda4af]/90 sm:text-[10px]">
                  {lane.hint}
                </p>
                <p className="mt-1.5 text-[8px] font-black uppercase tracking-[0.12em] text-[#86efac]">
                  ▶ Únete gratis
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
