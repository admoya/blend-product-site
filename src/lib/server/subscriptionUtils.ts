import Stripe from 'stripe';
import { STRIPE_SECRET_KEY, STRIPE_BLEND_PRO_PRICE_CODE, STRIPE_BLEND_PRO_PRODUCT_CODE } from '$env/static/private';
const stripe = new Stripe(STRIPE_SECRET_KEY, {
  apiVersion: '2022-11-15',
});
import firebaseAdmin from 'firebase-admin';
import firebaseAdminCredential, { databaseURL } from '$lib/server/firebaseAdminCredential';
import { readPath } from './firebaseUtils';
import { error } from '@sveltejs/kit';
if (!firebaseAdmin.apps.length) {
  firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(firebaseAdminCredential),
    databaseURL,
  });
}
const db = firebaseAdmin.database();

export const stripeClient = stripe;
export const firebaseDb = db;

export const PRICE_CODE = STRIPE_BLEND_PRO_PRICE_CODE;
export const PRODUCT_CODE = STRIPE_BLEND_PRO_PRODUCT_CODE;

export const getStripeCustomerWithSubscriptions = async (uid: string) => {
  const stripeCustomerId: string | null = (await db.ref(`/users/${uid}/private/stripeCustomerId`).once('value')).val();
  if (stripeCustomerId === null) return stripeCustomerId;
  return await stripe.customers.retrieve(stripeCustomerId, {
    expand: ['subscriptions'],
  });
};

export const getAllCustomerSubscriptions = async (uid: string) => {
  const stripeCustomerId: string | null = (await db.ref(`/users/${uid}/private/stripeCustomerId`).once('value')).val();
  if (stripeCustomerId === null) return [];
  const subscriptions = await stripe.subscriptions.list({
    customer: stripeCustomerId,
    expand: ['data.items'],
    status: 'all',
  });
  return subscriptions.data;
};

export const getBlendProSubscription = (customer: Stripe.Customer) =>
  customer.subscriptions?.data.find((subscription) =>
    subscription.items.data.find(({ plan: { product, active } }) => active && product === STRIPE_BLEND_PRO_PRODUCT_CODE),
  );

export const isOrganizationMember = async (uid: string) => {
  const userOrgs = await readPath<Database.User.Protected['organizations']>(`users/${uid}/protected/organizations`);
  if (!userOrgs) return false;
  try {
    return await Promise.any(
      userOrgs.map(async (orgId) => {
        const membership = await readPath(`organizations/${orgId}/private/members/${uid}`);
        if (membership) return true;
        throw false;
      }),
    );
  } catch {
    return false;
  }
};

export const isSubscribedToBlendPro = (customer: Stripe.Customer | Stripe.DeletedCustomer | null) =>
  !!(customer && !customer.deleted && getBlendProSubscription(customer));

export const getCustomerPortalSession = (customer: Stripe.Customer, returnUrl: string) =>
  stripe.billingPortal.sessions.create({
    customer: customer.id,
    return_url: returnUrl,
  });

export const hasCustomerSubscribedBefore = (subscriptions: Stripe.Subscription[], productCode: string) =>
  subscriptions.some((subscription) => subscription.items.data.some((item) => item.price.product === productCode));

export const createStripeSession = async (uid: string, email: string, name: string, origin: string, successUrl?: string) => {
  console.log(`Fetching Stripe customer ID for user ${uid}`);
  const stripeCustomerIdRef = firebaseDb.ref(`/users/${uid}/private/stripeCustomerId`);

  let [customer, allSubscriptions] = await Promise.all([getStripeCustomerWithSubscriptions(uid), getAllCustomerSubscriptions(uid)]);

  let subscriptionData: Stripe.Checkout.SessionCreateParams.SubscriptionData = {};
  if (!customer || customer.deleted) {
    console.log(`No Stripe customer exists for user ${uid}, creating one`);
    customer = await stripeClient.customers.create({
      email,
      name,
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
      trial_period_days: 7,
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
    success_url: `${successUrl || `${origin}/blendPro/success?subscription_checkout_status=success?session_id={CHECKOUT_SESSION_ID}`}`,
    cancel_url: `${origin}/account/?subscription_checkout_status=cancel`,
    // Enable the below if we need to collect sales tax in the future
    // automatic_tax: { enabled: true },
    // customer_update: { address: 'auto' }
  });
  console.log(`Stripe session created: ${session.id}`);
  return session;
};
