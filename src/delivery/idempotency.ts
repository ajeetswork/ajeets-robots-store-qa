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
    const record = this.deliveries.get(key);
    if (!record) throw new Error(`delivery not started: ${key}`);
    this.deliveries.set(key, {
      ...record,
      state: "completed",
      completedAt: new Date().toISOString(),
    });
  }

  hasCompleted(key: string): boolean {
    return this.deliveries.get(key)?.state === "completed";
  }
}

export const idempotencyStore = new IdempotencyStore();
