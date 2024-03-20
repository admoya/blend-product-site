import { auth, checkSessionAuth, isUserGlobalAdmin } from '$lib/server/firebaseUtils';
import { json } from '@sveltejs/kit';

export const POST = async (event) => {
  await checkSessionAuth(event.cookies, { authFunction: ({ uid }) => isUserGlobalAdmin(uid) });

  const { uid: emulationUid } = await event.request.json();
  const emulationToken = await auth.createCustomToken(emulationUid);
  return json({ emulationToken }, { status: 201 });
};
