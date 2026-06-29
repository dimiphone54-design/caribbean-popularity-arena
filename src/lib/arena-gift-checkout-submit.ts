import type { ArenaGiftCardMeta } from "@/lib/arena-gift-card";

export type ArenaGiftCheckoutResponse = {
  ok?: boolean;
  error?: string;
  mode?: string;
  checkoutUrl?: string;
  message?: string;
};

export type SubmitArenaGiftCheckoutOptions = {
  endpoint: string;
  payload: Record<string, unknown>;
  cardMeta: ArenaGiftCardMeta;
};

/** Shared gift checkout · card meta only · PAN/CVV never leave the browser */
export async function submitArenaGiftCheckout({
  endpoint,
  payload,
  cardMeta
}: SubmitArenaGiftCheckoutOptions): Promise<ArenaGiftCheckoutResponse> {
  const response = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...payload,
      cardMeta
    })
  });

  const result = (await response.json()) as ArenaGiftCheckoutResponse & Record<string, unknown>;

  if (!response.ok) {
    throw new Error(result.error ?? "Checkout could not start.");
  }

  return result;
}

export function redirectArenaGiftCheckout(result: ArenaGiftCheckoutResponse) {
  if ((result.mode === "fygaro" || result.mode === "wipay") && result.checkoutUrl) {
    window.location.href = result.checkoutUrl;
    return true;
  }

  return false;
}
