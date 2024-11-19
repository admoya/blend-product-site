import { isUserGlobalAdmin } from '$lib/server/firebaseUtils';
import { checkSessionAuth, uploadFile, writePath } from '$lib/server/firebaseUtils';
import { error, type Actions } from '@sveltejs/kit';

export const actions: Actions = {
  uploadLogo: async ({ cookies, params: { organizationId }, request }) => {
    await checkSessionAuth(cookies, {
      authFunction: async ({ uid }) => await isUserGlobalAdmin(uid),
    });
    const data = await request.formData();
    const partnerId = data.get('partnerId');
    const logo = data.get('logo');
    if (!logo || !(logo instanceof File)) throw error(400, 'No logo provided');
    const publicUrl = await uploadFile(`partners/${partnerId}/logo`, logo);
    return { publicUrl, status: 201 };
  },
};
