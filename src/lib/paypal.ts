import { env } from "@/lib/env";
import { PLATFORM_PAYPAL_MERCHANT } from "@/lib/platform-paypal";

function getPayPalConfig() {
  const clientId = process.env.PAYPAL_CLIENT_ID ?? process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID ?? "";
  const secret = process.env.PAYPAL_CLIENT_SECRET ?? "";
  const paypalEnv = (process.env.PAYPAL_ENV ?? "sandbox").toLowerCase();
  const base =
    paypalEnv === "live" || paypalEnv === "production"
      ? "https://api-m.paypal.com"
      : "https://api-m.sandbox.paypal.com";
  return { clientId, secret, env: paypalEnv, base };
}

export async function getPayPalAccessToken(): Promise<string> {
  const { clientId, secret, base } = getPayPalConfig();
  if (!clientId || !secret || secret === "PASTE_YOUR_NEW_SECRET_HERE") {
    throw new Error("PayPal credentials not configured");
  }

  const auth = Buffer.from(`${clientId}:${secret}`).toString("base64");
  const res = await fetch(`${base}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: "grant_type=client_credentials"
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`PayPal token error: ${res.status} ${text}`);
  }

  const data = (await res.json()) as { access_token: string };
  return data.access_token;
}

export async function createPayPalOrder(input: {
  amountUsd: string;
  description: string;
  customId?: string;
}): Promise<{ id: string; approveUrl: string }> {
  const token = await getPayPalAccessToken();
  const { base } = getPayPalConfig();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? process.env.NEXT_PUBLIC_APP_URL ?? env.app.url;

  const amount = Number(input.amountUsd).toFixed(2);

  const res = await fetch(`${base}/v2/checkout/orders`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      intent: "CAPTURE",
      purchase_units: [
        {
          description: input.description.slice(0, 127),
          custom_id: (input.customId ?? "cfa:general").slice(0, 127),
          amount: {
            currency_code: PLATFORM_PAYPAL_MERCHANT.currency,
            value: amount
          }
        }
      ],
      application_context: {
        brand_name: PLATFORM_PAYPAL_MERCHANT.brandName,
        landing_page: "BILLING",
        user_action: "PAY_NOW",
        return_url: `${siteUrl}/payments/paypal/return`,
        cancel_url: `${siteUrl}/payments/paypal/cancel`
      }
    })
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`PayPal create order error: ${res.status} ${text}`);
  }

  const data = (await res.json()) as {
    id: string;
    links: Array<{ rel: string; href: string }>;
  };

  const approveUrl = data.links.find((l) => l.rel === "approve")?.href ?? "";
  return { id: data.id, approveUrl };
}

export async function capturePayPalOrder(orderId: string): Promise<{
  id: string;
  status: string;
  payerId: string;
  amount: string;
  customId: string;
}> {
  const token = await getPayPalAccessToken();
  const { base } = getPayPalConfig();

  const res = await fetch(`${base}/v2/checkout/orders/${orderId}/capture`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    }
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`PayPal capture error: ${res.status} ${text}`);
  }

  const data = (await res.json()) as {
    id: string;
    status: string;
    payer?: { payer_id?: string };
    purchase_units: Array<{
      custom_id?: string;
      payments: {
        captures: Array<{
          id: string;
          amount: { value: string };
        }>;
      };
    }>;
  };

  const unit = data.purchase_units[0];
  const capture = unit?.payments.captures[0];
  return {
    id: data.id,
    status: data.status,
    payerId: data.payer?.payer_id ?? "",
    amount: capture?.amount?.value ?? "0",
    customId: unit?.custom_id ?? ""
  };
}

export function isPayPalConfigured(): boolean {
  const { clientId, secret } = getPayPalConfig();
  return Boolean(clientId && secret && secret !== "PASTE_YOUR_NEW_SECRET_HERE");
}

export function getPayPalPublicStatus() {
  const { clientId, env: paypalEnv } = getPayPalConfig();
  /** First 8 chars only — never expose full client id or secret */
  const clientIdPrefix = clientId ? `${clientId.slice(0, 8)}…` : "";
  return {
    configured: isPayPalConfigured(),
    publicClientIdSet: Boolean(process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || clientId),
    clientIdPrefix,
    secretStored: Boolean(
      process.env.PAYPAL_CLIENT_SECRET &&
        process.env.PAYPAL_CLIENT_SECRET !== "PASTE_YOUR_NEW_SECRET_HERE"
    ),
    mode: paypalEnv === "live" || paypalEnv === "production" ? "live" : "sandbox",
    merchant: PLATFORM_PAYPAL_MERCHANT.brandName,
    currency: PLATFORM_PAYPAL_MERCHANT.currency
  };
}
