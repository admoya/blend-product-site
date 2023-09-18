import { deletePath, isUserOrganizationAdmin, readPath, verifySessionCookie, writePath } from '$lib/server/firebaseUtils';
import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const DELETE: RequestHandler = async ({ cookies, params: { organizationId }, request }) => {
  const { uid } = await verifySessionCookie(cookies.get('session') || '');
  const organization = await readPath<Database.Organization>(`/organizations/${organizationId}`);
  if (!organization) throw error(404);
  if (!(await isUserOrganizationAdmin(uid, organization))) throw error(401);

  const uids: string[] = await request.json();
  await Promise.all([
    uids.map(async (uid) => {
      const userOrgs = (await readPath<string[]>(`/users/${uid}/protected/organizations`)) ?? [];
      return writePath(
        `/users/${uid}/protected/organizations`,
        userOrgs.filter((orgId) => orgId !== organizationId),
      );
    }),
    uids.map((uid) => deletePath(`/organizations/${organizationId}/private/members/${uid}`)),
  ]);

  return new Response();
};
