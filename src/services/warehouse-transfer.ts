import { withTransaction } from "../persistence/database";

export async function transferWarehouseStock(
  sku: string,
  fromWarehouseId: string,
  toWarehouseId: string,
  quantity: number,
) {
  return withTransaction(async (tx) => {
    await tx.inventory.adjust(sku, fromWarehouseId, -quantity);
    await tx.inventory.adjust(sku, toWarehouseId, quantity);
  });
}
