import { checkSessionAuth, getOrganizationPublicInfo, getOrganizationMemberMetadata, isUserGlobalAdmin, readPath } from '$lib/server/firebaseUtils';
import { json, error } from '@sveltejs/kit';

export const GET = async ({ cookies, params }) => {
  await checkSessionAuth(cookies, { authFunction: ({ uid }) => isUserGlobalAdmin(uid) });

  const organizationId = params.organizationId;

  const organization = await readPath<Database.Organization>(`/organizations/${organizationId}`);
  if (!organization) {
    throw error(404, 'Organization not found');
  }

  const members = await getOrganizationMemberMetadata(organization);
  console.log(members);
  return json(members);
};
