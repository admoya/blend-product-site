import { authenticate, getOrganizationPublicInfo, getUserData, getUserOrganizationIds } from '$lib/server/firebaseUtils';
import { isProUser } from '$lib/server/subscriptionUtils';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET = (async (event) => {
  const startTime = Date.now();
  const { uid } = await authenticate(event);
  const authenticateTime = Date.now();
  console.log(`Authenticated in ${authenticateTime - startTime}ms`);
  const [firebaseUserData, isSubscribedToBlendPro, organizationInfo] = await Promise.all([
    getUserData(uid),
    isProUser(uid),
    getUserOrganizationIds(uid).then((orgs) =>
      Promise.all(
        orgs.map(async (orgId) => {
          const orgInfo = await getOrganizationPublicInfo(orgId);
          return {
            orgName: orgInfo?.name ?? null,
            orgId,
            logoUrl: orgInfo?.logoUrl ?? null,
          };
        }),
      ),
    ),
  ]);
  const userDataTime = Date.now();
  console.log(`Got user data in ${userDataTime - authenticateTime}ms`);
  const userData = {
    ...firebaseUserData,
    isSubscribedToBlendPro, // TODO: Change this to `isProUser`, and handle that on the app
    organizationInfo,
  };
  console.log(`Total time: ${Date.now() - startTime}ms`);
  return json(userData);
}) satisfies RequestHandler;

export const OPTIONS = (() => {
  return new Response(null, {
    headers: [['Access-Control-Allow-Methods', 'GET']],
  });
}) satisfies RequestHandler;
