"use client";

import { countryRoomLiveSessionHours } from "@/lib/country-room-access";
import { formatLiveCount, type ColombiaLiveCreator } from "@/lib/colombia-room-live";
import { useColombiaSelectionFlash } from "@/hooks/use-colombia-pick-flash";

type ColombiaRoomLiveSlotsProps = {
  topicId: string;
  venueId: string;
  topicSlot: ColombiaLiveCreator;
  venueSlot: ColombiaLiveCreator;
  topicLabel: string;
  topicBlurb: string;
  topicFlag: string;
  venueLabel: string;
  venueBlurb: string;
  venueEmoji: string;
  tonightKicker: string;
  tonightSession: string;
  liveOnAir: string;
  slotTopicTitle: string;
  slotVenueTitle: string;
  slotTopicCaption: string;
  slotVenueCaption: string;
};

export function ColombiaRoomLiveSlots({
  topicId,
  venueId,
  topicSlot,
  venueSlot,
  topicLabel,
  topicBlurb,
  topicFlag,
  venueLabel,
  venueBlurb,
  venueEmoji,
  tonightKicker,
  tonightSession,
  liveOnAir,
  slotTopicTitle,
  slotVenueTitle,
  slotTopicCaption,
  slotVenueCaption
}: ColombiaRoomLiveSlotsProps) {
  const topicChosenFlash = useColombiaSelectionFlash(topicId);
  const venueChosenFlash = useColombiaSelectionFlash(venueId);

  return (
    <div key={`${topicId}-${venueId}`} className="colombia-live-slots mx-auto w-full max-w-4xl">
      <div className="colombia-live-slots-tonight mb-4 rounded-2xl border border-[#fbbf24]/35 bg-[#1a0208]/35 px-4 py-3 text-center backdrop-blur-md sm:px-5">
        <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#fbbf24]">{tonightKicker}</p>
        <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.14em] text-[#fecdd3]/90">
          {countryRoomLiveSessionHours}h · {tonightSession}
        </p>
      </div>

      <div className="grid grid-cols-2 items-start gap-3 sm:gap-4">
        <div className="flex min-w-0 flex-col gap-3">
          <article className="colombia-live-slot-mini group overflow-hidden rounded-xl border border-[#fb7185]/35 bg-[#1a0208]/35 shadow-[0_8px_28px_rgba(0,0,0,0.28)] backdrop-blur-sm transition hover:border-[#fbbf24]/40">
            <div className="relative aspect-[4/5] w-full bg-[#2a0510] sm:aspect-[3/4]">
              <img
                src={topicSlot.previewImage}
                alt=""
                className="h-full w-full object-cover opacity-95 transition duration-500 group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#3b0a16]/95 via-[#fb7185]/10 to-transparent" />
              <span className="colombia-romantic-live-badge absolute left-2 top-2 inline-flex items-center gap-1 px-2 py-0.5 text-[9px] font-black uppercase tracking-wider">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#fecdd3]" />
                {liveOnAir}
              </span>
              <span className="absolute right-2 top-2 max-w-[55%] truncate rounded-full border border-[#fbbf24]/35 bg-[#1a0208]/65 px-2 py-0.5 text-[8px] font-bold uppercase tracking-[0.1em] text-[#fecdd3] backdrop-blur-sm">
                {slotTopicTitle}
              </span>
              <div className="absolute bottom-2 left-2 right-2">
                <p className="truncate text-xs font-bold text-white">
                  {topicSlot.name} · {slotTopicTitle}
                </p>
                <p className="truncate text-[10px] text-[#fda4af]/90">{topicSlot.username}</p>
                <p className="mt-1 text-[9px] font-semibold text-[#fecdd3]/90">
                  👁 {formatLiveCount(topicSlot.viewers)} · {topicSlot.lane}
                </p>
              </div>
            </div>
          </article>

          <div
            className={`colombia-slot-topic-chosen rounded-xl border border-[#fb7185]/35 bg-[#2a0510]/55 px-3 py-3 text-center backdrop-blur-sm${
              topicChosenFlash ? " colombia-slot-chosen-flash-rose" : ""
            }`}
          >
            <p className="text-[9px] font-black uppercase tracking-[0.14em] text-[#fecdd3]/85">{slotTopicTitle}</p>
            <p className="colombia-handwriting mt-1 text-lg font-semibold leading-tight text-[#fff1f2] sm:text-xl">
              {topicFlag} {topicLabel}
            </p>
            <p className="colombia-handwriting-soft mt-1 text-xs leading-5 text-[#fda4af]/92">{topicBlurb}</p>
            <p className="mt-2 text-[10px] leading-4 text-[#fecdd3]/80">{slotTopicCaption}</p>
          </div>
        </div>

        <div className="flex min-w-0 flex-col gap-3">
          <article className="colombia-live-slot-mini group overflow-hidden rounded-xl border border-[#fb7185]/35 bg-[#1a0208]/35 shadow-[0_8px_28px_rgba(0,0,0,0.28)] backdrop-blur-sm transition hover:border-[#fbbf24]/40">
            <div className="relative aspect-[4/5] w-full bg-[#2a0510] sm:aspect-[3/4]">
              <img
                src={venueSlot.previewImage}
                alt=""
                className="h-full w-full object-cover opacity-95 transition duration-500 group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#3b0a16]/95 via-[#fb7185]/10 to-transparent" />
              <span className="colombia-romantic-live-badge absolute left-2 top-2 inline-flex items-center gap-1 px-2 py-0.5 text-[9px] font-black uppercase tracking-wider">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#fecdd3]" />
                {liveOnAir}
              </span>
              <span className="absolute right-2 top-2 max-w-[55%] truncate rounded-full border border-[#fbbf24]/35 bg-[#1a0208]/65 px-2 py-0.5 text-[8px] font-bold uppercase tracking-[0.1em] text-[#fecdd3] backdrop-blur-sm">
                {slotVenueTitle}
              </span>
              <div className="absolute bottom-2 left-2 right-2">
                <p className="truncate text-xs font-bold text-white">
                  {venueSlot.name} · {slotVenueTitle}
                </p>
                <p className="truncate text-[10px] text-[#fda4af]/90">{venueSlot.username}</p>
                <p className="mt-1 text-[9px] font-semibold text-[#fecdd3]/90">
                  👁 {formatLiveCount(venueSlot.viewers)} · {venueSlot.lane}
                </p>
              </div>
            </div>
          </article>

          <div
            className={`colombia-slot-topic-chosen rounded-xl border border-[#fbbf24]/35 bg-[#2a0510]/55 px-3 py-3 text-center backdrop-blur-sm${
              venueChosenFlash ? " colombia-slot-chosen-flash-gold" : ""
            }`}
          >
            <p className="text-[9px] font-black uppercase tracking-[0.14em] text-[#fbbf24]/85">{slotVenueTitle}</p>
            <p className="colombia-handwriting mt-1 text-lg font-semibold leading-tight text-[#fff1f2] sm:text-xl">
              {venueEmoji} {venueLabel}
            </p>
            <p className="colombia-handwriting-soft mt-1 text-xs leading-5 text-[#fda4af]/92">{venueBlurb}</p>
            <p className="mt-2 text-[10px] leading-4 text-[#fecdd3]/80">{slotVenueCaption}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
