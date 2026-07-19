import { NextResponse } from "next/server";
import {
  createVaultEntry,
  getVaultSummary,
  listVaultEntries,
  type CreateVaultEntryInput
} from "@/lib/platform-vault";
import { REAL_MONEY_FREEZE_MESSAGE, isRealMoneyEnabled } from "@/lib/real-money";

/** GET · vault summary + recent pending entries (Command Center / trackers) */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const limit = Math.min(200, Math.max(1, Number(searchParams.get("limit") ?? "50") || 50));
  const [summary, entries] = await Promise.all([getVaultSummary(), listVaultEntries(limit)]);
  return NextResponse.json({ ok: true, summary, entries });
}

/** POST · add pending order / gift / vote / boost to platform vault (no real charge) */
export async function POST(request: Request) {
  if (!isRealMoneyEnabled()) {
    return NextResponse.json(
      { ok: false, error: REAL_MONEY_FREEZE_MESSAGE, frozen: true },
      { status: 503 }
    );
  }

  let body: CreateVaultEntryInput = {
    kind: "general",
    countryId: "global",
    countryName: "Arena",
    itemLabel: "Item",
    amountUsd: 0
  };
  try {
    body = (await request.json()) as CreateVaultEntryInput;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid body" }, { status: 400 });
  }

  const amount = Number(body.amountUsd);
  if (!body.itemLabel?.trim() || !Number.isFinite(amount) || amount < 0) {
    return NextResponse.json({ ok: false, error: "itemLabel and amountUsd required" }, { status: 400 });
  }

  const entry = await createVaultEntry({
    ...body,
    amountUsd: amount,
    itemLabel: body.itemLabel.trim()
  });

  const summary = await getVaultSummary();

  return NextResponse.json({
    ok: true,
    mode: "vault",
    entry,
    summary,
    message:
      "Saved to platform vault · pending collection · no real charge. Pay when PayPal is live."
  });
}
