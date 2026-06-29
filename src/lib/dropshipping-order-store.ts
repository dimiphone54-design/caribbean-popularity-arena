import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import type { DropshipOrder, DropshipOrderStatus } from "@/lib/dropshipping";

const DATA_FILE = path.join(process.cwd(), ".data", "dropship-orders.json");

const globalStore = globalThis as typeof globalThis & {
  __dropshipOrders?: DropshipOrder[];
};

async function readFromDisk(): Promise<DropshipOrder[]> {
  try {
    const raw = await readFile(DATA_FILE, "utf8");
    const parsed = JSON.parse(raw) as DropshipOrder[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

async function writeToDisk(orders: DropshipOrder[]) {
  await mkdir(path.dirname(DATA_FILE), { recursive: true });
  await writeFile(DATA_FILE, JSON.stringify(orders.slice(0, 200), null, 2), "utf8");
}

export async function loadDropshipOrders(): Promise<DropshipOrder[]> {
  if (globalStore.__dropshipOrders) return globalStore.__dropshipOrders;
  const orders = await readFromDisk();
  globalStore.__dropshipOrders = orders;
  return orders;
}

export async function saveDropshipOrders(orders: DropshipOrder[]) {
  globalStore.__dropshipOrders = orders.slice(0, 200);
  await writeToDisk(globalStore.__dropshipOrders);
}

export async function upsertDropshipOrderRecord(order: DropshipOrder) {
  const orders = await loadDropshipOrders();
  const index = orders.findIndex(
    (entry) => entry.id === order.id || entry.customReference === order.customReference
  );
  if (index >= 0) {
    orders[index] = order;
  } else {
    orders.unshift(order);
  }
  await saveDropshipOrders(orders);
  return order;
}

export async function findDropshipOrderByReference(customReference: string) {
  const orders = await loadDropshipOrders();
  return orders.find((entry) => entry.customReference === customReference) ?? null;
}

export async function updateDropshipOrderStatus(
  customReference: string,
  status: DropshipOrderStatus,
  trackingNote?: string
) {
  const orders = await loadDropshipOrders();
  const order = orders.find((entry) => entry.customReference === customReference);
  if (!order) return null;
  order.status = status;
  if (trackingNote) order.trackingNote = trackingNote;
  await saveDropshipOrders(orders);
  return order;
}

export function listDropshipOrdersForEmail(orders: DropshipOrder[], email: string, countryId?: string) {
  const normalized = email.trim().toLowerCase();
  return orders.filter((order) => {
    if (order.buyerEmail?.toLowerCase() !== normalized) return false;
    if (countryId && order.countryId !== countryId) return false;
    return true;
  });
}
