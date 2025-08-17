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

  // compute spineRect from container height
  const spineRect: SpineRect = useMemo(() => {
    const H = containerH || 0;
    if (!H) return { topPx: 0, heightPx: 0 };

    if (imageH > 0 && imageTopRel !== null) {
      const spineH = clamp(imageH, 200, H);
      const spineTop = clamp(imageTopRel, 0, H - spineH);
      return { topPx: spineTop, heightPx: spineH };
    }

    // fallback: center within container
    const spineH = clamp(H * 0.70, 200, H);
    const spineTop = (H - spineH) / 2;
    return { topPx: spineTop, heightPx: spineH };
  }, [containerH, imageH, imageTopRel]);

  // compute responsive scale factor
  const scale = useMemo(() => {
    if (!containerH || !spineRect.heightPx) return 1;
    return Math.min(Math.max(spineRect.heightPx / 560, 0.85), 1.25);
  }, [containerH, spineRect.heightPx]);

  // compute positions using geometry-driven anchors
  const positions: Pos[] = useMemo(() => {
    if (!containerH || !spineRect.heightPx) return [];
    const anchors = getChakraPositions();
    const out: Pos[] = Object.entries(anchors).map(([id, pos]) => {
      const yPx = spineRect.topPx + (pos.y / 100) * spineRect.heightPx;
      const yPercent = (yPx / containerH) * 100;
      return { id: id as ChakraId, xPercent: pos.x, yPercent };
    });
    return out;
  }, [containerH, spineRect]);

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