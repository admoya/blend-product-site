import { checkSessionAuth, getUserOrganizationIds, readPath, weaklyAuthenticate, writePath } from '$lib/server/firebaseUtils';
import { error, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params: { organizationId }, cookies, url }) => {
  const { uid } = await checkSessionAuth(cookies, { loginRedirect: `/organization/join/${organizationId}` });
  const publicOrgDetails = await readPath<Database.Organization.Public>(`/organizations/${organizationId}/public`);
  if (!publicOrgDetails) throw error(404);

  // Before proceeding, check if the user is invited to the org, and if so redirect them to the invite page.
  const existingInviteKeys = await readPath<string[]>(`/organizations/${organizationId}/private/invites/`, []);
  if (existingInviteKeys) {
    await Promise.all(
      existingInviteKeys.map(async (key) => {
        const invite = await readPath<Database.Invite.Organization>(`/invites/organization/${key}`);
        if (invite?.inviteeUid === uid) throw redirect(302, `/organization/invite/${key}`);
      }),
    );
  }

  const existingRequestPromise = readPath<Database.Organization.InviteRequest>(`/organizations/${organizationId}/private/inviteRequests/${uid}`);
  const existingMemberPromise = getUserOrganizationIds(uid).then((orgs) => orgs.includes(organizationId));
  const [existingRequest, existingMember] = await Promise.all([existingRequestPromise, existingMemberPromise]);

  const message = url.searchParams.get('message');

  return { organizationName: publicOrgDetails.name, message, alreadyRequested: !!existingRequest, alreadyMember: existingMember };
};

export const actions: Actions = {
  default: async ({ cookies, params: { organizationId }, request }) => {
    const message = ((await request.formData()).get('message') as string) ?? '';

    // It should be impossible to have loaded the page without being logged in, but maybe if the page had been sitting open for a long time the session may have been invalidated.
    // Note that we preserve the message submitted in the redirect query param, so the user won't have to enter it again.
    const { uid, email } = await checkSessionAuth(cookies, {
      loginRedirect: `/organization/join/${organizationId}?message=${message}`,
    });

    await writePath(`/organizations/${organizationId}/private/inviteRequests/${uid}`, { timestamp: Date.now(), message });
  },
};
