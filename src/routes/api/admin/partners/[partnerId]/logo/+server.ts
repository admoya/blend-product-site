import { checkSessionAuth, isUserGlobalAdmin, uploadFile } from '$lib/server/firebaseUtils';
import { error, json } from '@sveltejs/kit';

export const POST = async ({ cookies, request, params: { partnerId } }) => {
  await checkSessionAuth(cookies, {
    authFunction: async ({ uid }) => await isUserGlobalAdmin(uid),
  });
  const logo = (await request.formData()).get('logo');
  if (!logo) throw error(401, 'Missing required parameters');
  if (!(logo instanceof File)) throw error(401, 'Invalid logo');
  const publicUrl = await uploadFile(`partners/${partnerId}/${logo.name}`, logo);
  return json({ publicUrl }, { status: 201 });
};
