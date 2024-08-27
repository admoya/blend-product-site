import firebaseAdmin from 'firebase-admin';
import firebaseAdminCredential, { databaseURL } from '$lib/server/firebaseAdminCredential';
import { error, type Cookies, type RequestEvent, redirect } from '@sveltejs/kit';
import type { ThenableReference } from 'firebase-admin/database';
import type { DecodedIdToken, UserIdentifier, UserRecord } from 'firebase-admin/auth';
if (!firebaseAdmin.apps.length) {
  firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(firebaseAdminCredential),
    databaseURL,
  });
}

export const db = firebaseAdmin.database();
export const auth = firebaseAdmin.auth();

export const verifySessionCookie = (cookie: string) => auth.verifySessionCookie(cookie);

type CheckSessionAuthOptions = {
  loginRedirect?: string;
  authFunction?: (decodedToken: DecodedIdToken) => Promise<boolean> | boolean;
};
/**
 * Validates a request's session cookie and redirects to the login page if it is missing or invalid, or if the user fails an optional validator function.
 * @param cookies the "cookies" object passed to Sveltekit server-side functions
 * @param options.loginRedirect the "successRedirect" that should be passed to the login page (Will be encoded as a URI component)
 * @param options.authFunction after the session is validated, this will be called with the decoded token and awaited. Return value determines if the user is authorized or not.
 * @returns a DecodedIdToken from Firebase
 */
export const checkSessionAuth = async (cookies: Cookies, options: CheckSessionAuthOptions = {}) => {
  const { loginRedirect, authFunction } = options;
  const successRedirect = loginRedirect ? `/login?successRedirect=${encodeURIComponent(loginRedirect.replace('?', '&'))}` : '/login';
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

export const isUserGlobalAdmin = async (uid: string) => {
  return !!(await readPath(`organizations/0000/private/members/${uid}`));
};

export const isUserOrganizationAdmin = async (uid: string, organization: Database.Organization) =>
  organization.private?.members?.[uid]?.role === 'admin' || (await isUserGlobalAdmin(uid));

export const getUserOrganizations = async (uid: string) => {
  if (await isUserGlobalAdmin(uid)) return Object.keys((await readPath('organizations')) ?? {});
  const orgList = (await readPath<string[]>(`users/${uid}/protected/organizations`)) ?? [];
  return (
    await Promise.all(
      orgList.map(async (orgID) => {
        if (await readPath(`organizations/${orgID}/private/members/${uid}`)) return orgID;
        return null;
      }),
    )
  ).filter((id): id is Exclude<string, null> => !!id);
};

export const getOrganizationInfo = async (organizationId: string) => readPath<Database.Organization.Public>(`organizations/${organizationId}/public`);
export const getOrganizationDecks = async (organizationId: string) => readPath<Database.Decks.Organization>(`decks/organization/${organizationId}`);
export const getOrganizationPlaylists = async (organizationId: string) =>
  readPath<Database.Playlists.Organization>(`playlists/organization/${organizationId}`);

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

export const getOrganizationInviteRequestDetails = async (organization: Database.Organization) => {
  const { inviteRequests = {} } = organization.private ?? {};
  return await Promise.all(
    Object.entries(inviteRequests).map(async ([uid, request]) => {
      const userData = await getUserData(uid);
      return {
        ...request,
        displayName: userData.displayName,
        email: userData.email,
        uid,
      };
    }),
  );
};

export const deleteOrganizationInvites = async (inviteIds: string[], organizationId: string, organization: Database.Organization) => {
  if (!inviteIds) throw error(400, 'Missing required array of invite IDs');

  await Promise.all([
    writePath(
      `/organizations/${organizationId}/private/invites`,
      organization.private?.invites?.filter((i) => !inviteIds.includes(i)),
    ),
    ...inviteIds.map((id) => deletePath(`/invites/organization/${id}`)),
  ]);
};

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
export const getUserDataByEmail = (email: string) => auth.getUserByEmail(email);
export const listAllUsers = async (nextPageToken?: string): Promise<UserRecord[]> => {
  const { users, pageToken } = await auth.listUsers(1000, nextPageToken);
  if (pageToken) {
    const nextUsers = await listAllUsers(pageToken);
    return [...users, ...nextUsers];
  }
  return users;
};
export const getUserFromEmail = (email: string) => auth.getUserByEmail(email);

export const deleteUser = async (uid: string) => {
  const userOrgs = await getUserOrganizations(uid);
  const orgDeletePromises = userOrgs.map((orgId) => deletePath(`organizations/${orgId}/private/members/${uid}`));
  await Promise.all([
    ...orgDeletePromises,
    deletePath(`users/${uid}`),
    deletePath(`decks/user/${uid}`),
    deletePath(`playlists/user/${uid}`),
    deletePath(`flags/user/${uid}`),
    auth.deleteUser(uid),
  ]);
};

export const readPath = async <T = any>(path: string, defaultValue: T | null = null) => {
  const ref = db.ref(path);
  const data = await ref.get();
  return (data.val() as T | null) ?? defaultValue;
};

export const writePath = async (path: string, data: any) =>
  new Promise<void>((resolve, reject) => {
    db.ref(path).set(data, (error) => {
      if (error) reject(error);
      else resolve();
    });
  });

export const pushPath = async (path: string, data: any) =>
  new Promise<ThenableReference>((resolve, reject) => {
    let reference = db.ref(path).push(data, (error) => {
      if (error) reject(error);
      else resolve(reference);
    });
  });

export const deletePath = async (path: string) =>
  new Promise<void>((resolve, reject) => {
    db.ref(path).remove((error) => {
      if (error) reject(error);
      else resolve();
    });
  });

const cache = new Map<string, any>();
/**
 * Reads data from a firebase path and caches it for a specified duration.
 * Improves best-case performance for data that can be safely cached.
 * In a serverless environment, if the function is cold-started, the cache will be empty, but subsequent calls will be faster.
 * @param path the firebase path of the data
 * @param duration the duration in milliseconds to cache the data. Default is 60000 (1 minute).
 * @returns the data from the path
 */
export const readPathWithCache = async <T>(path: string, duration: number = 60000): Promise<T | null> => {
  if (cache.has(path)) return cache.get(path);

  const data = await readPath(path);
  cache.set(path, data);
  setTimeout(() => {
    cache.delete(path);
  }, duration);
  return data;
};
