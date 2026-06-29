/** Arena gift checkout · card field helpers · never send PAN/CVV to the server */

export type ArenaGiftCardInput = {
  cardNumber: string;
  expiry: string;
  cvv: string;
  cardholderName: string;
};

export type ArenaGiftCardMeta = {
  last4: string;
  brand: string;
  expiryMonth: string;
  expiryYear: string;
  cardholderName: string;
};

export type ArenaGiftCardValidation = {
  valid: boolean;
  errors: Partial<Record<keyof ArenaGiftCardInput, string>>;
};

const emptyCard: ArenaGiftCardInput = {
  cardNumber: "",
  expiry: "",
  cvv: "",
  cardholderName: ""
};

export function emptyArenaGiftCardInput(): ArenaGiftCardInput {
  return { ...emptyCard };
}

export function digitsOnly(value: string) {
  return value.replace(/\D/g, "");
}

export function formatCardNumberInput(value: string) {
  const digits = digitsOnly(value).slice(0, 19);
  return digits.replace(/(\d{4})(?=\d)/g, "$1 ").trim();
}

export function formatExpiryInput(value: string) {
  const digits = digitsOnly(value).slice(0, 4);
  if (digits.length <= 2) return digits;
  return `${digits.slice(0, 2)}/${digits.slice(2)}`;
}

export function detectCardBrand(cardNumber: string) {
  const digits = digitsOnly(cardNumber);
  if (/^4/.test(digits)) return "Visa";
  if (/^5[1-5]/.test(digits) || /^2(2[2-9]|[3-6]|7[01])/.test(digits)) return "Mastercard";
  if (/^3[47]/.test(digits)) return "Amex";
  if (/^6(?:011|5)/.test(digits)) return "Discover";
  return "Card";
}

export function buildArenaGiftCardMeta(card: ArenaGiftCardInput): ArenaGiftCardMeta | null {
  const validation = validateArenaGiftCard(card);
  if (!validation.valid) return null;

  const digits = digitsOnly(card.cardNumber);
  const [month = "", year = ""] = card.expiry.split("/");

  return {
    last4: digits.slice(-4),
    brand: detectCardBrand(digits),
    expiryMonth: month,
    expiryYear: year.length === 2 ? `20${year}` : year,
    cardholderName: card.cardholderName.trim()
  };
}

export function validateArenaGiftCard(card: ArenaGiftCardInput): ArenaGiftCardValidation {
  const errors: ArenaGiftCardValidation["errors"] = {};
  const digits = digitsOnly(card.cardNumber);
  const brand = detectCardBrand(digits);
  const cvvDigits = digitsOnly(card.cvv);

  if (digits.length < 13 || digits.length > 19) {
    errors.cardNumber = "Enter a valid card number";
  }

  const [monthRaw = "", yearRaw = ""] = card.expiry.split("/");
  const month = Number.parseInt(monthRaw, 10);
  const year = yearRaw.length === 2 ? 2000 + Number.parseInt(yearRaw, 10) : Number.parseInt(yearRaw, 10);

  if (!monthRaw || !yearRaw || month < 1 || month > 12 || !Number.isFinite(year)) {
    errors.expiry = "Use MM/YY";
  } else {
    const now = new Date();
    const expiry = new Date(year, month, 0, 23, 59, 59);
    if (expiry < now) errors.expiry = "Card expired";
  }

  const cvvLength = brand === "Amex" ? 4 : 3;
  if (cvvDigits.length !== cvvLength) {
    errors.cvv = brand === "Amex" ? "4-digit CVV" : "3-digit CVV";
  }

  if (card.cardholderName.trim().length < 2) {
    errors.cardholderName = "Name on card required";
  }

  return { valid: Object.keys(errors).length === 0, errors };
}

export function getArenaGiftCardLabels(countryId?: string) {
  if (countryId === "ecuador") {
    return {
      kicker: "Tarjeta de crédito o débito",
      cardNumber: "Número de tarjeta",
      expiry: "Vencimiento MM/AA",
      cvv: "CVV",
      cardholderName: "Nombre en la tarjeta",
      secureNote: "Procesado de forma segura vía WiPay · sandbox",
      cardNumberPlaceholder: "1234 5678 9012 3456",
      expiryPlaceholder: "MM/AA",
      cvvPlaceholder: "123",
      namePlaceholder: "Como aparece en la tarjeta"
    };
  }

  return {
    kicker: "Credit or debit card",
    cardNumber: "Card number",
    expiry: "Expiry MM/YY",
    cvv: "CVV",
    cardholderName: "Name on card",
    secureNote: "Secure processing via WiPay · sandbox",
    cardNumberPlaceholder: "1234 5678 9012 3456",
    expiryPlaceholder: "MM/YY",
    cvvPlaceholder: "123",
    namePlaceholder: "As shown on card"
  };
}
