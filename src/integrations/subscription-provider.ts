export const subscriptionProvider = {
  provision: async (customerId: string, planCode: string) => ({
    remoteSubscriptionId: `sub_${customerId}_${planCode}`,
  }),
};
