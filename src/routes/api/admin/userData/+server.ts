import {
  checkSessionAuth,
  getOrganizationInfo,
  getUserData,
  getUserFromEmail,
  getUserOrganizations,
  isUserGlobalAdmin,
  listAllUsers,
  readPath,
} from '$lib/server/firebaseUtils';
import { getAllCustomersWithSubscriptions, getStripeCustomerWithSubscriptions, isSubscribedToBlendPro } from '$lib/server/subscriptionUtils';
import { json } from '@sveltejs/kit';
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
    isSubscribedToBlendPro: isSubscribedToBlendPro(stripeCustomer),
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
  const [allUserRecords, allStripeUsers, allUserDecks, allUserPlaylists] = await Promise.all([
    listAllUsers(),
    getAllCustomersWithSubscriptions(),
    readPath<Database.Decks.User>(`/decks/user`),
    readPath<Database.Playlists.User>(`/playlists/user`),
  ]);
  const allUserData = await Promise.all(
    allUserRecords.map(async (user) => ({
      displayName: user.displayName ?? 'N/A',
      email: user.email ?? 'N/A',
      uid: user.uid,
      isSubscribedToBlendPro: isSubscribedToBlendPro(allStripeUsers[user.uid]),
      accountCreated: user.metadata.creationTime,
      lastLogin: user.metadata.lastSignInTime,
      lastRefresh: user.metadata.lastRefreshTime ?? 'N/A',
      decks: allUserDecks?.[user.uid] ?? {},
      playlists: allUserPlaylists?.[user.uid] ?? {},
      organizations: await getUserOrganizations(user.uid),
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
  const allUserRecords = await listAllUsers();
  return json(await getAllUsers());
};
