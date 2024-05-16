import type { RequestHandler } from './$types';
import { error } from '@sveltejs/kit';
import { auth } from '$lib/server/firebaseUtils';
import type { DecodedIdToken } from 'firebase-admin/auth';

export const POST = (async ({ request }) => {
  const { idToken } = await request.json();
  let decodedIdToken: DecodedIdToken;
  try {
    decodedIdToken = await auth.verifyIdToken(idToken);
  } catch {
    throw error(401, 'Invalid ID Token');
  }
  const customToken = await auth.createCustomToken(decodedIdToken.uid);
  return new Response(
    JSON.stringify({
      customToken,
    }),
  );
}) satisfies RequestHandler;
