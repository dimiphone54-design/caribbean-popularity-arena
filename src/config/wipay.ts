/**
 * WiPay Trinidad & Tobago — merchant and API configuration.
 *
 * Profile / bank setup (after sole trader registration):
 * https://tt.wipayfinancial.com/Profile#bank
 *
 * Developer / Payment API keys (after account verification):
 * https://tt.wipayfinancial.com/ (Developer or Payment API section)
 *
 * Live payment endpoint (Trinidad):
 * https://tt.wipayfinancial.com/plugins/payments/request
 */
export const wipayTrinidad = {
  portalUrl: "https://tt.wipayfinancial.com",
  profileBankUrl: "https://tt.wipayfinancial.com/Profile#bank",
  paymentRequestUrl: "https://tt.wipayfinancial.com/plugins/payments/request",
  responseUrlPath: "/api/payments/wipay/return",
  webhookPath: "/api/payments/wipay/webhook",
  countryCode: "TT",
  defaultCurrency: "TTD",
  sandbox: {
    accountNumber: "1234567890",
    apiKey: "123",
    environment: "sandbox" as const
  }
} as const;

export const wipaySetupChecklist = [
  "Register Trinidad sole trader / business name (next week).",
  "Open or verify WiPay Business account at tt.wipayfinancial.com.",
  "Complete Profile → Bank and link your Trinidad settlement bank account.",
  "Complete WiPay KYC / business verification if requested.",
  "Copy LIVE account number + Payment API key from WiPay Developer area.",
  "Add keys to .env.local (WIPAY_* variables) — keep secrets server-side only.",
  "Set response_url to your live domain + /api/payments/wipay/return.",
  "Enable webhook/IPN verification with WIPAY_API_KEY (MD5 hash check).",
  "Test in sandbox first (account 1234567890, API key 123), then switch to live."
] as const;
