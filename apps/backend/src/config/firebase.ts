// Import Firebase Admin SDK functions
import { initializeApp, cert, ServiceAccount, getApps } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getAuth } from 'firebase-admin/auth';

// Initialize Firebase Admin SDK
let app;
if (getApps().length === 0) {
  // Support both local (.env) and Google Cloud (with _prefix) environment variables
  const projectId = process.env._FIREBASE_PROJECT_ID || process.env.FIREBASE_PROJECT_ID;
  const privateKey = process.env._FIREBASE_PRIVATE_KEY || process.env.FIREBASE_PRIVATE_KEY;
  const clientEmail = process.env._FIREBASE_CLIENT_EMAIL || process.env.FIREBASE_CLIENT_EMAIL;

  app = initializeApp({
    credential: cert({
      projectId: projectId,
      privateKey: privateKey?.replace(/\\n/g, '\n'), // Handle escaped newlines
      clientEmail: clientEmail,
    } as ServiceAccount),
  });
  console.log('Firebase Admin SDK initialized');
} else {
  app = getApps()[0];
  console.log('Using existing Firebase Admin SDK instance');
}

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

// Initialize Firebase Auth for backend
export const auth = getAuth(app);

export default app;
