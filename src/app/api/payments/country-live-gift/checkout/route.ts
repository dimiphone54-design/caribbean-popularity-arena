import { NextResponse } from "next/server";
import { countryRoomLiveAccessUsd } from "@/lib/country-room-access";
import { cardMetaToRecord, parsePaymentCardMeta } from "@/lib/payments/card-meta";
import { buildPaymentCheckout } from "@/lib/payments/checkout";

export async function POST(request: Request) {
  let displayName = "Arena Guest";
  let email = "";
  let countryId = "";
  let countryName = "";
  let roomSlug = "";
  let body: Record<string, unknown> = {};

  try {
    body = (await request.json()) as Record<string, unknown>;
    displayName = String(body.displayName ?? "").trim() || "Arena Guest";
    email = String(body.email ?? "").trim();
    countryId = String(body.countryId ?? "").trim();
    countryName = String(body.countryName ?? "").trim() || countryId;
    roomSlug = String(body.roomSlug ?? "").trim();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  if (!countryId || !roomSlug) {
    return NextResponse.json({ error: "Country and room required" }, { status: 400 });
  }

  const cardMeta = parsePaymentCardMeta(body);
  if (!cardMeta) {
    return NextResponse.json({ error: "Valid card details required" }, { status: 400 });
  }

  const customReference = `country-live-gift__${roomSlug}__${countryId}-${Date.now()}`;
  const checkout = buildPaymentCheckout({
    product: "country-live-gift",
    amount: countryRoomLiveAccessUsd,
    label: `${countryName} live gift · games & talk-show`,
    customReference,
    metadata: { countryId, countryName, roomSlug, displayName, email, ...cardMetaToRecord(cardMeta) }
  });

  return NextResponse.json({
    ...checkout,
    countryId,
    countryName,
    roomSlug,
    displayName,
    email,
    cardMeta
  });
}
