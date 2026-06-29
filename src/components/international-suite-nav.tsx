"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useRoomLocale } from "@/components/room-locale-provider";
import { translateIntlCountryTagline } from "@/lib/room-translations";
import {
  countryHasBuiltSuiteRooms,
  getInternationalSuiteNavCountries,
  internationalSuiteMeta,
  isInternationalSuiteCountryFrozen
} from "@/lib/international-suite";
import { triggerIntlSuiteNeonFlash } from "@/lib/intl-suite-neon-flash";
import {
  getIntlSuiteEnterRoomOneClick
} from "@/lib/intl-suite-country-copy";
import { navigateIntlSuiteLink } from "@/lib/intl-suite-navigate";
import { ArenaLoungeGlitchLabel } from "@/components/arena-lounge-glitch-label";
import { ArenaSlotIceFrostOverlay } from "@/components/arena-slot-ice-frost-overlay";
import { InternationalSuiteCountryPanels } from "@/components/international-suite-country-panels";
import { InternationalSuiteRoomEnterLink } from "@/components/international-suite-room-enter-link";

type InternationalSuiteNavProps = {
  panelLink?: boolean;
  traceItem?: boolean;
  heroHint?: string;
};

type MenuPlacement = {
  top: number;
  left: number;
  width: number;
  maxHeight: number;
};

function computeMenuPlacement(button: HTMLButtonElement): MenuPlacement {
  const rect = button.getBoundingClientRect();
  const width = Math.min(380, window.innerWidth - 16);
  const left = Math.min(Math.max(8, rect.right - width), window.innerWidth - width - 8);
  const preferredHeight = Math.min(440, window.innerHeight - 16);
  const spaceBelow = window.innerHeight - rect.bottom - 8;
  const spaceAbove = rect.top - 8;
  const openDown = spaceBelow >= 220 || spaceBelow >= spaceAbove;

  if (openDown) {
    const maxHeight = Math.min(preferredHeight, Math.max(spaceBelow, 200));
    return { top: rect.bottom + 8, left, width, maxHeight };
  }

  const maxHeight = Math.min(preferredHeight, Math.max(spaceAbove, 200));
  return { top: Math.max(8, rect.top - maxHeight - 8), left, width, maxHeight };
}

export function InternationalSuiteNav({ panelLink = false, traceItem = false, heroHint }: InternationalSuiteNavProps) {
  const router = useRouter();
  const { t, locale } = useRoomLocale();
  const [open, setOpen] = useState(false);
  const [hover, setHover] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [placement, setPlacement] = useState<MenuPlacement | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLUListElement>(null);
  const countries = getInternationalSuiteNavCountries().filter(
    (country) => !isInternationalSuiteCountryFrozen(country)
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  const updatePlacement = () => {
    if (!buttonRef.current) return;
    setPlacement(computeMenuPlacement(buttonRef.current));
  };

  useLayoutEffect(() => {
    if (!open) {
      setPlacement(null);
      return;
    }

    updatePlacement();
    const raf = requestAnimationFrame(() => {
      updatePlacement();
      requestAnimationFrame(updatePlacement);
    });

    return () => cancelAnimationFrame(raf);
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const handlePointerDown = (event: MouseEvent) => {
      const target = event.target as Node;
      if (rootRef.current?.contains(target) || menuRef.current?.contains(target)) return;
      setOpen(false);
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    const handleReposition = () => updatePlacement();

    window.addEventListener("mousedown", handlePointerDown);
    window.addEventListener("keydown", handleEscape);
    window.addEventListener("resize", handleReposition);
    window.addEventListener("scroll", handleReposition, true);

    return () => {
      window.removeEventListener("mousedown", handlePointerDown);
      window.removeEventListener("keydown", handleEscape);
      window.removeEventListener("resize", handleReposition);
      window.removeEventListener("scroll", handleReposition, true);
    };
  }, [open]);

  const scrollList = (direction: "down" | "up") => {
    scrollRef.current?.scrollBy({
      top: direction === "down" ? 140 : -140,
      behavior: "smooth"
    });
  };

  const buttonClass = panelLink
    ? "a2030-lounge-panel-link a2030-micro inline-flex min-w-0 flex-1 flex-col items-start gap-1 px-4 py-3 text-left sm:min-w-[13rem] sm:flex-none sm:items-center sm:justify-center sm:gap-1.5 sm:py-2 sm:text-center"
    : traceItem
      ? "a2030-lounge-panel-link a2030-micro inline-flex shrink-0 flex-row items-center justify-center gap-1.5 px-4 py-0 text-[11px] font-bold uppercase tracking-[0.1em]"
      : "a2030-lounge-link a2030-micro inline-flex items-center gap-1.5 rounded-lg px-4 py-2 text-[11px] font-bold uppercase tracking-[0.1em]";

  const menu = (
    <div
      ref={menuRef}
      className="arena-2030 a2030-intl-suite-menu a2030-intl-suite-menu-portal a2030-intl-suite-menu-open a2030-intl-suite-menu-badass overflow-hidden rounded-xl"
      style={
        placement
          ? {
              top: placement.top,
              left: placement.left,
              width: placement.width,
              maxHeight: placement.maxHeight
            }
          : undefined
      }
    >
      <div className="a2030-intl-suite-menu-head">
        <div className="a2030-intl-suite-menu-head-shine" aria-hidden="true" />
        <div className="a2030-intl-suite-menu-head-row">
          <div className="min-w-0 flex-1">
            <p className="a2030-intl-suite-menu-kicker a2030-micro">
              <span className="a2030-intl-suite-menu-live-dot" aria-hidden="true" />
              {t.countriesOwnRooms}
            </p>
          </div>
          <div className="a2030-intl-suite-menu-scroll-dock" aria-label="Scroll countries">
            <button
              type="button"
              onClick={() => scrollList("up")}
              className="a2030-intl-suite-scroll-btn a2030-intl-suite-scroll-btn-up"
              aria-label="Scroll up"
            >
              ▲
            </button>
            <span className="a2030-intl-suite-scroll-rail" aria-hidden="true" />
            <button
              type="button"
              onClick={() => scrollList("down")}
              className="a2030-intl-suite-scroll-btn a2030-intl-suite-scroll-btn-down"
              aria-label="Scroll down"
            >
              ▼
            </button>
          </div>
        </div>
      </div>
      <div className="a2030-intl-suite-scroll-shell a2030-intl-suite-scroll-shell--inner">
        <ul
          ref={scrollRef}
          role="listbox"
          aria-label="International suite countries"
          className="a2030-intl-suite-scroll a2030-intl-suite-scroll--inner min-h-0 flex-1 overflow-y-scroll"
        >
        {countries.map((country) => {
          const frozen = isInternationalSuiteCountryFrozen(country);
          const builtRoom = countryHasBuiltSuiteRooms(country);
          const roomEnterLabel = getIntlSuiteEnterRoomOneClick(
            country.id,
            country.flag,
            t.intlSuiteEnterRoomOneClick
          );

          return (
          <li
            key={country.id}
            className={`a2030-intl-suite-country-row border-b border-white/5 last:border-b-0${frozen ? " a2030-intl-suite-country-row-frozen cfa-slot-frozen-surface" : ""}${builtRoom ? " a2030-intl-suite-country-row-built" : ""}`}
          >
            {frozen ? <ArenaSlotIceFrostOverlay variant="full" hideStamp /> : null}
            <details
              name="intl-suite-nav-country"
              className="a2030-intl-suite-country-details"
              onToggle={(event) => {
                if (event.currentTarget.open) {
                  triggerIntlSuiteNeonFlash(event.currentTarget);
                }
              }}
            >
              <summary className="a2030-intl-suite-country-head a2030-intl-suite-country-summary flex items-start gap-3 px-3 py-2.5">
                <span className="a2030-intl-suite-country-flag text-lg leading-none">{country.flag}</span>
                <span className="min-w-0 flex-1">
                  <span className="a2030-intl-suite-country-name block text-xs font-bold text-[#eef6ff]">
                    {country.name}
                  </span>
                  <span className="a2030-intl-suite-country-tag mt-0.5 block text-[10px] font-semibold text-[#d7b46a]">
                    {translateIntlCountryTagline(locale, country.id, country.tagline)}
                  </span>
                  {frozen ? (
                    <span className="cfa-slot-frozen-badge mt-1 inline-flex">Frozen</span>
                  ) : builtRoom ? (
                    <InternationalSuiteRoomEnterLink
                      country={country}
                      onNavigate={() => setOpen(false)}
                      stopToggle
                      className="a2030-intl-suite-enter-room-link a2030-intl-suite-enter-room-link--inline mt-1"
                      label={roomEnterLabel}
                    />
                  ) : (
                    <span className="mt-1 block text-[10px] font-semibold text-[#8fa3c4]">{t.intlSuiteClickCountry}</span>
                  )}
                </span>
                <span className="a2030-intl-country-chevron mt-0.5" aria-hidden="true">
                  ▸
                </span>
              </summary>
              <div className="a2030-intl-suite-country-body border-t border-white/5 pb-1">
                <InternationalSuiteCountryPanels
                  country={country}
                  frozen={frozen}
                  variant="nav"
                  onNavigate={() => setOpen(false)}
                />
              </div>
            </details>
          </li>
          );
        })}
        </ul>
      </div>
      <div className="a2030-intl-suite-menu-foot">
        <Link
          href={`/rooms/${internationalSuiteMeta.slug}`}
          onClick={(event) => {
            event.preventDefault();
            navigateIntlSuiteLink(router, `/rooms/${internationalSuiteMeta.slug}`, () => setOpen(false));
          }}
          className="a2030-intl-suite-menu-foot-link"
        >
          {t.intlSuiteOpenFull}
        </Link>
      </div>
    </div>
  );

  const inLoungePanel = panelLink || traceItem;

  return (
    <div
      ref={rootRef}
      className={`a2030-intl-suite-nav relative shrink-0${open ? " a2030-intl-suite-nav-open" : ""}${traceItem ? " a2030-intl-suite-nav--nav-row" : ""}`}
    >
      <button
        ref={buttonRef}
        type="button"
        onClick={() => {
          buttonRef.current?.scrollIntoView({ block: "nearest", inline: "nearest" });
          setOpen((value) => !value);
        }}
        onMouseEnter={() => traceItem && setHover(true)}
        onMouseLeave={() => setHover(false)}
        onFocus={() => traceItem && setHover(true)}
        onBlur={() => setHover(false)}
        aria-expanded={open}
        aria-haspopup="listbox"
        className={`${buttonClass}${traceItem ? " a2030-lounge-trace-item" : ""}${inLoungePanel ? " a2030-lounge-gold-link" : ""}${traceItem ? " a2030-lounge-gold-link--nav" : ""} text-[11px] font-bold uppercase tracking-[0.1em]`}
      >
        <span className={`inline-flex items-center gap-1.5${traceItem || panelLink ? " relative z-[2]" : ""}`}>
          {traceItem ? (
            <ArenaLoungeGlitchLabel
              text={internationalSuiteMeta.name}
              active={hover || open}
              className="a2030-lounge-glitch-label a2030-lounge-gold-label"
            />
          ) : (
            internationalSuiteMeta.name
          )}
          <span className="a2030-intl-suite-chevron text-[10px] opacity-80" aria-hidden="true">
            {open ? "▴" : "▾"}
          </span>
        </span>
        {heroHint ? (
          <span className={`a2030-lounge-gold-hint text-[10px] font-semibold normal-case leading-5 tracking-normal${traceItem || panelLink ? " relative z-[2]" : ""}`}>
            {heroHint}
          </span>
        ) : null}
      </button>

      {mounted && open && placement ? createPortal(menu, document.body) : null}
    </div>
  );
}
