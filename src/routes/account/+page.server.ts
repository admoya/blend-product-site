import type { Actions, PageServerLoad } from './$types';
import { error, redirect } from '@sveltejs/kit';
import {
  getStripeCustomerWithSubscriptions,
  getBlendProSubscription,
  getCustomerPortalSession,
  createStripeSession,
  isSubscribedToBlendPro,
  isOrganizationMember,
} from '$lib/server/subscriptionUtils';
import { auth, checkSessionAuth, getUserData, getUserOrganizations, isUserGlobalAdmin, readPath, writePath } from '$lib/server/firebaseUtils';

export const load = (async ({ url, cookies }) => {
  const uid = (
    await checkSessionAuth(cookies, {
      loginRedirect: `${url.searchParams ? `account&${url.searchParams.toString()}` : 'account'}`,
    })
  ).uid;

  const actionParam = url.searchParams.get('action') ?? '';
  const redirectParam = url.searchParams.get('successRedirect') ?? '';
  const userData = await getUserData(uid);
  const email = userData.email!;
  const name = userData.displayName ?? 'Blend User';
  const isGlobalAdmin = isUserGlobalAdmin(uid);
  const orgIds = await getUserOrganizations(uid);
  const organizations = await Promise.all(
    orgIds.map(async (orgId) => {
      const organization = await readPath<Database.Organization>(`/organizations/${orgId}`);
      return {
        id: orgId,
        name: organization?.public.name,
        role: (await isGlobalAdmin) ? 'admin' : organization?.private?.members?.[uid]?.role,
      };
    }),
  );
  const customer = await getStripeCustomerWithSubscriptions(uid);

  // Redirect to Stripe Checkout if necessary
  if (actionParam && !isSubscribedToBlendPro(customer) && !(await isOrganizationMember(uid))) {
    const newParams = new URLSearchParams(url.search);
    newParams.delete('action');

    switch (actionParam) {
      case 'upgrade': {
        let successUrl;
        if (redirectParam) {
          const token = await auth.createCustomToken(uid);
          const appUrl = redirectParam === 'previewApp' ? 'https://preview-app.blendreading.com' : 'https://app.blendreading.com';
          successUrl = `${appUrl}?jumpScene=${encodeURIComponent(url.searchParams.get('jumpScene') || 'none')}${
            token ? `&loginToken=${encodeURIComponent(token)}` : ''
          }`;
        }
        const stripeSession = await createStripeSession(uid, email, name, url.origin, {
          successUrl,
          subscriptionType: newParams.get('subscriptionType') === 'yearly' ? 'yearly' : 'monthly',
          promoCode: newParams.get('promoCode') ?? undefined,
        });
        throw redirect(303, stripeSession.url!);
      }
      case 'choosePlan':
        throw redirect(303, `/account/plan?${newParams.toString()}`);
    }
  }

  if (!customer || customer.deleted) {
    return {
      isSubscribedToBlendPro: false,
      hasOrganizationMembership: organizations.length > 0,
      subscriptionPeriodEnd: 0,
      subscriptionPendingCancellation: false,
      organizations: JSON.stringify(organizations),
    };
  }
  const subscription = getBlendProSubscription(customer);

  return {
    isSubscribedToBlendPro: !!subscription,
    hasOrganizationMembership: organizations.length > 0,
    subscriptionPeriodEnd: subscription?.current_period_end ?? 0,
    subscriptionPendingCancellation: subscription?.cancel_at_period_end,
    organizations: JSON.stringify(organizations),
  };
}) satisfies PageServerLoad;

export const actions = {
  createSubscriptionOrder: async ({ request, url: { origin } }) => {
    const data = await request.formData();
    const stripeSession = await createStripeSession(data.get('uid')! as string, data.get('email')! as string, data.get('name')! as string, origin);
    throw redirect(303, stripeSession.url!);
  },
  redirectToCustomerPortal: async ({ request, url }) => {
    const data = await request.formData();
    const uid = data.get('uid')! as string;
    console.log(`Redirecting to customer billing portal for user ${uid}`);
    const customer = await getStripeCustomerWithSubscriptions(uid);
    if (!customer || customer.deleted) {
      console.error(`Stripe customer for ${uid} does not exist or is deleted. Aborting.`);
      throw error(400, `Stripe customer for ${uid} does not exist`);
    }
    const session = await getCustomerPortalSession(customer, url.href.replace(url.search, ''));
    throw redirect(303, session.url);
  },
  leaveOrganization: async ({ request }) => {
    const data = await request.formData();
    const orgId = data.get('orgId');
    const uid = data.get('uid') as string;
    const organization = await readPath<Database.Organization>(`/organizations/${orgId}`);
    if (!organization) throw error(404);
    const user = await readPath<Database.User>(`/users/${uid}`);
    await writePath(
      `/users/${uid}/protected/organizations`,
      user?.protected.organizations?.filter((id) => id !== orgId),
    );
    const orgMembers = organization.private?.members || {};
    await writePath(`/organizations/${orgId}/private/members`, {
      ...orgMembers,
      [uid]: null,
    });
  },
} satisfies Actions;
