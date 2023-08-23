import { authenticate, readPath, weaklyAuthenticate, writePath } from '$lib/server/firebaseUtils';
import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

interface RemoteFlags {
  [key: string]: boolean;
}

const flagsToArray = (flags: RemoteFlags) => {
  return Object.keys(flags).filter((flagName) => flags[flagName]);
};
/**
 * Returns all flags for the given user.
 *
 * If the caller is not authenticated, it will only return global flags.
 *
 * If the caller is authenticated, it will return user flags merged into the global flags.
 */
export const GET = (async (event) => {
  const userFlagsPromise = weaklyAuthenticate(event).then((authResult) => {
    if (authResult) {
      return readPath(`/flags/user/${authResult.uid}`, []);
    }
    return [];
  });
  const [globalFlags, userFlags] = await Promise.all([readPath(`/flags/global`, []), userFlagsPromise]);
  return json(
    flagsToArray({
      ...globalFlags,
      ...userFlags,
    }),
    {
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
