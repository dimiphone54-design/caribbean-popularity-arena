"use client";

import { getDropshipCountryDisplayName, getDropshipMarketCopy } from "@/lib/dropship-market-copy";

type DropshipOrderTrackerProps = {
  countryId: string;
  countryName: string;
  flag: string;
  refreshKey?: number;
};

/** Listings only — no on-site orders. Payment is arranged with the seller. */
export function DropshipOrderTracker({ countryId, countryName, flag }: DropshipOrderTrackerProps) {
  const copy = getDropshipMarketCopy(countryId);
  const displayCountry = getDropshipCountryDisplayName(countryId, countryName);

  return (
    <div className="dropship-orders-empty mt-4">
      <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#8fa3c4]">
        {copy.ordersTitle?.(flag, displayCountry) ?? `${flag} ${displayCountry} · sellers`}
      </p>
      <p className="mt-2 text-xs leading-5 text-[#9aa8c6]">
        No payments or order tracking on this site. Contact the seller from a listing and arrange
        delivery and payment directly with them.
      </p>
    </div>
  );
}
