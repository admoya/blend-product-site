import Stripe from 'stripe';
import { STRIPE_SECRET_KEY, STRIPE_BLEND_PRO_PRICE_CODE, STRIPE_BLEND_PRO_PRODUCT_CODE } from '$env/static/private';
const stripe = new Stripe(STRIPE_SECRET_KEY, {
  apiVersion: '2022-11-15',
});
import firebaseAdmin from 'firebase-admin';
import firebaseAdminCredential from "$lib/server/firebaseAdminCredential";
if (!firebaseAdmin.apps.length) {
    firebaseAdmin.initializeApp({
        credential: firebaseAdmin.credential.cert(firebaseAdminCredential),
        databaseURL: 'https://csma-blend-default-rtdb.firebaseio.com'
    });
}
const db = firebaseAdmin.database();

export const stripeClient = stripe;
export const firebaseDb = db;

export const PRICE_CODE = STRIPE_BLEND_PRO_PRICE_CODE;
export const PRODUCT_CODE = STRIPE_BLEND_PRO_PRODUCT_CODE;

export const getStripeCustomerWithSubscriptions = async (uid: string) => {
    const stripeCustomerId: string | null = (await db.ref(`/users/${uid}/private/stripeCustomerId`).once('value')).val();
    if (stripeCustomerId === null)
        return stripeCustomerId;
    return await stripe.customers.retrieve(stripeCustomerId, {
        expand: ['subscriptions']
    });
}
export const getBlendProSubscription = (customer: Stripe.Customer) => customer.subscriptions?.data.find((subscription) => subscription.items.data.find(({plan: { product, active }}) => active && product === STRIPE_BLEND_PRO_PRODUCT_CODE));

export const getCustomerPortalSession = (customer: Stripe.Customer, returnUrl: string) => stripe.billingPortal.sessions.create({
    customer: customer.id,
    return_url: returnUrl
})