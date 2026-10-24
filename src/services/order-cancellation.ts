import { db } from "../persistence/database";
import { customerNotifications } from "../integrations/customer-notifications";

export async function cancelOrder(orderId: string, sku: string, warehouseId: string, quantity: number) {
  await db.orders.update(orderId, {
    status: "CANCELLED",
    cancelledAt: new Date().toISOString(),
  });

  await db.inventory.adjust(sku, warehouseId, quantity);

  await customerNotifications.orderCancelled(orderId);
}
