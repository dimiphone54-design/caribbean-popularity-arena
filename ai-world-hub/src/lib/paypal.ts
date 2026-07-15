const PAYPAL_BASE = process.env.PAYPAL_ENV === "live"
  ? "https://api-m.paypal.com"
  : "https://api-m.sandbox.paypal.com";

function getPayPalConfig() {
  const clientId = process.env.PAYPAL_CLIENT_ID ?? "";
  const secret = process.env.PAYPAL_CLIENT_SECRET ?? "";
  const paypalEnv = process.env.PAYPAL_ENV ?? "sandbox";
  return { clientId, secret, env: paypalEnv };
}

export async function getPayPalAccessToken(): Promise<string> {
  const { clientId, secret } = getPayPalConfig();

  if (!clientId || !secret) {
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
}): Promise<{ id: string }> {
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
        brand_name: "AI WORLD HUB",
        landing_page: "BILLING",
        user_action: "PAY_NOW",
      },
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`PayPal create order error: ${res.status} ${text}`);
  }

  const data = (await res.json()) as { id: string };
  return { id: data.id };
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
    payer?: { payer_id?: string };
    purchase_units?: Array<{
      payments?: {
        captures?: Array<{
          amount?: { value?: string };
        }>;
      };
    }>;
  };

  const amount = data.purchase_units?.[0]?.payments?.captures?.[0]?.amount?.value ?? "0";

  return {
    id: data.id,
    status: data.status,
    payerId: data.payer?.payer_id ?? "",
    amount,
  };
}

export function isPayPalConfigured() {
  return Boolean(process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID && process.env.PAYPAL_CLIENT_SECRET);
}
