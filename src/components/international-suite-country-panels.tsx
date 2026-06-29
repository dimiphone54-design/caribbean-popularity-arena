"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { CountryLiveGiftSignupPanel } from "@/components/country-live-gift-checkout-panel";
import { InternationalSuiteCountryDropship } from "@/components/dropshipping/international-suite-country-dropship";
import { DropshipEnterButton } from "@/components/dropshipping/dropship-enter-button";
import { EastAsiaRoomEnterButton } from "@/components/east-asia-room-enter-button";
import { useRoomLocale } from "@/components/room-locale-provider";
import { getDropshipMarketHref } from "@/lib/dropshipping";
import { getDropshipCountryDisplayName, getDropshipMarketCopy } from "@/lib/dropship-market-copy";
import { translateIntlCountryTagline, translateIntlRoomDescription } from "@/lib/room-translations";
import {
  countryHasBuiltSuiteRooms,
  getInternationalSuiteCountryLiveRoomSlug,
  getInternationalSuiteRoomHref,
  type InternationalSuiteCountry
} from "@/lib/international-suite";
import { arenaSlotSignInFrozenCopy, arenaSlotSignInFrozenShortCopy } from "@/lib/arena-slot-sign-in-access";
import { navigateIntlSuiteLink } from "@/lib/intl-suite-navigate";
import { triggerIntlSuiteNeonFlash } from "@/lib/intl-suite-neon-flash";
import {
  getIntlSuiteEnterRoomOneClick
} from "@/lib/intl-suite-country-copy";

type InternationalSuiteCountryPanelsProps = {
  country: InternationalSuiteCountry;
  frozen: boolean;
  /** nav dropdown closes on link click */
  onNavigate?: () => void;
  /** padding variant for homepage nav dropdown */
  variant?: "scroll" | "nav";
};

/** Shared International SUITE country body · settings order: rooms → live gift → dropship → stage */
export function InternationalSuiteCountryPanels({
  country,
  frozen,
  onNavigate,
  variant = "scroll"
}: InternationalSuiteCountryPanelsProps) {
  const router = useRouter();
  const { locale, t } = useRoomLocale();
  const dropshipCopy = getDropshipMarketCopy(country.id);
  const roomEnterLabel = getIntlSuiteEnterRoomOneClick(
    country.id,
    country.flag,
    t.intlSuiteEnterRoomOneClick
  );
  const pad = variant === "nav" ? "px-3" : "";
  const builtRoom = countryHasBuiltSuiteRooms(country);

  function handleSuiteLinkClick(event: React.MouseEvent<HTMLAnchorElement>, href: string) {
    triggerIntlSuiteNeonFlash(event.currentTarget);
    if (!onNavigate) return;
    event.preventDefault();
    navigateIntlSuiteLink(router, href, onNavigate);
  }

  return (
    <>
      {frozen ? (
        <div className={variant === "scroll" ? "a2030-intl-country-frozen-body" : `${pad} pt-2`}>
          <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#94a3b8]">
            {arenaSlotSignInFrozenCopy}
          </p>
          {variant === "scroll" ? (
            <button type="button" className="ai-real-slot-btn-frozen mt-3" disabled>
              {arenaSlotSignInFrozenShortCopy}
            </button>
          ) : null}
        </div>
      ) : (
        <>
          <p
            className={`text-[10px] font-bold uppercase tracking-[0.14em] text-[#d7b46a]${variant === "nav" ? ` ${pad} pt-2` : ""}`}
          >
            {translateIntlCountryTagline(locale, country.id, country.tagline)}
          </p>
          <p className={`mt-1 text-[11px] text-[#8fa3c4]${variant === "nav" ? ` ${pad}` : ""}`}>{country.region}</p>

          {country.highlights ? (
            <ul
              className={`a2030-intl-country-highlights mt-3 space-y-1.5 text-[10px] leading-4 text-[#9fb4d4]${variant === "nav" ? ` ${pad}` : ""}`}
            >
              <li>
                <span className="font-bold uppercase tracking-[0.08em] text-[#d7b46a]">Culture · </span>
                {country.highlights.culture.join(" · ")}
              </li>
              <li>
                <span className="font-bold uppercase tracking-[0.08em] text-[#d7b46a]">Food · </span>
                {country.highlights.food.join(" · ")}
              </li>
              <li>
                <span className="font-bold uppercase tracking-[0.08em] text-[#d7b46a]">Games · </span>
                {country.highlights.games.join(" · ")}
              </li>
              <li>
                <span className="font-bold uppercase tracking-[0.08em] text-[#d7b46a]">Activities · </span>
                {country.highlights.activities.join(" · ")}
              </li>
            </ul>
          ) : null}

          <div className={`a2030-intl-room-track a2030-intl-room-track--open mt-4${variant === "nav" ? " px-1" : ""}`}>
            {country.rooms.map((room) => {
              if (room.status !== "open") {
                return (
                  <div key={room.id} className="a2030-intl-room-card a2030-intl-room-card-soon">
                    <p className="text-[11px] font-black uppercase tracking-[0.12em] text-[#7a82a8]">
                      {room.roomLabel}
                    </p>
                    <p className="mt-2 text-[11px] leading-5 text-[#8fa3c4]">
                      {translateIntlRoomDescription(locale, room.roomSlug, room.description)}
                    </p>
                    <span className="a2030-intl-room-badge-soon mt-3 inline-flex">{t.intlSuiteComingSoon}</span>
                  </div>
                );
              }

              if (room.href) {
                return (
                  <Link
                    key={room.id}
                    href={room.href}
                    onClick={(event) => handleSuiteLinkClick(event, room.href!)}
                    className="a2030-intl-room-card a2030-intl-room-card-open group"
                  >
                    <p className="text-[11px] font-black uppercase tracking-[0.12em] text-[#b8ff3c]">
                      {room.roomLabel}
                    </p>
                    <p className="mt-2 text-[11px] leading-5 text-[#9fb4d4] transition group-hover:text-[#eef6ff]">
                      {translateIntlRoomDescription(locale, room.roomSlug, room.description)}
                    </p>
                    <span className="a2030-intl-room-badge-open mt-3 inline-flex">
                      Front 12 slot · homepage →
                    </span>
                  </Link>
                );
              }

              const roomHref = getInternationalSuiteRoomHref(room);

              return (
                <Link
                  key={room.id}
                  href={roomHref}
                  onClick={(event) => handleSuiteLinkClick(event, roomHref)}
                  className="a2030-intl-room-card a2030-intl-room-card-open group"
                >
                  <p className="text-[11px] font-black uppercase tracking-[0.12em] text-[#b8ff3c]">
                    {room.roomLabel}
                  </p>
                  <p className="mt-2 text-[11px] leading-5 text-[#9fb4d4] transition group-hover:text-[#eef6ff]">
                    {translateIntlRoomDescription(locale, room.roomSlug, room.description)}
                  </p>
                  <span className="a2030-intl-room-badge-open mt-3 inline-flex">
                    {roomEnterLabel}
                  </span>
                </Link>
              );
            })}
          </div>
        </>
      )}

      <div
        className={`a2030-intl-country-live-gift mt-4 border-t border-[#00f5ff]/15 pt-4${variant === "nav" ? ` ${pad}` : ""}`}
      >
        <CountryLiveGiftSignupPanel
          countryId={country.id}
          countryName={country.name}
          flag={country.flag}
          roomSlug={getInternationalSuiteCountryLiveRoomSlug(country.id)}
          tagline={translateIntlCountryTagline(locale, country.id, country.tagline)}
          region={country.region}
          onNavigate={onNavigate}
        />
      </div>

      <div
        className={`a2030-intl-country-market mt-4 space-y-3 border-t border-[#d7b46a]/15 pt-4${variant === "nav" ? ` ${pad}` : ""}`}
      >
        <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#d7b46a]">
          {dropshipCopy.intlNoGate}
        </p>
        <DropshipEnterButton
          countryId={country.id}
          countryName={country.name}
          flag={country.flag}
          compact
          onNavigate={onNavigate}
        />
        <InternationalSuiteCountryDropship
          countryId={country.id}
          countryName={country.name}
          flag={country.flag}
        />
        <Link
          href={getDropshipMarketHref(country.id)}
          onClick={(event) => handleSuiteLinkClick(event, getDropshipMarketHref(country.id))}
          className="a2030-intl-country-live-gift-room-link"
        >
          {dropshipCopy.openFullMarket(getDropshipCountryDisplayName(country.id, country.name))}
        </Link>
      </div>

      {country.id === "japan" || country.id === "china" ? (
        <div
          className={`a2030-intl-country-stage mt-4 space-y-2 border-t border-[#f472b6]/20 pt-4${variant === "nav" ? ` ${pad} pb-2` : ""}`}
        >
          <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#f472b6]">
            Live stage games · {country.flag}
          </p>
          <EastAsiaRoomEnterButton
            countryId={country.id}
            countryName={country.name}
            flag={country.flag}
            compact
            onNavigate={onNavigate}
          />
          {builtRoom && country.rooms[0] && !country.rooms[0].href ? (
            <Link
              href={getInternationalSuiteRoomHref(country.rooms[0])}
              onClick={(event) =>
                handleSuiteLinkClick(event, getInternationalSuiteRoomHref(country.rooms[0]!))
              }
              className="a2030-intl-country-live-gift-room-link"
            >
              Open {country.name} room · games & talk-show →
            </Link>
          ) : null}
        </div>
      ) : null}
    </>
  );
}
