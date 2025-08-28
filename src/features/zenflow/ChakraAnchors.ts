/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * CHAKRA POSITIONING SYSTEM - COORDINATE DEFINITIONS
 * ═══════════════════════════════════════════════════════════════════════════════
 * 
 * This file defines the core coordinate system for positioning chakra elements
 * on a meditation figure. It uses normalized coordinates (0-1 scale) that get
 * converted to actual pixel positions by the layout system.
 * 
 * KEY CONCEPTS FOR AI AGENTS:
 * ---------------------------
 * 1. NORMALIZED COORDINATES: All positions use 0-1 scale, NOT pixels
 *    - x: 0 = left edge, 0.5 = center, 1 = right edge
 *    - y: 0 = top edge, 0.5 = middle, 1 = bottom edge
 * 
 * 2. COORDINATE FLOW: 
 *    ChakraAnchors.ts → useChakraLayout.ts → MeditationFigure.tsx → ChakraButton.tsx
 * 
 * 3. RESPONSIVE DESIGN: These coordinates scale automatically with screen size
 * 
 * 4. EDITING COORDINATES: Change values here to move chakras on the figure
 *    - Lower y values = higher on screen (crown should have lowest y)
 *    - Higher y values = lower on screen (root should have highest y)
 *    - x should typically stay at 0.5 (center) for all chakras
 * 
 * COMMON ISSUES FOR AI AGENTS TO WATCH FOR:
 * ----------------------------------------
 * - Coordinates outside 0-1 range (will position off-screen)
 * - y=0 positions (crown) can be clipped at very top of screen
 * - Inconsistent coordinate ordering (crown should have lowest y, root highest)
 * - Missing validation when editing coordinates programmatically
 */

/**
 * TYPE DEFINITIONS
 * ================
 * These types ensure type safety when working with chakra IDs and coordinates
 */

// Chakra identifier - matches the 7 main chakras in Hindu/Buddhist tradition
export type ChakraId = 
  | "crown"      // 7th chakra - top of head (highest position)
  | "thirdEye"   // 6th chakra - forehead/between eyebrows  
  | "throat"     // 5th chakra - throat area
  | "heart"      // 4th chakra - center of chest (middle reference point)
  | "solar"      // 3rd chakra - upper abdomen/solar plexus
  | "sacral"     // 2nd chakra - lower abdomen/pelvis
  | "root";      // 1st chakra - base of spine (lowest position)

// Coordinate structure - always uses normalized 0-1 values
export interface ChakraAnchor {
  x: number; // Horizontal position: 0=left, 0.5=center, 1=right
  y: number; // Vertical position: 0=top, 0.5=middle, 1=bottom
}

/**
 * COORDINATE EDITING GUIDE FOR AI AGENTS
 * ======================================
 * 
 * The coordinates below define where each chakra appears on the meditation figure.
 * These are the ONLY values you should edit to change chakra positions.
 * 
 * VERTICAL POSITIONING (Y VALUES) - MOST IMPORTANT:
 * ------------------------------------------------
 * - crown (0.05): Slightly below very top to avoid clipping
 * - thirdEye (0.15): Forehead area, below crown
 * - throat (0.30): Neck/throat region
 * - heart (0.45): Center chest - this is the reference point
 * - solar (0.60): Upper abdomen/stomach area
 * - sacral (0.75): Lower abdomen/pelvis
 * - root (0.90): Near bottom, base of spine area
 * 
 * HORIZONTAL POSITIONING (X VALUES):
 * ---------------------------------
 * - All set to 0.5 (center) - rarely needs changing
 * - Could adjust slightly (0.48-0.52) for anatomical accuracy
 * 
 * SPACING ADJUSTMENTS:
 * ------------------
 * - To spread out: Decrease crown y, increase root y
 * - To compress: Increase crown y, decrease root y  
 * - To move all up: Subtract same value from all y coordinates
 * - To move all down: Add same value to all y coordinates
 */
/**
 * CHAKRA COORDINATE DEFINITIONS
 * ============================
 * 
 * These are the actual coordinate values that position each chakra.
 * AI AGENTS: These are the ONLY values to edit for position changes.
 * 
 * COORDINATE VALIDATION RULES:
 * - All x values should be between 0-1 (0.5 recommended for center alignment)
 * - All y values should be between 0-1 and properly ordered
 * - Crown should have lowest y value (closest to 0)
 * - Root should have highest y value (closest to 1)
 * - Maintain reasonable spacing between adjacent chakras (0.10-0.20 difference)
 */
export const CHAKRA_ANCHORS: Record<ChakraId, ChakraAnchor> = {
  // TOP CHAKRA - Crown: Positioned near head, slightly down from very top to avoid clipping
  crown: { x: 0.5, y: 0.05 },    // y=0.05: Just below screen top edge
  
  // UPPER CHAKRAS - Head and throat region
  thirdEye: { x: 0.5, y: 0.15 }, // y=0.15: Forehead area, between crown and throat
  throat: { x: 0.5, y: 0.30 },   // y=0.30: Neck/throat region
  
  // CENTER CHAKRA - Heart: Reference point for the entire system
  heart: { x: 0.5, y: 0.45 },    // y=0.45: Chest center - key reference point
  
  // LOWER CHAKRAS - Abdomen and pelvis region  
  solar: { x: 0.5, y: 0.60 },    // y=0.60: Upper abdomen/solar plexus
  sacral: { x: 0.5, y: 0.75 },   // y=0.75: Lower abdomen/pelvis area
  
  // BOTTOM CHAKRA - Root: Positioned near base, with room at bottom
  root: { x: 0.5, y: 0.90 }       // y=0.90: Base of spine, near bottom edge
};

/**
 * COORDINATE CONVERSION UTILITIES
 * ==============================
 * These functions convert between coordinate systems for different uses
 */

/**
 * Convert normalized anchor coordinates (0-1) to CSS percentages (0-100)
 * 
 * AI AGENTS: Use this when you need percentage values for CSS positioning
 * 
 * @param anchor - Normalized coordinate object {x: 0-1, y: 0-1}
 * @returns CSS percentage object {x: 0-100, y: 0-100}
 * 
 * Example: anchorToPercent({x: 0.5, y: 0.3}) returns {x: 50, y: 30}
 */
export function anchorToPercent(anchor: ChakraAnchor): { x: number; y: number } {
  return {
    x: anchor.x * 100,  // 0.5 becomes 50%
    y: anchor.y * 100   // 0.3 becomes 30%
  };
}

/**
 * Get all chakra positions as normalized coordinates (0-1 scale)
 * 
 * AI AGENTS: This is the main function used by the layout system.
 * It returns the current coordinate set for all chakras.
 * 
 * @returns Object mapping each ChakraId to its {x, y} coordinates
 * 
 * Example return: { crown: {x: 0.5, y: 0.05}, thirdEye: {x: 0.5, y: 0.15}, ... }
 */
export function getChakraPositions(): Record<ChakraId, { x: number; y: number }> {
  // Create a clean copy of the coordinates to prevent accidental mutations
  const positions: Record<ChakraId, { x: number; y: number }> = {} as any;
  
  // Copy each coordinate pair from CHAKRA_ANCHORS
  Object.entries(CHAKRA_ANCHORS).forEach(([id, anchor]) => {
    positions[id as ChakraId] = { 
      x: anchor.x,  // Horizontal position (0-1)
      y: anchor.y   // Vertical position (0-1)
    };
  });
  
  return positions;
}

/**
 * Calculate the vertical range occupied by the chakra system
 * 
 * AI AGENTS: Use this to determine the total vertical space needed
 * for chakra rendering, useful for responsive design calculations.
 * 
 * @returns Object with top and bottom y-coordinates of the chakra system
 * 
 * Example: If crown.y=0.05 and root.y=0.90, returns {top: 0.05, bottom: 0.90}
 */
export function getSpineRange(): { top: number; bottom: number } {
  return {
    top: CHAKRA_ANCHORS.crown.y,    // Highest chakra position (lowest y value)
    bottom: CHAKRA_ANCHORS.root.y   // Lowest chakra position (highest y value)  
  };
}
