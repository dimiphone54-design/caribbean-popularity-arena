"use client";

import { CountryLocalClock } from "@/components/country-local-clock";
import { LiveChinaClock } from "@/components/live-china-clock";
import { LiveColombiaClock } from "@/components/live-colombia-clock";
import { LiveJapanClock } from "@/components/live-japan-clock";
import { LiveUkClock } from "@/components/live-uk-clock";
import { getArenaCountryMetaByCountryId } from "@/lib/arena-country-slot-meta";

/** One compact live clock per country · top-right room shell */
export function RoomCountryClock({ countryId, className = "w-full" }: { countryId: string; className?: string }) {
  if (countryId === "colombia") {
    return <LiveColombiaClock variant="compact" className={className} />;
  }

  if (countryId === "uk") {
    return <LiveUkClock variant="compact" className={className} />;
  }

  if (countryId === "japan") {
    return <LiveJapanClock variant="compact" className={className} />;
  }

  if (countryId === "china") {
    return <LiveChinaClock variant="compact" className={className} />;
  }

  const meta = getArenaCountryMetaByCountryId(countryId);

  return (
    <CountryLocalClock
      capital={meta.capital}
      timeZone={meta.timeZone}
      tzAbbrev={meta.tzAbbrev}
      className={`room-country-clock ${className}`.trim()}
    />
  );
}
