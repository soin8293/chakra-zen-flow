// Firebase configuration
// Set these environment variables in your Firebase CLI or hosting environment

export const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY || "your-firebase-api-key-here",
  authDomain: process.env.FIREBASE_AUTH_DOMAIN || "your-project.firebaseapp.com",
  projectId: process.env.FIREBASE_PROJECT_ID || "your-project-id",
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET || "your-project.appspot.com",
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID || "your-sender-id",
  appId: process.env.FIREBASE_APP_ID || "your-app-id",
  measurementId: process.env.FIREBASE_MEASUREMENT_ID || "your-measurement-id"
};

// Initialize Firebase when needed
export const initializeFirebase = async () => {
  if (typeof window !== 'undefined') {
    const { initializeApp } = await import('firebase/app');
    const { getAnalytics } = await import('firebase/analytics');
    const { getAuth } = await import('firebase/auth');
    const { getFirestore } = await import('firebase/firestore');
    
    const app = initializeApp(firebaseConfig);
    const analytics = getAnalytics(app);
    const auth = getAuth(app);
    const db = getFirestore(app);
    
    return { app, analytics, auth, db };
  }
  return null;
};