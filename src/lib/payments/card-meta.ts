export type PaymentCardMeta = {
  last4: string;
  brand: string;
  expiryMonth: string;
  expiryYear: string;
  cardholderName: string;
};

export function parsePaymentCardMeta(body: unknown): PaymentCardMeta | null {
  if (!body || typeof body !== "object" || !("cardMeta" in body)) return null;

  const cardMeta = (body as { cardMeta?: unknown }).cardMeta;
  if (!cardMeta || typeof cardMeta !== "object") return null;

  const record = cardMeta as Record<string, unknown>;
  const last4 = String(record.last4 ?? "").replace(/\D/g, "").slice(-4);
  const brand = String(record.brand ?? "").trim();
  const expiryMonth = String(record.expiryMonth ?? "").replace(/\D/g, "").slice(0, 2);
  const expiryYear = String(record.expiryYear ?? "").replace(/\D/g, "").slice(0, 4);
  const cardholderName = String(record.cardholderName ?? "").trim();

  if (last4.length !== 4 || expiryMonth.length !== 2 || expiryYear.length !== 4 || cardholderName.length < 2) {
    return null;
  }

  return { last4, brand, expiryMonth, expiryYear, cardholderName };
}

export function cardMetaToRecord(meta: PaymentCardMeta) {
  return {
    cardLast4: meta.last4,
    cardBrand: meta.brand,
    cardExpiry: `${meta.expiryMonth}/${meta.expiryYear.slice(-2)}`,
    cardholderName: meta.cardholderName
  };
}
