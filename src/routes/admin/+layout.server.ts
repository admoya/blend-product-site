import { checkSessionAuth, isUserGlobalAdmin } from '$lib/server/firebaseUtils';

export const load = async ({ cookies }) => {
  await checkSessionAuth(cookies, {
    authFunction: async ({ uid }) => await isUserGlobalAdmin(uid),
  });
};
