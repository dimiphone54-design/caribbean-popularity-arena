import { NextResponse } from "next/server";
import { eldersTableGiftLegal } from "@/lib/elders-table-gift-legal";
import { cardMetaToRecord, parsePaymentCardMeta } from "@/lib/payments/card-meta";
import { buildPaymentCheckout } from "@/lib/payments/checkout";

export async function POST(request: Request) {
  let clipId = "monica-texas-grenada";
  let body: Record<string, unknown> = {};

  try {
    body = (await request.json()) as Record<string, unknown>;
    if (typeof body.clipId === "string") clipId = body.clipId;
  } catch {
    /* empty body ok */
  }

  const cardMeta = parsePaymentCardMeta(body);
  if (!cardMeta) {
    return NextResponse.json({ ok: false, error: "Valid card details required" }, { status: 400 });
  }

  const { eldersRoomMeta, getEldersRoomClip } = await import("@/lib/the-elders-room");
  const clip = getEldersRoomClip(clipId) ?? getEldersRoomClip("monica-texas-grenada");

  if (!clip) {
    return NextResponse.json({ ok: false, error: "Clip not found" }, { status: 404 });
  }

  const checkout = buildPaymentCheckout({
    product: "elders-room",
    amount: eldersRoomMeta.priceUsd,
    label: eldersTableGiftLegal.checkoutLabel(eldersRoomMeta.name),
    metadata: { clipId: clip.id, roomSlug: clip.roomSlug, ...cardMetaToRecord(cardMeta) }
  });

  return NextResponse.json({
    ...checkout,
    clipId: clip.id,
    roomSlug: clip.roomSlug,
    roomPath: `/rooms/the-elders-table/room/${clip.roomSlug}`,
    cardMeta
  });
}
