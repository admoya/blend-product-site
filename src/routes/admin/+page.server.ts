import { getOrganizationInfo, getUserData, getUserFromEmail, getUserOrganizations, readPath } from '$lib/server/firebaseUtils';
import { isSubscribedToBlendPro, getStripeCustomerWithSubscriptions } from '$lib/server/subscriptionUtils';
import type { UserRecord } from 'firebase-admin/auth';
import type { Actions, PageServerLoad } from './$types';

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

export const actions: Actions = {
  userSearch: async ({ cookies, request }) => {
    const data = await request.formData();
    const uid = data.get('uid') as string;
    const email = data.get('email') as string;
    if (uid) {
      try {
        const user = await getUserData(uid);
        return [await getUserSearchResult(user)];
      } catch {
        return [];
      }
    }
    if (email) {
      try {
        const user = await getUserFromEmail(email);
        return [await getUserSearchResult(user)];
      } catch {
        return [];
      }
    }
    return [];
  },
};
