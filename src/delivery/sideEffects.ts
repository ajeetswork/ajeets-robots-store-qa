export const fulfillment = {
  async createShipment(orderId: string) {
    return { shipmentId: `ship_${orderId}_${Date.now()}` };
  },
};

export const carrier = {
  async bookPickup(shipmentId: string) {
    return { pickupId: `pickup_${shipmentId}_${Date.now()}` };
  },
};

export const notifications = {
  async sendRefundReceipt(customerId: string, refundId: string) {
    return { customerId, refundId, sent: true };
  },
};

export const inventory = {
  async setAvailableSkuQuantity(sku: string, quantity: number) {
    return { sku, quantity };
  },
};

const recordedRenewals = new Map<string, { subscriptionId: string; amountCents: number }>();

export const ledger = {
  async recordRenewalOnce(eventId: string, subscriptionId: string, amountCents: number) {
    if (recordedRenewals.has(eventId)) return { inserted: false };
    recordedRenewals.set(eventId, { subscriptionId, amountCents });
    return { inserted: true };
  },
};
