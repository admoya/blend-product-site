import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

import { getStripeCustomerWithSubscriptions, getBlendProSubscription } from '$lib/server/subscriptionUtils';
 
export const GET = ( async ({ params: { uid } }) => {
  const customer = await getStripeCustomerWithSubscriptions(uid);
  if (!customer || customer?.deleted) {
    throw error(404);
  }
  const subscription = getBlendProSubscription(customer);
  return new Response(JSON.stringify({
    isSubscribedToBlendPro: !!subscription,
    subscriptionPeriodEnd: subscription?.current_period_end ?? 0,
  }));
}) satisfies RequestHandler;