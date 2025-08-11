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

export function useResponsiveChakras() {
  const [config, setConfig] = useState<ResponsiveChakrasConfig>({
    containerWidth: 256, // Default w-64
    containerHeight: 320, // Default h-80
    figureScale: 1
  });

  // Anatomically correct chakra positions along the spine
  const getChakraPositions = useCallback((): ChakraPosition[] => {
    const { containerWidth, containerHeight, figureScale } = config;
    
    // Anatomical positions from top of head to base of spine
    const anatomicalPositions = [
      { y: 0.15, name: 'Crown' },     // Top of head
      { y: 0.25, name: 'Third Eye' }, // Forehead
      { y: 0.35, name: 'Throat' },    // Throat area
      { y: 0.50, name: 'Heart' },     // Center chest
      { y: 0.65, name: 'Solar' },     // Upper abdomen
      { y: 0.80, name: 'Sacral' },    // Lower abdomen
      { y: 0.90, name: 'Root' }       // Base of spine
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