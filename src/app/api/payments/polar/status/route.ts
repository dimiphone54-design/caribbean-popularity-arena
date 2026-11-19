import { NextResponse } from "next/server";

import { getPolarPublicStatus } from "@/lib/polar";
import { getRealMoneyPublicStatus } from "@/lib/real-money";
import { getPlatformCheckoutMode } from "@/lib/platform-vault";
import { PLATFORM_PAY_LANES } from "@/lib/platform-payments";

/** Public payment status; never returns provider credentials. */
export async function GET() {
  const status = getPolarPublicStatus();
  const money = getRealMoneyPublicStatus();

  return NextResponse.json({
    ok: true,
    ...status,
    ...money,
    checkoutMode: getPlatformCheckoutMode(),
    brandName: "Caribbean Freedom Arena",
    settlementNote:
      "Customer payments are processed through the platform's Polar checkout. Supplier and creator payouts are handled separately.",
    lanes: PLATFORM_PAY_LANES.map((lane) => ({
      id: lane.id,
      flag: lane.flag,
      city: lane.city,
      countryName: lane.countryName,
      exampleCount: lane.examples.length
    }))
  });
}
