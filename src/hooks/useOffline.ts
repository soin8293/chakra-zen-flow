import { useEffect, useState } from 'react';

export const useOfflineStatus = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return isOnline;
};

export const useServiceWorker = () => {
  const [isRegistered, setIsRegistered] = useState(false);
  const [isUpdateAvailable, setIsUpdateAvailable] = useState(false);

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
        .then((registration) => {
          setIsRegistered(true);
          
          registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing;
            if (newWorker) {
              newWorker.addEventListener('statechange', () => {
                if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                  setIsUpdateAvailable(true);
                }
              });
            }
          });
        })
        .catch((error) => {
          console.log('SW registration failed:', error);
        });
    }
  }, []);

  const updateApp = () => {
    if (isUpdateAvailable) {
      window.location.reload();
    }
  };

  return { isRegistered, isUpdateAvailable, updateApp };
};

// Enhanced offline data management for meditation app
export const useOfflineStorage = () => {
  const [offlineData, setOfflineData] = useState({
    meditationProgress: [],
    bookmarks: [],
    userPreferences: {}
  });

  // Save meditation session data offline
  const saveMeditationSession = (sessionData: any) => {
    try {
      const existing = JSON.parse(localStorage.getItem('zenflow_sessions') || '[]');
      const updated = [...existing, { ...sessionData, timestamp: Date.now(), synced: false }];
      localStorage.setItem('zenflow_sessions', JSON.stringify(updated));
      setOfflineData(prev => ({ ...prev, meditationProgress: updated }));
    } catch (error) {
      console.error('Failed to save meditation session offline:', error);
    }
  };

  // Save bookmarks offline
  const saveBookmarkOffline = (bookmark: any) => {
    try {
      const existing = JSON.parse(localStorage.getItem('zenflow_bookmarks') || '[]');
      const updated = [...existing.filter((b: any) => b.id !== bookmark.id), bookmark];
      localStorage.setItem('zenflow_bookmarks', JSON.stringify(updated));
      setOfflineData(prev => ({ ...prev, bookmarks: updated }));
    } catch (error) {
      console.error('Failed to save bookmark offline:', error);
    }
  };

  // Load offline data on mount
  useEffect(() => {
    try {
      const sessions = JSON.parse(localStorage.getItem('zenflow_sessions') || '[]');
      const bookmarks = JSON.parse(localStorage.getItem('zenflow_bookmarks') || '[]');
      const preferences = JSON.parse(localStorage.getItem('zenflow_preferences') || '{}');
      
      setOfflineData({
        meditationProgress: sessions,
        bookmarks,
        userPreferences: preferences
      });
    } catch (error) {
      console.error('Failed to load offline data:', error);
    }
  }, []);

  // Sync with server when online (placeholder for Firebase integration)
  const syncOfflineData = async () => {
    // This will be implemented when Firebase is configured
    console.log('Sync offline data with Firebase (placeholder)');
  };

  return {
    offlineData,
    saveMeditationSession,
    saveBookmarkOffline,
    syncOfflineData
  };
};