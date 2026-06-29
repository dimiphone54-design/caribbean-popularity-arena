import { NextResponse } from "next/server";
import { env } from "@/lib/env";
import { verifyFygaroWebhookSignature, type FygaroWebhookPayload } from "@/lib/fygaro-webhook";

export async function POST(request: Request) {
  const rawBody = await request.text();
  const signatureHeader = request.headers.get("Fygaro-Signature");
  const keyIdHeader = request.headers.get("Fygaro-Key-ID");

  const secretsByKeyId: Record<string, string> = {};
  if (env.payments.fygaroHookKeyId && env.payments.fygaroHookSecret) {
    secretsByKeyId[env.payments.fygaroHookKeyId] = env.payments.fygaroHookSecret;
  }

  if (Object.keys(secretsByKeyId).length === 0) {
    console.warn("[fygaro/webhook] FYGARO_HOOK_KEY_ID or FYGARO_HOOK_SECRET not configured");
    return NextResponse.json({ ok: false, error: "Webhook not configured" }, { status: 503 });
  }

  const verification = verifyFygaroWebhookSignature({
    signatureHeader,
    keyIdHeader,
    rawBody,
    secretsByKeyId
  });

  if (!verification.ok) {
    console.warn("[fygaro/webhook] signature rejected:", verification.reason);
    return NextResponse.json({ ok: false, error: "Invalid signature" }, { status: 400 });
  }

  let payload: FygaroWebhookPayload;
  try {
    payload = JSON.parse(rawBody) as FygaroWebhookPayload;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  console.info("[fygaro/webhook] payment confirmed", {
    transactionId: payload.transactionId,
    reference: payload.reference,
    customReference: payload.customReference,
    amount: payload.amount,
    currency: payload.currency
  });

  // Persist to Firestore / your ledger when production DB is wired.
  return NextResponse.json({ ok: true });
}
