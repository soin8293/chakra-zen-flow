/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * CHAKRA LAYOUT CALCULATION HOOK
 * ═══════════════════════════════════════════════════════════════════════════════
 * 
 * This hook is the core engine that converts normalized chakra coordinates (0-1)
 * into actual pixel positions that can be used by React components for rendering.
 * 
 * KEY RESPONSIBILITIES FOR AI AGENTS:
 * ----------------------------------
 * 1. COORDINATE TRANSFORMATION: Converts ChakraAnchors.ts coordinates to screen pixels
 * 2. RESPONSIVE CALCULATIONS: Adapts positioning for different screen sizes
 * 3. CONTAINER TRACKING: Monitors container size changes via ResizeObserver
 * 4. SPINE CALCULATION: Determines the vertical region available for chakra placement
 * 5. SCALING LOGIC: Calculates appropriate chakra sizes based on available space
 * 
 * COORDINATE FLOW EXPLANATION:
 * ---------------------------
 * Input:  Normalized coordinates from ChakraAnchors.ts (x: 0-1, y: 0-1)
 * Process: This hook transforms them based on container size and spine area
 * Output: CSS percentage positions (x: 0-100%, y: 0-100%) for React components
 * 
 * RESPONSIVE BEHAVIOR:
 * -------------------
 * - Monitors container size changes automatically
 * - Adjusts spine height based on screen size and orientation
 * - Scales chakra elements proportionally
 * - Provides fallbacks for missing images or extreme screen sizes
 * 
 * DEBUGGING FEATURES:
 * ------------------
 * - Console logging when ?debug is in URL
 * - Coordinate validation and warnings
 * - Off-screen element detection
 */

import { useEffect, useMemo, useRef, useState } from "react";
import { CHAKRA_ANCHORS, getChakraPositions, type ChakraId } from "@/features/zenflow/ChakraAnchors";

/**
 * TYPE DEFINITIONS FOR LAYOUT SYSTEM
 * ==================================
 */

// Individual chakra position after transformation (CSS percentages)
type Pos = { 
  id: ChakraId;        // Which chakra this position represents
  xPercent: number;    // Horizontal position as CSS percentage (0-100)
  yPercent: number;    // Vertical position as CSS percentage (0-100)
};

// Spine rectangle defines the vertical region where chakras can be placed
type SpineRect = { 
  topPx: number;       // Top edge of spine in pixels from container top
  heightPx: number;    // Available height for chakra placement in pixels
};

// Complete return object from this hook
type Return = {
  positions: Pos[];               // Array of transformed chakra positions
  spineStyle: {                   // CSS styles for spine visualization line
    top: number; 
    left: string; 
    height: number; 
    width: number; 
    transform: string 
  };
  spineRect: SpineRect;          // Spine area dimensions for debugging
  scale: number;                 // Scale factor for chakra elements (0.85-1.25)
};

// Utility function to constrain values within a range
const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v));

/**
 * MAIN HOOK: useChakraLayout
 * =========================
 * 
 * AI AGENTS: This is the primary function that components call to get chakra positions.
 * 
 * @param containerSel - CSS selector for the container element (default: "[data-meditation-container]")
 * @param imageSel - CSS selector for the meditation figure image (default: "[data-meditation-figure]")
 * @returns Object containing positions, styles, and layout information
 */
export function useChakraLayout(
  containerSel = "[data-meditation-container]",  // Container to measure for responsive sizing
  imageSel = "[data-meditation-figure]"          // Image element to align chakras with
): Return {
  
  /**
   * STATE MANAGEMENT
   * ===============
   * These state variables track the current size and position of layout elements
   */
  
  // Container dimensions - updated when container resizes
  const [containerH, setContainerH] = useState<number>(0);  // Container height in pixels
  const [containerW, setContainerW] = useState<number>(0);  // Container width in pixels
  const containerRef = useRef<HTMLElement | null>(null);    // Reference to container element
  
  // Image tracking - used to align chakras with meditation figure
  const [imageTopRel, setImageTopRel] = useState<number | null>(null);  // Image top position relative to container
  const [imageH, setImageH] = useState<number>(0);                      // Image height in pixels

  /**
   * CONTAINER AND IMAGE SIZE TRACKING
   * ================================
   * 
   * This useEffect sets up observers to monitor size changes of the container
   * and meditation figure image. This is crucial for responsive positioning.
   * 
   * AI AGENTS: This runs automatically - you don't need to call it manually.
   * It ensures chakra positions update when screen size or image loads change.
   */
  useEffect(() => {
    // Find the container and image elements in the DOM
    const el = document.querySelector(containerSel) as HTMLElement | null;
    const wrapper = document.querySelector('[data-spine-wrapper]') as HTMLElement | null;
    const img = document.querySelector(imageSel) as HTMLImageElement | null;
    containerRef.current = el ?? null;
    
    // If no container found, can't calculate positions
    if (!el) return;

    /**
     * SIZE UPDATE FUNCTION
     * ===================
     * This function recalculates all dimensions when elements change size
     */
    const update = () => {
      // Get container dimensions from its bounding rectangle
      const cRect = el.getBoundingClientRect();
      setContainerH(cRect.height);  // Store container height for spine calculations
      setContainerW(cRect.width);   // Store container width for responsive behavior

      // Determine which element to measure for image alignment
      // Priority: spine wrapper (if exists) > image element > null
      const measureEl = (wrapper ?? img) as HTMLElement | null;
      
      if (measureEl) {
        // Calculate image position relative to container
        const iRect = measureEl.getBoundingClientRect();
        setImageTopRel(iRect.top - cRect.top);  // Distance from container top to image top
        setImageH(iRect.height);                // Image height for spine calculation
      } else {
        // No image found - will use fallback spine positioning
        setImageTopRel(null);
        setImageH(0);
      }
    };

    /**
     * EVENT LISTENER SETUP
     * ===================
     * Set up automatic updates when things change
     */
    
    // Wait for image to load before calculating positions
    if (img && !img.complete) {
      img.addEventListener('load', update, { once: true });
    }
    
    // Calculate initial positions
    update();

    // Set up ResizeObserver to watch for size changes
    const ro = new ResizeObserver(() => update());
    ro.observe(el);                              // Watch container for size changes
    if (wrapper) ro.observe(wrapper);           // Watch spine wrapper if it exists
    else if (img) ro.observe(img);              // Watch image if no wrapper

    /**
     * CLEANUP FUNCTION
     * ===============
     * Remove event listeners when component unmounts
     */
    return () => {
      ro.disconnect();                                           // Stop watching for size changes
      if (img) img.removeEventListener('load', update as any);   // Remove image load listener
    };
  }, [containerSel, imageSel]);  // Re-run if selectors change

  /**
   * SPINE AREA CALCULATION
   * =====================
   * 
   * The "spine" is the vertical region where chakras are positioned. This calculation
   * determines where that region starts and how tall it is, based on the meditation
   * figure image or responsive fallbacks.
   * 
   * AI AGENTS: This is recalculated whenever container or image sizes change.
   * The spine defines the coordinate space that normalized chakra positions map to.
   */
  const spineRect: SpineRect = useMemo(() => {
    const H = containerH || 0;  // Current container height
    
    // If no container height yet, return empty spine
    if (!H) return { topPx: 0, heightPx: 0 };

    // Get viewport information for responsive adjustments
    const viewportHeight = window.innerHeight;
    const viewportWidth = window.innerWidth;
    const isPortrait = viewportHeight > viewportWidth;        // Phone orientation
    const isSmallScreen = Math.min(viewportWidth, viewportHeight) < 400;  // Tiny screens

    /**
     * IMAGE-BASED SPINE CALCULATION (PREFERRED)
     * ========================================
     * When meditation figure image is available, align spine with it
     */
    if (imageH > 0 && imageTopRel !== null) {
      // Calculate spine dimensions based on image, with responsive constraints
      const minSpineH = isSmallScreen ? 150 : 200;           // Minimum height for usability
      const maxSpineH = Math.min(H, viewportHeight * 0.8);   // Don't exceed 80% of viewport
      
      // Spine height = image height, but within our min/max bounds
      const spineH = clamp(imageH, minSpineH, maxSpineH);
      
      // Spine top = image top position, but not off-screen
      const spineTop = clamp(imageTopRel, 0, H - spineH);
      
      return { topPx: spineTop, heightPx: spineH };
    }

    /**
     * FALLBACK SPINE CALCULATION (NO IMAGE)
     * ====================================
     * When no image is detected, use responsive percentage-based spine
     */
    
    // Adjust spine ratio based on screen characteristics
    const spineRatio = isPortrait ? 0.70 : (isSmallScreen ? 0.60 : 0.75);
    
    // Calculate fallback dimensions
    const minSpineH = isSmallScreen ? 150 : 200;             // Minimum height for usability
    const maxSpineH = Math.min(H, viewportHeight * 0.8);     // Maximum height constraint
    const spineH = clamp(H * spineRatio, minSpineH, maxSpineH);  // Spine height as % of container
    const spineTop = (H - spineH) / 2;                       // Center spine vertically in container
    
    return { topPx: spineTop, heightPx: spineH };
  }, [containerH, imageH, imageTopRel]);  // Recalculate when any of these change

  /**
   * CHAKRA SCALING CALCULATION
   * =========================
   * 
   * Determines how big chakra elements should be based on available space.
   * Larger spine = bigger chakras, smaller spine = smaller chakras.
   * 
   * AI AGENTS: This scaling affects the visual size of chakra buttons,
   * not their positions. Scale of 1.0 = normal size.
   */
  const scale = useMemo(() => {
    // If no dimensions available, use normal scale
    if (!containerH || !spineRect.heightPx) return 1;
    
    // Get viewport information for mobile-specific scaling
    const viewportHeight = window.innerHeight;
    const viewportWidth = window.innerWidth;
    const isMobile = Math.min(viewportWidth, viewportHeight) < 768;
    const isSmallMobile = Math.min(viewportWidth, viewportHeight) < 400;
    
    // ENHANCED SCALING FORMULA FOR MOBILE:
    // - Base calculation: spineHeight / 560px (reference size)
    // - Mobile devices: More aggressive scaling down (min 0.6 vs 0.85)
    // - Small mobile: Even more aggressive (min 0.5)
    // - Desktop: Keep original range (0.85-1.25)
    let baseScale = spineRect.heightPx / 560;
    
    if (isSmallMobile) {
      // Very small screens: allow very small chakras to fit everything
      return Math.min(Math.max(baseScale, 0.5), 1.0);
    } else if (isMobile) {
      // Mobile screens: more aggressive scaling
      return Math.min(Math.max(baseScale, 0.6), 1.1);
    } else {
      // Desktop: original scaling
      return Math.min(Math.max(baseScale, 0.85), 1.25);
    }
  }, [containerH, spineRect.heightPx]);  // Recalculate when container or spine changes

  /**
   * CHAKRA POSITION TRANSFORMATION
   * =============================
   * 
   * This is the core transformation that converts normalized coordinates (0-1)
   * from ChakraAnchors.ts into actual CSS percentage positions for rendering.
   * 
   * AI AGENTS: This is where the magic happens - normalized coordinates become
   * screen positions. The calculation maps the 0-1 coordinate space to the spine area.
   * 
   * TRANSFORMATION MATH:
   * - Normalized Y (0-1) → Pixel position within spine → CSS percentage of container
   * - Normalized X (0-1) → CSS percentage directly (usually 50% for center)
   */
  const positions: Pos[] = useMemo(() => {
    // Enable debug logging when ?debug is in URL
    const isDebug = new URLSearchParams(window.location.search).has('debug');

    // Can't calculate positions without container dimensions and spine area
    if (!containerH || !spineRect.heightPx) return [];
    
    // Get the current coordinate set from ChakraAnchors.ts
    const anchors = getChakraPositions();

    // Debug logging for development and troubleshooting
    if (isDebug) {
      console.log("CHAKRA DEBUG: Raw anchors from getChakraPositions():", JSON.parse(JSON.stringify(anchors)));
      console.log("CHAKRA DEBUG: Computed spineRect:", JSON.parse(JSON.stringify(spineRect)));
    }

    // Transform each chakra's normalized coordinates to screen positions
    const out: Pos[] = Object.entries(anchors).map(([id, pos]) => {
      /**
       * COORDINATE VALIDATION AND NORMALIZATION
       * ======================================
       * Ensure coordinates are valid numbers within 0-1 range
       */
      
      // Validate and clamp Y coordinate (vertical position)
      const anchorY = typeof pos.y === 'number' ? clamp(pos.y, 0, 1) : 0;
      
      // Validate and clamp X coordinate (horizontal position)  
      const anchorX = typeof pos.x === 'number' ? clamp(pos.x, 0, 1) : 0.5;
      
      // Warn about invalid coordinates in development mode
      if (isDebug && (pos.y < 0 || pos.y > 1 || pos.x < 0 || pos.x > 1)) {
        console.warn(`CHAKRA WARNING: ${id} has invalid coordinates: { x: ${pos.x}, y: ${pos.y} }. Should be between 0-1.`);
      }

      /**
       * POSITION CALCULATION
       * ===================
       * Convert normalized coordinates to CSS percentages
       */
      
      // Y TRANSFORMATION (vertical positioning):
      // 1. Scale normalized Y (0-1) to spine height in pixels
      // 2. Add spine top offset to position within container
      // 3. Convert to percentage of total container height
      const yPx = spineRect.topPx + anchorY * spineRect.heightPx;  // Pixel position in container
      const yPercent = (yPx / containerH) * 100;                  // CSS percentage (0-100)

      // X TRANSFORMATION (horizontal positioning):
      // Direct conversion from normalized to percentage (usually 50% for center)
      const xPercent = anchorX * 100;  // CSS percentage (0-100)

      // Additional validation for off-screen elements
      if (isDebug && (yPercent < 0 || yPercent > 100)) {
        console.warn(`CHAKRA WARNING: ${id} is off-screen. yPercent: ${yPercent.toFixed(2)}%`);
      }

      // Debug logging for each chakra's transformation
      if (isDebug) {
        console.log(`CHAKRA DEBUG: ${id} - Raw anchor: { x: ${anchorX}, y: ${anchorY} }`);
        console.log(`CHAKRA DEBUG: ${id} - Calculated: yPx=${yPx.toFixed(2)}, xPercent=${xPercent.toFixed(2)}%, yPercent=${yPercent.toFixed(2)}%`);
      }
      
      // Return the final position object for this chakra
      return { id: id as ChakraId, xPercent, yPercent };
    });
    
    return out;
  }, [containerH, spineRect, window.location.search]);  // Recalculate when any dependency changes

  /**
   * SPINE VISUALIZATION STYLES
   * ==========================
   * 
   * Calculates CSS styles for the optional spine line that can be rendered
   * as a visual guide showing the chakra alignment region.
   * 
   * AI AGENTS: This is purely visual - it doesn't affect chakra positioning.
   * The spine line helps users see where chakras are aligned.
   */
  const spineStyle = useMemo(() => {
    return {
      top: spineRect.topPx,                                    // Position from container top
      left: "50%",                                             // Center horizontally
      height: spineRect.heightPx,                              // Full spine height
      width: clamp(containerW * 0.006, 2, 8),                 // Thin line, responsive width
      transform: "translateX(-50%)",                           // Perfect centering
    };
  }, [spineRect, containerW]);  // Recalculate when spine or container width changes

  /**
   * RETURN HOOK RESULTS
   * ==================
   * 
   * AI AGENTS: This is what components receive when they call useChakraLayout()
   */
  return { 
    positions,    // Array of chakra positions with {id, xPercent, yPercent}
    spineStyle,   // CSS styles for spine line visualization
    spineRect,    // Spine area dimensions for debugging
    scale         // Scale factor for chakra element sizing
  };
}