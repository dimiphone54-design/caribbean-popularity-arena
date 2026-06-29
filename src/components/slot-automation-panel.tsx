"use client";

import { useRef, type ReactNode } from "react";
import { ArrowRightLeft, Bot, Cpu, ShieldCheck } from "lucide-react";
import { ArenaSlotIceFrostOverlay } from "@/components/arena-slot-ice-frost-overlay";
import { useArenaEngineLiveStats } from "@/components/use-arena-engine";
import { arenaCreators, legalBotConfig } from "@/lib/arena-experience";
import {
  arenaSlotSignInOpenLabel,
  getArenaActiveNationSlotCount,
  getLegalBotFrozenFrontQueueCount,
  isArenaSlotFrozen,
  legalBotFrozenFrontQueueSlots,
  mapArenaCreatorsToActiveSlotRows
} from "@/lib/arena-slot-sign-in-access";
import { WaitingGirlMicroScene } from "@/components/waiting-girl-micro-scene";

function isLegalBotFrozenFrontRow(item: { islandCode?: string }) {
  if (!item.islandCode) return false;
  return isArenaSlotFrozen(item.islandCode);
}

export function SlotAutomationPanel() {
  const { engine, loading, liveNow, rotationCountdown, engineStatus, tickKey } =
    useArenaEngineLiveStats();

  const activeSlotCount = getArenaActiveNationSlotCount();
  const frozenFrontCount = getLegalBotFrozenFrontQueueCount();

  const frontItems = legalBotFrozenFrontQueueSlots;
  const waitingItems = mapArenaCreatorsToActiveSlotRows(arenaCreators);

  return (
    <section className="relative w-full overflow-hidden py-16">
      <div className="absolute inset-x-0 top-20 -z-10 mx-auto h-80 w-full max-w-full rounded-full bg-[#f5c842]/10 blur-3xl" />

      <div className="legal-bot-mode-panel w-full rounded-[1.25rem] border border-[#00c9a7]/22 p-5 shadow-2xl shadow-black/30 sm:p-8">
        <div className="legal-bot-mode-panel-photo" aria-hidden="true">
          <img
            src="/legal-bot-panel-clouds-bg.png?v=6"
            alt=""
            className="legal-bot-mode-panel-photo-img"
          />
        </div>
        <div className="legal-bot-mode-panel-content grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#00c9a7]/25 bg-[#00c9a7]/10 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-[#00c9a7]">
              <ShieldCheck className="size-4" aria-hidden="true" />
              Legal bot mode
            </div>

            <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-[#f5c842]/25 bg-[#f5c842]/10 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-[#f5c842]">
              <Cpu className="size-4" aria-hidden="true" />
              Arena engine {loading ? "· syncing" : "· live"}
            </div>

            <h2 className="mt-5 font-['Bebas_Neue',sans-serif] text-5xl tracking-[0.08em] text-transparent bg-clip-text bg-gradient-to-r from-[#ff5c2b] via-[#f5c842] to-[#ff8c00]">
              {frozenFrontCount} Front Slots · {activeSlotCount} Waiting Back Slots
            </h2>
            <p className="mt-3 text-sm font-black uppercase tracking-[0.16em] text-[#00c9a7]">
              {liveNow} live now · {activeSlotCount} open nations · {frozenFrontCount} frozen front
            </p>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-[#b8c9e1]">
              Front {frozenFrontCount} Caribbean queue is frozen · live sessions run on{" "}
              {arenaSlotSignInOpenLabel} · waiting {activeSlotCount} rotate into front every 12 hours.
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

            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              <EngineStat
                label="Live now"
                value={loading && !engine ? "…" : String(liveNow)}
                live
                tickKey={tickKey}
              />
              <EngineStat label="Next rotation" value={rotationCountdown} live tickKey={tickKey} />
              <EngineStat
                label="Engine"
                value={loading && !engine ? "syncing" : engineStatus}
              />
            </div>
          </div>

          <div className="grid gap-4 xl:grid-cols-2">
            <SlotList
              title={`Front ${frozenFrontCount} · ${liveNow} live`}
              accent="from-[#ff5c2b] to-[#f5c842]"
              items={frontItems}
              frozenOnly
            />
            <SlotList
              title={`Waiting ${activeSlotCount} rotating next`}
              accent="from-[#00c9a7] to-[#f5c842]"
              leadMicro={<WaitingGirlMicroScene />}
              items={waitingItems}
              activeOnly
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function EngineStat({
  label,
  value,
  live = false,
  tickKey
}: {
  label: string;
  value: string;
  live?: boolean;
  tickKey?: number;
}) {
  return (
    <div className="rounded-2xl border border-[#00c9a7]/15 bg-[#0a1224] p-3">
      <p className="text-[0.62rem] font-bold uppercase tracking-[0.16em] text-[#7a82a8]">{label}</p>
      <p
        key={live ? tickKey : undefined}
        className={`arena-engine-stat-value mt-1 font-black tabular-nums text-white${
          live ? " arena-engine-stat-value--live" : ""
        }`}
        aria-live={live ? "polite" : undefined}
      >
        {value}
      </p>
    </div>
  );
}

function SlotList({
  title,
  accent,
  leadMicro,
  items,
  front12 = false,
  activeOnly = false,
  frozenOnly = false
}: {
  title: string;
  accent: string;
  leadMicro?: ReactNode;
  front12?: boolean;
  activeOnly?: boolean;
  frozenOnly?: boolean;
  items: Array<{
    position: number;
    name: string;
    country: string;
    flag: string;
    islandCode?: string;
    meta: string;
  }>;
}) {
  const activeItems = frozenOnly
    ? items
    : activeOnly
      ? items
      : front12
        ? items
            .filter((item) => !item.islandCode || !isLegalBotFrozenFrontRow(item))
            .sort((a, b) => a.position - b.position)
        : items;
  const frozenItems =
    front12 && !activeOnly && !frozenOnly
      ? items
          .filter((item) => Boolean(item.islandCode && isLegalBotFrozenFrontRow(item)))
          .sort((a, b) => a.position - b.position)
      : [];

  const activeSectionRef = useRef<HTMLParagraphElement>(null);
  const frozenSectionRef = useRef<HTMLParagraphElement>(null);

  const scrollToActive = () => {
    activeSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const scrollToFrozen = () => {
    frozenSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const showFront12Scroll = front12 && !activeOnly && frozenItems.length > 0;

  return (
    <div className="rounded-[1.5rem] border border-white/[0.07] bg-[#111830]/90 p-4">
      {leadMicro ? <div className="slot-list-lead-micro">{leadMicro}</div> : null}
      <div className={`rounded-2xl bg-gradient-to-r ${accent} px-4 py-3 text-sm font-black text-[#0a0e1f]`}>
        {title}
      </div>
      {showFront12Scroll ? (
        <div className="legal-bot-slot-scroll-dock" aria-label="Scroll Front 12 sections">
          <button
            type="button"
            className="legal-bot-slot-scroll-btn"
            onClick={scrollToActive}
            aria-label="Scroll to Active slots"
          >
            Active ↑
          </button>
          <button
            type="button"
            className="legal-bot-slot-scroll-btn"
            onClick={scrollToFrozen}
            aria-label="Scroll to Frozen slots"
          >
            Frozen ↓
          </button>
        </div>
      ) : null}
      <div className="legal-bot-slot-scroll-list mt-4 space-y-2 overflow-x-hidden overflow-y-auto">
        {front12 && activeItems.length > 0 ? (
          <p
            ref={activeSectionRef}
            className="legal-bot-slot-section-label legal-bot-slot-section-label-active"
          >
            Active
          </p>
        ) : null}
        {activeItems.map((item) => (
          <SlotRow
            key={`${title}-active-${item.position}-${item.name}`}
            item={item}
            frozen={frozenOnly}
          />
        ))}
        {front12 && frozenItems.length > 0 ? (
          <>
            <p
              ref={frozenSectionRef}
              className="legal-bot-slot-section-label legal-bot-slot-section-label-frozen"
            >
              Frozen
            </p>
            {frozenItems.map((item) => (
              <SlotRow key={`${title}-frozen-${item.position}-${item.name}`} item={item} frozen />
            ))}
          </>
        ) : null}
      </div>
    </div>
  );
}

function SlotRow({
  item,
  frozen
}: {
  item: {
    position: number;
    name: string;
    country: string;
    flag: string;
    meta: string;
  };
  frozen: boolean;
}) {
  return (
    <div
      className={`legal-bot-slot-row flex items-center gap-3 rounded-xl border border-white/[0.06] p-3 ${
        frozen ? "legal-bot-slot-row-frozen overflow-hidden" : "bg-black/20"
      }`}
      aria-disabled={frozen || undefined}
      aria-label={
        frozen
          ? `${item.country} · ${item.name}`
          : `${item.country} · ${item.name} · ${item.meta}`
      }
    >
      {frozen ? <ArenaSlotIceFrostOverlay variant="full" hideStamp /> : null}
      <span
        className={`relative z-[6] grid size-8 shrink-0 place-items-center rounded-lg bg-[#f5c842]/10 font-['Bebas_Neue',sans-serif] text-lg text-[#f5c842] ${
          frozen ? "opacity-90" : ""
        }`}
      >
        {item.position}
      </span>
      <span className={`relative z-[6] text-xl${frozen ? " opacity-90" : ""}`}>{item.flag}</span>
      <span className="relative z-[6] min-w-0 flex-1">
        <span className="block truncate text-sm font-black text-white">{item.name}</span>
        <span className="block truncate text-xs text-[#7a82a8]">
          {item.country} · {item.meta}
        </span>
      </span>
    </div>
  );
}
