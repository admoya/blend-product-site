import { auth, getOrganizationInviteDetails, readPath } from '$lib/server/firebaseUtils';
import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export type ValidationRequestBody = Database.Invite.Validation[];
export const POST: RequestHandler = async ({ request, params }) => {
  const { organizationId } = params;
  const newMembers: ValidationRequestBody = await request.json();
  const organization = await readPath<Database.Organization>(`/organizations/${organizationId}`);
  if (!organization) throw error(404, 'Organization not found');
  const inviteDetails = await getOrganizationInviteDetails(organization);
  const validatedMembers = await Promise.all(
    newMembers.map(async (memberData) => {
      const { email, validated } = memberData;
      if (validated) return memberData;
      try {
        const { displayName, uid } = await auth.getUserByEmail(email);
        const isAlreadyInOrganization = !!organization.private?.members?.[uid] || !!inviteDetails.find(({ inviteeUid }) => inviteeUid === uid);
        return {
          ...memberData,
          name: displayName,
          error: isAlreadyInOrganization,
          status: isAlreadyInOrganization ? 'Already in Organization' : 'Blend User',
          validated: true,
          uid,
        };
      } catch (ex: any) {
        if (ex?.code === 'auth/user-not-found')
          return {
            ...memberData,
            status: 'Not Blend User',
            validated: true,
          };
        console.error(`Error validating user with email: ${email}: ${ex}`);
        return {
          ...memberData,
          status: 'Validation Error',
          validated: false,
          error: true,
        };
      }
    }),
  );
  return new Response(JSON.stringify(validatedMembers));
};
