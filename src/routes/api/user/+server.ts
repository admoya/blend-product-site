import { authenticate, getUserData } from '$lib/server/firebaseUtils';
import { getBlendProSubscription, getStripeCustomerWithSubscriptions, isSubscribedToBlendPro } from '$lib/server/subscriptionUtils';
import type { RequestHandler } from './$types';

export const GET = (async (event) => {
  const { uid } = await authenticate(event);
  const [stripeCustomer, firebaseUserData] = await Promise.all([getStripeCustomerWithSubscriptions(uid), getUserData(uid)]);
  const subscriptionData = stripeCustomer && !stripeCustomer.deleted && getBlendProSubscription(stripeCustomer);
  const userData = {
    ...firebaseUserData,
    isSubscribedToBlendPro: isSubscribedToBlendPro(stripeCustomer),
    subscriptionPeriodEnd: subscriptionData ? subscriptionData.current_period_end : 0,
  };
  return new Response(JSON.stringify(userData, null, 2), {
    headers: [['Access-Control-Allow-Origin', '*']],
  });
}) satisfies RequestHandler;

export const OPTIONS = (() => {
  return new Response(null, {
    headers: [
      ['Access-Control-Allow-Origin', '*'],
      ['Access-Control-Allow-Headers', '*'],
    ],
  });
}) satisfies RequestHandler;
