"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useMemo, useState } from "react";
import { arenaGiftCopy, formatArenaGiftAmount } from "@/lib/arena-gifts";
import { markArenaMemberAccess } from "@/lib/arena-member-access";
import {
  clearCountryLiveGiftPending,
  parseCountryLiveGiftRoomSlug,
  readCountryLiveGiftPending
} from "@/lib/country-live-gift-checkout";
import { countryRoomLiveAccessUsd, countryRoomLiveSessionHours, unlockCountryRoomAccess } from "@/lib/country-room-access";
import { createDropshipOrderFromCheckout } from "@/lib/dropshipping-orders";

function resolveReturnProduct(customReference: string | null) {
  if (!customReference) return "gift";
  if (customReference.startsWith("member-sign-in")) return "member-sign-in";
  if (customReference.startsWith("elders-room")) return "elders-room";
  if (customReference.startsWith("country-live-gift__")) return "country-live-gift";
  if (customReference.startsWith("dropship-order__")) return "dropship-order";
  return "gift";
}

function WipayReturnContent() {
  const searchParams = useSearchParams();
  const reference = searchParams.get("reference") ?? searchParams.get("transaction_id");
  const customReference =
    searchParams.get("custom_reference") ?? searchParams.get("customReference") ?? searchParams.get("order_id");
  const status = (searchParams.get("status") ?? "success").toLowerCase();

  const product = useMemo(() => resolveReturnProduct(customReference), [customReference]);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    if (status !== "success" || (!reference && !customReference)) return;

    if (product === "member-sign-in") {
      void fetch("/api/members/confirm-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customReference: customReference ?? undefined,
          paymentReference: reference ?? undefined
        })
      }).catch(() => undefined);
      markArenaMemberAccess();
      setMessage("Member gift confirmed · WiPay sandbox · welcome panel unlocked.");
      return;
    }

    if (product === "country-live-gift" && customReference) {
      const roomSlug = parseCountryLiveGiftRoomSlug(customReference);
      const pending = readCountryLiveGiftPending();
      const slug = roomSlug ?? pending?.roomSlug;
      if (slug) {
        unlockCountryRoomAccess(slug);
        clearCountryLiveGiftPending();
        setMessage(
          `${formatArenaGiftAmount(countryRoomLiveAccessUsd)} gift confirmed · WiPay · ${countryRoomLiveSessionHours}h games & talk-show unlocked.`
        );
      }
      return;
    }

    if (product === "dropship-order" && customReference) {
      void fetch("/api/dropshipping/confirm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ customReference, paymentReference: reference ?? undefined })
      })
        .then(async (response) => {
          const payload = (await response.json()) as {
            ok?: boolean;
            order?: {
              id: string;
              customReference: string;
              productId: string;
              productName: string;
              countryId: string;
              countryName: string;
              flag: string;
              amount: number;
              currency: string;
              buyerEmail?: string;
            };
          };
          if (payload.ok && payload.order) {
            createDropshipOrderFromCheckout({
              orderId: payload.order.id,
              customReference: payload.order.customReference,
              productId: payload.order.productId,
              productName: payload.order.productName,
              countryId: payload.order.countryId,
              countryName: payload.order.countryName,
              flag: payload.order.flag,
              amount: payload.order.amount,
              currency: payload.order.currency,
              buyerEmail: payload.order.buyerEmail,
              status: "ordered",
              trackingNote: "WiPay confirmed · supplier packing"
            });
            setMessage(`Dropship order confirmed · ${payload.order.productName} · supplier notified.`);
          }
        })
        .catch(() => {
          setMessage("WiPay payment received · refresh your order tracker in the dropship market.");
        });
    }
  }, [customReference, product, reference, status]);

  const hasReturnParams = Boolean(reference || customReference);

  return (
    <main className="mx-auto flex min-h-[70vh] max-w-xl flex-col justify-center px-6 py-16 text-center">
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#7dd3fc]">WiPay Gift Pipeline</p>
      <h1 className="mt-3 font-['Bebas_Neue',sans-serif] text-4xl tracking-wider text-[#eef6ff]">
        {hasReturnParams && status === "success" ? "Gift received" : "Return to arena"}
      </h1>

      {hasReturnParams && status === "success" ? (
        <div className="mt-6 space-y-3 rounded-2xl border border-[#00c9a7]/30 bg-[#00c9a7]/10 p-5 text-sm leading-6 text-[#d9f7ef]">
          <p>{message ?? arenaGiftCopy.giftReturnPending}</p>
          {reference ? (
            <p>
              WiPay reference: <span className="font-mono text-[#eef6ff]">{reference}</span>
            </p>
          ) : null}
          {customReference ? (
            <p>
              Arena order: <span className="font-mono text-[#eef6ff]">{customReference}</span>
            </p>
          ) : null}
        </div>
      ) : (
        <p className="mt-6 text-sm leading-6 text-[#9aa8c6]">
          {status !== "success"
            ? "WiPay did not confirm success. Return to the arena and try your gift again."
            : "No payment reference was found. If you just completed a gift, wait a moment and refresh — or return to the arena and try again."}
        </p>
      )}

      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/"
          className="rounded-xl bg-gradient-to-r from-[#f5c842] to-[#ff5c2b] px-5 py-3 text-sm font-black text-[#0a0e1f]"
        >
          Back to Arena
        </Link>
        {product === "elders-room" ? (
          <Link
            href="/rooms/the-elders-table"
            className="rounded-xl border border-white/15 px-5 py-3 text-sm font-bold text-[#eef6ff]"
          >
            Elders Room →
          </Link>
        ) : null}
        {product === "country-live-gift" ? (
          <Link
            href="/rooms/international-suite"
            className="rounded-xl border border-white/15 px-5 py-3 text-sm font-bold text-[#eef6ff]"
          >
            International SUITE →
          </Link>
        ) : null}
      </div>
    </main>
  );
}

export default function WipayReturnPage() {
  return (
    <Suspense
      fallback={
        <main className="mx-auto flex min-h-[70vh] max-w-xl items-center justify-center px-6 py-16 text-center text-sm text-[#9aa8c6]">
          Loading WiPay gift confirmation…
        </main>
      }
    >
      <WipayReturnContent />
    </Suspense>
  );
}
