import { listmonkClient } from '$lib/server/emailUtils.js';
import {
  checkSessionAuth,
  deleteUser,
  getOrganizationInfo,
  getUserData,
  getUserFromEmail,
  getUserOrganizations,
  isUserGlobalAdmin,
  listAllUsers,
  readPath,
} from '$lib/server/firebaseUtils';
import {
  deleteStripeCustomer,
  getAllCustomersWithSubscriptions,
  getStripeCustomerWithSubscriptions,
  isCustomerSubscribedToBlendPro,
} from '$lib/server/subscriptionUtils';
import { error, json } from '@sveltejs/kit';
import type { UserRecord } from 'firebase-admin/auth';

export interface UserSearchResult {
  displayName: string;
  email: string;
  uid: string;
  isSubscribedToBlendPro: boolean;
  accountCreated: string;
  lastLogin: string;
  lastRefresh: string;
  decks: Database.Decks.User;
  playlists: Database.Playlists.User;
  organizations: Database.Organization.Public[];
}

export interface AllUserData
  extends Array<{
    displayName: string;
    email: string;
    uid: string;
    isSubscribedToBlendPro: boolean;
    accountCreated: string;
    lastLogin: string;
    lastRefresh: string;
    deckCount: number;
    playlistCount: number;
    organizations: string[];
  }> {}

const getUserSearchResult = async (user: UserRecord) => {
  const uid = user.uid;
  const [userDecks, userPlaylists, organizationIds, stripeCustomer] = await Promise.all([
    readPath<Database.Decks.User>(`/decks/user/${uid}`),
    readPath<Database.Playlists.User>(`/playlists/user/${uid}`),
    getUserOrganizations(uid),
    getStripeCustomerWithSubscriptions(uid),
  ]);
  const organizationInfo = (await Promise.all(organizationIds.map((id) => getOrganizationInfo(id)))).filter(
    (org): org is Database.Organization.Public => !!org,
  );
  const userSearchResult: UserSearchResult = {
    displayName: user.displayName ?? 'N/A',
    email: user.email ?? 'N/A',
    uid: user.uid,
    isSubscribedToBlendPro: isCustomerSubscribedToBlendPro(stripeCustomer),
    accountCreated: user.metadata.creationTime,
    lastLogin: user.metadata.lastSignInTime,
    lastRefresh: user.metadata.lastRefreshTime ?? 'N/A',
    decks: userDecks ?? {},
    playlists: userPlaylists ?? {},
    organizations: organizationInfo,
  };
  return userSearchResult;
};

const getAllUsers = async () => {
  const [allUserRecords, allStripeUsers, allUserDecks, allUserPlaylists, allOrganizations] = await Promise.all([
    listAllUsers(),
    getAllCustomersWithSubscriptions(),
    readPath<Database.Decks.User>(`/decks/user`),
    readPath<Database.Playlists.User>(`/playlists/user`),
    readPath<{ [orgId: string]: Database.Organization }>(`/organizations`),
  ]);
  const allUserData: AllUserData = await Promise.all(
    allUserRecords.map(async (user) => ({
      displayName: user.displayName ?? 'N/A',
      email: user.email ?? 'N/A',
      uid: user.uid,
      isSubscribedToBlendPro: isCustomerSubscribedToBlendPro(allStripeUsers[user.uid]),
      accountCreated: user.metadata.creationTime,
      lastLogin: user.metadata.lastSignInTime,
      lastRefresh: user.metadata.lastRefreshTime ?? 'N/A',
      deckCount: Object.keys(allUserDecks?.[user.uid] ?? {}).length,
      playlistCount: Object.keys(allUserPlaylists?.[user.uid] ?? {}).length,
      organizations: (await getUserOrganizations(user.uid)).map((orgId) => allOrganizations?.[orgId]?.public?.name ?? ''),
    })),
  );
  return allUserData;
};

export const GET = async ({ cookies, url }) => {
  await checkSessionAuth(cookies, { authFunction: ({ uid }) => isUserGlobalAdmin(uid) });
  const uid = url.searchParams.get('uid');
  const email = url.searchParams.get('email');
  if (uid) {
    try {
      const user = await getUserData(uid);
      return json([await getUserSearchResult(user)]);
    } catch {
      return json([]);
    }
  }
  if (email) {
    try {
      const user = await getUserFromEmail(email);
      return json([await getUserSearchResult(user)]);
    } catch {
      return json([]);
    }
  }
  return json(await getAllUsers());
};

export const DELETE = async ({ cookies, url }) => {
  await checkSessionAuth(cookies, { authFunction: ({ uid }) => isUserGlobalAdmin(uid) });
  const uid = url.searchParams.get('uid');
  if (!uid) throw error(400, 'Missing required parameter: uid');
  try {
    const user = await getUserData(uid);
    console.log(`Deleting user: ${user.email}`);

    //Strip should come first because we use firebase to get the Stripe ID
    console.log('Deleting Stripe data...');
    await deleteStripeCustomer(uid);
    console.log('Stripe data deleted');

    console.log('Deleting Firebase data...');
    await deleteUser(uid);
    console.log('Firebase data deleted');

    console.log('Deleting Listmonk subscriber...');
    await listmonkClient.deleteSubscriber(user.email!);
    console.log('Listmonk subscriber deleted');

    console.log('User deleted');
    return new Response('User deleted', { status: 200 });
  } catch (err) {
    console.error(`Unable to delete user, error: ${err}`);
    throw error(500);
  }
};
