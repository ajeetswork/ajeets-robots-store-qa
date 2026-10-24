export type Tx = {
  orders: typeof db.orders;
  refunds: typeof db.refunds;
  inventory: typeof db.inventory;
  ledger: typeof db.ledger;
  subscriptions: typeof db.subscriptions;
};

export const db = {
  orders: {
    update: async (orderId: string, patch: Record<string, unknown>) => ({ orderId, ...patch }),
  },
  refunds: {
    update: async (refundId: string, patch: Record<string, unknown>) => ({ refundId, ...patch }),
  },
  inventory: {
    adjust: async (sku: string, location: string, delta: number) => ({ sku, location, delta }),
  },
  ledger: {
    insert: async (entry: Record<string, unknown>) => entry,
  },
  subscriptions: {
    create: async (record: Record<string, unknown>) => record,
    update: async (subscriptionId: string, patch: Record<string, unknown>) => ({ subscriptionId, ...patch }),
  },
  transaction: async <T>(work: (tx: Tx) => Promise<T>): Promise<T> => work(db as Tx),
};

export async function withTransaction<T>(work: (tx: Tx) => Promise<T>): Promise<T> {
  return db.transaction(work);
}
