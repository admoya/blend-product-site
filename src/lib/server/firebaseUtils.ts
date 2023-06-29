import firebaseAdmin from 'firebase-admin';
import firebaseAdminCredential from "$lib/server/firebaseAdminCredential";
import { error, type RequestEvent } from '@sveltejs/kit';
if (!firebaseAdmin.apps.length) {
    firebaseAdmin.initializeApp({
        credential: firebaseAdmin.credential.cert(firebaseAdminCredential),
        databaseURL: 'https://csma-blend-default-rtdb.firebaseio.com'
    });
}

const db = firebaseAdmin.database();
const auth = firebaseAdmin.auth();

export const authenticate = async (event: RequestEvent) => {
    const authHeader = event.request.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ') || !authHeader.replace('Bearer ', '')) {
        throw error(401, 'Missing or invalid Authorization header')
    }
    const idToken = authHeader.replace('Bearer ', '');
    try {
        return await auth.verifyIdToken(idToken);
    } catch {
        throw error(401, 'Invalid idToken');
    }
}

export const weaklyAuthenticate = async (event: RequestEvent) => {
    try {
        const result = await authenticate(event);
        return result;
    } catch {
        return null;
    }
}

export const getUserData = (uid: string) => auth.getUser(uid);

export const getUserFromEmail = (email: string) => auth.getUserByEmail(email);

export const readPath = async (path: string, defaultValue: any = null) => {
    const ref = db.ref(path);
    const data = await ref.get();
    return data.val() ?? defaultValue;
}

export const writePath = async (path: string, data: any) => db.ref(path).set(data);

export const pushPath = async(path: string, data: any) => db.ref(path).push(data)

export const deletePath = async (path: string) => db.ref(path).remove();