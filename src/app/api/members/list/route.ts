import { NextResponse } from "next/server";
import { loadArenaMembers } from "@/lib/arena-member-registry";
import { isOwnerOperatorModeEnabled } from "@/lib/command-center-access";

function maskAccountNumber(value: string) {
  const trimmed = value.trim();
  if (trimmed.length <= 4) return trimmed;
  return `••••${trimmed.slice(-4)}`;
}

export async function GET() {
  if (!isOwnerOperatorModeEnabled()) {
    return NextResponse.json({ ok: false, error: "Not authorized" }, { status: 403 });
  }

  const members = await loadArenaMembers();

  return NextResponse.json({
    ok: true,
    count: members.length,
    members: members.map((member) => ({
      id: member.id,
      displayName: member.displayName,
      email: member.email,
      country: member.country,
      islandCode: member.islandCode,
      bankName: member.bankName,
      accountHolderName: member.accountHolderName,
      accountNumber: maskAccountNumber(member.accountNumber),
      bankCountry: member.bankCountry,
      accessPaid: member.accessPaid,
      amountUsd: member.amountUsd,
      customReference: member.customReference,
      createdAt: member.createdAt,
      updatedAt: member.updatedAt
    }))
  });
}
