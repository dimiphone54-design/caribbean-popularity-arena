import { createHmac, timingSafeEqual } from "node:crypto";

const MAX_SIGNATURE_AGE_SECONDS = 300;

export type FygaroWebhookPayload = {
  transactionId: string;
  reference: string;
  customReference: string | null;
  authCode: string | null;
  currency: string;
  amount: string;
  createdAt: string;
  gratuity_amount?: string;
  client?: {
    email?: string;
    phone?: string;
    name?: string;
  };
};

type ParsedSignatureHeader = {
  timestamp: string | null;
  hashes: string[];
};

function parseSignatureHeader(header: string): ParsedSignatureHeader {
  const parsed: ParsedSignatureHeader = { timestamp: null, hashes: [] };

  for (const part of header.split(",")) {
    const [key, value] = part.trim().split("=", 2);
    if (!key || !value) continue;

    if (key === "t") parsed.timestamp = value;
    if (key === "v1") parsed.hashes.push(value);
  }

  return parsed;
}

export function verifyFygaroWebhookSignature(options: {
  signatureHeader: string | null;
  keyIdHeader: string | null;
  rawBody: string;
  secretsByKeyId: Record<string, string>;
  maxAgeSeconds?: number;
}) {
  const { signatureHeader, keyIdHeader, rawBody, secretsByKeyId } = options;
  const maxAgeSeconds = options.maxAgeSeconds ?? MAX_SIGNATURE_AGE_SECONDS;

  if (!signatureHeader || !keyIdHeader) {
    return { ok: false as const, reason: "missing_headers" };
  }

  const secret = secretsByKeyId[keyIdHeader];
  if (!secret) {
    return { ok: false as const, reason: "unknown_key_id" };
  }

  const parsed = parseSignatureHeader(signatureHeader);
  if (!parsed.timestamp || parsed.hashes.length === 0) {
    return { ok: false as const, reason: "malformed_signature" };
  }

  const timestamp = Number(parsed.timestamp);
  if (!Number.isFinite(timestamp)) {
    return { ok: false as const, reason: "invalid_timestamp" };
  }

  const ageSeconds = Math.abs(Math.floor(Date.now() / 1000) - timestamp);
  if (ageSeconds > maxAgeSeconds) {
    return { ok: false as const, reason: "stale_timestamp" };
  }

  const message = `${parsed.timestamp}.${rawBody}`;
  const expected = createHmac("sha256", secret).update(message).digest("hex");

  const valid = parsed.hashes.some((hash) => {
    try {
      const left = Buffer.from(hash, "hex");
      const right = Buffer.from(expected, "hex");
      return left.length === right.length && timingSafeEqual(left, right);
    } catch {
      return false;
    }
  });

  if (!valid) {
    return { ok: false as const, reason: "invalid_signature" };
  }

  return { ok: true as const };
}
