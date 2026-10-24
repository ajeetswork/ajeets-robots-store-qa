import { db } from "../persistence/database";
import { subscriptionProvider } from "../integrations/subscription-provider";

export async function provisionSubscription(
  subscriptionId: string,
  customerId: string,
  planCode: string,
) {
  await db.subscriptions.create({
    subscriptionId,
    customerId,
    planCode,
    status: "PROVISIONING",
    attemptCount: 1,
  });

  try {
    const remote = await subscriptionProvider.provision(customerId, planCode);

    await db.subscriptions.update(subscriptionId, {
      status: "ACTIVE",
      remoteSubscriptionId: remote.remoteSubscriptionId,
    });
  } catch (error) {
    await db.subscriptions.update(subscriptionId, {
      status: "PROVISIONING_FAILED",
      lastError: error instanceof Error ? error.message : "provider failure",
      retryEligible: true,
    });
    throw error;
  }
}
