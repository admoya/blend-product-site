import { auth, readPath } from '$lib/server/firebaseUtils';
import { validate } from 'email-validator';
import type { RequestHandler } from './$types';

export type ValidationRequestBody = {
  newMembers: Database.Organization.NewMember[];
  orgId: string;
};
export const POST: RequestHandler = async ({ request }) => {
  const { newMembers, orgId }: ValidationRequestBody = await request.json();
  const organizationPrivateData = await readPath<Database.Organization.Private>(`/organizations/${orgId}/private`);
  const validatedMembers = await Promise.all(
    newMembers.map(async ({ email, error, name, status, validated }) => {
      if (validated)
        return {
          email,
          error,
          name,
          status,
          validated,
        };
      if (!validate(email))
        return {
          email,
          error: true,
          name,
          status: 'Invalid Email',
        };
      try {
        const user = await auth.getUserByEmail(email);
        const isAlreadyMember = !!organizationPrivateData?.members[user.uid];
        return {
          email,
          name: name || user.displayName,
          error: error || isAlreadyMember,
          status: isAlreadyMember ? 'Already in Organization' : 'Blend User',
          validated: true,
        };
      } catch {
        return {
          email,
          name,
          error,
          status: 'Not Blend User',
          validated: true,
        };
      }
    }),
  );
  return new Response(JSON.stringify(validatedMembers));
};
