import { getSubscription } from '$lib/server/subscriptionUtils.js';
import { error, json } from '@sveltejs/kit';
import type Stripe from 'stripe';

export const GET = async ({ params: { subscriptionId } }) => {
  const subscriptionData = await getSubscription(subscriptionId);
  if (!subscriptionData) {
    throw error(404, 'Subscription not found');
  }
  const didCancel = subscriptionData.cancel_at || subscriptionData.canceled_at;
  const { uid } = (subscriptionData.customer as Stripe.Customer).metadata;
  return json({
    checkoutTimestamp: subscriptionData.created,
    partnerOwedAmount: (subscriptionData.items.data[0].price.unit_amount ?? 0) / 100,
    convertedAfterTrial: !didCancel && subscriptionData.trial_end && subscriptionData.trial_end < Date.now() / 1000,
    uid,
  });
};
