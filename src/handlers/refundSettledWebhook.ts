import { idempotencyStore } from "../delivery/idempotency";
import { notifications } from "../delivery/sideEffects";

export interface RefundSettledWebhook {
  eventId: string;
  refundId: string;
  customerId: string;
}

export async function handleRefundSettled(event: RefundSettledWebhook) {
  if (!idempotencyStore.tryStart(event.eventId)) {
    return { duplicate: true };
  }

  await notifications.sendRefundReceipt(event.customerId, event.refundId);
  idempotencyStore.complete(event.eventId);

  return { duplicate: false };
}
