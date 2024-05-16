import { authenticate, getUserFromEmail, pushPath, readPath, getUserData } from '$lib/server/firebaseUtils';
import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { getStripeCustomerWithSubscriptions, isOrganizationMember, isSubscribedToBlendPro } from '$lib/server/subscriptionUtils';
import { sendPlaylistShareEmail } from '$lib/server/emailUtils';

export const POST = (async (event) => {
  const { uid: sourceUid } = await authenticate(event);
  const { playlistId, targetUserEmail } = await event.request.json();
  if (!targetUserEmail || !playlistId) throw error(400, 'No target email and/or playlistId provided');
  const targetUserPromise = getUserFromEmail(targetUserEmail).then((userData) =>
    Promise.all([userData, getStripeCustomerWithSubscriptions(userData.uid)]),
  );
  const [
    { displayName: sourceUserName = 'A Blend user' },
    [{ displayName: targetUserName, uid: targetUid }, targetCustomer],
    sourceCustomer,
    playlist,
  ] = await Promise.all([
    getUserData(sourceUid),
    targetUserPromise,
    getStripeCustomerWithSubscriptions(sourceUid),
    readPath(`/playlists/user/${sourceUid}/${playlistId}`),
  ]);

  if (!playlist) throw error(404, `Playlist ${playlistId} does not exist for user ${sourceUid}`);
  if (!isSubscribedToBlendPro(sourceCustomer) && !isOrganizationMember(sourceUid)) throw error(401);
  if (!isSubscribedToBlendPro(targetCustomer) && !isOrganizationMember(targetUid))
    throw error(400, `The user ${targetUserEmail} is not a Blend Pro subscriber`);

  const sharedKey = (
    await pushPath('/playlists/shared', {
      sourceUid,
      createdAt: Date.now(),
      playlist,
    })
  ).key!;
  await sendPlaylistShareEmail(targetUserEmail, targetUserName, {
    playlistName: playlist.name,
    shareId: sharedKey,
    sender: sourceUserName,
  });
  return json(
    {
      sharedKey,
    },
    {
      status: 201,
    },
  );
}) satisfies RequestHandler;

export const OPTIONS = (() => {
  return new Response(null, {
    headers: [['Access-Control-Allow-Methods', 'POST']],
  });
}) satisfies RequestHandler;
