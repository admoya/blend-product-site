import { checkSessionAuth, readPath, verifySessionCookie, weaklyAuthenticate } from '$lib/server/firebaseUtils';
import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { isProUser } from '$lib/server/subscriptionUtils';

export const load: PageServerLoad = async ({ params: { partnerId }, cookies }) => {
  // Existing pro users are not eligible for partner redemptions
  const sessionCookie = cookies.get('session');
  if (sessionCookie) {
    let uid: string | undefined;
    try {
      uid = (await verifySessionCookie(sessionCookie)).uid;
    } catch (err) {
      console.error('Error validating session on partner page:', err);
    }
    if (uid && (await isProUser(uid))) {
      throw redirect(302, '/');
    }
  }
  const partnerPublicInfo = await readPath<Database.Partner['public']>(`/partners/${partnerId}/public`);
  if (!partnerPublicInfo) {
    throw error(404, 'Partner not found');
  }
  return partnerPublicInfo;
};
