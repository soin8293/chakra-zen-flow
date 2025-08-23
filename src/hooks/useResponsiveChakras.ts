import { useState, useEffect, useCallback } from 'react';
import { chakras } from '@/types/chakra';

interface ChakraPosition {
  x: number;
  y: number;
  scale: number;
}

interface ResponsiveChakrasConfig {
  containerWidth: number;
  containerHeight: number;
  figureScale: number;
}

/**
 * ⚠️ WARNING: THIS HOOK IS NOT BEING USED BUT CONTAINS DUPLICATE CHAKRA POSITIONING LOGIC
 * 
 * This hook defines its own hardcoded chakra positions that COMPLETELY IGNORE your CHAKRA_ANCHORS.
 * If any component were using this instead of useChakraLayout, your coordinate edits would have no effect.
 * 
 * THE ACTUAL POSITIONING SYSTEM BEING USED:
 * - src/hooks/useChakraLayout.ts (uses your editable CHAKRA_ANCHORS)
 * - src/features/zenflow/ChakraAnchors.ts (your coordinate file)
 * 
 * THIS FILE SHOULD PROBABLY BE DELETED to avoid confusion.
 */
export function useResponsiveChakras() {
  const [config, setConfig] = useState<ResponsiveChakrasConfig>({
    containerWidth: 256, // Default w-64
    containerHeight: 320, // Default h-80
    figureScale: 1
  });

  // ⚠️ HARDCODED POSITIONS - These ignore your CHAKRA_ANCHORS completely!
  // These are different values than what you're editing in ChakraAnchors.ts
  const getChakraPositions = useCallback((): ChakraPosition[] => {
    const { containerWidth, containerHeight, figureScale } = config;
    
    // ⚠️ HARDCODED anatomical positions - NOT using your editable coordinates!
    const anatomicalPositions = [
      { y: 0.15, name: 'Crown' },     // ← This is hardcoded, not from CHAKRA_ANCHORS
      { y: 0.25, name: 'Third Eye' }, // ← This is hardcoded, not from CHAKRA_ANCHORS
      { y: 0.35, name: 'Throat' },    // ← This is hardcoded, not from CHAKRA_ANCHORS
      { y: 0.50, name: 'Heart' },     // ← This is hardcoded, not from CHAKRA_ANCHORS
      { y: 0.65, name: 'Solar' },     // ← This is hardcoded, not from CHAKRA_ANCHORS
      { y: 0.80, name: 'Sacral' },    // ← This is hardcoded, not from CHAKRA_ANCHORS
      { y: 0.90, name: 'Root' }       // ← This is hardcoded, not from CHAKRA_ANCHORS
    ];

    return chakras.map((chakra, index) => {
      const position = anatomicalPositions[index];
      const baseScale = Math.max(0.8, Math.min(1.5, figureScale));
      
      return {
        x: 50, // Always centered horizontally
        y: position.y * 100, // Convert to percentage
        scale: baseScale
      };
    });
  }, [config]);

  // Update configuration based on container size
  const updateConfig = useCallback((element: HTMLElement | null) => {
    if (!element) return;

    const rect = element.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    // Calculate responsive dimensions
    const minDimension = Math.min(viewportWidth, viewportHeight);
    const figureScale = Math.max(0.6, Math.min(1.8, minDimension / 400));
    
    const containerWidth = Math.max(200, Math.min(400, rect.width));
    const containerHeight = Math.max(250, Math.min(500, rect.height));

    setConfig({
      containerWidth,
      containerHeight,
      figureScale
    });
  }, []);

  // ResizeObserver setup
  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (entry) {
        updateConfig(entry.target as HTMLElement);
      }
    });

    // Initial setup
    const container = document.querySelector('[data-meditation-container]') as HTMLElement;
    if (container) {
      resizeObserver.observe(container);
      updateConfig(container);
    }

    // Window resize fallback
    const handleResize = () => {
      const container = document.querySelector('[data-meditation-container]') as HTMLElement;
      updateConfig(container);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', handleResize);
    };
  }, [updateConfig]);

  return {
    positions: getChakraPositions(),
    config,
    updateConfig
  };
}