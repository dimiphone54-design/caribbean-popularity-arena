"use client";

import { colombiaRoomTrendingTopics, type LiveTrendingTopic } from "@/lib/live-creator-session";
import { translateColombiaTopic } from "@/lib/room-translations";
import { useRoomLocale } from "@/components/room-locale-provider";
import { useColombiaPickFlash } from "@/hooks/use-colombia-pick-flash";

type ColombiaRoomSlotTopicsScrollProps = {
  selectedId: string;
  onSelect: (topic: LiveTrendingTopic) => void;
  compact?: boolean;
};

export function ColombiaRoomSlotTopicsScroll({
  selectedId,
  onSelect,
  compact = false
}: ColombiaRoomSlotTopicsScrollProps) {
  const { locale, t } = useRoomLocale();
  const copy = t.colombia;
  const { flashId, triggerFlash } = useColombiaPickFlash();

  return (
    <div
      className={
        compact
          ? "colombia-slot1-topics-panel rounded-xl border border-[#fb7185]/35 bg-[#1a0208]/65 px-2 py-2.5 backdrop-blur-sm sm:px-2.5 sm:py-3"
          : "colombia-slot-topics-scroll colombia-elite-2028-panel relative overflow-hidden rounded-2xl px-3 py-5 sm:px-6 sm:py-6"
      }
    >
      {!compact ? (
        <div className="colombia-elite-2028-panel-shine pointer-events-none absolute inset-0" aria-hidden="true" />
      ) : null}

      <div className={`relative z-[1] ${compact ? "text-left" : "px-1 text-center"}`}>
        <p
          className={
            compact
              ? "text-[8px] font-black uppercase leading-4 tracking-[0.14em] text-[#fbbf24]"
              : "text-[9px] font-black uppercase tracking-[0.16em] text-[#fbbf24]"
          }
        >
          {copy.topicsEyebrow}
        </p>
        <p
          className={
            compact
              ? "colombia-handwriting-soft mt-1 text-[10px] leading-4 text-[#fda4af]/88"
              : "colombia-handwriting-soft mt-1 text-xs leading-5 text-[#fda4af]/90"
          }
        >
          {copy.topicsSubline}
        </p>
      </div>

      <div
        className={`colombia-slot-topics-scroll-track flex gap-1.5 overflow-x-auto pb-0.5 pt-0.5${
          compact ? " relative z-[1] mt-2" : " mt-3"
        }`}
        role="listbox"
        aria-label={copy.topicsEyebrow}
      >
        {colombiaRoomTrendingTopics.map((topic, index) => {
          const active = topic.id === selectedId;
          const translated = translateColombiaTopic(locale, topic.id, {
            label: topic.label,
            blurb: topic.blurb
          });

          return (
            <button
              key={topic.id}
              type="button"
              role="option"
              aria-selected={active}
              onClick={() => {
                triggerFlash(topic.id);
                onSelect({
                  ...topic,
                  label: translated.label,
                  blurb: translated.blurb
                });
              }}
              className={`colombia-slot-topic-chip group relative flex shrink-0 snap-start flex-col rounded-lg border px-2 py-2 text-left transition duration-300${
                compact ? " w-[7.25rem] sm:w-[7.75rem]" : " w-[9.5rem] sm:w-[10.5rem] px-2.5 py-2.5"
              }${active ? " colombia-slot-topic-chip-active" : ""}${
                flashId === topic.id ? " colombia-slot-topic-chip-pick-flash" : ""
              }`}
            >
              <span className="flex items-center justify-between gap-1">
                <span className="text-[8px] font-black uppercase tracking-[0.12em] text-[#fbbf24]/80">
                  {String(index + 1).padStart(2, "0")}
                </span>
                {active ? (
                  <span className="rounded-full bg-[#fb7185]/25 px-1 py-0.5 text-[7px] font-black uppercase tracking-[0.08em] text-[#fecdd3]">
                    {copy.chosen}
                  </span>
                ) : null}
              </span>
              <span className={`${compact ? "mt-1 text-sm" : "mt-2 text-base"}`} aria-hidden="true">
                {topic.flag}
              </span>
              <span
                className={`colombia-handwriting mt-0.5 line-clamp-2 font-semibold leading-4 text-[#fff1f2]${
                  compact ? " text-[11px]" : " text-sm leading-5"
                }`}
              >
                {translated.label}
              </span>
              <span
                className={`colombia-handwriting-soft mt-0.5 line-clamp-2 leading-3 text-[#fda4af]/85${
                  compact ? " text-[9px]" : " text-[10px] leading-4"
                }`}
              >
                {translated.blurb}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
