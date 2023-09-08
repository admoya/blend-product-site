import { authenticate, getOrganizationInfo, getOrganizationPlaylists, getUserOrganizations, readPath } from '$lib/server/firebaseUtils';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET = (async (event) => {
  const { uid } = await authenticate(event);
  const userPlaylists = (await readPath<Database.Playlists.User>(`/playlists/user/${uid}`)) || {};
  const userPlaylistsArray = Object.values(userPlaylists).map((playlist) => playlist);
  const organizationIds = await getUserOrganizations(uid);
  const organizationPlaylistsArray = (
    await Promise.all(
      organizationIds.map(async (orgId) => {
        const orgPlaylists = (await getOrganizationPlaylists(orgId) ?? {});
        const orgInfo = await getOrganizationInfo(orgId);
        return Object.values(orgPlaylists).map((playlist) => ({
          ...playlist.playlist,
          orgSource: {
            orgName: orgInfo?.name,
            orgId,
          },
        }))
      })
    )
  ).flat();

  const modifiedPlaylists = ([...userPlaylistsArray, ...organizationPlaylistsArray]).map((playlist) => ({
    ...playlist,
    words: playlist.words.map((word) => word.map((letter) => (letter === false ? null : letter))),
  }));
  return json(modifiedPlaylists, {
    headers: [['Access-Control-Allow-Origin', '*']],
  });
}) satisfies RequestHandler;

export const OPTIONS = (() => {
  return new Response(null, {
    headers: [
      ['Access-Control-Allow-Origin', '*'],
      ['Access-Control-Allow-Headers', '*'],
      ['Access-Control-Allow-Methods', 'GET'],
    ],
  });
}) satisfies RequestHandler;