import { useEffect } from 'react';

declare global {
  interface Window {
    gtag: (command: string, eventName: string, parameters?: Record<string, any>) => void;
  }
}

export const useAnalytics = () => {
  useEffect(() => {
    // Initialize Google Analytics 4 (replace with your measurement ID)
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID';
    document.head.appendChild(script);

    const configScript = document.createElement('script');
    configScript.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'GA_MEASUREMENT_ID', {
        app_name: 'ZenFlow',
        app_version: '1.0.0'
      });
    `;
    document.head.appendChild(configScript);

    return () => {
      document.head.removeChild(script);
      document.head.removeChild(configScript);
    };
  }, []);

  const trackEvent = (eventName: string, parameters?: Record<string, any>) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', eventName, {
        app_name: 'ZenFlow',
        ...parameters
      });
    }
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
      difficulty_level: level
    });
  };

  const trackMeditationComplete = (chakra: string, duration: number) => {
    trackEvent('meditation_complete', {
      chakra_type: chakra,
      session_duration: duration
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
    trackArticleRead,
    trackBookmark
  };
};