import { authenticate, getUserFromEmail, pushPath, readPath, getUserData } from '$lib/server/firebaseUtils';
import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { isProUser } from '$lib/server/subscriptionUtils';
import { sendPlaylistShareEmail } from '$lib/server/emailUtils';

export const POST = (async (event) => {
  const { uid: sourceUid } = await authenticate(event);
  const { playlistId, targetUserEmail } = await event.request.json();
  if (!targetUserEmail || !playlistId) throw error(400, 'No target email and/or playlistId provided');
  const [{ displayName: sourceUserName = 'A Blend user' }, { displayName: targetUserName, isTargetPro }, playlist, isSourcePro] = await Promise.all([
    getUserData(sourceUid),
    getUserFromEmail(targetUserEmail)
      .then(async (user) => ({ ...user, isTargetPro: await isProUser(user.uid) }))
      .catch(() => {
        throw error(404, `User ${targetUserEmail} not found`);
      }),
    readPath(`/playlists/user/${sourceUid}/${playlistId}`),
    isProUser(sourceUid),
  ]);

  if (!playlist) throw error(404, `Playlist ${playlistId} does not exist for user ${sourceUid}`);
  if (!isSourcePro) throw error(401);
  if (!isTargetPro) throw error(400, `The user ${targetUserEmail} is not a Blend Pro subscriber`);

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
