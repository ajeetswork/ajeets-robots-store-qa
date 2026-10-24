import { db } from "../persistence/database";
import { customerNotifications } from "../integrations/customer-notifications";

export async function approveRefund(refundId: string, orderId: string, amountCents: number) {
  await db.refunds.update(refundId, {
    status: "APPROVED",
    approvedAt: new Date().toISOString(),
  });

  await db.ledger.insert({
    type: "REFUND",
    refundId,
    orderId,
    amountCents: -amountCents,
    recordedAt: new Date().toISOString(),
  });

  await customerNotifications.refundApproved(refundId);
}
