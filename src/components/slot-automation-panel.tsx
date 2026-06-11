import { ArrowRightLeft, Bot, ShieldCheck } from "lucide-react";
import { arenaCreators, legalBotConfig, waitingSlots } from "@/lib/arena-experience";

export function SlotAutomationPanel() {
  return (
    <section className="relative overflow-hidden px-4 py-16 sm:px-6 lg:px-8">
      <div className="absolute inset-x-0 top-20 -z-10 mx-auto h-80 max-w-5xl rounded-full bg-[#f5c842]/10 blur-3xl" />

      <div className="mx-auto max-w-7xl rounded-[2rem] border border-[#f5c842]/20 bg-[#0d1225]/80 p-5 shadow-2xl shadow-black/30 backdrop-blur-xl sm:p-8">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#00c9a7]/25 bg-[#00c9a7]/10 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-[#00c9a7]">
              <ShieldCheck className="size-4" aria-hidden="true" />
              Legal bot mode
            </div>

            <h2 className="mt-5 font-['Bebas_Neue',sans-serif] text-5xl tracking-[0.08em] text-transparent bg-clip-text bg-gradient-to-r from-[#ff5c2b] via-[#f5c842] to-[#ff8c00]">
              12 Front Slots · 12 Waiting Back Slots
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-[#b8c9e1]">
              The website now displays the legal placeholder automation bot:
              fake keys only, 12 active girls in front, and 12 waiting girls
              queued in back. Every 12 hours, the waiting list rotates into the
              main arena and the old front list moves back.
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/[0.07] bg-[#111830] p-4">
                <Bot className="size-5 text-[#f5c842]" aria-hidden="true" />
                <p className="mt-3 text-xs uppercase tracking-[0.2em] text-[#7a82a8]">Mode</p>
                <p className="mt-1 font-black text-white">{legalBotConfig.mode}</p>
              </div>
              <div className="rounded-2xl border border-white/[0.07] bg-[#111830] p-4">
                <ArrowRightLeft className="size-5 text-[#f5c842]" aria-hidden="true" />
                <p className="mt-3 text-xs uppercase tracking-[0.2em] text-[#7a82a8]">Flow</p>
                <p className="mt-1 font-black text-white">Back → Front</p>
              </div>
            </div>

            <div className="mt-6 rounded-2xl border border-[#f5c842]/15 bg-black/20 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-[#7a82a8]">Integration status</p>
              <p className="mt-2 text-sm leading-6 text-[#b8c9e1]">
                Placeholder API keys and webhook secrets are shown intentionally until production keys are connected
                next week. Do not use real credentials in this preview environment.
              </p>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-[#f5c842]">
                Fake keys only
              </p>
              <code className="mt-3 block rounded-xl bg-[#050814] px-3 py-2 text-xs text-[#b8c9e1]">
                {legalBotConfig.fakeApiKey}
              </code>
              <code className="mt-2 block rounded-xl bg-[#050814] px-3 py-2 text-xs text-[#b8c9e1]">
                {legalBotConfig.fakeWebhookSecret}
              </code>
            </div>
          </div>

          <div className="grid gap-4 xl:grid-cols-2">
            <SlotList
              title="Front 12 live now"
              accent="from-[#ff5c2b] to-[#f5c842]"
              items={arenaCreators.map((slot) => ({
                position: slot.rank,
                name: slot.name,
                country: slot.country,
                flag: slot.flag,
                meta: `Age ${slot.age} · ${slot.category}`
              }))}
            />
            <SlotList
              title="Waiting 12 rotating next"
              accent="from-[#00c9a7] to-[#f5c842]"
              items={waitingSlots.map((slot) => ({
                position: slot.queuePosition,
                name: slot.name,
                country: slot.country,
                flag: slot.flag,
                meta: `Age ${slot.age} · ${slot.category}`
              }))}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function SlotList({
  title,
  accent,
  items
}: {
  title: string;
  accent: string;
  items: Array<{
    position: number;
    name: string;
    country: string;
    flag: string;
    meta: string;
  }>;
}) {
  return (
    <div className="rounded-[1.5rem] border border-white/[0.07] bg-[#111830]/90 p-4">
      <div className={`rounded-2xl bg-gradient-to-r ${accent} px-4 py-3 text-sm font-black text-[#0a0e1f]`}>
        {title}
      </div>
      <div className="mt-4 max-h-[32rem] space-y-2 overflow-hidden">
        {items.map((item) => (
          <div
            key={`${title}-${item.position}-${item.name}`}
            className="flex items-center gap-3 rounded-xl border border-white/[0.06] bg-black/20 p-3"
          >
            <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-[#f5c842]/10 font-['Bebas_Neue',sans-serif] text-lg text-[#f5c842]">
              {item.position}
            </span>
            <span className="text-xl">{item.flag}</span>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-sm font-black text-white">{item.name}</span>
              <span className="block truncate text-xs text-[#7a82a8]">
                {item.country} · {item.meta}
              </span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
