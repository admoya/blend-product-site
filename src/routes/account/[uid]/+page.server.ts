import type { Actions, PageServerLoad } from "./$types";
import { error, redirect } from "@sveltejs/kit";
import { stripeClient, firebaseDb, getStripeCustomerWithSubscriptions, getBlendProSubscription, PRICE_CODE, getCustomerPortalSession } from "$lib/server/subscriptionUtils";

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
        const stripeCustomerIdRef = firebaseDb.ref(`/users/${uid}/private/stripeCustomerId`);
        let customer = await getStripeCustomerWithSubscriptions(uid);
        if (!customer || customer.deleted) {
            console.log(`No Stripe customer exists for user ${uid}, creating one`);
            customer = await stripeClient.customers.create({
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
        const session = await stripeClient.checkout.sessions.create({
            customer: customer.id,
            billing_address_collection: 'auto',
            line_items: [
                {
                    price: PRICE_CODE,
                    quantity: 1,
                },
            ],
            subscription_data: {
                trial_period_days: 30,
            },
            mode: 'subscription',
            success_url: `${origin}/account/${uid}?subscription_checkout_status=success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${origin}/account/${uid}?subscription_checkout_status=cancel`,
            // Enable the below if we need to collect sales tax in the future
            // automatic_tax: { enabled: true },
            // customer_update: { address: 'auto' }
        });
        console.log(`Stripe session created: ${session.id}`);
        throw redirect(303, session.url!);
    },
    redirectToCustomerPortal: async ({url, params: {uid}}) => {
        console.log(`Redirecting to customer billing portal for user ${uid}`);
        const customer = await getStripeCustomerWithSubscriptions(uid);
        if (!customer || customer.deleted) {
            console.error(`Stripe customer for ${uid} does not exist or is deleted. Aborting.`);
            throw error(400, `Stripe customer for ${uid} does not exist`);
        }
        const session = await getCustomerPortalSession(customer, url.href.replace(url.search, ''))
        throw redirect(303, session.url);
    }
} satisfies Actions;