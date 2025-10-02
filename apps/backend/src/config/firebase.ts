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

  // Debug logging
  console.log('=== Firebase Configuration Debug ===');
  console.log('Environment variables check:');
  console.log('_FIREBASE_PROJECT_ID:', process.env._FIREBASE_PROJECT_ID);
  console.log('FIREBASE_PROJECT_ID:', process.env.FIREBASE_PROJECT_ID);
  console.log('Resolved projectId:', projectId);
  console.log('_FIREBASE_CLIENT_EMAIL:', process.env._FIREBASE_CLIENT_EMAIL);
  console.log('FIREBASE_CLIENT_EMAIL:', process.env.FIREBASE_CLIENT_EMAIL);
  console.log('Resolved clientEmail:', clientEmail);
  console.log('_FIREBASE_PRIVATE_KEY exists:', !!process.env._FIREBASE_PRIVATE_KEY);
  console.log('FIREBASE_PRIVATE_KEY exists:', !!process.env.FIREBASE_PRIVATE_KEY);
  console.log('Resolved privateKey exists:', !!privateKey);
  console.log('=== End Debug ===');

  if (!projectId) {
    throw new Error('Firebase projectId is missing. Check _FIREBASE_PROJECT_ID or FIREBASE_PROJECT_ID environment variable.');
  }
  if (!privateKey) {
    throw new Error('Firebase privateKey is missing. Check _FIREBASE_PRIVATE_KEY or FIREBASE_PRIVATE_KEY environment variable.');
  }
  if (!clientEmail) {
    throw new Error('Firebase clientEmail is missing. Check _FIREBASE_CLIENT_EMAIL or FIREBASE_CLIENT_EMAIL environment variable.');
  }

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
