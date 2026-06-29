import { wipayTrinidad } from "@/config/wipay";
import { env } from "@/lib/env";

export type BuildWipayCheckoutUrlOptions = {
  amount: number;
  currency?: string;
  customReference: string;
  label: string;
};

function wipayResponseUrl() {
  const configured = process.env.WIPAY_RESPONSE_URL?.trim();
  if (configured && !configured.toLowerCase().includes("placeholder")) {
    return configured.replace(/\/api\/payments\/wipay\/return$/, "/payments/wipay/return");
  }

  return `${env.app.url.replace(/\/$/, "")}/payments/wipay/return`;
}

/** Sandbox / fake keys · internal return unlocks gift in preview */
export function buildWipayCheckoutUrl(options: BuildWipayCheckoutUrlOptions) {
  const environment = (process.env.WIPAY_ENVIRONMENT ?? wipayTrinidad.sandbox.environment).trim();
  const currency = (options.currency ?? process.env.WIPAY_CURRENCY ?? wipayTrinidad.defaultCurrency).toUpperCase();
  const responseUrl = wipayResponseUrl();

  if (environment === "sandbox" || env.app.environment === "development") {
    const params = new URLSearchParams({
      status: "success",
      custom_reference: options.customReference,
      reference: `WP-SBX-${Date.now()}`,
      amount: String(options.amount),
      currency,
      processor: "wipay"
    });

    return `${responseUrl}?${params}`;
  }

  const endpoint = env.payments.wipayCheckoutUrl || wipayTrinidad.paymentRequestUrl;
  const params = new URLSearchParams({
    account_number: env.payments.wipayAccountId,
    api_key: env.payments.wipayApiKey,
    environment: "live",
    fee_structure: process.env.WIPAY_FEE_STRUCTURE ?? "customer_pay",
    currency,
    amount: String(options.amount),
    order_id: options.customReference,
    response_url: responseUrl,
    data: options.label
  });

  return `${endpoint}?${params}`;
}
