import { inventory } from "../delivery/sideEffects";

export interface InventorySnapshot {
  eventId: string;
  sku: string;
  availableQuantity: number;
}

export async function consumeInventorySnapshot(event: InventorySnapshot) {
  await inventory.setAvailableSkuQuantity(event.sku, event.availableQuantity);
  return { appliedEventId: event.eventId };
}
