import { authenticate, getUserFromEmail, pushPath, readPath, getUserData } from '$lib/server/firebaseUtils';
import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { isProUser } from '$lib/server/subscriptionUtils';
import { sendDeckShareEmail } from '$lib/server/emailUtils';

export const POST = (async (event) => {
  const { uid: sourceUid } = await authenticate(event);
  const { deckId, targetUserEmail } = await event.request.json();
  if (!targetUserEmail || !deckId) throw error(400, 'No target email and/or deckId provided');
  const [{ displayName: sourceUserName = 'A Blend user' }, { displayName: targetUserName, isTargetPro }, deck, isSourcePro] = await Promise.all([
    getUserData(sourceUid),
    getUserFromEmail(targetUserEmail)
      .then(async (user) => ({ ...user, isTargetPro: await isProUser(user.uid) }))
      .catch(() => {
        throw error(404, `User ${targetUserEmail} not found`);
      }),
    readPath(`/decks/user/${sourceUid}/${deckId}`),
    isProUser(sourceUid),
  ]);

  if (!deck) throw error(404, `Deck ${deckId} does not exist for user ${sourceUid}`);
  if (!isSourcePro) throw error(401);
  if (!isTargetPro) throw error(400, `The user ${targetUserEmail} is not a Blend Pro subscriber`);

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
  return json({ sharedKey }, { status: 201 });
}) satisfies RequestHandler;

export const OPTIONS = (() => {
  return new Response(null, {
    headers: [['Access-Control-Allow-Methods', 'POST']],
  });
}) satisfies RequestHandler;
