import {
  checkSessionAuth,
  getOrganizationInviteDetails,
  getOrganizationInviteRequestDetails,
  getOrganizationMemberDetails,
  isUserOrganizationAdmin,
  readPath,
  storageBucket,
  writePath,
} from '$lib/server/firebaseUtils.js';
import { error } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types.js';

export const load = (async ({ cookies, params: { organizationId }, url }) => {
  const organization = await readPath<Database.Organization>(`/organizations/${organizationId}`);
  if (!organization) throw error(404);
  await checkSessionAuth(cookies, {
    loginRedirect: url.pathname,
    authFunction: async ({ uid }) => await isUserOrganizationAdmin(uid, organization),
  });
  return {
    memberDetails: await getOrganizationMemberDetails(organization),
    inviteDetails: await getOrganizationInviteDetails(organization),
    inviteRequestDetails: await getOrganizationInviteRequestDetails(organization),
  };
}) satisfies PageServerLoad;

export const actions: Actions = {
  updateLogo: async ({ cookies, params: { organizationId }, request }) => {
    const organization = await readPath<Database.Organization>(`/organizations/${organizationId}`);
    if (!organization) throw error(404);
    await checkSessionAuth(cookies, {
      authFunction: async ({ uid }) => await isUserOrganizationAdmin(uid, organization),
    });
    const logo = (await request.formData()).get('logo');
    if (!logo || !(logo instanceof File)) throw error(400, 'No logo provided');
    await storageBucket.file(`/organization/${organizationId}/logo`).save(Buffer.from(await logo.arrayBuffer()), {
      metadata: { contentType: logo.type, cacheControl: 'public, max-age=604800' },
      public: true,
    });
    await writePath(
      `/organizations/${organizationId}/public/logoUrl`,
      `${storageBucket.file(`/organization/${organizationId}/logo`).publicUrl()}?cb=${Date.now()}`,
    );
    return { status: 201 };
  },
};
