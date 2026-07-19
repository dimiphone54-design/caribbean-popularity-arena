"use client";

import {
  DropshipMarketPanel,
  DropshipMarketRoomIntroPanel
} from "@/components/dropshipping/dropship-market-panel";
import { isPublicDropshipVisible } from "@/lib/real-money";

/**
 * UK room dropshipping · same shell as Japan room dropshipping
 * (holo frame · kicker · intro · category lanes · products · no AI FX)
 * Hidden publicly while freeze — owner tools in Command Center.
 */
export function UkRoomDropshipPanel() {
  if (!isPublicDropshipVisible()) return null;

  return (
    <section
      id="uk-dropshipping"
      className="w-full px-1 scroll-mt-28"
      aria-label="UK Dropshipping market"
    >
      <div className="a2030-holo-panel rounded-[1.25rem] border border-[#d7b46a]/20 p-2.5 sm:p-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="text-[9px] font-black uppercase tracking-[0.16em] text-[#d7b46a]">
            🇬🇧 UK dropshipping
          </p>
          <span className="inline-flex h-1.5 w-1.5 rounded-full bg-[#d7b46a]" aria-hidden="true" />
        </div>

        <div className="uk-room-dropship-head-stack mt-2">
          <DropshipMarketRoomIntroPanel
            countryId="uk"
            countryName="United Kingdom"
            flag="🇬🇧"
          />
        </div>

        <DropshipMarketPanel
          countryId="uk"
          countryName="United Kingdom"
          flag="🇬🇧"
          layout="room"
          hideRoomIntro
          hideAiConverter
        />
      </div>
    </section>
  );
}
