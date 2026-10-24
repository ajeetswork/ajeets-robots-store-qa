import { withTransaction } from "../persistence/database";
import { customerNotifications } from "../integrations/customer-notifications";

export async function cancelOrder(orderId: string, sku: string, warehouseId: string, quantity: number) {
  await withTransaction(async (tx) => {
    await tx.orders.update(orderId, {
      status: "CANCELLED",
      cancelledAt: new Date().toISOString(),
    });

    await tx.inventory.adjust(sku, warehouseId, quantity);
  });

  await customerNotifications.orderCancelled(orderId);
}
