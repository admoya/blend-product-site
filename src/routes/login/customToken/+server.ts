import type { RequestHandler } from './$types';

import firebaseAdmin from 'firebase-admin';
import firebaseAdminCredential from "$lib/server/firebaseAdminCredential";
import { error } from '@sveltejs/kit';
import type { DecodedIdToken } from 'firebase-admin/lib/auth/token-verifier';
if (!firebaseAdmin.apps.length) {
    firebaseAdmin.initializeApp({
        credential: firebaseAdmin.credential.cert(firebaseAdminCredential),
        databaseURL: 'https://csma-blend-default-rtdb.firebaseio.com'
    });
}
const auth = firebaseAdmin.auth();
 
export const POST = ( async ({request}) => {
  const { idToken } = await request.json();
  let decodedIdToken: DecodedIdToken;
  try {
    decodedIdToken = await auth.verifyIdToken(idToken)
  } catch {
    throw error(401, 'Invalid ID Token');
  }
  const customToken = await auth.createCustomToken(decodedIdToken.uid);
  return new Response(JSON.stringify({ customToken }), { headers: { "Access-Control-Allow-Origin": "*" } });
}) satisfies RequestHandler;