import { db, withTransaction } from "../persistence/database";
import { customerNotifications } from "../integrations/customer-notifications";

export async function approveRefund(refundId: string, orderId: string, amountCents: number) {
  await withTransaction(async (tx) => {
    await tx.refunds.update(refundId, {
      status: "APPROVED",
      approvedAt: new Date().toISOString(),
    });

    await tx.ledger.insert({
      type: "REFUND",
      refundId,
      orderId,
      amountCents: -amountCents,
      recordedAt: new Date().toISOString(),
    });
  });

  await customerNotifications.refundApproved(refundId);
}
