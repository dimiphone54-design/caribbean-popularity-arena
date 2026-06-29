import { NextResponse } from "next/server";
import { buildPaymentCheckout } from "@/lib/payments/checkout";
import { cardMetaToRecord, parsePaymentCardMeta } from "@/lib/payments/card-meta";
import { env } from "@/lib/env";
import { findArenaMemberById, upsertArenaMember } from "@/lib/arena-member-registry";

export async function POST(request: Request) {
  let displayName = "";
  let email = "";
  let memberId = "";
  let body: Record<string, unknown> = {};

  try {
    body = (await request.json()) as Record<string, unknown>;
    displayName = String(body.displayName ?? "").trim();
    email = String(body.email ?? "").trim();
    memberId = String(body.memberId ?? "").trim();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request body" }, { status: 400 });
  }

  if (displayName.length < 2 || !email.includes("@")) {
    return NextResponse.json({ ok: false, error: "Name and email required" }, { status: 400 });
  }

  const cardMeta = parsePaymentCardMeta(body);
  if (!cardMeta) {
    return NextResponse.json({ ok: false, error: "Valid card details required" }, { status: 400 });
  }

  const member = memberId ? await findArenaMemberById(memberId) : null;

  if (!member) {
    return NextResponse.json(
      { ok: false, error: "Complete member registration before checkout" },
      { status: 400 }
    );
  }

  if (!member.bankName || !member.accountHolderName || !member.accountNumber || !member.bankCountry) {
    return NextResponse.json({ ok: false, error: "Bank details required before checkout" }, { status: 400 });
  }

  const customReference = `member-sign-in-${member.id}`;
  await upsertArenaMember(
    {
      displayName: member.displayName,
      email: member.email,
      country: member.country,
      islandCode: member.islandCode,
      bankName: member.bankName,
      accountHolderName: member.accountHolderName,
      accountNumber: member.accountNumber,
      bankCountry: member.bankCountry,
      voiceLanguage: member.voiceLanguage,
      customReference
    },
    member.id
  );

  const amount = Number(env.payments.mensEntryAmountUsd) || 6;
  const checkout = buildPaymentCheckout({
    product: "member-sign-in",
    amount,
    label: `Arena Member Gift · ${displayName}`,
    customReference,
    metadata: { displayName, email, memberId: member.id, ...cardMetaToRecord(cardMeta) }
  });

  return NextResponse.json({
    ...checkout,
    displayName,
    email,
    memberId: member.id,
    cardMeta
  });
}
