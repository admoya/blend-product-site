import { authenticate, getUserFromEmail, pushPath, readPath, getUserData } from '$lib/server/firebaseUtils';
import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { getStripeCustomerWithSubscriptions, isSubscribedToBlendPro } from '$lib/server/subscriptionUtils';
import { sendDeckShareEmail } from '$lib/server/emailUtils';

export const POST = (async (event) => {
  const { uid: sourceUid } = await authenticate(event);
  const { deckId, targetUserEmail } = await event.request.json();
  if (!targetUserEmail || !deckId) throw error(400, 'No target email and/or deckId provided');
  const targetUserPromise = getUserFromEmail(targetUserEmail).then((userData) =>
    Promise.all([userData, getStripeCustomerWithSubscriptions(userData.uid)]),
  );
  const [{ displayName: sourceUserName = 'A Blend user' }, [{ displayName: targetUserName }, targetCustomer], sourceCustomer, deck] =
    await Promise.all([
      getUserData(sourceUid),
      targetUserPromise,
      getStripeCustomerWithSubscriptions(sourceUid),
      readPath(`/decks/user/${sourceUid}/${deckId}`),
    ]);

  if (!deck) throw error(404, `Deck ${deckId} does not exist for user ${sourceUid}`);
  if (!isSubscribedToBlendPro(sourceCustomer)) throw error(401);
  if (!isSubscribedToBlendPro(targetCustomer)) throw error(400, `The user ${targetUserEmail} is not a Blend Pro subscriber`);

  const sharedKey = (
    await pushPath('/decks/shared', {
      sourceUid,
      createdAt: Date.now(),
      deck,
    })
  ).key!;
  await sendDeckShareEmail(targetUserEmail, targetUserName, {
    deckName: deck.name,
    shareId: sharedKey,
    sender: sourceUserName,
  });
  return json(
    {
      sharedKey,
    },
    {
      status: 201,
      headers: [['Access-Control-Allow-Origin', '*']],
    },
  );
}) satisfies RequestHandler;

export const OPTIONS = (() => {
  return new Response(null, {
    headers: [
      ['Access-Control-Allow-Origin', '*'],
      ['Access-Control-Allow-Headers', '*'],
      ['Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE'],
    ],
  });
}) satisfies RequestHandler;
