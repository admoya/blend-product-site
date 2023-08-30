import Stripe from 'stripe';
import { STRIPE_SECRET_KEY, STRIPE_BLEND_PRO_PRICE_CODE, STRIPE_BLEND_PRO_PRODUCT_CODE } from '$env/static/private';
const stripe = new Stripe(STRIPE_SECRET_KEY, {
  apiVersion: '2022-11-15',
});
import firebaseAdmin from 'firebase-admin';
import firebaseAdminCredential, { databaseURL } from '$lib/server/firebaseAdminCredential';
import { readPath } from './firebaseUtils';
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
  const userOrgs = await readPath<Database.User.Protected["organizations"]>(`users/${uid}/protected/organizations`);
  if (!userOrgs) return false;
  try {
    return await Promise.any(userOrgs.map(async (orgId) => {
      const membership = await readPath(`organizations/${orgId}/private/members/${uid}`);
      if (membership) return true;
      throw false;
    }));
  } catch {
    return false;
  }
}

export const isSubscribedToBlendPro = (customer: Stripe.Customer | Stripe.DeletedCustomer | null) =>
  !!(customer && !customer.deleted && getBlendProSubscription(customer));

export const getCustomerPortalSession = (customer: Stripe.Customer, returnUrl: string) =>
  stripe.billingPortal.sessions.create({
    customer: customer.id,
    return_url: returnUrl,
  });

export const hasCustomerSubscribedBefore = (subscriptions: Stripe.Subscription[], productCode: string) =>
  subscriptions.some((subscription) => subscription.items.data.some((item) => item.price.product === productCode));
