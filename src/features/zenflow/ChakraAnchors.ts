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
 * CHAKRA POSITIONING SYSTEM
 * ========================
 * 
 * Fixed geometry-based chakra anchors using normalized coordinates (0-1)
 * 
 * HOW TO ADJUST CHAKRA POSITIONS:
 * ------------------------------
 * 
 * X VALUES (horizontal position):
 * - 0.5 = center of figure (recommended for all chakras)
 * - Lower values (0.4) = move left
 * - Higher values (0.6) = move right
 * 
 * Y VALUES (vertical position - MOST IMPORTANT FOR EDITING):
 * - Lower values = higher on screen (crown should be lowest number)
 * - Higher values = lower on screen (root should be highest number)
 * 
 * CURRENT SPREAD: 0.24 total (from 0.12 to 0.36)
 * 
 * TO MAKE CHAKRAS MORE SPREAD OUT:
 * - Decrease crown y value (e.g., 0.10 instead of 0.12)
 * - Increase root y value (e.g., 0.40 instead of 0.36)
 * - Adjust others proportionally
 * 
 * TO MAKE CHAKRAS MORE COMPRESSED:
 * - Increase crown y value (e.g., 0.15 instead of 0.12)
 * - Decrease root y value (e.g., 0.33 instead of 0.36)
 * - Adjust others proportionally
 * 
 * TO MOVE ALL CHAKRAS UP/DOWN:
 * - Subtract/add same value to all y coordinates
 * - Example: subtract 0.05 from all to move everything up
 */
export const CHAKRA_ANCHORS: Record<ChakraId, ChakraAnchor> = {
  crown: { x: 0.9, y: 0.12 },    // TOP chakra - decrease y to move higher, increase to move lower
  thirdEye: { x: 0.5, y: 0.16 }, // Decrease y to compress upward, increase to spread downward
  throat: { x: 0.5, y: 0.20 },   // Adjust proportionally with others
  heart: { x: 0.5, y: 0.24 },    // CENTER reference point
  solar: { x: 0.5, y: 0.28 },    // Adjust proportionally with others
  sacral: { x: 0.5, y: 0.32 },   // Increase y to spread downward, decrease to compress upward
  root: { x: 0.5, y: 0.36 }      // BOTTOM chakra - increase y to move lower, decrease to move higher
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
 * Get all chakra positions as normalized coordinates (0-1)
 */
export function getChakraPositions(): Record<ChakraId, { x: number; y: number }> {
  const positions: Record<ChakraId, { x: number; y: number }> = {} as any;
  
  Object.entries(CHAKRA_ANCHORS).forEach(([id, anchor]) => {
    positions[id as ChakraId] = { x: anchor.x, y: anchor.y };
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