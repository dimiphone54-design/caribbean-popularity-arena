import { createHmac } from "node:crypto";

function base64UrlEncode(value: string | Buffer) {
  return Buffer.from(value)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");
}

export type FygaroJwtPayload = {
  amount: string;
  currency: string;
  custom_reference: string;
  exp: number;
  nbf?: number;
};

export function formatFygaroAmount(amount: number) {
  if (!Number.isFinite(amount) || amount <= 0) {
    throw new Error("Fygaro amount must be a positive number");
  }

  return amount.toFixed(2);
}

export function signFygaroJwt(payload: FygaroJwtPayload, apiKey: string, apiSecret: string) {
  const header = {
    alg: "HS256",
    typ: "JWT",
    kid: apiKey
  };

  const encodedHeader = base64UrlEncode(JSON.stringify(header));
  const encodedPayload = base64UrlEncode(JSON.stringify(payload));
  const signingInput = `${encodedHeader}.${encodedPayload}`;
  const signature = createHmac("sha256", apiSecret).update(signingInput).digest("base64url");

  return `${signingInput}.${signature}`;
}

export function buildFygaroCheckoutUrl(
  buttonUrl: string,
  options: {
    amount: number;
    currency: string;
    customReference: string;
    apiKey: string;
    apiSecret: string;
    ttlSeconds?: number;
  }
) {
  const now = Math.floor(Date.now() / 1000);
  const ttlSeconds = options.ttlSeconds ?? 30 * 60;

  const payload: FygaroJwtPayload = {
    amount: formatFygaroAmount(options.amount),
    currency: options.currency.toUpperCase(),
    custom_reference: options.customReference,
    exp: now + ttlSeconds,
    nbf: now - 5
  };

  const jwt = signFygaroJwt(payload, options.apiKey, options.apiSecret);
  const separator = buttonUrl.includes("?") ? "&" : "?";

  return `${buttonUrl}${separator}jwt=${encodeURIComponent(jwt)}`;
}
