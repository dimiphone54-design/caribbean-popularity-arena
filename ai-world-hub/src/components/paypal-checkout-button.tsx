"use client";

import { useState } from "react";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";

type PayPalCheckoutButtonProps = {
  plan: string;
  amountUsd: string;
  label?: string;
};

export function PayPalCheckoutButton({
  plan,
  amountUsd,
  label = "Pay with PayPal",
}: PayPalCheckoutButtonProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID ?? "";

  if (!clientId) {
    return (
      <div>
        <button
          disabled
          className="inline-flex w-full items-center justify-center rounded-full border border-white/15 bg-white/6 px-5 py-3 text-sm font-bold text-white/70"
        >
          PayPal not configured
        </button>
        <p className="mt-2 text-center text-xs text-white/55">
          Add NEXT_PUBLIC_PAYPAL_CLIENT_ID, PAYPAL_CLIENT_ID, PAYPAL_CLIENT_SECRET, and PAYPAL_ENV to enable checkout.
        </p>
      </div>
    );
  }

  return (
    <div className="paypal-checkout-button">
      <p className="mb-2 text-center text-xs text-white/70">Platform merchant checkout · AI WORLD HUB PayPal</p>
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
            height: 46,
          }}
          createOrder={async () => {
            setLoading(true);
            setError(null);
            setSuccess(null);

            const res = await fetch("/api/payments/paypal/create-order", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ plan, amountUsd }),
            });

            const data = await res.json();
            setLoading(false);

            if (!data.ok) {
              setError(data.error ?? "Failed to create order");
              throw new Error(data.error ?? "Failed to create order");
            }

            return data.orderId;
          }}
          onApprove={async (data) => {
            setLoading(true);
            setError(null);
            setSuccess(null);

            const res = await fetch("/api/payments/paypal/capture-order", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ orderId: data.orderID }),
            });

            const result = await res.json();
            setLoading(false);

            if (result.ok) {
              setSuccess(`Payment captured · $${result.amount}`);
            } else {
              setError(result.error ?? "Payment capture failed");
            }
          }}
          onCancel={() => {
            setLoading(false);
          }}
          onError={() => {
            setLoading(false);
            setError("Payment failed. Please try again.");
          }}
        />
      </PayPalScriptProvider>

      {loading ? <p className="mt-2 text-center text-xs text-white/70">Processing...</p> : null}
      {error ? <p className="mt-2 text-center text-xs text-red-400">{error}</p> : null}
      {success ? <p className="mt-2 text-center text-xs text-emerald-400">{success}</p> : null}
      <p className="mt-2 text-center text-[11px] text-white/55">Use sandbox or live credentials through environment variables only.</p>
      <p className="mt-2 text-center text-sm font-semibold text-white">{label}</p>
    </div>
  );
}
