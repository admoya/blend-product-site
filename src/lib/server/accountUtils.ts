import firebaseAdmin from 'firebase-admin';
import firebaseAdminCredential, { databaseURL } from '$lib/server/firebaseAdminCredential';
if (!firebaseAdmin.apps.length) {
  firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(firebaseAdminCredential),
    databaseURL,
  });
}
const auth = firebaseAdmin.auth();

export const cleanAnonymousAccounts = async () => {
  const users = (await auth.listUsers()).users;
  Promise.all(users.map((user) => user.providerData.length === 0 && auth.deleteUser(user.uid)));
};
