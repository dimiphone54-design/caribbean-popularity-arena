import { randomUUID } from "crypto";
import { isPayPalConfigured } from "@/lib/paypal";
import type { DropshipProduct } from "@/lib/dropshipping";
import { getDropshipRevenueSplit } from "@/lib/dropship-pricing";

export type DropshipOrderStatus = "pending_payment" | "ordered" | "shipped" | "delivered";

export type DropshipOrderRecord = {
  id: string;
  orderToken: string;
  orderId?: string;
  paypalOrderId?: string;
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
};

type CreateDropshipOrderInput = {
  buyerEmail: string;
  countryId: string;
  countryName: string;
  flag: string;
  product: DropshipProduct;
};

type UpdateOrderInput = {
  paypalOrderId?: string;
  orderId?: string;
  status?: DropshipOrderStatus;
};

type DropshipOrderStore = {
  byId: Map<string, DropshipOrderRecord>;
  byToken: Map<string, string>;
  byPayPalOrderId: Map<string, string>;
};

function getStore(): DropshipOrderStore {
  const globalKey = "__CARIBBEAN_DROPSHIP_ORDERS__";
  const globalStore = globalThis as typeof globalThis & {
    __CARIBBEAN_DROPSHIP_ORDERS__?: DropshipOrderStore;
  };

  if (!globalStore[globalKey]) {
    globalStore[globalKey] = {
      byId: new Map<string, DropshipOrderRecord>(),
      byToken: new Map<string, string>(),
      byPayPalOrderId: new Map<string, string>()
    };
  }

  return globalStore[globalKey]!;
}

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

function createOrderToken() {
  return randomUUID();
}

export function canAcceptDropshipPayments() {
  return isPayPalConfigured();
}

export function createDropshipOrder(input: CreateDropshipOrderInput) {
  const now = new Date().toISOString();
  const id = `dso_${randomUUID()}`;
  const orderToken = createOrderToken();
  const split = getDropshipRevenueSplit(input.product.price);
  const record: DropshipOrderRecord = {
    id,
    orderToken,
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
    status: canAcceptDropshipPayments() ? "pending_payment" : "ordered",
    createdAt: now,
    updatedAt: now
  };

  const store = getStore();
  store.byId.set(record.id, record);
  store.byToken.set(record.orderToken, record.id);
  return record;
}

export function updateDropshipOrderByToken(orderToken: string, update: UpdateOrderInput) {
  const store = getStore();
  const orderId = store.byToken.get(orderToken);
  if (!orderId) return null;
  const existing = store.byId.get(orderId);
  if (!existing) return null;

  const next: DropshipOrderRecord = {
    ...existing,
    ...update,
    updatedAt: new Date().toISOString()
  };

  store.byId.set(next.id, next);
  if (update.paypalOrderId) {
    store.byPayPalOrderId.set(update.paypalOrderId, next.id);
  }
  return next;
}

export function markDropshipOrderPaid(paypalOrderId: string, capturedOrderId?: string) {
  const store = getStore();
  const localId = store.byPayPalOrderId.get(paypalOrderId);
  if (!localId) return null;
  const existing = store.byId.get(localId);
  if (!existing) return null;

  const next: DropshipOrderRecord = {
    ...existing,
    orderId: capturedOrderId ?? existing.orderId,
    paypalOrderId,
    status: "ordered",
    updatedAt: new Date().toISOString()
  };

  store.byId.set(next.id, next);
  return next;
}

export function listDropshipOrdersByEmail(email: string, countryId?: string) {
  const normalized = normalizeEmail(email);
  const store = getStore();
  return Array.from(store.byId.values())
    .filter((order) => order.buyerEmail === normalized)
    .filter((order) => !countryId || order.countryId === countryId)
    .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
}
