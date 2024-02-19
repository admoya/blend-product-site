import { authenticate, getOrganizationInfo, getOrganizationMemberDetails, getUserData, getUserOrganizations } from '$lib/server/firebaseUtils';
import {
  getBlendProSubscription,
  getStripeCustomerWithSubscriptions,
  isOrganizationMember,
  isSubscribedToBlendPro,
} from '$lib/server/subscriptionUtils';
import type { RequestHandler } from './$types';

export const GET = (async (event) => {
  const { uid } = await authenticate(event);
  const [stripeCustomer, firebaseUserData] = await Promise.all([getStripeCustomerWithSubscriptions(uid), getUserData(uid)]);
  const subscriptionData = stripeCustomer && !stripeCustomer.deleted && getBlendProSubscription(stripeCustomer);
  const userOrganizations = await getUserOrganizations(uid);
  const organizationInfo = await Promise.all(
    userOrganizations.map(async (orgId) => {
      const orgInfo = await getOrganizationInfo(orgId);
      return {
        orgName: orgInfo?.name,
        orgId,
      };
    }),
  );
  const userData = {
    ...firebaseUserData,
    isSubscribedToBlendPro: (await isOrganizationMember(uid)) || isSubscribedToBlendPro(stripeCustomer),
    subscriptionPeriodEnd: subscriptionData ? subscriptionData.current_period_end : 0,
    organizationInfo,
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
