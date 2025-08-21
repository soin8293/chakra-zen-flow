import { useState, useEffect } from 'react';
import { initializeFirebase } from '@/config/firebase';

// Hook for Firebase integration - ready for when you configure your Firebase project
export const useFirebase = () => {
  const [firebase, setFirebase] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initFirebase = async () => {
      try {
        const firebaseInstance = await initializeFirebase();
        setFirebase(firebaseInstance);
      } catch (err) {
        console.error('Firebase initialization error:', err);
        setError('Failed to initialize Firebase');
      } finally {
        setLoading(false);
      }
    };

    initFirebase();
  }, []);

  return { firebase, loading, error };
};

// Analytics helper for Firebase
export const useFirebaseAnalytics = () => {
  const { firebase } = useFirebase();

  const logEvent = (eventName: string, parameters?: any) => {
    if (firebase?.analytics) {
      firebase.analytics.logEvent(eventName, parameters);
    }
  };

  const setUserId = (userId: string) => {
    if (firebase?.analytics) {
      firebase.analytics.setUserId(userId);
    }
  };

  const setUserProperties = (properties: any) => {
    if (firebase?.analytics) {
      firebase.analytics.setUserProperties(properties);
    }
  };

  return { logEvent, setUserId, setUserProperties };
};