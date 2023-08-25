import { deleteOrganizationInvites, pushPath, readPath, verifySessionCookie, writePath } from '$lib/server/firebaseUtils';
import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ cookies, params: { organizationId }, request }) => {
  const { uid } = await verifySessionCookie(cookies.get('session') || '');
  const organization = await readPath<Database.Organization>(`/organizations/${organizationId}`);
  if (!organization) throw error(404);
  if (organization.private.members[uid]?.role !== 'admin') throw error(401);

  const newMembers: Database.Invite.Validation[] = await request.json();
  if (!newMembers) throw error(400, 'Missing required array of new members');

  const invites = await Promise.all(
    newMembers.map(({ email, uid, name }) => {
      const invite = {
        orgId: organizationId,
        inviteeEmail: email,
        inviteeName: name ?? null,
        inviteeUid: uid ?? null,
      };
      return pushPath('/invites/organization', invite);
    }),
  );
  const existingInviteKeys = organization.private.invites ?? [];
  const newInviteKeys = invites.map(({ key }) => key);
  await writePath(`/organizations/${organizationId}/private/invites`, [...existingInviteKeys, ...newInviteKeys]);
  return new Response(JSON.stringify(newInviteKeys), { status: 201 });
};

export const DELETE: RequestHandler = async ({ cookies, params: { organizationId }, request }) => {
  const { uid } = await verifySessionCookie(cookies.get('session') || '');
  const organization = await readPath<Database.Organization>(`/organizations/${organizationId}`);
  if (!organization) throw error(404);
  if (organization.private.members[uid]?.role !== 'admin') throw error(401);

  const inviteIds: string[] = await request.json();
  if (!inviteIds) throw error(400, 'Missing required array of invite IDs');

  await deleteOrganizationInvites(inviteIds, organizationId, organization);

  return new Response();
};
