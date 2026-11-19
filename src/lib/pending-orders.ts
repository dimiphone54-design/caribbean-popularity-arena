import "server-only";

import { randomUUID } from "node:crypto";
import { FieldValue } from "firebase-admin/firestore";
import { adminDb } from "./firebase-admin";

export type PendingOrderInput = {
  memberId: string;
  productId: string;
  amount: number;
  currency: string;
  kind: "membership" | "dropship" | "vault";
  sku?: string;
};

export async function createPendingOrder(input: PendingOrderInput) {
  const memberId = input.memberId.trim();
  const productId = input.productId.trim();
  const currency = input.currency.trim().toUpperCase();

  if (!memberId || !productId) {
    throw new Error("memberId and productId are required");
  }

  if (!Number.isSafeInteger(input.amount) || input.amount <= 0) {
    throw new Error("amount must be a positive integer in minor units");
  }

  if (!/^[A-Z]{3}$/.test(currency)) {
    throw new Error("currency must be a three-letter uppercase code");
  }

  if (!["membership", "dropship", "vault"].includes(input.kind)) {
    throw new Error("Unsupported payment order kind");
  }

  const internalOrderId = randomUUID();
  const ref = adminDb.collection("paymentOrders").doc(internalOrderId);

  await ref.create({
    internalOrderId,
    provider: "polar",
    memberId,
    productId,
    amount: input.amount,
    currency,
    kind: input.kind,
    ...(input.sku ? { sku: input.sku.trim() } : {}),
    status: "pending",
    createdAt: FieldValue.serverTimestamp(),
    updatedAt: FieldValue.serverTimestamp(),
  });

  return { id: internalOrderId };
}
