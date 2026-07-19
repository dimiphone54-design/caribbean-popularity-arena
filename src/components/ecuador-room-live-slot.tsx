"use client";

import { LiveSlot } from "@/components/live-slot";
import { ecuadorFlashLiveSlots } from "@/lib/ecuador-room-live";

/** Ecuador (EC) · two Arena Flash lives in one badass shell */
export function EcuadorRoomLiveSlot() {
  return (
    <section
      className="ecuador-flash-live-panel overflow-hidden rounded-[1.25rem] border border-[#fcd116]/55 bg-[radial-gradient(circle_at_top_left,rgba(206,17,38,0.32),transparent_42%),radial-gradient(circle_at_bottom_right,rgba(252,209,22,0.2),transparent_48%),linear-gradient(160deg,rgba(6,4,4,0.98),rgba(10,8,4,0.96))] p-3 shadow-[0_0_44px_rgba(206,17,38,0.28),0_0_28px_rgba(252,209,22,0.14),inset_0_1px_0_rgba(252,209,22,0.25)] sm:p-4"
      aria-label="Arena Flash · dos pistas en vivo"
      lang="es-EC"
    >
      <span
        className="pointer-events-none mb-3 block h-[3px] w-full rounded-full bg-gradient-to-r from-[#ce1126] via-[#fcd116] to-[#0066a1]"
        aria-hidden="true"
      />

      <header className="mb-3 text-center sm:mb-4">
        <p className="inline-flex items-center gap-1.5 rounded-full border border-[#ce1126]/55 bg-[#1a0508]/95 px-3 py-1 text-[10px] font-black uppercase tracking-[0.22em] text-[#ff8a9a] shadow-[0_0_20px_rgba(206,17,38,0.45)]">
          <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#ce1126] opacity-80" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#ce1126]" />
          </span>
          LIVE AHORA · 2 pistas
        </p>
        <h2 className="mt-2 font-['Bebas_Neue',Impact,sans-serif] text-[1.65rem] leading-none tracking-[0.08em] text-[#fef9c3] drop-shadow-[0_0_20px_rgba(252,209,22,0.45)] sm:text-[2rem]">
          🇪🇨 ARENA FLASH · EN VIVO
        </h2>
        <p className="mx-auto mt-1.5 max-w-lg text-[11px] font-bold uppercase tracking-[0.12em] text-[#ff6b6b]">
          ¡no te duermas!
        </p>
      </header>

      <div className="ecuador-live-slots-row grid w-full gap-2.5 sm:grid-cols-2 sm:gap-3">
        {ecuadorFlashLiveSlots.map((config, index) => (
          <LiveSlot
            key={`ecuador-live-slot-${index + 1}`}
            id={`ecuador-live-slot-${index + 1}`}
            isLive={config.isLive}
            viewers={config.viewers}
            link={config.link}
            title={config.title}
            subtext={config.subtext}
            thumbnailSrc={config.thumbnailSrc}
            videoSrc={config.videoSrc}
            nextLiveLabel={config.nextLiveLabel}
            className="ecuador-live-slot-half ecuador-live-slot-badass h-full w-full min-w-0"
          />
        ))}
      </div>
    </section>
  );
}
