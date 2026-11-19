import "server-only";

const POLAR_ACCESS_TOKEN = process.env.POLAR_ACCESS_TOKEN;
const POLAR_SERVER = process.env.POLAR_SERVER ?? "sandbox";

const POLAR_API_BASE =
  POLAR_SERVER === "production"
    ? "https" + ":" + "/" + "/" + "api.polar.sh"
    : "https" + ":" + "/" + "/" + "sandbox-api.polar.sh";

export function isPolarConfigured(): boolean {
  return Boolean(POLAR_ACCESS_TOKEN);
}

export function getPolarPublicStatus() {
  return {
    configured: isPolarConfigured(),
    secretStored: isPolarConfigured(),
    mode: POLAR_SERVER === "production" ? "production" : "sandbox",
  } as const;
}

export async function createPolarCheckoutSession(input: {
  productId: string;
  externalCustomerId?: string;
  customerEmail?: string;
  externalOrderId: string;
  successUrl: string;
  metadata?: Record<string, string>;
}) {
  if (!POLAR_ACCESS_TOKEN) {
    throw new Error("Polar is not configured.");
  }

  const response = await fetch(`${POLAR_API_BASE}/v1/checkouts/`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${POLAR_ACCESS_TOKEN}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      products: [input.productId],
      external_customer_id: input.externalCustomerId,
      customer_email: input.customerEmail,
      success_url: input.successUrl,
      metadata: {
        ...input.metadata,
        local_order_id: input.externalOrderId,
      },
    }),
    cache: "no-store",
  });

  const data = (await response.json().catch(() => null)) as
    | {
        id?: string;
        url?: string;
        detail?: string;
        error?: string;
      }
    | null;

  if (!response.ok || !data?.id || !data.url) {
    throw new Error(
      data?.detail ??
        data?.error ??
        `Polar checkout request failed (${response.status}).`,
    );
  }

  return {
    id: data.id,
    url: data.url,
  };
}
