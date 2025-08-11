import { useEffect, useMemo, useRef, useState } from "react";

export type ChakraId =
  | "crown"
  | "third_eye"
  | "throat"
  | "heart"
  | "solar_plexus"
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
  crown: 0.03,
  third_eye: 0.17,
  throat: 0.30,
  heart: 0.48,
  solar_plexus: 0.63,
  sacral: 0.80,
  root: 0.95,
};

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

export function useChakraLayout(containerSel = "[data-meditation-container]"): Return {
  const [containerH, setContainerH] = useState<number>(0);
  const [containerW, setContainerW] = useState<number>(0);
  const containerRef = useRef<HTMLElement | null>(null);

  const debug = useMemo(() => {
    if (typeof window === "undefined") return false;
    const q = new URLSearchParams(window.location.search);
    return q.has(QUERY_DEBUG_KEY);
  }, []);

  // observe container size
  useEffect(() => {
    const el = document.querySelector(containerSel) as HTMLElement | null;
    containerRef.current = el ?? null;
    if (!el) return;

    // initial
    const rect = el.getBoundingClientRect();
    setContainerH(rect.height);
    setContainerW(rect.width);

    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const cr = entry.contentRect;
        setContainerH(cr.height);
        setContainerW(cr.width);
      }
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [containerSel]);

  // compute spineRect from container height
  const spineRect: SpineRect = useMemo(() => {
    const H = containerH || 0;
    if (!H) return { topPx: 0, heightPx: 0 };
    const spineH = clamp(H * 0.70, 200, H);
    const spineTop = (H - spineH) / 2;
    return { topPx: spineTop, heightPx: spineH };
  }, [containerH]);

  // resolve yNorm with optional debug overrides
  const yNorm: Record<ChakraId, number> = useMemo(() => {
    if (!debug) return DEFAULT_Y_NORM;
    const overrides = readOverrides();
    return { ...DEFAULT_Y_NORM, ...overrides } as Record<ChakraId, number>;
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