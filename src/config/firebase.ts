// Firebase configuration - optimized for production deployment
// Replace placeholder values with actual Firebase project credentials

export const firebaseConfig = {
  apiKey: "your-firebase-api-key-here",
  authDomain: "zenflow-meditation.firebaseapp.com", 
  projectId: "zenflow-meditation",
  storageBucket: "zenflow-meditation.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abc123def456ghi789",
  measurementId: "G-XXXXXXXXXX"
};

// Lazy-loaded Firebase initialization for optimal performance
export const initializeFirebase = async () => {
  if (typeof window !== 'undefined') {
    try {
      const [
        { initializeApp },
        { getAnalytics, isSupported },
        { getAuth },
        { getFirestore }
      ] = await Promise.all([
        import('firebase/app'),
        import('firebase/analytics'),
        import('firebase/auth'),
        import('firebase/firestore')
      ]);
      
      const app = initializeApp(firebaseConfig);
      
      // Only initialize analytics if supported (avoids errors in dev/testing)
      const analyticsSupported = await isSupported();
      const analytics = analyticsSupported ? getAnalytics(app) : null;
      
      const auth = getAuth(app);
      const db = getFirestore(app);
      
      return { app, analytics, auth, db };
    } catch (error) {
      console.warn('Firebase initialization failed:', error);
      return null;
    }
  }
  return null;
};