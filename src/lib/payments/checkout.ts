import { fygaro } from "@/config/fygaro";
import { arenaGiftCopy } from "@/lib/arena-gifts";
import { buildFygaroCheckoutUrl } from "@/lib/fygaro-jwt";
import { buildWipayCheckoutUrl } from "@/lib/wipay-checkout";
import { env, serviceReadiness } from "@/lib/env";

export type PaymentCheckoutMode = "fygaro" | "wipay" | "demo";

export type PaymentCheckoutResult = {
  ok: true;
  mode: PaymentCheckoutMode;
  orderId: string;
  amount: number;
  currency: string;
  label: string;
  customReference: string;
  checkoutUrl?: string;
  message: string;
};

export type BuildCheckoutOptions = {
  product: string;
  amount: number;
  currency?: string;
  label: string;
  metadata?: Record<string, string | number | boolean | null | undefined>;
  customReference?: string;
};

function buildCustomReference(product: string, metadata?: BuildCheckoutOptions["metadata"]) {
  if (product === "member-sign-in" && metadata?.displayName) {
    const slug = String(metadata.displayName)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
    return `${product}-${slug || "member"}-${Date.now()}`;
  }

  const suffix = metadata?.clipId ? String(metadata.clipId) : Date.now();
  return `${product}-${suffix}`;
}

function buildOrderId(product: string, customReference: string) {
  return `${product}-${customReference}`;
}

export function resolvePaymentProvider(): PaymentCheckoutMode | "stripe" {
  const provider = env.payments.provider.trim().toLowerCase();

  if (provider === "fygaro" && serviceReadiness.fygaro) return "fygaro";
  if (provider === "wipay" && serviceReadiness.wipay) return "wipay";
  if (serviceReadiness.fygaro) return "fygaro";
  if (serviceReadiness.wipay) return "wipay";

  return "demo";
}

export function buildPaymentCheckout(options: BuildCheckoutOptions): PaymentCheckoutResult {
  const currency = (options.currency ?? env.payments.fygaroDefaultCurrency ?? fygaro.defaultCurrency).toUpperCase();
  const customReference = options.customReference ?? buildCustomReference(options.product, options.metadata);
  const orderId = buildOrderId(options.product, customReference);
  const provider = resolvePaymentProvider();

  if (provider === "fygaro") {
    const checkoutUrl = buildFygaroCheckoutUrl(env.payments.fygaroPaymentButtonUrl, {
      amount: options.amount,
      currency,
      customReference,
      apiKey: env.payments.fygaroApiKey,
      apiSecret: env.payments.fygaroApiSecret,
      ttlSeconds: env.payments.fygaroJwtTtlSeconds
    });

    return {
      ok: true,
      mode: "fygaro",
      orderId,
      amount: options.amount,
      currency,
      label: options.label,
      customReference,
      checkoutUrl,
      message: arenaGiftCopy.redirectingGift(options.amount, "Fygaro")
    };
  }

  if (provider === "wipay") {
    const checkoutUrl = buildWipayCheckoutUrl({
      amount: options.amount,
      currency,
      customReference,
      label: options.label
    });

    return {
      ok: true,
      mode: "wipay",
      orderId,
      amount: options.amount,
      currency,
      label: options.label,
      customReference,
      checkoutUrl,
      message: arenaGiftCopy.redirectingGift(options.amount, "WiPay")
    };
  }

  return {
    ok: true,
    mode: "demo",
    orderId,
    amount: options.amount,
    currency,
    label: options.label,
    customReference,
    message: arenaGiftCopy.demoGiftReady(options.amount, "Fygaro")
  };
}

export function fygaroReturnUrl() {
  return `${env.app.url.replace(/\/$/, "")}${fygaro.returnPath}`;
}

export function fygaroWebhookUrl() {
  return `${env.app.url.replace(/\/$/, "")}${fygaro.webhookPath}`;
}
