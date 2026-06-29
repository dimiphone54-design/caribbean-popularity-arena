import { NextResponse } from "next/server";
import { markArenaMemberPaid } from "@/lib/arena-member-registry";

export async function POST(request: Request) {
  let body: {
    memberId?: string;
    customReference?: string;
    paymentReference?: string;
    amountUsd?: number;
  } = {};

  try {
    body = (await request.json()) as typeof body;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request body" }, { status: 400 });
  }

  const member = await markArenaMemberPaid({
    memberId: body.memberId,
    customReference: body.customReference,
    paymentReference: body.paymentReference,
    amountUsd: body.amountUsd
  });

  if (!member) {
    return NextResponse.json({ ok: false, error: "Member not found" }, { status: 404 });
  }

  return NextResponse.json({ ok: true, memberId: member.id, accessPaid: member.accessPaid });
}
