import { useEffect, useMemo, useRef, useState } from "react";
import { CHAKRA_ANCHORS, getChakraPositions, type ChakraId } from "@/features/zenflow/ChakraAnchors";

type Pos = { id: ChakraId; xPercent: number; yPercent: number };
type SpineRect = { topPx: number; heightPx: number };

type Return = {
  positions: Pos[];
  spineStyle: { top: number; left: string; height: number; width: number; transform: string };
  spineRect: SpineRect;
  scale: number;
};

// clamp helper
const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v));

export function useChakraLayout(
  containerSel = "[data-meditation-container]",
  imageSel = "[data-meditation-figure]"
): Return {
  const [containerH, setContainerH] = useState<number>(0);
  const [containerW, setContainerW] = useState<number>(0);
  const containerRef = useRef<HTMLElement | null>(null);
  const [imageTopRel, setImageTopRel] = useState<number | null>(null);
  const [imageH, setImageH] = useState<number>(0);

  // observe container + image size (with image load guard and wrapper preference)
  useEffect(() => {
    const el = document.querySelector(containerSel) as HTMLElement | null;
    const wrapper = document.querySelector('[data-spine-wrapper]') as HTMLElement | null;
    const img = document.querySelector(imageSel) as HTMLImageElement | null;
    containerRef.current = el ?? null;
    if (!el) return;

    const update = () => {
      const cRect = el.getBoundingClientRect();
      setContainerH(cRect.height);
      setContainerW(cRect.width);

      const measureEl = (wrapper ?? img) as HTMLElement | null;
      if (measureEl) {
        const iRect = measureEl.getBoundingClientRect();
        setImageTopRel(iRect.top - cRect.top);
        setImageH(iRect.height);
      } else {
        setImageTopRel(null);
        setImageH(0);
      }
    };

    // initial and on image load
    if (img && !img.complete) {
      img.addEventListener('load', update, { once: true });
    }
    update();

    const ro = new ResizeObserver(() => update());
    ro.observe(el);
    if (wrapper) ro.observe(wrapper);
    else if (img) ro.observe(img);

    return () => {
      ro.disconnect();
      if (img) img.removeEventListener('load', update as any);
    };
  }, [containerSel, imageSel]);

  // RESPONSIVE SPINE HEIGHT CALCULATION
  // ===================================
  // Enhanced spine calculation with viewport constraints and better fallbacks
  const spineRect: SpineRect = useMemo(() => {
    const H = containerH || 0;
    if (!H) return { topPx: 0, heightPx: 0 };

    // Viewport-based constraints for better responsive behavior
    const viewportHeight = window.innerHeight;
    const viewportWidth = window.innerWidth;
    const isPortrait = viewportHeight > viewportWidth;
    const isSmallScreen = Math.min(viewportWidth, viewportHeight) < 400;

    if (imageH > 0 && imageTopRel !== null) {
      // Image-based spine calculation with viewport constraints
      const minSpineH = isSmallScreen ? 150 : 200;
      const maxSpineH = Math.min(H, viewportHeight * 0.8);
      const spineH = clamp(imageH, minSpineH, maxSpineH);
      const spineTop = clamp(imageTopRel, 0, H - spineH);
      return { topPx: spineTop, heightPx: spineH };
    }

    // Enhanced fallback with responsive considerations
    const spineRatio = isPortrait ? 0.70 : (isSmallScreen ? 0.60 : 0.75);
    const minSpineH = isSmallScreen ? 150 : 200;
    const maxSpineH = Math.min(H, viewportHeight * 0.8);
    const spineH = clamp(H * spineRatio, minSpineH, maxSpineH);
    const spineTop = (H - spineH) / 2;
    return { topPx: spineTop, heightPx: spineH };
  }, [containerH, imageH, imageTopRel]);

  // CHAKRA SCALING CALCULATION
  // ==========================
  // This makes chakras bigger/smaller based on available space
  const scale = useMemo(() => {
    if (!containerH || !spineRect.heightPx) return 1;
    // EDIT THESE VALUES TO ADJUST CHAKRA SIZE SCALING:
    // - Change 560 to make chakras scale sooner (lower) or later (higher)
    // - Change 0.85 to set minimum scale (smaller = tinier chakras)
    // - Change 1.25 to set maximum scale (larger = bigger chakras)
    return Math.min(Math.max(spineRect.heightPx / 560, 0.85), 1.25);
  }, [containerH, spineRect.heightPx]);

  // Enhanced chakra position calculation with validation
  const positions: Pos[] = useMemo(() => {
    const isDebug = new URLSearchParams(window.location.search).has('debug');

    if (!containerH || !spineRect.heightPx) return [];
    const anchors = getChakraPositions();

    if (isDebug) {
      console.log("CHAKRA DEBUG: Raw anchors from getChakraPositions():", JSON.parse(JSON.stringify(anchors)));
      console.log("CHAKRA DEBUG: Computed spineRect:", JSON.parse(JSON.stringify(spineRect)));
    }

    const out: Pos[] = Object.entries(anchors).map(([id, pos]) => {
      // Coordinate validation and normalization
      const anchorY = typeof pos.y === 'number' ? clamp(pos.y, 0, 1) : 0;
      const anchorX = typeof pos.x === 'number' ? clamp(pos.x, 0, 1) : 0.5;
      
      // Warn about invalid coordinates in development
      if (isDebug && (pos.y < 0 || pos.y > 1 || pos.x < 0 || pos.x > 1)) {
        console.warn(`CHAKRA WARNING: ${id} has invalid coordinates: { x: ${pos.x}, y: ${pos.y} }. Should be between 0-1.`);
      }

      const yPx = spineRect.topPx + anchorY * spineRect.heightPx;
      const yPercent = (yPx / containerH) * 100;
      const xPercent = anchorX * 100;

      // Additional validation for off-screen elements
      if (isDebug && (yPercent < 0 || yPercent > 100)) {
        console.warn(`CHAKRA WARNING: ${id} is off-screen. yPercent: ${yPercent.toFixed(2)}%`);
      }

      if (isDebug) {
        console.log(`CHAKRA DEBUG: ${id} - Raw anchor: { x: ${anchorX}, y: ${anchorY} }`);
        console.log(`CHAKRA DEBUG: ${id} - Calculated: yPx=${yPx.toFixed(2)}, xPercent=${xPercent.toFixed(2)}%, yPercent=${yPercent.toFixed(2)}%`);
      }
      
      return { id: id as ChakraId, xPercent, yPercent };
    });
    return out;
  }, [containerH, spineRect, window.location.search]);

  const spineStyle = useMemo(() => {
    return {
      top: spineRect.topPx,
      left: "50%",
      height: spineRect.heightPx,
      width: clamp(containerW * 0.006, 2, 8), // thin line 0.6% of width (min/max guard)
      transform: "translateX(-50%)",
    };
  }, [spineRect, containerW]);

  return { positions, spineStyle, spineRect, scale };
}