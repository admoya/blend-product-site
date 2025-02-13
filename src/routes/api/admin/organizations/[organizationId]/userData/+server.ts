import { checkSessionAuth, getOrganizationInfo, getOrganizationMemberMetadata, isUserGlobalAdmin } from '$lib/server/firebaseUtils';
import { json, error } from '@sveltejs/kit';

export const GET = async ({ cookies, params }) => {
  await checkSessionAuth(cookies, { authFunction: ({ uid }) => isUserGlobalAdmin(uid) });

  const organizationId = params.organizationId;
  
  const organization = await getOrganizationInfo(organizationId);
  if (!organization) {
    throw error(404, 'Organization not found');
  }

  const members = await getOrganizationMemberMetadata(organization);
  return json(members);
};
