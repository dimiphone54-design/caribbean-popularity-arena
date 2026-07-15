"use client";

import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useState } from "react";
import { PLATFORM_COMMERCE_COPY } from "@/lib/platform-commerce";

type PayPalCheckoutButtonProps = {
  plan: string;
  amountUsd: string;
  label?: string;
  memberId?: string;
  onSuccess?: (details: { orderId: string; payerId: string; amount: string }) => void;
};

export function PayPalCheckoutButton({
  plan,
  amountUsd,
  label = "Pay with PayPal",
  memberId,
  onSuccess,
}: PayPalCheckoutButtonProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID ?? "";

  if (!clientId) {
    return (
      <div>
        <button
          disabled
          className="inline-flex w-full items-center justify-center rounded-full border border-[var(--luxury-mist)]/20 bg-black/25 px-5 py-3 text-sm font-bold text-[var(--luxury-mist)]"
        >
          PayPal not configured
        </button>
        <p className="mt-2 text-center text-xs text-[var(--luxury-mist)]/80">{PLATFORM_COMMERCE_COPY.checkoutNotice}</p>
      </div>
    );
  }

  return (
    <div className="paypal-checkout-button">
      <p className="mb-2 text-center text-xs text-[var(--luxury-mist)]/80">{PLATFORM_COMMERCE_COPY.platformMerchantLabel}</p>
      <PayPalScriptProvider
        options={{
          clientId,
          currency: "USD",
          intent: "capture",
        }}
      >
        <PayPalButtons
          style={{
            layout: "vertical",
            color: "gold",
            shape: "pill",
            label: "pay",
            height: 48,
          }}
          createOrder={async () => {
            setLoading(true);
            setError(null);

            const res = await fetch("/api/payments/paypal/create-order", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ plan, amountUsd, memberId }),
            });

            const data = await res.json();
            if (!data.ok) {
              setError(data.error ?? "Failed to create order");
              setLoading(false);
              throw new Error(data.error);
            }

            setLoading(false);
            return data.orderId;
          }}
          onApprove={async (data) => {
            setLoading(true);
            setError(null);

            const res = await fetch("/api/payments/paypal/capture-order", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ orderId: data.orderID }),
            });

            const result = await res.json();
            setLoading(false);

            if (result.ok) {
              onSuccess?.({
                orderId: result.orderId,
                payerId: result.payerId,
                amount: result.amount,
              });
            } else {
              setError(result.error ?? "Payment capture failed");
            }
          }}
          onError={(err) => {
            setLoading(false);
            setError("Payment failed. Please try again.");
          }}
          onCancel={() => {
            setLoading(false);
          }}
        />
      </PayPalScriptProvider>

      {loading && (
        <p className="mt-2 text-center text-xs text-[var(--luxury-mist)]">
          Processing...
        </p>
      )}
      {error && (
        <p className="mt-2 text-center text-xs text-red-400">
          {error}
        </p>
      )}
      <p className="mt-2 text-center text-[11px] text-[var(--luxury-mist)]/70">{PLATFORM_COMMERCE_COPY.payoutNotice}</p>
    </div>
  );
}
