import { NextResponse } from "next/server";
import { createMember } from "@/lib/marketplace/members-store";

type RegisterBody = {
  displayName?: string;
  email?: string;
  country?: string;
  islandCode?: string;
  liveFocus?: string;
  dropshippingItemName?: string;
  dropshippingStoreUrl?: string;
  dropshippingNotes?: string;
  voiceLanguage?: string;
  termsAgreed?: boolean;
};

export async function POST(request: Request) {
  let body: RegisterBody = {};
  try {
    body = (await request.json()) as RegisterBody;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request body" }, { status: 400 });
  }

  const displayName = body.displayName?.trim() ?? "";
  const email = body.email?.trim() ?? "";
  const country = body.country?.trim() ?? "";

  if (displayName.length < 2 || !email.includes("@") || country.length < 2) {
    return NextResponse.json({ ok: false, error: "Name, email, and country required" }, { status: 400 });
  }

  if (!body.termsAgreed) {
    return NextResponse.json({ ok: false, error: "You must agree to the terms to join" }, { status: 400 });
  }

  try {
    const member = await createMember({
      display_name: displayName,
      email,
      country,
      island_code: body.islandCode?.trim() || undefined,
      live_focus: body.liveFocus?.trim() || undefined,
      dropship_item_name: body.dropshippingItemName?.trim() || undefined,
      dropship_store_url: body.dropshippingStoreUrl?.trim() || undefined,
      dropship_notes: body.dropshippingNotes?.trim() || undefined,
      voice_language: body.voiceLanguage?.trim() || undefined,
      terms_agreed: true,
    });
    return NextResponse.json({ ok: true, memberId: member.id });
  } catch {
    return NextResponse.json({ ok: false, error: "Failed to register member" }, { status: 500 });
  }
}