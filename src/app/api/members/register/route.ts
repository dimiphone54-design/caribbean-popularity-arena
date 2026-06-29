import { NextResponse } from "next/server";
import { upsertArenaMember, findArenaMemberById } from "@/lib/arena-member-registry";

type RegisterBody = {
  memberId?: string;
  displayName?: string;
  email?: string;
  country?: string;
  islandCode?: string;
  bankName?: string;
  accountHolderName?: string;
  accountNumber?: string;
  bankCountry?: string;
  voiceLanguage?: string;
};

export async function POST(request: Request) {
  let body: RegisterBody = {};

  try {
    body = (await request.json()) as RegisterBody;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request body" }, { status: 400 });
  }

  const existing = body.memberId ? await findArenaMemberById(body.memberId) : null;

  const draft = {
    displayName: body.displayName?.trim() || existing?.displayName || "",
    email: body.email?.trim() || existing?.email || "",
    country: body.country?.trim() || existing?.country || "",
    islandCode: body.islandCode?.trim() || existing?.islandCode || "",
    bankName: body.bankName?.trim() || existing?.bankName || "",
    accountHolderName: body.accountHolderName?.trim() || existing?.accountHolderName || "",
    accountNumber: body.accountNumber?.trim() || existing?.accountNumber || "",
    bankCountry: body.bankCountry?.trim() || existing?.bankCountry || "",
    voiceLanguage: body.voiceLanguage || existing?.voiceLanguage
  };

  if (draft.displayName.length < 2 || !draft.email.includes("@") || draft.country.length < 2) {
    return NextResponse.json({ ok: false, error: "Name, email, and country required" }, { status: 400 });
  }

  const member = await upsertArenaMember(draft, body.memberId);

  return NextResponse.json({
    ok: true,
    memberId: member.id,
    accessPaid: member.accessPaid
  });
}
