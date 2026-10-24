export const customerNotifications = {
  refundApproved: async (refundId: string) => ({ delivered: true, refundId }),
  orderCancelled: async (orderId: string) => ({ delivered: true, orderId }),
};
