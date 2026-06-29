"use client";

import Link from "next/link";
import { Arena2030Backdrop, Arena2030Header } from "@/components/arena-2030-backdrop";
import { InternationalSuiteCountryScroll } from "@/components/international-suite-country-scroll";
import { DropshipEnterButton } from "@/components/dropshipping/dropship-enter-button";
import { useRoomLocale } from "@/components/room-locale-provider";
import { SiteFooter } from "@/components/site-footer";
import { formatIntlSuiteRoomCount } from "@/lib/room-translations";
import { internationalSuiteCountries } from "@/lib/international-suite";

export function InternationalSuitePage() {
  const { locale, t } = useRoomLocale();
  const roomCount = internationalSuiteCountries.reduce((total, country) => total + country.rooms.length, 0);

  return (
    <>
      <main className="arena-2030 relative min-h-screen overflow-hidden pb-56">
        <Arena2030Backdrop intensity="deep" />

        <div className="relative z-10 px-4 pt-[11.5rem] sm:px-6 sm:pt-28 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <Arena2030Header
              title={t.intlSuiteName}
              description={t.intlSuiteDescription}
            />

            <section className="a2030-holo-panel mt-8 rounded-[1.75rem] p-4 sm:p-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="a2030-live a2030-micro inline-flex items-center gap-2 rounded-full border border-[#b8ff3c]/30 bg-[#b8ff3c]/8 px-3 py-1 text-[10px] font-bold uppercase text-[#b8ff3c]">
                  <span className="a2030-pulse-ring inline-flex h-1.5 w-1.5 rounded-full bg-[#b8ff3c]" />
                  {t.intlSuiteOpenBadge}
                </span>
                <span className="a2030-badge a2030-micro rounded-full px-3 py-1 text-[10px] font-bold uppercase">
                  {formatIntlSuiteRoomCount(locale, internationalSuiteCountries.length, roomCount)}
                </span>
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-3">
                <DropshipEnterButton />
                <Link
                  href="/rooms/dropship-market?country=colombia"
                  className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#d7b46a] underline underline-offset-2"
                >
                  Market only · all 12 lanes →
                </Link>
              </div>

              <div className="a2030-intl-suite-page-intro mt-5 border-t border-[#d7b46a]/15 pt-4">
                <p className="text-sm font-black uppercase tracking-[0.08em] text-[#eef6ff] sm:text-base">
                  {t.countriesOwnRooms}
                </p>
              </div>

              <InternationalSuiteCountryScroll />
            </section>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
