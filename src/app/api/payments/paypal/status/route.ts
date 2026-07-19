import { NextResponse } from "next/server";
import { getPayPalPublicStatus } from "@/lib/paypal";
import { PLATFORM_PAYPAL_MERCHANT, PLATFORM_PAY_LANES } from "@/lib/platform-paypal";
import { getRealMoneyPublicStatus } from "@/lib/real-money";
import { getPlatformCheckoutMode } from "@/lib/platform-vault";

/** Owner / client status · does not expose secrets */
export async function GET() {
  const status = getPayPalPublicStatus();
  const money = getRealMoneyPublicStatus();
  return NextResponse.json({
    ok: true,
    ...status,
    ...money,
    checkoutMode: getPlatformCheckoutMode(),
    brandName: PLATFORM_PAYPAL_MERCHANT.brandName,
    settlementNote: PLATFORM_PAYPAL_MERCHANT.settlementNote,
    lanes: PLATFORM_PAY_LANES.map((lane) => ({
      id: lane.id,
      flag: lane.flag,
      city: lane.city,
      countryName: lane.countryName,
      exampleCount: lane.examples.length
    }))
  });
}
