// Import Firebase Admin SDK functions
import { initializeApp, cert, ServiceAccount, getApps } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getAuth } from 'firebase-admin/auth';

// Initialize Firebase Admin SDK
let app;
if (getApps().length === 0) {
  app = initializeApp({
    credential: cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    } as ServiceAccount),
  });
  console.log('🔥 Firebase Admin SDK initialized');
} else {
  app = getApps()[0];
  console.log('🔥 Using existing Firebase Admin SDK instance');
}

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

// Initialize Firebase Auth for backend
export const auth = getAuth(app);

export default app;
