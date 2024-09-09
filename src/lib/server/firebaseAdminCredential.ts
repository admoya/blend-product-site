import {
  FIREBASE_SERVICE_PRIVATE_KEY,
  FIREBASE_SERVICE_PRIVATE_KEY_ID,
  FIREBASE_AUTH_EMULATOR_HOST,
  FIREBASE_DATABASE_EMULATOR_HOST,
  FIREBASE_STORAGE_EMULATOR_HOST,
} from '$env/static/private';
import { PUBLIC_DEPLOY_CONTEXT } from '$env/static/public';
import { dev } from '$app/environment';
if (dev) {
  if (FIREBASE_AUTH_EMULATOR_HOST && FIREBASE_DATABASE_EMULATOR_HOST) {
    console.log('Starting Firebase Admin SDK in emulator mode');
    process.env.FIREBASE_AUTH_EMULATOR_HOST = FIREBASE_AUTH_EMULATOR_HOST;
    process.env.FIREBASE_DATABASE_EMULATOR_HOST = FIREBASE_DATABASE_EMULATOR_HOST;
    process.env.FIREBASE_STORAGE_EMULATOR_HOST = FIREBASE_STORAGE_EMULATOR_HOST;
  } else {
    console.warn(
      `Dev environment detected, but at least one of FIREBASE_AUTH_EMULATOR_HOST and FIREBASE_DATABASE_EMULATOR_HOST is not set. Firebase Admin SDK will connect to the configured live instance: ${PUBLIC_DEPLOY_CONTEXT}`,
    );
  }
}

const commonConfig = {
  type: 'service_account',
  privateKeyId: FIREBASE_SERVICE_PRIVATE_KEY_ID,
  // The split/join thing is bevause Netlify will escape the newline characters in environment variables, which makes the key unreadable to Firebase
  privateKey: FIREBASE_SERVICE_PRIVATE_KEY.split('\\n').join('\n'),
  authUri: 'https://accounts.google.com/o/oauth2/auth',
  tokenUri: 'https://oauth2.googleapis.com/token',
  authProviderX509CertUrl: 'https://www.googleapis.com/oauth2/v1/certs',
};

const prodConfig = {
  ...commonConfig,
  projectId: 'csma-blend',
  clientEmail: 'firebase-adminsdk-rchzc@csma-blend.iam.gserviceaccount.com',
  clientId: '104002520848926491273',
  clientX509CertUrl: 'https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-rchzc%40csma-blend.iam.gserviceaccount.com',
};

const testConfig = dev
  ? {
      ...commonConfig,
      projectId: 'csma-blend',
      clientEmail: 'firebase-adminsdk-3fr3p@blend-test-96c76.iam.gserviceaccount.com',
      clientId: '108712155394638013128',
      clientX509CertUrl: 'https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-3fr3p%40blend-test-96c76.iam.gserviceaccount.com',
    }
  : {
      ...commonConfig,
      projectId: 'blend-test-96c76',
      clientEmail: 'firebase-adminsdk-3fr3p@blend-test-96c76.iam.gserviceaccount.com',
      clientId: '108712155394638013128',
      clientX509CertUrl: 'https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-3fr3p%40blend-test-96c76.iam.gserviceaccount.com',
    };

const testDbUrl = dev ? 'http://127.0.0.1:9000/?ns=csma-blend-default-rtdb' : 'https://blend-test-96c76-default-rtdb.firebaseio.com';

const config = PUBLIC_DEPLOY_CONTEXT === 'production' ? prodConfig : testConfig;

export const databaseURL = PUBLIC_DEPLOY_CONTEXT === 'production' ? 'https://csma-blend-default-rtdb.firebaseio.com' : testDbUrl;

export const defaultStorageBucket = `${config.projectId}.appspot.com`;

export default config;
