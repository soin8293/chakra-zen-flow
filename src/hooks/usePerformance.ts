import { useEffect, useState } from 'react';

// Performance monitoring for app store optimization
export const usePerformanceMonitoring = () => {
  const [metrics, setMetrics] = useState({
    loadTime: 0,
    renderTime: 0,
    interactionTime: 0
  });

  useEffect(() => {
    // Measure initial load time
    const loadTime = performance.now();
    
    // Measure First Contentful Paint
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          if (entry.name === 'first-contentful-paint') {
            setMetrics(prev => ({ ...prev, renderTime: entry.startTime }));
          }
        });
      });
      
      observer.observe({ entryTypes: ['paint'] });
      
      return () => observer.disconnect();
    }

    setMetrics(prev => ({ ...prev, loadTime }));
  }, []);

  return metrics;
};

// Image lazy loading optimization
export const useImageOptimization = () => {
  const [isIntersecting, setIsIntersecting] = useState(false);

  const observeImage = (element: HTMLElement | null) => {
    if (!element || !('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
          observer.unobserve(element);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(element);
    return () => observer.unobserve(element);
  };

  return { isIntersecting, observeImage };
};

// Memory usage optimization
export const useMemoryOptimization = () => {
  useEffect(() => {
    const cleanup = () => {
      // Clear unused data from memory
      if (window.gc) {
        window.gc();
      }
    };

    const interval = setInterval(cleanup, 30000); // Every 30 seconds
    return () => clearInterval(interval);
  }, []);

  // Bundle size analyzer (development only)
  const analyzeBundleSize = () => {
    if (process.env.NODE_ENV === 'development') {
      console.log('Bundle analysis available in build tools');
    }
  };

  return { analyzeBundleSize };
};