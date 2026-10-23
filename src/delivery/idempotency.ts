export type DeliveryState = "started" | "completed";

export interface DeliveryRecord {
  key: string;
  state: DeliveryState;
  startedAt: string;
  completedAt?: string;
}

export class IdempotencyStore {
  private readonly deliveries = new Map<string, DeliveryRecord>();

  tryStart(key: string): boolean {
    if (this.deliveries.has(key)) return false;
    this.deliveries.set(key, {
      key,
      state: "started",
      startedAt: new Date().toISOString(),
    });
    return true;
  }

  complete(key: string): void {
    const now = new Date().toISOString();
    const record = this.deliveries.get(key);
    this.deliveries.set(key, {
      key,
      state: "completed",
      startedAt: record?.startedAt ?? now,
      completedAt: now,
    });
  }

  hasCompleted(key: string): boolean {
    return this.deliveries.get(key)?.state === "completed";
  }
}

export const idempotencyStore = new IdempotencyStore();
