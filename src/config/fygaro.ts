/**
 * Fygaro Links (Payment Buttons) — Trinidad & Tobago settlement.
 *
 * Dashboard: https://www.fygaro.com/
 * Links API: https://help.fygaro.com/en-us/article/fygaro-links-integration-api-h78p9y/
 * Webhook:   https://help.fygaro.com/en-us/article/payment-button-hook-1wkui1k/
 *
 * Link your Scotiabank T&T personal account in Fygaro → Settings → Bank / Payout.
 */
export const fygaro = {
  portalUrl: "https://www.fygaro.com",
  settingsApiUrl: "https://www.fygaro.com/settings/api-credentials",
  returnPath: "/payments/fygaro/return",
  webhookPath: "/api/payments/fygaro/webhook",
  defaultCurrency: "USD",
  jwtTtlSeconds: 30 * 60
} as const;

export const fygaroSetupChecklist = [
  "Create a Fygaro merchant account at fygaro.com (your name — personal account is fine in many countries).",
  "Settings → Bank: link Scotiabank Trinidad (or your local bank) — this is the direct cash pipeline.",
  "Settings → API Credentials → Generate New (save API Key + Secret securely).",
  "Fygaro Links → Create → Variable Amount button (USD or TTD — match FYGARO_DEFAULT_CURRENCY).",
  "Copy the payment button URL into FYGARO_PAYMENT_BUTTON_URL in .env.local.",
  "Advanced Options → Return URL: your live domain + /payments/fygaro/return",
  "Advanced Options → Hook URL: your live domain + /api/payments/fygaro/webhook",
  "Set NEXT_PUBLIC_PAYMENT_PROVIDER=fygaro and fill FYGARO_* env vars — gifts redirect live.",
  "Run a $1 test gift; confirm Scotiabank deposit timing with Fygaro.",
  "Optional by country: sole trader / business registration + legal-entity.ts — separate from the payout pipe."
] as const;
