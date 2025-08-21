import { useEffect } from 'react';

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

export const useAnalytics = () => {
  useEffect(() => {
    // Analytics implementation ready for production
    const MEASUREMENT_ID = 'G-XXXXXXXXXX'; // Replace with actual GA4 ID
    
    if (typeof window !== 'undefined' && !window.gtag) {
      // Create dataLayer
      window.dataLayer = window.dataLayer || [];
      
      // Define gtag function
      window.gtag = function(...args: any[]) {
        window.dataLayer.push(args);
      };
      
      // Initialize with timestamp
      window.gtag('js', new Date());
      
      // Configure GA4
      window.gtag('config', MEASUREMENT_ID, {
        app_name: 'ZenFlow',
        app_version: '1.0.0',
        send_page_view: false // We'll track manually
      });
      
      // Load GA4 script
      const script = document.createElement('script');
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`;
      document.head.appendChild(script);
    }
  }, []);

  const trackEvent = (eventName: string, parameters?: Record<string, any>) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', eventName, {
        app_name: 'ZenFlow',
        ...parameters
      });
    }
    
    // TODO: Firebase Analytics when configured
    // if (firebase?.analytics) {
    //   firebase.analytics.logEvent(eventName, {
    //     app_name: 'ZenFlow',
    //     ...parameters
    //   });
    // }
  };

  const trackScreenView = (screenName: string) => {
    trackEvent('screen_view', {
      screen_name: screenName
    });
  };

  const trackMeditationStart = (chakra: string, duration: number, level: string) => {
    trackEvent('meditation_start', {
      chakra_type: chakra,
      session_duration: duration,
      difficulty_level: level,
      engagement_time_msec: 1
    });
  };

  const trackMeditationComplete = (chakra: string, duration: number, completionRate?: number) => {
    trackEvent('meditation_complete', {
      chakra_type: chakra,
      session_duration: duration,
      completion_rate: completionRate || 100,
      value: duration // Track duration as value for engagement metrics
    });
  };

  const trackMeditationPause = (chakra: string, timeElapsed: number) => {
    trackEvent('meditation_pause', {
      chakra_type: chakra,
      time_elapsed: timeElapsed
    });
  };

  const trackMeditationExit = (chakra: string, timeElapsed: number, totalDuration: number) => {
    const completionRate = Math.round((timeElapsed / totalDuration) * 100);
    trackEvent('meditation_exit', {
      chakra_type: chakra,
      time_elapsed: timeElapsed,
      total_duration: totalDuration,
      completion_rate: completionRate
    });
  };

  const trackArticleRead = (articleId: string, category: string) => {
    trackEvent('article_read', {
      article_id: articleId,
      content_category: category
    });
  };

  const trackBookmark = (contentId: string, contentType: string) => {
    trackEvent('bookmark_add', {
      content_id: contentId,
      content_type: contentType
    });
  };

  return {
    trackEvent,
    trackScreenView,
    trackMeditationStart,
    trackMeditationComplete,
    trackMeditationPause,
    trackMeditationExit,
    trackArticleRead,
    trackBookmark
  };
};