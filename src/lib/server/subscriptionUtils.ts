import Stripe from 'stripe';
import {
  STRIPE_SECRET_KEY,
  STRIPE_BLEND_PRO_PRICE_CODE,
  STRIPE_BLEND_PRO_PRODUCT_CODE,
  STRIPE_BLEND_PRO_ANNUAL_PRICE_CODE,
} from '$env/static/private';
const stripe = new Stripe(STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16',
});
import firebaseAdmin from 'firebase-admin';
import firebaseAdminCredential, { databaseURL } from '$lib/server/firebaseAdminCredential';
import { readPath, writePath } from './firebaseUtils';
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

export const MONTHLY_PRICE_CODE = STRIPE_BLEND_PRO_PRICE_CODE;
export const YEARLY_PRICE_CODE = STRIPE_BLEND_PRO_ANNUAL_PRICE_CODE;
export const PRODUCT_CODE = STRIPE_BLEND_PRO_PRODUCT_CODE;

export const getStripeCustomerWithSubscriptions = async (uid: string) => {
  const startTime = Date.now();
  const stripeCustomerId: string | null = (await db.ref(`/users/${uid}/private/stripeCustomerId`).once('value')).val();
  if (stripeCustomerId === null) return stripeCustomerId;
  const data = await stripe.customers.retrieve(stripeCustomerId, {
    expand: ['subscriptions'],
  });
  console.log(`--Got Stripe customer data in ${Date.now() - startTime}ms`);
  return data;
};

export const getAllCustomersWithSubscriptions = async (): Promise<{ [uid: string]: Stripe.Customer }> => {
  return (
    await stripe.customers.list({
      expand: ['data.subscriptions'],
    })
  ).data
    .filter((customer) => customer.metadata.uid)
    .reduce((acc, customer) => ({ ...acc, [customer.metadata.uid]: customer }), {});
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

/**
 * All-in-one function to check if a user is subscribed to Blend Pro. This does not account for organization membership.
 * The function first checks Firebase, where the subscription status should be stored, then falls back to querying Stripe.
 * If the subscription status is found in Stripe, it is written to Firebase for future use.
 * @param uid the firebase user ID
 * @returns whether the user is subscribed to Blend Pro
 */
export const isSubscribedToBlendPro = async (uid: string) => {
  let isSubscribed = await readPath<boolean>(`users/${uid}/protected/isSubscribedToBlendPro`);
  if (isSubscribed === null) {
    console.log(`isSubscribedToBlendPro not found in Firebase for user ${uid}, fetching from Stripe`);
    isSubscribed = isCustomerSubscribedToBlendPro(await getStripeCustomerWithSubscriptions(uid));
    console.log(`isSubscribedToBlendPro for user ${uid} is ${isSubscribed}. Writing to Firebase for next time.`);
    await writePath(`users/${uid}/protected/isSubscribedToBlendPro`, isSubscribed);
  }
  return isSubscribed;
};

export const isCustomerSubscribedToBlendPro = (customer: Stripe.Customer | Stripe.DeletedCustomer | null) =>
  !!(customer && !customer.deleted && getBlendProSubscription(customer));

export const getCustomerPortalSession = (customer: Stripe.Customer, returnUrl: string) =>
  stripe.billingPortal.sessions.create({
    customer: customer.id,
    return_url: returnUrl,
  });

export const hasCustomerSubscribedBefore = (subscriptions: Stripe.Subscription[], productCode: string) =>
  subscriptions.some((subscription) => subscription.items.data.some((item) => item.price.product === productCode));

export const createStripeSession = async (
  uid: string,
  email: string,
  name: string,
  origin: string,
  options?: { successUrl?: string; subscriptionType?: 'yearly' | 'monthly'; promoCode?: string },
) => {
  const priceCode = options?.subscriptionType === 'yearly' ? YEARLY_PRICE_CODE : MONTHLY_PRICE_CODE;
  console.log(`Fetching Stripe customer ID for user ${uid}`);
  const stripeCustomerIdRef = firebaseDb.ref(`/users/${uid}/private/stripeCustomerId`);

  const promoCodesPromise = options?.promoCode
    ? stripeClient.promotionCodes.list({ code: options.promoCode, active: true })
    : Promise.resolve({ data: [] });
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
    await cancelPreviouslyOpenedSessionsForCustomer(customer.id);
  }

  const hadBlendProBefore = hasCustomerSubscribedBefore(allSubscriptions, PRODUCT_CODE);
  if (!hadBlendProBefore) {
    subscriptionData = {
      trial_period_days: 7,
    };
  }

  console.log(`Customer is ${subscriptionData.trial_period_days ? '' : 'not '}eligible for a free trial.`);
  console.log('Creating Stripe session');

  // NOTE: If we use further restrictions on promo codes in the future besides first time customers only we probably need to validate it here. It is bullshit that the Stripe API doesn't allow us to take a customer and code and just return a boolean if it's valid.
  const promoCode = (await promoCodesPromise).data.filter((promoCode) => !hadBlendProBefore || !promoCode.restrictions.first_time_transaction).pop();

  const session = await stripeClient.checkout.sessions.create({
    customer: customer.id,
    billing_address_collection: 'auto',
    line_items: [
      {
        price: priceCode,
        quantity: 1,
      },
    ],
    subscription_data: subscriptionData,
    allow_promotion_codes: promoCode ? undefined : true,
    discounts: promoCode ? [{ promotion_code: promoCode.id }] : undefined,
    mode: 'subscription',
    success_url: `${options?.successUrl ?? `${origin}/blendPro/success?subscription_checkout_status=success?session_id={CHECKOUT_SESSION_ID}`}`,
    cancel_url: `${origin}/account/?subscription_checkout_status=cancel`,
    custom_text: {
      submit: {
        message: `Prefer to pay ${options?.subscriptionType === 'yearly' ? 'monthly' : 'yearly'}? [Click here](${origin}/account?action=upgrade&subscriptionType=${options?.subscriptionType === 'yearly' ? 'monthly' : 'yearly'})`,
      },
    },
    // Enable the below if we need to collect sales tax in the future
    // automatic_tax: { enabled: true },
    // customer_update: { address: 'auto' }
  });
  console.log(`Stripe session created: ${session.id}`);
  return session;
};

const cancelPreviouslyOpenedSessionsForCustomer = async (customerId: string) => {
  const checkoutSessions = await stripe.checkout.sessions.list({
    customer: customerId,
    status: 'open',
  });
  await Promise.all(checkoutSessions.data.map((session) => stripe.checkout.sessions.expire(session.id)));
};

export const deleteStripeCustomer = async (uid: string) => {
  const customerId = (await db.ref(`/users/${uid}/private/stripeCustomerId`).once('value')).val();
  if (!customerId) {
    console.warn(`No Stripe customer found for user ${uid}`);
    return;
  }
  await stripe.customers.del(customerId);
};
