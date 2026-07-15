import { env } from "@/lib/env";

const PAYPAL_BASE = "https://api-m.sandbox.paypal.com";

function getPayPalConfig() {
  const clientId = process.env.PAYPAL_CLIENT_ID ?? "";
  const secret = process.env.PAYPAL_CLIENT_SECRET ?? "";
  const paypalEnv = process.env.PAYPAL_ENV ?? "sandbox";
  return { clientId, secret, env: paypalEnv };
}

export async function getPayPalAccessToken(): Promise<string> {
  const { clientId, secret } = getPayPalConfig();
  if (!clientId || !secret || secret === "PASTE_YOUR_NEW_SECRET_HERE") {
    throw new Error("PayPal credentials not configured");
  }

  const auth = Buffer.from(`${clientId}:${secret}`).toString("base64");
  const res = await fetch(`${PAYPAL_BASE}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
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

  const res = await fetch(`${PAYPAL_BASE}/v2/checkout/orders`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      intent: "CAPTURE",
      purchase_units: [
        {
          description: input.description,
          custom_id: input.customId,
          amount: {
            currency_code: "USD",
            value: input.amountUsd,
          },
        },
      ],
      application_context: {
        brand_name: "Caribbean Freedom Arena",
        landing_page: "BILLING",
        user_action: "PAY_NOW",
        return_url: `${process.env.NEXT_PUBLIC_SITE_URL ?? env.app.url}/payments/paypal/return`,
        cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL ?? env.app.url}/payments/paypal/cancel`,
      },
    }),
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
}> {
  const token = await getPayPalAccessToken();

  const res = await fetch(`${PAYPAL_BASE}/v2/checkout/orders/${orderId}/capture`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`PayPal capture error: ${res.status} ${text}`);
  }

  const data = (await res.json()) as {
    id: string;
    status: string;
    purchase_units: Array<{
      payments: {
        captures: Array<{
          id: string;
          amount: { value: string };
          payer_id: string;
        }>;
      };
    }>;
  };

  const capture = data.purchase_units[0]?.payments.captures[0];
  return {
    id: data.id,
    status: data.status,
    payerId: capture?.payer_id ?? "",
    amount: capture?.amount?.value ?? "0",
  };
}

export function isPayPalConfigured(): boolean {
  const { clientId, secret } = getPayPalConfig();
  return Boolean(clientId && secret && secret !== "PASTE_YOUR_NEW_SECRET_HERE");
}
