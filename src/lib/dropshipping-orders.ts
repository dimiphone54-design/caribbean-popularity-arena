import type { DropshipBuyer, DropshipOrder } from "@/lib/dropshipping";

const STORAGE_KEY = "cfa-dropship-orders-v1";
const BUYER_EMAIL_KEY = "cfa-dropship-buyer-email";

function readAll(): DropshipOrder[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as DropshipOrder[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeAll(orders: DropshipOrder[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
}

export function getSavedDropshipBuyerEmail() {
  if (typeof window === "undefined") return "";
  return window.localStorage.getItem(BUYER_EMAIL_KEY)?.trim().toLowerCase() ?? "";
}

export function saveDropshipBuyerEmail(email: string) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(BUYER_EMAIL_KEY, email.trim().toLowerCase());
}

export function readDropshipOrders(countryId?: string) {
  const orders = readAll();
  if (!countryId) return orders;
  return orders.filter((order) => order.countryId === countryId);
}

export function upsertDropshipOrder(order: DropshipOrder) {
  const orders = readAll();
  const index = orders.findIndex(
    (entry) => entry.id === order.id || entry.customReference === order.customReference
  );
  if (index >= 0) {
    orders[index] = order;
  } else {
    orders.unshift(order);
  }
  writeAll(orders.slice(0, 40));
  if (order.buyerEmail) saveDropshipBuyerEmail(order.buyerEmail);
  return order;
}

export function cacheDropshipOrderFromServer(order: DropshipOrder) {
  return upsertDropshipOrder(order);
}

export function createDropshipOrderFromCheckout(input: {
  orderId: string;
  customReference: string;
  productId: string;
  productName: string;
  countryId: string;
  countryName: string;
  flag: string;
  amount: number;
  currency: string;
  buyerEmail?: string;
  status?: DropshipOrder["status"];
  trackingNote?: string;
}) {
  const order: DropshipOrder = {
    id: input.orderId,
    productId: input.productId,
    productName: input.productName,
    countryId: input.countryId,
    countryName: input.countryName,
    flag: input.flag,
    amount: input.amount,
    currency: input.currency,
    status: input.status ?? "ordered",
    orderedAt: new Date().toISOString(),
    trackingNote: input.trackingNote ?? "Supplier notified · awaiting ship",
    customReference: input.customReference,
    buyerEmail: input.buyerEmail
  };
  return upsertDropshipOrder(order);
}

export function markDropshipOrderStatus(
  customReference: string,
  status: DropshipOrder["status"],
  trackingNote?: string
) {
  const orders = readAll();
  const order = orders.find((entry) => entry.customReference === customReference);
  if (!order) return null;
  order.status = status;
  if (trackingNote) order.trackingNote = trackingNote;
  writeAll(orders);
  return order;
}

export async function fetchDropshipOrdersFromServer(email: string, countryId?: string) {
  const params = new URLSearchParams({ email });
  if (countryId) params.set("countryId", countryId);
  const response = await fetch(`/api/dropshipping/orders?${params.toString()}`);
  const payload = (await response.json()) as { ok?: boolean; orders?: DropshipOrder[] };
  if (!response.ok || !payload.ok || !payload.orders) return [];
  payload.orders.forEach(cacheDropshipOrderFromServer);
  return payload.orders;
}

export async function confirmDropshipPaymentOnServer(customReference: string, paymentReference?: string) {
  const response = await fetch("/api/dropshipping/confirm", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ customReference, paymentReference })
  });
  const payload = (await response.json()) as { ok?: boolean; order?: DropshipOrder };
  if (!response.ok || !payload.ok || !payload.order) return null;
  return cacheDropshipOrderFromServer(payload.order);
}

export function defaultBuyerFromSaved(countryCode = "US"): Partial<DropshipBuyer> {
  const email = getSavedDropshipBuyerEmail();
  return email ? { email, countryCode } : { countryCode };
}
