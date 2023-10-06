import type { Actions, PageServerLoad } from './$types';
import { error, redirect } from '@sveltejs/kit';
import {
  stripeClient,
  firebaseDb,
  getStripeCustomerWithSubscriptions,
  getBlendProSubscription,
  getAllCustomerSubscriptions,
  hasCustomerSubscribedBefore,
  getCustomerPortalSession,
  PRICE_CODE,
  PRODUCT_CODE,
} from '$lib/server/subscriptionUtils';
import type Stripe from 'stripe';
import { checkSessionAuth, getUserOrganizations, isUserGlobalAdmin, readPath, writePath } from '$lib/server/firebaseUtils';

export const load = (async ({ params: { uid }, cookies }) => {
  await checkSessionAuth(cookies, {
    loginRedirect: 'account',
    authFunction: ({ uid: tokenUid }) => tokenUid === uid,
  });
  const isGlobalAdmin = isUserGlobalAdmin(uid);
  const organizations = getUserOrganizations(uid).then((orgIds) => {
    return Promise.all(
      (orgIds || []).map(async (orgId: string) => {
        const organization = await readPath<Database.Organization>(`/organizations/${orgId}`);
        return {
          id: orgId,
          name: organization?.public.name,
          role: (await isGlobalAdmin) ? 'admin' : organization?.private?.members?.[uid]?.role,
        };
      }),
    );
  });
  const customer = await getStripeCustomerWithSubscriptions(uid);

  if (!customer || customer.deleted) {
    return {
      isSubscribedToBlendPro: false,
      hasOrganizationMembership: (await organizations).length > 0,
      subscriptionPeriodEnd: 0,
      subscriptionPendingCancellation: false,
      organizations: JSON.stringify(await organizations),
    };
  }
  const subscription = getBlendProSubscription(customer);
  return {
    isSubscribedToBlendPro: !!subscription,
    hasOrganizationMembership: (await organizations).length > 0,
    subscriptionPeriodEnd: subscription?.current_period_end ?? 0,
    subscriptionPendingCancellation: subscription?.cancel_at_period_end,
    organizations: JSON.stringify(await organizations),
  };
}) satisfies PageServerLoad;

export const actions = {
  createSubscriptionOrder: async ({ request, params: { uid }, url: { origin } }) => {
    const data = await request.formData();
    console.log(`Fetching Stripe customer ID for user ${uid}`);
    const stripeCustomerIdRef = firebaseDb.ref(`/users/${uid}/private/stripeCustomerId`);

    let [customer, allSubscriptions] = await Promise.all([getStripeCustomerWithSubscriptions(uid), getAllCustomerSubscriptions(uid)]);

    let subscriptionData: Stripe.Checkout.SessionCreateParams.SubscriptionData = {};
    if (!customer || customer.deleted) {
      console.log(`No Stripe customer exists for user ${uid}, creating one`);
      customer = await stripeClient.customers.create({
        email: data.get('email')! as string,
        name: data.get('name')! as string,
        metadata: {
          uid,
        },
      });
      await stripeCustomerIdRef.set(customer.id);
    } else {
      console.log(`Customer already exists for user ${uid}`);
      if (getBlendProSubscription(customer)) {
        console.error(`User ${uid} is already subscribed to Blend Pro, aborting`);
        throw error(400, 'Customer is already subscribed to Blend Pro!');
      }
    }

    if (!hasCustomerSubscribedBefore(allSubscriptions, PRODUCT_CODE)) {
      subscriptionData = {
        trial_period_days: 30,
      };
    }

    console.log(`Customer is ${subscriptionData.trial_period_days ? '' : 'not '}eligible for a free trial.`);
    console.log('Creating Stripe session');

    const session = await stripeClient.checkout.sessions.create({
      customer: customer.id,
      billing_address_collection: 'auto',
      line_items: [
        {
          price: PRICE_CODE,
          quantity: 1,
        },
      ],
      subscription_data: subscriptionData,
      allow_promotion_codes: true,
      mode: 'subscription',
      success_url: `${origin}/blendPro/success?subscription_checkout_status=success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/account/${uid}?subscription_checkout_status=cancel`,
      // Enable the below if we need to collect sales tax in the future
      // automatic_tax: { enabled: true },
      // customer_update: { address: 'auto' }
    });
    console.log(`Stripe session created: ${session.id}`);
    throw redirect(303, session.url!);
  },
  redirectToCustomerPortal: async ({ url, params: { uid } }) => {
    console.log(`Redirecting to customer billing portal for user ${uid}`);
    const customer = await getStripeCustomerWithSubscriptions(uid);
    if (!customer || customer.deleted) {
      console.error(`Stripe customer for ${uid} does not exist or is deleted. Aborting.`);
      throw error(400, `Stripe customer for ${uid} does not exist`);
    }
    const session = await getCustomerPortalSession(customer, url.href.replace(url.search, ''));
    throw redirect(303, session.url);
  },
  leaveOrganization: async ({ request, params: { uid } }) => {
    const data = await request.formData();
    const orgId = data.get('orgId');
    const organization = await readPath<Database.Organization>(`/organizations/${orgId}`);
    if (!organization) throw error(404);
    const user = await readPath<Database.User>(`/users/${uid}`);
    await writePath(`/users/${uid}/protected/organizations`, user?.protected.organizations?.filter((id) => id !== orgId));
    const orgMembers = organization.private?.members || {};
    await writePath(`/organizations/${orgId}/private/members`, {
      ...orgMembers,
      [uid]: null,
    });
  },
} satisfies Actions;
