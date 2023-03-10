import { FIREBASE_SERVICE_PRIVATE_KEY, FIREBASE_SERVICE_PRIVATE_KEY_ID } from '$env/static/private';
console.log(`Firebase key: ${FIREBASE_SERVICE_PRIVATE_KEY.length}`);
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