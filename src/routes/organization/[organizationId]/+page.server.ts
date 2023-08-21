import { authenticate, checkSessionAuth, getUsers, readPath, verifySessionCookie } from '$lib/server/firebaseUtils.js';
import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types.js';

export const load = (async ({ cookies, params: { organizationId }, url }) => {
  const organization: Database.Organization = await readPath(`/organizations/${organizationId}`);
  if (!organization) throw error(404);
  const { members = {} } = organization.private ?? {};
  await checkSessionAuth(cookies, {
    loginRedirect: url.pathname,
    authFunction: async ({ uid }) => (members[uid]?.role === 'admin')
  });

  const memberUids = Object.keys(members).map((uid) => ({ uid }));
  return { members: JSON.stringify((await getUsers(memberUids)).users) };
}) satisfies PageServerLoad;
