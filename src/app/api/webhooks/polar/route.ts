import { Webhooks } from "@polar-sh/nextjs";
import { adminDb } from "@/lib/firebase-admin";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

type PolarEvent = {
  type?: unknown;
  event_id?: unknown;
  data?: unknown;
};

function asRecord(value: unknown): Record<string, unknown> {
  return value && typeof value === "object"
    ? value as Record<string, unknown>
    : {};
}

export async function POST(request: Request) {
  const webhookSecret = process.env.POLAR_WEBHOOK_SECRET;

  if (!webhookSecret) {
    return Response.json(
      { ok: false, error: "Polar webhook is not configured." },
      { status: 503 }
    );
  }

  const handler = Webhooks({
    webhookSecret,
    onPayload: async (payload) => {
      const event = payload as unknown as PolarEvent;
      if (event.type !== "order.paid") return;

      const order = asRecord(event.data);
      const polarOrderId =
        typeof order.id === "string" ? order.id : "";

      if (!polarOrderId) {
        throw new Error("Polar order.paid event has no order ID");
      }

      const metadata = asRecord(order.metadata);
      const localOrderId =
        typeof metadata.local_order_id === "string"
          ? metadata.local_order_id
          : "";
      const vaultId =
        typeof metadata.vault_id === "string"
          ? metadata.vault_id
          : "";
      const eventId =
        typeof event.event_id === "string" ? event.event_id : "";

      if (!localOrderId.startsWith("dso_") || !vaultId) {
        throw new Error(
          `Polar order ${polarOrderId} is missing dropship metadata`
        );
      }

      const polarOrderRef = adminDb
        .collection("polarOrders")
        .doc(polarOrderId);
      const dropshipRef = adminDb
        .collection("dropshipOrders")
        .doc(localOrderId);
      const vaultRef = adminDb
        .collection("platformVault")
        .doc(vaultId);
      const eventRef = eventId
        ? adminDb.collection("polarWebhookEvents").doc(eventId)
        : null;

      const now = new Date().toISOString();

      await adminDb.runTransaction(async (transaction) => {
        // Read all documents before performing any writes.
        const eventSnapshot = eventRef
          ? await transaction.get(eventRef)
          : null;
        const polarSnapshot = await transaction.get(polarOrderRef);
        const dropshipSnapshot = await transaction.get(dropshipRef);
        const vaultSnapshot = await transaction.get(vaultRef);

        if (
          eventSnapshot?.exists &&
          eventSnapshot.data()?.processed === true
        ) {
          return;
        }

        if (!dropshipSnapshot.exists) {
          throw new Error(
            `Dropship order ${localOrderId} not found; payment not reconciled`
          );
        }

        if (!vaultSnapshot.exists) {
          throw new Error(
            `Vault entry ${vaultId} not found; payment not reconciled`
          );
        }

        const dropship = dropshipSnapshot.data()!;
        const vault = vaultSnapshot.data()!;

        const alreadyReconciled =
          ["ordered", "shipped", "delivered"].includes(dropship.status) &&
          dropship.polarOrderId === polarOrderId &&
          vault.status === "collected" &&
          vault.polarOrderId === polarOrderId;

        if (
          polarSnapshot.exists &&
          polarSnapshot.data()?.paidProcessed === true &&
          alreadyReconciled
        ) {
          return;
        }

        const productId =
          typeof order.product_id === "string" ? order.product_id : "";
        const currency =
          typeof order.currency === "string"
            ? order.currency.toUpperCase()
            : "";
        const customer = asRecord(order.customer);
        const customerEmail =
          typeof customer.email === "string"
            ? customer.email.trim().toLowerCase()
            : "";

        const subtotalCents =
          typeof order.subtotal_amount === "number"
            ? order.subtotal_amount
            : NaN;
        const totalCents =
          typeof order.total_amount === "number"
            ? order.total_amount
            : NaN;
        const discountCents =
          typeof order.discount_amount === "number"
            ? order.discount_amount
            : NaN;
        const dueCents =
          typeof order.due_amount === "number"
            ? order.due_amount
            : NaN;

        const expectedCents = Math.round(Number(dropship.amount) * 100);

        if (order.paid !== true) {
          throw new Error(`Polar order ${polarOrderId} is not paid`);
        }

        if (
          !Number.isFinite(expectedCents) ||
          !Number.isFinite(subtotalCents) ||
          !Number.isFinite(totalCents) ||
          !Number.isFinite(discountCents) ||
          !Number.isFinite(dueCents)
        ) {
          throw new Error(`Invalid amount fields for ${polarOrderId}`);
        }

        if (
          currency !== String(dropship.currency).toUpperCase() ||
          currency !== String(vault.currency).toUpperCase()
        ) {
          throw new Error(`Currency mismatch for ${localOrderId}`);
        }

        // The catalog price must match the undiscounted Polar subtotal.
        // Taxes may make total_amount higher than subtotal_amount.
        if (
          subtotalCents !== expectedCents ||
          discountCents !== 0 ||
          totalCents < subtotalCents ||
          dueCents !== 0
        ) {
          throw new Error(`Amount validation failed for ${localOrderId}`);
        }

        if (
          !dropship.polarProductId ||
          dropship.polarProductId !== productId
        ) {
          throw new Error(`Polar product mismatch for ${localOrderId}`);
        }

        if (
          dropship.vaultId !== vaultId ||
          vault.refId !== localOrderId
        ) {
          throw new Error(`Vault/order reference mismatch for ${localOrderId}`);
        }

        if (
          dropship.status !== "pending_payment" &&
          !(
            ["ordered", "shipped", "delivered"].includes(dropship.status) &&
            dropship.polarOrderId === polarOrderId
          )
        ) {
          throw new Error(`Unexpected dropship status for ${localOrderId}`);
        }

        const expectedEmail =
          typeof dropship.buyerEmail === "string"
            ? dropship.buyerEmail.trim().toLowerCase()
            : "";

        if (!expectedEmail || customerEmail !== expectedEmail) {
          throw new Error(`Customer email mismatch for ${localOrderId}`);
        }

        if (
          vault.status !== "pending_collection" &&
          !(
            vault.status === "collected" &&
            vault.polarOrderId === polarOrderId
          )
        ) {
          throw new Error(`Unexpected vault status for ${vaultId}`);
        }

        if (
          !Number.isFinite(Number(vault.amountUsd)) ||
          Math.round(Number(vault.amountUsd) * 100) !== expectedCents
        ) {
          throw new Error(`Vault amount mismatch for ${localOrderId}`);
        }

        // All validations passed. Reconcile both records atomically.
        if (dropship.status === "pending_payment") {
          transaction.update(dropshipRef, {
            status: "ordered",
            polarOrderId,
            paidAt: now,
            updatedAt: now,
          });
        } else {
          transaction.update(dropshipRef, {
            polarOrderId,
            paidAt: dropship.paidAt || now,
            updatedAt: now,
          });
        }

        transaction.update(vaultRef, {
          status: "collected",
          polarOrderId,
          collectedAt: vault.collectedAt || now,
          updatedAt: now,
        });

        transaction.set(polarOrderRef, {
          polarOrderId,
          externalOrderId: localOrderId,
          eventId: eventId || null,
          eventType: "order.paid",
          amountCents: totalCents,
          subtotalAmountCents: subtotalCents,
          currency,
          customerEmail,
          productId,
          paidProcessed: true,
          paidAt: now,
          updatedAt: now,
        }, { merge: true });

        if (eventRef) {
          transaction.set(eventRef, {
            eventId,
            polarOrderId,
            eventType: "order.paid",
            processed: true,
            processedAt: now,
          });
        }
      });
    },
  });

  return handler(request as Parameters<typeof handler>[0]);
}
