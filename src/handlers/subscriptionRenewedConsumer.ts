import { ledger } from "../delivery/sideEffects";

export interface SubscriptionRenewedEvent {
  eventId: string;
  subscriptionId: string;
  amountCents: number;
}

export async function consumeSubscriptionRenewed(event: SubscriptionRenewedEvent) {
  const result = await ledger.recordRenewalOnce(
    event.eventId,
    event.subscriptionId,
    event.amountCents,
  );

  return { eventId: event.eventId, inserted: result.inserted };
}
