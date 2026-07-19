"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Arena2030Backdrop, Arena2030Header } from "@/components/arena-2030-backdrop";
import { DropshipMarketPanel } from "@/components/dropshipping/dropship-market-panel";
import { RoomCountryPageShell } from "@/components/room-country-page-shell";
import { SiteFooter } from "@/components/site-footer";
import { dropshipMarketMeta, getDropshipCountryById, resolveDropshipCountryId } from "@/lib/dropshipping";
import { getDropshipCountryDisplayName, getDropshipMarketCopy } from "@/lib/dropship-market-copy";
import { internationalSuiteCountries } from "@/lib/international-suite";
import { DROPSHIP_PUBLIC_HIDDEN_MESSAGE, isPublicDropshipVisible } from "@/lib/real-money";

export function DropshipMarketPage() {
  const searchParams = useSearchParams();
  const countryId = resolveDropshipCountryId(searchParams.get("country"));
  const country = getDropshipCountryById(countryId);

  if (!country) {
    return null;
  }

  const copy = getDropshipMarketCopy(country.id);
  const displayName = getDropshipCountryDisplayName(country.id, country.name);
  const publicDropshipOn = isPublicDropshipVisible();

  if (!publicDropshipOn) {
    return (
      <>
        <main className="arena-2030 relative min-h-screen overflow-hidden pb-56">
          <Arena2030Backdrop intensity="deep" />
          <div className="relative z-10">
            <RoomCountryPageShell>
              <Arena2030Header
                title="Dropship market · private"
                description={DROPSHIP_PUBLIC_HIDDEN_MESSAGE}
              />
              <section className="country-room-section a2030-holo-panel rounded-[1.5rem] border border-[#d7b46a]/30 p-5">
                <p className="text-sm leading-6 text-[#d7e3f6]">{DROPSHIP_PUBLIC_HIDDEN_MESSAGE}</p>
                <p className="mt-3 text-xs text-[#9fb4d4]">
                  Owner tools stay under Command Center. Public rooms remain open for live, chat, and free testing.
                </p>
                <Link
                  href="/#home"
                  className="mt-4 inline-flex rounded-full border border-[#d7b46a]/40 px-4 py-2 text-[11px] font-black uppercase tracking-[0.12em] text-[#d7b46a]"
                >
                  Back to Arena
                </Link>
              </section>
            </RoomCountryPageShell>
          </div>
        </main>
        <SiteFooter />
      </>
    );
  }

  return (
    <>
      <main className="arena-2030 relative min-h-screen overflow-hidden pb-56">
        <Arena2030Backdrop intensity="deep" />

        <div className="relative z-10">
          <RoomCountryPageShell>
            <div className="country-room-section mt-2 flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-2 rounded-full border border-[#d7b46a]/35 bg-[#d7b46a]/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.14em] text-[#d7b46a]">
                {copy.marketOnlyNoGate}
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-[#00f5ff]/25 bg-[#00f5ff]/8 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-[#7dd3fc]">
                {copy.laneBadge(country.flag, displayName)}
              </span>
            </div>

            <Arena2030Header
              title={`${country.flag} ${copy.title}`}
              description={copy.marketPageDesc(displayName)}
            />

            <DropshipMarketPanel
              countryId={country.id}
              countryName={country.name}
              flag={country.flag}
              layout="room"
            />

            <div className="country-room-section flex flex-wrap gap-2">
              <p className="mb-1 w-full text-[10px] font-bold uppercase tracking-[0.14em] text-[#8fa3c4]">
                {copy.switchCountryLane}
              </p>
              {internationalSuiteCountries.map((entry) => (
                <Link
                  key={entry.id}
                  href={`/rooms/${dropshipMarketMeta.slug}?country=${entry.id}`}
                  className={`dropship-country-chip${entry.id === country.id ? " dropship-country-chip--active" : ""}`}
                >
                  {entry.flag} {entry.name}
                </Link>
              ))}
              <Link href="/rooms/international-suite" className="dropship-country-chip dropship-country-chip--suite">
                ← International SUITE
              </Link>
            </div>
          </RoomCountryPageShell>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
