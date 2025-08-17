/**
 * Geometry-driven chakra positioning system
 * Provides normalized coordinates for chakra placement without magic numbers
 */

export type ChakraId = 
  | "crown"
  | "thirdEye" 
  | "throat"
  | "heart"
  | "solar"
  | "sacral"
  | "root";

export interface ChakraAnchor {
  x: number; // Normalized coordinate (0-1)
  y: number; // Normalized coordinate (0-1)
}

/**
 * Fixed geometry-based chakra anchors
 * These coordinates are based on the meditation figure's spine alignment
 * No manual calibration or debug mode required
 */
export const CHAKRA_ANCHORS: Record<ChakraId, ChakraAnchor> = {
  crown: { x: 0.5, y: 0.12 },
  thirdEye: { x: 0.5, y: 0.16 },
  throat: { x: 0.5, y: 0.20 },
  heart: { x: 0.5, y: 0.24 },
  solar: { x: 0.5, y: 0.28 },
  sacral: { x: 0.5, y: 0.32 },
  root: { x: 0.5, y: 0.36 }
};

/**
 * Convert normalized anchor coordinates to CSS percentages
 */
export function anchorToPercent(anchor: ChakraAnchor): { x: number; y: number } {
  return {
    x: anchor.x * 100,
    y: anchor.y * 100
  };
}

/**
 * Get all chakra positions as CSS percentages
 */
export function getChakraPositions(): Record<ChakraId, { x: number; y: number }> {
  const positions: Record<ChakraId, { x: number; y: number }> = {} as any;
  
  Object.entries(CHAKRA_ANCHORS).forEach(([id, anchor]) => {
    positions[id as ChakraId] = anchorToPercent(anchor);
  });
  
  return positions;
}

/**
 * Get spine height range for visual effects
 */
export function getSpineRange(): { top: number; bottom: number } {
  return {
    top: CHAKRA_ANCHORS.crown.y,
    bottom: CHAKRA_ANCHORS.root.y
  };
}