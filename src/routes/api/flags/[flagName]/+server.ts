import { authenticate, writePath } from '$lib/server/firebaseUtils';
import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

/**
 * Writes a user flag to the database.
 *
 * Flags must always be booleans, or else an error will be returned.
 *
 * User flags all have a "protected" access level, meaning the user must be logged in and can only access their own flags.
 */
export const POST = (async (event) => {
  const { flagName } = event.params;
  const { uid } = await authenticate(event);
  const value = await event.request.json();
  if (typeof value != 'boolean') {
    const errorMessage = `Flag value must be a boolean, instead got ${typeof value}`;
    console.error(`Error writing flag ${flagName} for ${uid}: ${errorMessage}`);
    throw error(400, errorMessage);
  }
  await writePath(`/flags/user/${uid}/${flagName}`, value);
  return json(value, {
    status: 201,
    headers: [['Access-Control-Allow-Origin', '*']],
  });
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
