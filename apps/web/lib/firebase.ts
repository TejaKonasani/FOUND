/**
 * Firebase Client SDK initialization.
 * Initializes Firebase only once (singleton pattern) to avoid
 * "Firebase app named '[DEFAULT]' already exists" errors in dev mode.
 *
 * All config values come from environment variables. No private
 * credentials are stored here — only the public web app config.
 */
import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Validate required config at import time (dev only)
if (
  process.env.NODE_ENV === 'development' &&
  (!firebaseConfig.apiKey || !firebaseConfig.projectId)
) {
  console.warn(
    '[FOUND] Firebase config incomplete. Set NEXT_PUBLIC_FIREBASE_* env vars in .env.local'
  );
}

// Initialize Firebase singleton
let app: FirebaseApp;
if (getApps().length === 0) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}

// Export initialized services
export const auth: Auth = getAuth(app);
export const db: Firestore = getFirestore(app);
export default app;
