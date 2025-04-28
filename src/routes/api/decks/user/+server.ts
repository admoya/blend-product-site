import { authenticate, getOrganizationDecks, getOrganizationPublicInfo, getUserOrganizationIds, readPath } from '$lib/server/firebaseUtils';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET = (async (event) => {
  const { uid } = await authenticate(event);
  const omitOrgDecks = event.url.searchParams.get('omitOrgDecks') ?? false;
  const orgIdParam = event.url.searchParams.get('orgId');
  if (omitOrgDecks && orgIdParam) return new Response('Cannot specify both omitOrgDecks and orgId', { status: 400 });
  if (omitOrgDecks) {
    const userDecks = (await readPath<Database.Decks.User>(`/decks/user/${uid}`)) || {};
    const deckArray = Object.entries(userDecks).map(([key, val]) => val);
    return json(deckArray);
  } else if (orgIdParam) {
    const organizationIds = await getUserOrganizationIds(uid);
    if (!organizationIds.includes(orgIdParam)) return new Response('User is not a member of this organization', { status: 403 });
    const orgDecks = (await getOrganizationDecks(orgIdParam)) ?? {};
    const organizationInfo = await getOrganizationPublicInfo(orgIdParam);
    const deckArray = Object.values(orgDecks).map(({ deck }) => ({
      ...deck,
      orgSource: {
        orgName: organizationInfo?.name,
        orgId: orgIdParam,
      },
    }));
    return json(deckArray);
  } else {
    const userDecks = (await readPath<Database.Decks.User>(`/decks/user/${uid}`)) || {};
    const userDeckArray = Object.entries(userDecks).map(([key, val]) => val);
    const positionOffset = Math.max(...userDeckArray.map(({ position }) => position), 0) + 2; // +2 because legacy position can be -1, and we want the new position to be strictly greater TODO: refactor this once we get rid of the legacy magic numbers in positioning
    const organizationIds = await getUserOrganizationIds(uid);
    const organizationDeckArray = (
      await Promise.all(
        organizationIds.map(async (orgId) => {
          const orgDecks = (await getOrganizationDecks(orgId)) ?? {};
          const orgInfo = await getOrganizationPublicInfo(orgId);
          return Object.values(orgDecks).map(({ deck }) => ({
            ...deck,
            position: deck.position + positionOffset,
            orgSource: {
              orgName: orgInfo?.name,
              orgId,
            },
          }));
        }),
      )
    ).flat();

    return json([...userDeckArray, ...organizationDeckArray]);
  }
}) satisfies RequestHandler;

export const OPTIONS = (() => {
  return new Response(null, {
    headers: [['Access-Control-Allow-Methods', 'GET']],
  });
}) satisfies RequestHandler;
