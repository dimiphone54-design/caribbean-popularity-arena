import { NextResponse } from "next/server";
import { loadDropshipOrders } from "@/lib/dropshipping-order-store";
import {
  getSeedPopularityDropshipSales,
  getSeedPopularityMatchScores,
  getSeedPopularitySportsRecords,
  mergePopularityDropshipSales,
  type PopularityDropshipSale
} from "@/lib/popularity-arena-records";
import { internationalSuiteCountries } from "@/lib/international-suite";

const primaryRoomSlugByCountryId: Record<string, string> = {
  colombia: "colombia-room",
  ecuador: "ecuador-room",
  japan: "japan-room",
  china: "china-room",
  uk: "uk-flag-cotswolds"
};

function ordersToDropshipSales(orders: Awaited<ReturnType<typeof loadDropshipOrders>>) {
  const sales: PopularityDropshipSale[] = [];

  for (const order of orders) {
    if (order.status === "pending_payment") continue;

    const roomSlug = primaryRoomSlugByCountryId[order.countryId] ?? "dropship-market";
    const country = internationalSuiteCountries.find((entry) => entry.id === order.countryId);
    const room = country?.rooms.find((entry) => entry.roomSlug === roomSlug);
    const roomLabel = room?.roomLabel ?? order.countryName;

    sales.push({
      id: `order-${order.id}`,
      roomSlug,
      roomLabel,
      countryId: order.countryId,
      flag: order.flag,
      productName: order.productName,
      units: 1,
      amount: order.amount,
      currency: order.currency,
      recordedAt: order.orderedAt
    });
  }

  return sales;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const roomSlug = searchParams.get("roomSlug")?.trim() || "all";

  const orders = await loadDropshipOrders();
  const orderSales = ordersToDropshipSales(orders);
  const seedSales = getSeedPopularityDropshipSales(roomSlug === "all" ? undefined : roomSlug);
  const filteredOrderSales =
    roomSlug === "all" ? orderSales : orderSales.filter((row) => row.roomSlug === roomSlug);

  const matchScores = getSeedPopularityMatchScores(roomSlug === "all" ? undefined : roomSlug);
  const sportsRecords = getSeedPopularitySportsRecords(roomSlug === "all" ? undefined : roomSlug);
  const dropshipSales = mergePopularityDropshipSales(seedSales, filteredOrderSales).slice(0, 24);

  return NextResponse.json({
    ok: true,
    roomSlug,
    matchScores,
    sportsRecords,
    dropshipSales
  });
}