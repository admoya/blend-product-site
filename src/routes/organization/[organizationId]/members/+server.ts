import { checkSessionAuth, deletePath, isUserOrganizationAdmin, readPath, verifySessionCookie, writePath } from '$lib/server/firebaseUtils';
import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const DELETE: RequestHandler = async ({ cookies, params: { organizationId }, request }) => {
  const { uid } = await verifySessionCookie(cookies.get('session') || '');
  const organization = await readPath<Database.Organization>(`/organizations/${organizationId}`);
  if (!organization) throw error(404);
  if (!(await isUserOrganizationAdmin(uid, organization))) throw error(401);

  const uids: string[] = await request.json();
  await Promise.all([
    ...uids.map(async (uid) => {
      const userOrgs = (await readPath<string[]>(`/users/${uid}/protected/organizations`)) ?? [];
      return writePath(
        `/users/${uid}/protected/organizations`,
        userOrgs.filter((orgId) => orgId !== organizationId),
      );
    }),
    ...uids.map((uid) => deletePath(`/organizations/${organizationId}/private/members/${uid}`)),
  ]);

  return new Response();
};

/*
 * Adds a member to an organization. Updates both the user's organizations list and the organization's members list. Deletes any open invites for that user to this organization.
 * At this time, this is only used for accepting invite requests from the organization admin page.
 */
export const POST: RequestHandler = async ({ cookies, params: { organizationId }, request }) => {
  const organization = await readPath<Database.Organization>(`/organizations/${organizationId}`);
  if (!organization) throw error(404);
  await checkSessionAuth(cookies, {
    authFunction: async ({ uid }) => await isUserOrganizationAdmin(uid, organization),
  });

  const { uids } = (await request.json()) as { uids: string[] };
  if (!uids) throw error(400, 'Missing required parameter: uids');
  if (!Array.isArray(uids)) throw error(400, 'uids must be an array');
  await Promise.all(
    uids.map(async (uid) => {
      // Update the user's entry with the organization
      const existingOrgs = (await readPath<Database.User.Protected['organizations']>(`/users/${uid}/protected/organizations`)) ?? [];
      await writePath(`/users/${uid}/protected/organizations`, Array.from(new Set(existingOrgs).add(organizationId)));
      // Add to the organization's members
      await writePath(`/organizations/${organizationId}/private/members/${uid}`, { role: 'member' });
      await writePath(`/organizations/${organizationId}/private/inviteRequests/${uid}`, null);
    }),
  );
  return new Response(null, { status: 201 });
};
