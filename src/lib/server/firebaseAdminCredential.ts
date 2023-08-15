import { FIREBASE_SERVICE_PRIVATE_KEY, FIREBASE_SERVICE_PRIVATE_KEY_ID, FIREBASE_AUTH_EMULATOR_HOST, FIREBASE_DATABASE_EMULATOR_HOST } from '$env/static/private';
import { dev } from '$app/environment';
if (dev) {
    if (FIREBASE_AUTH_EMULATOR_HOST && FIREBASE_DATABASE_EMULATOR_HOST) {
        console.log("Starting Firebase Admin SDK in emulator mode");
        process.env.FIREBASE_AUTH_EMULATOR_HOST = FIREBASE_AUTH_EMULATOR_HOST;
        process.env.FIREBASE_DATABASE_EMULATOR_HOST = FIREBASE_DATABASE_EMULATOR_HOST;
    } else {
        console.warn(`Dev environment detected, but at least one of FIREBASE_AUTH_EMULATOR_HOST and FIREBASE_DATABASE_EMULATOR_HOST is not set. Firebase Admin SDK will connect to production.`);
    }
}
export default {
    type: "service_account",
    projectId: "csma-blend",
    privateKeyId: FIREBASE_SERVICE_PRIVATE_KEY_ID,
    // The split/join thing is bevause Netlify will escape the newline characters in environment variables, which makes the key unreadable to Firebase
    privateKey: FIREBASE_SERVICE_PRIVATE_KEY.split("\\n").join("\n"),
    clientEmail: "firebase-adminsdk-rchzc@csma-blend.iam.gserviceaccount.com",
    clientId: "104002520848926491273",
    authUri: "https://accounts.google.com/o/oauth2/auth",
    tokenUri: "https://oauth2.googleapis.com/token",
    authProviderX509CertUrl: "https://www.googleapis.com/oauth2/v1/certs",
    clientX509CertUrl: "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-rchzc%40csma-blend.iam.gserviceaccount.com"
}