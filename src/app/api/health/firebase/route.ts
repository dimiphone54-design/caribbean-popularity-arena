import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase-admin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await adminDb.collection("_health").doc("firebase-admin").get();

    return NextResponse.json({
      ok: true,
      firebaseAdmin: "connected",
    });
  } catch {
    return NextResponse.json(
      {
        ok: false,
        firebaseAdmin: "unavailable",
      },
      { status: 503 }
    );
  }
}
