import type { Actions, PageServerLoad } from "./$types";
import Stripe from 'stripe';
import { STRIPE_SECRET_KEY } from '$env/static/private';
const stripe = new Stripe(STRIPE_SECRET_KEY, {
  apiVersion: '2022-11-15',
});
import firebaseAdmin from 'firebase-admin';
import firebaseAdminCredential from "$lib/server/firebaseAdminCredential";
import { error, redirect } from "@sveltejs/kit";
if (!firebaseAdmin.apps.length) {
  firebaseAdmin.initializeApp({
      credential: firebaseAdmin.credential.cert(firebaseAdminCredential),
      databaseURL: 'https://csma-blend-default-rtdb.firebaseio.com'
  });
}
const db = firebaseAdmin.database();

const getStripeCustomerWithSubscriptions = async (uid: string) => {
    const stripeCustomerId: string | null = (await db.ref(`/users/${uid}/private/stripeCustomerId`).once('value')).val();
    if (stripeCustomerId === null)
        return stripeCustomerId;
    return await stripe.customers.retrieve(stripeCustomerId, {
        expand: ['subscriptions']
    });
}
const getBlendProSubscription = (customer: Stripe.Customer) => customer.subscriptions?.data.find((subscription) => subscription.items.data.find(({plan: { product, active }}) => active && product === 'prod_NSYFxnG6hkBro8'));

export const load = (async ({ params: { uid } }) => {
    const customer = await getStripeCustomerWithSubscriptions(uid);
    if (!customer || customer.deleted) {
        return {
            isSubscribedToBlendPro: false,
            subscriptionPeriodEnd: 0,
            subscriptionPendingCancellation: false
        }
    }
    const subscription = getBlendProSubscription(customer);
    return {
        isSubscribedToBlendPro: !!subscription,
        subscriptionPeriodEnd: subscription?.current_period_end ?? 0,
        subscriptionPendingCancellation: subscription?.cancel_at_period_end
    }
}) satisfies PageServerLoad

export const actions = {
    createSubscriptionOrder: async ( { request, params: { uid }, url: { origin } }, ) => {
        const data = await request.formData();
        console.log(`Fetching Stripe customer ID for user ${uid}`);
        const stripeCustomerIdRef = db.ref(`/users/${uid}/private/stripeCustomerId`);
        let customer = await getStripeCustomerWithSubscriptions(uid);
        if (!customer || customer.deleted) {
            console.log(`No Stripe customer exists for user ${uid}, creating one`);
            customer = await stripe.customers.create({
                email: data.get('email')! as string,
                name: data.get('name')! as string,
                metadata: { uid }
                });
            await stripeCustomerIdRef.set(customer.id);
        } else {
            console.log(`Customer already exists for user ${uid}`);
            if (getBlendProSubscription(customer)) {
                console.error(`User ${uid} is already subscribed to Blend Pro, aborting`);
                throw error(400, "Customer is already subscribed to Blend Pro!");
            }
        }
        console.log("Creating Stripe session");
        const session = await stripe.checkout.sessions.create({
            customer: customer.id,
            billing_address_collection: 'auto',
            line_items: [
                {
                    price: 'price_1Mhd96L7q6D0NeacKVGPhbmh',
                    // For metered billing, do not pass quantity
                    quantity: 1,
                },
            ],
            mode: 'subscription',
            success_url: `${origin}/account/${uid}?subscription_checkout_status=success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${origin}/account/${uid}?subscription_checkout_status=cancel`,
            // Enable the below if we need to collect sales tax in the future
            // automatic_tax: { enabled: true },
            // customer_update: { address: 'auto' }
        });
        throw redirect(303, session.url!);
    },
    cancelSubscription: async ({ params: { uid }}) => {
        console.log(`Canceling subscription for user ${uid}`);
        const customer = await getStripeCustomerWithSubscriptions(uid);
        if (!customer || customer.deleted) {
            console.error(`Stripe customer for ${uid} does not exist or is deleted. Aborting.`);
            throw error(400, `Stripe customer for ${uid} does not exist`);
        }
        const subscription = getBlendProSubscription(customer);
        if (!subscription) {
            console.error(`No active Blend Pro subscriptions for user ${uid}, aborting.`);
            throw error(400, `No active Blend Pro subscriptions for user ${uid}`);
        }
        await stripe.subscriptions.update(subscription.id, { cancel_at_period_end: true })
    },
    reactivateSubscription: async ({ params: { uid }}) => {
        console.log(`Reactivating subscription for user ${uid}`);
        const customer = await getStripeCustomerWithSubscriptions(uid);
        if (!customer || customer.deleted) {
            console.error(`Stripe customer for ${uid} does not exist or is deleted. Aborting.`);
            throw error(400, `Stripe customer for ${uid} does not exist`);
        }
        const subscription = getBlendProSubscription(customer);
        if (!subscription) {
            console.error(`No active Blend Pro subscriptions for user ${uid}, aborting.`);
            throw error(400, `No active Blend Pro subscriptions for user ${uid}`);
        }
        await stripe.subscriptions.update(subscription.id, { cancel_at_period_end: false })
    }
} satisfies Actions;