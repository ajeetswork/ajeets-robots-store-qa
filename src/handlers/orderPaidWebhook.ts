import { idempotencyStore } from "../delivery/idempotency";
import { fulfillment } from "../delivery/sideEffects";

export interface OrderPaidWebhook {
  orderId: string;
  customerId: string;
}

export async function handleOrderPaid(
  body: OrderPaidWebhook,
  headers: Record<string, string | undefined>,
) {
  const deliveryId = headers["x-ajeets-delivery-id"];
  if (!deliveryId) throw new Error("missing delivery id");

  if (!idempotencyStore.tryStart(deliveryId)) {
    return { duplicate: true } as const;
  }

  const shipment = await fulfillment.createShipment(body.orderId);
  idempotencyStore.complete(deliveryId);

  return shipment;
}
