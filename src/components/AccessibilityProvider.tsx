import React, { createContext, useContext, useEffect, useState } from 'react';

interface AccessibilityContextType {
  announcements: string[];
  announceToScreenReader: (message: string) => void;
  reduceMotion: boolean;
  highContrast: boolean;
  largeText: boolean;
  setReduceMotion: (value: boolean) => void;
  setHighContrast: (value: boolean) => void;
  setLargeText: (value: boolean) => void;
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export const useAccessibility = () => {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error('useAccessibility must be used within AccessibilityProvider');
  }
  return context;
};

interface Props {
  children: React.ReactNode;
}

export const AccessibilityProvider: React.FC<Props> = ({ children }) => {
  console.log('AccessibilityProvider: Rendering');
  const [announcements, setAnnouncements] = useState<string[]>([]);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [largeText, setLargeText] = useState(false);

  // Detect system preferences
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const prefersHighContrast = window.matchMedia('(prefers-contrast: high)');
    
    setReduceMotion(prefersReducedMotion.matches);
    setHighContrast(prefersHighContrast.matches);

    const handleMotionChange = (e: MediaQueryListEvent) => setReduceMotion(e.matches);
    const handleContrastChange = (e: MediaQueryListEvent) => setHighContrast(e.matches);

    prefersReducedMotion.addEventListener('change', handleMotionChange);
    prefersHighContrast.addEventListener('change', handleContrastChange);

    return () => {
      prefersReducedMotion.removeEventListener('change', handleMotionChange);
      prefersHighContrast.removeEventListener('change', handleContrastChange);
    };
  }, []);

  // Apply accessibility classes to document
  useEffect(() => {
    const classes = document.documentElement.classList;
    
    if (reduceMotion) {
      classes.add('reduce-motion');
    } else {
      classes.remove('reduce-motion');
    }

    if (highContrast) {
      classes.add('high-contrast');
    } else {
      classes.remove('high-contrast');
    }

    if (largeText) {
      classes.add('large-text');
    } else {
      classes.remove('large-text');
    }
  }, [reduceMotion, highContrast, largeText]);

  const announceToScreenReader = (message: string) => {
    setAnnouncements(prev => [...prev, message]);
    
    // Remove announcement after it's been read
    setTimeout(() => {
      setAnnouncements(prev => prev.slice(1));
    }, 1000);
  };

  return (
    <AccessibilityContext.Provider
      value={{
        announcements,
        announceToScreenReader,
        reduceMotion,
        highContrast,
        largeText,
        setReduceMotion,
        setHighContrast,
        setLargeText,
      }}
    >
      {children}
      
      {/* Screen reader announcements */}
      <div
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
        role="status"
      >
        {announcements.map((announcement, index) => (
          <div key={index}>{announcement}</div>
        ))}
      </div>
    </AccessibilityContext.Provider>
  );
};