import { authenticate, getUserFromEmail, pushPath, readPath, writePath } from '$lib/server/firebaseUtils';
import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { getStripeCustomerWithSubscriptions, isSubscribedToBlendPro } from '$lib/server/subscriptionUtils';

export const POST = (async (event) => {
  const { uid: sourceUid } = await authenticate(event);
  const { deckId, targetUserEmail } = await event.request.json();
  if (!targetUserEmail || !deckId) 
    throw error(400, "No target email and/or deckId provided");
  const { uid: targetUid } = await getUserFromEmail(targetUserEmail);
  const [sourceCustomer, targetCustomer, deck] = await Promise.all([
    getStripeCustomerWithSubscriptions(sourceUid),
    getStripeCustomerWithSubscriptions(targetUid),
    readPath(`/decks/user/${sourceUid}/${deckId}`)
  ]);

  if (!deck) 
    throw error(404, `Deck ${deckId} does not exist for user ${sourceUid}`);
  if (!isSubscribedToBlendPro(sourceCustomer))
    throw error(401);
  if (!isSubscribedToBlendPro(targetCustomer))
    throw error(400, `The user ${targetUserEmail} is not a Blend Pro subscriber`);

  const sharedKey = (await pushPath('/decks/shared', { sourceUid, createdAt: Date.now(), deck })).key;
  return json({ sharedKey }, { status: 201, headers: [ ['Access-Control-Allow-Origin', "*"] ] })
}) satisfies RequestHandler;

export const OPTIONS = (() => {
  return new Response(null, { headers: [[ 'Access-Control-Allow-Origin', "*" ], [ 'Access-Control-Allow-Headers', '*' ], ['Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE']]});
}) satisfies RequestHandler;