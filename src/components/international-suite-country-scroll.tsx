"use client";

import { useEffect, useRef } from "react";
import { ArenaSlotIceFrostOverlay } from "@/components/arena-slot-ice-frost-overlay";
import { InternationalSuiteCountryPanels } from "@/components/international-suite-country-panels";
import { useRoomLocale } from "@/components/room-locale-provider";
import {
  countryHasBuiltSuiteRooms,
  getInternationalSuiteNavCountries,
  isInternationalSuiteCountryFrozen
} from "@/lib/international-suite";
import { triggerIntlSuiteNeonFlash } from "@/lib/intl-suite-neon-flash";
import {
  getIntlSuiteEnterRoomOneClick
} from "@/lib/intl-suite-country-copy";
import { InternationalSuiteRoomEnterLink } from "@/components/international-suite-room-enter-link";

export function InternationalSuiteCountryScroll() {
  const { t } = useRoomLocale();
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollTrack = (direction: "left" | "right") => {
    trackRef.current?.scrollBy({
      left: direction === "right" ? 320 : -320,
      behavior: "smooth"
    });
  };

  const focusCountryPanel = (panel: HTMLDetailsElement) => {
    const track = trackRef.current;
    if (!track) {
      panel.scrollIntoView({ behavior: "smooth", inline: "nearest", block: "nearest" });
      return;
    }

    const targetLeft = panel.offsetLeft - Math.max(0, (track.clientWidth - panel.offsetWidth) / 2);
    track.scrollTo({ left: targetLeft, behavior: "smooth" });
    panel.scrollIntoView({ behavior: "smooth", inline: "nearest", block: "nearest" });
  };

  useEffect(() => {
    const countryId = window.location.hash.replace(/^#/, "");
    if (!countryId) return;

    const panel = document.getElementById(`intl-country-${countryId}`);
    if (!(panel instanceof HTMLDetailsElement)) return;

    panel.open = true;
    triggerIntlSuiteNeonFlash(panel);
    focusCountryPanel(panel);
  }, []);

  return (
    <section className="a2030-intl-country-scroll mt-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="a2030-micro text-[10px] font-bold uppercase text-[#00f5ff] sm:text-xs">
            {t.intlSuiteScrollTitle}
          </p>
          <p className="mt-1 text-xs leading-5 text-[#8fa3c4]">{t.intlSuiteScrollHint}</p>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => scrollTrack("left")}
            className="a2030-lounge-scroll-arrow"
            aria-label="Scroll countries left"
          >
            ◀
          </button>
          <button
            type="button"
            onClick={() => scrollTrack("right")}
            className="a2030-lounge-scroll-arrow"
            aria-label="Scroll countries right"
          >
            ▶
          </button>
        </div>
      </div>

      <div ref={trackRef} className="a2030-intl-country-track mt-4">
        {getInternationalSuiteNavCountries().map((country) => {
          const frozen = isInternationalSuiteCountryFrozen(country);
          const builtRoom = countryHasBuiltSuiteRooms(country);
          const roomEnterLabel = getIntlSuiteEnterRoomOneClick(
            country.id,
            country.flag,
            t.intlSuiteEnterRoomOneClick
          );

          return (
            <details
              key={country.id}
              id={`intl-country-${country.id}`}
              name="intl-suite-country"
              className={`a2030-intl-country-panel${frozen ? " a2030-intl-country-panel-frozen cfa-slot-frozen-surface" : ""}${builtRoom ? " a2030-intl-country-panel-built" : ""}`}
              onToggle={(event) => {
                const panel = event.currentTarget;
                if (!panel.open) return;
                triggerIntlSuiteNeonFlash(panel);
                focusCountryPanel(panel);
              }}
            >
              {frozen ? <ArenaSlotIceFrostOverlay variant="full" hideStamp /> : null}
              <summary className="a2030-intl-country-head a2030-intl-country-summary">
                <span className="text-2xl leading-none" aria-hidden="true">
                  {country.flag}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-base font-black tracking-[0.06em] text-[#f7efe0]">
                    {country.name}
                  </span>
                  {frozen ? (
                    <span className="cfa-slot-frozen-badge mt-2 inline-flex">Frozen</span>
                  ) : builtRoom ? (
                    <InternationalSuiteRoomEnterLink
                      country={country}
                      stopToggle
                      className="a2030-intl-suite-enter-room-link mt-2"
                      label={roomEnterLabel}
                    />
                  ) : (
                    <span className="a2030-intl-country-click-hint mt-2 block text-[10px] font-semibold text-[#8fa3c4]">
                      {t.intlSuiteClickCountry}
                    </span>
                  )}
                </span>
                <span className="a2030-intl-country-chevron" aria-hidden="true">
                  ▸
                </span>
              </summary>

              <div className="a2030-intl-country-body">
                <InternationalSuiteCountryPanels country={country} frozen={frozen} variant="scroll" />
              </div>
            </details>
          );
        })}
      </div>
    </section>
  );
}
