import { cleanAnonymousAccounts } from '$lib/server/accountUtils';
import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST = (async () => {
  await cleanAnonymousAccounts();

  return new Response();
}) satisfies RequestHandler;
