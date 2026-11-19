import { randomUUID } from "node:crypto";
import "server-only";
import { adminDb } from "@/lib/firebase-admin";
import type { DropshipProduct } from "@/lib/dropshipping";
import { getDropshipRevenueSplitForCountry } from "@/lib/dropship-pricing";

export type DropshipOrderStatus = "pending_payment" | "ordered" | "shipped" | "delivered";

export type DropshipOrderRecord = {
  id: string;
  orderToken: string;
  orderId?: string;
  buyerEmail: string;
  countryId: string;
  countryName: string;
  flag: string;
  productId: string;
  productName: string;
  productCategory: string;
  amount: string;
  currency: string;
  supplierAmount: string;
  platformAmount: string;
  supplierPct: number;
  platformPct: number;
  status: DropshipOrderStatus;
  createdAt: string;
  updatedAt: string;
  polarOrderId?: string;
  paidAt?: string;
  vaultId?: string;
  polarProductId?: string;
};

type CreateDropshipOrderInput = {
  buyerEmail: string;
  countryId: string;
  countryName: string;
  flag: string;
  product: DropshipProduct;
};

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

export async function createDropshipOrder(input: CreateDropshipOrderInput): Promise<DropshipOrderRecord> {
  const now = new Date().toISOString();
  const id = `dso_${randomUUID()}`;
  const split = getDropshipRevenueSplitForCountry(input.product.price, input.countryId);

  const record: DropshipOrderRecord = {
    id,
    orderToken: randomUUID(),
    buyerEmail: normalizeEmail(input.buyerEmail),
    countryId: input.countryId,
    countryName: input.countryName,
    flag: input.flag,
    productId: input.product.id,
    productName: input.product.name,
    productCategory: input.product.category,
    amount: split.grossUsd.toFixed(2),
    currency: input.product.currency,
    supplierAmount: split.supplierUsd.toFixed(2),
    platformAmount: split.platformUsd.toFixed(2),
    supplierPct: split.supplierPct,
    platformPct: split.platformPct,
    status: "pending_payment",
    createdAt: now,
    updatedAt: now
  };

  await adminDb.collection("dropshipOrders").doc(id).create(record);
  return record;
}

export async function setDropshipCheckoutReferences(
  id: string,
  refs: { vaultId: string; polarProductId: string }
): Promise<void> {
  await adminDb.collection("dropshipOrders").doc(id).update({
    vaultId: refs.vaultId,
    polarProductId: refs.polarProductId,
    updatedAt: new Date().toISOString(),
  });
}

/**
 * Retrieve one order using its high-entropy access token.
 * The API route must expose only an explicit public allowlist of fields.
 */
export async function getDropshipOrderByToken(
  token: string
): Promise<DropshipOrderRecord | null> {
  const snapshot = await adminDb
    .collection("dropshipOrders")
    .where("orderToken", "==", token)
    .limit(1)
    .get();

  if (snapshot.empty) return null;

  return snapshot.docs[0].data() as DropshipOrderRecord;
}
