import firebaseAdmin from 'firebase-admin';
import firebaseAdminCredential, { databaseURL } from '$lib/server/firebaseAdminCredential';
import { error, type Cookies, type RequestEvent, redirect } from '@sveltejs/kit';
import type { UserIdentifier } from 'firebase-admin/lib/auth/identifier';
import type { DecodedIdToken } from 'firebase-admin/lib/auth/token-verifier';
if (!firebaseAdmin.apps.length) {
  firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(firebaseAdminCredential),
    databaseURL,
  });
}

const db = firebaseAdmin.database();
export const auth = firebaseAdmin.auth();

export const verifySessionCookie = (cookie: string) => auth.verifySessionCookie(cookie);

type CheckSessionAuthOptions = {
  loginRedirect?: string;
  authFunction?: (decodedToken: DecodedIdToken) => Promise<boolean> | boolean;
};
/**
 * Validates a request's session cookie and redirects to the login page if it is missing or invalid, or if the user fails an optional validator function.
 * @param cookies the "cookies" object passed to Sveltekit server-side functions
 * @param options.loginRedirect the "successRedirect" that should be passed to the login page (do not URL encode)
 * @param options.authFunction after the session is validated, this will be called with the decoded token and awaited. Return value determines if the user is authorized or not.
 * @returns
 */
export const checkSessionAuth = async (cookies: Cookies, options: CheckSessionAuthOptions = {}) => {
  const { loginRedirect, authFunction } = options;
  const successRedirect = loginRedirect ? `/login?successRedirect=${encodeURIComponent(loginRedirect)}` : '/login';
  const sessionCookie = cookies.get('session');
  // If there is no cookie, they are not logged in
  if (!sessionCookie) throw redirect(302, successRedirect);
  let decodedToken: DecodedIdToken;
  try {
    decodedToken = await verifySessionCookie(sessionCookie);
  } catch {
    // If there is an issue verifying the session, redirect to login
    throw redirect(302, successRedirect);
  }
  if (!authFunction || (await authFunction(decodedToken))) return decodedToken;
  throw error(401, 'Unauthorized');
};

export const getUsers = (uids: UserIdentifier[]) => auth.getUsers(uids);

export const getOrganizationMemberDetails = async (organization: Database.Organization) => {
  const { members = {} } = organization.private ?? {};
  const memberUids = Object.keys(members).map((uid) => ({ uid }));
  const { users } = await getUsers(memberUids); // TODO: check what happens if a user deletes their account but is still here
  return users.map(({ displayName = '', email = '', uid }) => ({
    displayName,
    email,
    uid,
    role: members[uid].role,
  })) as Database.Organization.MemberDetails[];
};

export const getOrganizationInviteDetails = async (organization: Database.Organization) => {
  const { invites = [] } = organization.private ?? {};
  return (
    await Promise.all(
      invites.map(async (inviteId) => {
        const invite = await readPath<Database.Invite.Organization>(`invites/organization/${inviteId}`);
        if (!invite) {
          console.error(`Null invite found in org: ${organization.public.name}. Invite id: ${inviteId}`);
          return null;
        }
        const details: Database.Invite.InviteDetails = {
          ...invite,
          id: inviteId,
          displayName: invite.inviteeUid ? (await getUserData(invite.inviteeUid)).displayName : undefined,
        };
        return details;
      }),
    )
  ).filter((inv): inv is Exclude<typeof inv, null> => inv !== null);
};

export const deleteOrganizationInvites = async (inviteIds: string[], organizationId: string, organization: Database.Organization) => {
  if (!inviteIds) throw error(400, 'Missing required array of invite IDs');

  await Promise.all([
    writePath(
      `/organizations/${organizationId}/private/invites`,
      organization.private.invites.filter((i) => !inviteIds.includes(i)),
    ),
    ...inviteIds.map((id) => deletePath(`/invites/organization/${id}`)),
  ]);
}

export const authenticate = async (event: RequestEvent) => {
  const authHeader = event.request.headers.get('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ') || !authHeader.replace('Bearer ', '')) {
    throw error(401, 'Missing or invalid Authorization header');
  }
  const idToken = authHeader.replace('Bearer ', '');
  try {
    return await auth.verifyIdToken(idToken);
  } catch {
    throw error(401, 'Invalid idToken');
  }
};

export const weaklyAuthenticate = async (event: RequestEvent) => {
  try {
    const result = await authenticate(event);
    return result;
  } catch {
    return null;
  }
};

export const getUserData = (uid: string) => auth.getUser(uid);

export const getUserFromEmail = (email: string) => auth.getUserByEmail(email);

export const readPath = async <T = any>(path: string, defaultValue: T | null = null) => {
  const ref = db.ref(path);
  const data = await ref.get();
  return (data.val() as T | null) ?? defaultValue;
};

export const writePath = async (path: string, data: any) => db.ref(path).set(data);

export const pushPath = async (path: string, data: any) => db.ref(path).push(data);

export const deletePath = async (path: string) => db.ref(path).remove();
