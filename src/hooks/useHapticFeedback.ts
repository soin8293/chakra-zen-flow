import { useCallback } from 'react';
import { Capacitor } from '@capacitor/core';
import { Haptics, ImpactStyle } from '@capacitor/haptics';

export type HapticType = 'light' | 'medium' | 'heavy' | 'success';

export function useHapticFeedback() {
  const isNative = Capacitor.isNativePlatform();

  const getWebPattern = useCallback((type: HapticType): number => {
    switch (type) {
      case 'light': return 50;
      case 'medium': return 100;
      case 'heavy': return 200;
      case 'success': return 150;
      default: return 100;
    }
  }, []);

  const vibrate = useCallback(async (type: HapticType = 'medium') => {
    try {
      if (isNative) {
        // Use native Capacitor haptics
        let style: ImpactStyle;
        switch (type) {
          case 'light':
            style = ImpactStyle.Light;
            break;
          case 'medium':
            style = ImpactStyle.Medium;
            break;
          case 'heavy':
            style = ImpactStyle.Heavy;
            break;
          case 'success':
            // Success pattern: three quick light taps
            await Haptics.impact({ style: ImpactStyle.Light });
            setTimeout(() => Haptics.impact({ style: ImpactStyle.Light }), 100);
            setTimeout(() => Haptics.impact({ style: ImpactStyle.Light }), 200);
            return;
          default:
            style = ImpactStyle.Medium;
        }
        await Haptics.impact({ style });
      } else {
        // Fallback to Web Vibration API
        if (navigator.vibrate) {
          if (type === 'success') {
            navigator.vibrate([100, 50, 100, 50, 100]);
          } else {
            navigator.vibrate(getWebPattern(type));
          }
        }
      }
    } catch (error) {
      console.warn('Haptic feedback failed:', error);
    }
  }, [isNative, getWebPattern]);

  const vibratePattern = useCallback(async (pattern: number[]) => {
    try {
      if (isNative) {
        // For native, convert pattern to sequential impacts
        for (let i = 0; i < pattern.length; i += 2) {
          const duration = pattern[i];
          const pause = pattern[i + 1] || 0;
          
          if (duration > 0) {
            const style = duration > 150 ? ImpactStyle.Heavy : 
                         duration > 75 ? ImpactStyle.Medium : ImpactStyle.Light;
            await Haptics.impact({ style });
          }
          
          if (pause > 0 && i < pattern.length - 1) {
            await new Promise(resolve => setTimeout(resolve, pause));
          }
        }
      } else {
        // Use web vibration pattern directly
        if (navigator.vibrate) {
          navigator.vibrate(pattern);
        }
      }
    } catch (error) {
      console.warn('Pattern haptic feedback failed:', error);
    }
  }, [isNative]);

  return {
    vibrate,
    vibratePattern,
    isNative,
    isSupported: isNative || ('vibrate' in navigator)
  };
}