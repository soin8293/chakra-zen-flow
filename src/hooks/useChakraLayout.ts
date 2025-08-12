import { useEffect, useMemo, useRef, useState } from "react";

export type ChakraId =
  | "crown"
  | "thirdEye"
  | "throat"
  | "heart"
  | "solar"
  | "sacral"
  | "root";

type Pos = { id: ChakraId; xPercent: number; yPercent: number };
type SpineRect = { topPx: number; heightPx: number };

type Return = {
  positions: Pos[];
  spineStyle: { top: number; left: string; height: number; width: number; transform: string };
  spineRect: SpineRect;
  debug: boolean;
  setYNorm: (id: ChakraId, next: number) => void; // dev-only; persists to localStorage when debug
};

// ---------- constants ----------
const STORAGE_KEY = "chakra.yNorm";
const QUERY_DEBUG_KEY = "layout";

export const DEFAULT_Y_NORM: Record<ChakraId, number> = {
  crown: 0.35,
  thirdEye: 0.36,
  throat: 0.37,
  heart: 0.38,
  solar: 0.39,
  sacral: 0.40,
  root: 0.41,
};

// spine pad overrides
const PADS_KEY = "chakra.spinePads";
type SpinePads = { top: number; bottom: number };
function readPadOverrides(): SpinePads {
  try {
    const raw = localStorage.getItem(PADS_KEY);
    if (!raw) return { top: 0, bottom: 0 };
    const obj = JSON.parse(raw);
    const top = typeof obj?.top === "number" ? obj.top : 0;
    const bottom = typeof obj?.bottom === "number" ? obj.bottom : 0;
    const clamp01 = (v: number) => Math.max(0, Math.min(0.3, v));
    return { top: clamp01(top), bottom: clamp01(bottom) };
  } catch {
    return { top: 0, bottom: 0 };
  }
}

// clamp helper
const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v));

// safe parse of overrides
function readOverrides(): Partial<Record<ChakraId, number>> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const obj = JSON.parse(raw);
    const out: Partial<Record<ChakraId, number>> = {};
    for (const k of Object.keys(DEFAULT_Y_NORM) as ChakraId[]) {
      const val = obj[k];
      if (typeof val === "number" && val >= 0 && val <= 1) out[k] = val;
    }
    return out;
  } catch {
    return {};
  }
}

function writeOverrides(next: Partial<Record<ChakraId, number>>) {
  try {
    const current = readOverrides();
    const merged = { ...current, ...next };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
  } catch {
    /* ignore */
  }
}

export function useChakraLayout(
  containerSel = "[data-meditation-container]",
  imageSel = "[data-meditation-figure]"
): Return {
  const [containerH, setContainerH] = useState<number>(0);
  const [containerW, setContainerW] = useState<number>(0);
  const containerRef = useRef<HTMLElement | null>(null);
  const [imageTopRel, setImageTopRel] = useState<number | null>(null);
  const [imageH, setImageH] = useState<number>(0);

  const debug = useMemo(() => {
    if (typeof window === "undefined") return false;
    const q = new URLSearchParams(window.location.search);
    return q.has(QUERY_DEBUG_KEY);
  }, []);

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

  // resolve yNorm with optional debug overrides
  const yNorm: Record<ChakraId, number> = useMemo(() => {
    if (!debug) return DEFAULT_Y_NORM;
    const overrides = readOverrides();
    return { ...DEFAULT_Y_NORM, ...overrides } as Record<ChakraId, number>;
  }, [debug]);

  const pads = useMemo(() => {
    const base: SpinePads = { top: 0, bottom: 0 };
    if (!debug) return base;
    return { ...base, ...readPadOverrides() };
  }, [debug]);

  // compute positions (%)
  const positions: Pos[] = useMemo(() => {
    if (!containerH || !spineRect.heightPx) return [];
    const ids = Object.keys(DEFAULT_Y_NORM) as ChakraId[];
    const out: Pos[] = ids.map((id) => {
      const yPx = spineRect.topPx + yNorm[id] * spineRect.heightPx;
      const yPercent = (yPx / containerH) * 100;
      return { id, xPercent: 50, yPercent };
    });
    return out;
  }, [containerH, spineRect, yNorm]);

  const spineStyle = useMemo(() => {
    return {
      top: spineRect.topPx,
      left: "50%",
      height: spineRect.heightPx,
      width: clamp(containerW * 0.006, 2, 8), // thin line 0.6% of width (min/max guard)
      transform: "translateX(-50%)",
    };
  }, [spineRect, containerW]);

  const setYNorm = (id: ChakraId, nextVal: number) => {
    if (!debug) return; // no-op in prod
    const v = clamp(nextVal, 0, 1);
    writeOverrides({ [id]: v });
  };

  return { positions, spineStyle, spineRect, debug, setYNorm };
}