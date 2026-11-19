import { NextResponse } from "next/server";
import {
  getVaultSummary,
  listVaultEntries
} from "@/lib/platform-vault";
import { hasArenaOwnerSession } from "@/lib/auth/arena-owner-session";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** GET · owner-only vault summary and entries */
export async function GET(request: Request) {
  if (!hasArenaOwnerSession(request)) {
    return NextResponse.json(
      { ok: false, error: "Owner authentication required" },
      { status: 401, headers: { "Cache-Control": "no-store" } }
    );
  }

  try {
    const { searchParams } = new URL(request.url);
    const limit = Math.min(
      200,
      Math.max(1, Number(searchParams.get("limit") ?? "50") || 50)
    );

    const [summary, entries] = await Promise.all([
      getVaultSummary(),
      listVaultEntries(limit)
    ]);

    return NextResponse.json(
      { ok: true, summary, entries },
      { headers: { "Cache-Control": "no-store" } }
    );
  } catch {
    return NextResponse.json(
      { ok: false, error: "Failed to load platform vault" },
      { status: 500, headers: { "Cache-Control": "no-store" } }
    );
  }
}

/**
 * POST · deliberately frozen.
 * Do not enable until amounts and revenue splits are derived from trusted
 * server-side product/pricing data rather than browser-supplied values.
 */
export async function POST() {
  return NextResponse.json(
    {
      ok: false,
      error: "Platform vault writes are disabled until server-side pricing validation is implemented.",
      frozen: true
    },
    { status: 503, headers: { "Cache-Control": "no-store" } }
  );
}
