import { idempotencyStore } from "../delivery/idempotency";
import { carrier } from "../delivery/sideEffects";

export interface ShipmentReadyEvent {
  eventId: string;
  shipmentId: string;
}

export async function consumeShipmentReady(event: ShipmentReadyEvent) {
  const pickup = await carrier.bookPickup(event.shipmentId);
  idempotencyStore.complete(event.eventId);

  return pickup;
}
