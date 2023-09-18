import {
  checkSessionAuth,
  getOrganizationInviteDetails,
  getOrganizationMemberDetails,
  isUserGlobalAdmin,
  isUserOrganizationAdmin,
  readPath,
} from '$lib/server/firebaseUtils.js';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types.js';

export const load = (async ({ cookies, params: { organizationId }, url }) => {
  const organization = await readPath<Database.Organization>(`/organizations/${organizationId}`);
  if (!organization) throw error(404);
  await checkSessionAuth(cookies, {
    loginRedirect: url.pathname,
    authFunction: async ({ uid }) => await isUserOrganizationAdmin(uid, organization),
  });
  return {
    memberDetails: JSON.stringify(await getOrganizationMemberDetails(organization)),
    inviteDetails: JSON.stringify(await getOrganizationInviteDetails(organization)),
  };
}) satisfies PageServerLoad;
