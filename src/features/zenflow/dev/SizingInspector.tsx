import { useEffect, useState, useRef, useCallback } from "react";
import { CHAKRA_ANCHORS, type ChakraId } from "@/features/zenflow/ChakraAnchors";

interface SizingData {
  figure: { x: number; y: number; w: number; h: number };
  asset: { kind: "img" | "svg"; naturalW: number; naturalH: number; aspect: number };
  scale: { x: number; y: number };
  centerlineX: number;
  sheetHeight: number;
  chakraButtonDiameter: number;
  anchorsNorm: Array<{ id: ChakraId; x: number; y: number }>;
  anchorsPx: Array<{ id: ChakraId; x: number; y: number }>;
  containerConstraints: string[];
}

interface SizingInspectorProps {
  figureRef: React.RefObject<HTMLDivElement>;
  imgRef: React.RefObject<HTMLImageElement>;
  scale: number;
}

export function SizingInspector({ figureRef, imgRef, scale }: SizingInspectorProps) {
  const [data, setData] = useState<SizingData | null>(null);
  const rafRef = useRef<number>();

  const measureAll = useCallback(() => {
    if (!figureRef.current || !imgRef.current) return;

    const figureRect = figureRef.current.getBoundingClientRect();
    const img = imgRef.current;
    
    // Get bottom sheet height
    const sheetEl = document.querySelector('[data-bottom-sheet]') as HTMLElement;
    const sheetHeight = sheetEl ? sheetEl.getBoundingClientRect().height : 0;

    // Natural image dimensions
    const naturalW = img.naturalWidth || 0;
    const naturalH = img.naturalHeight || 0;
    const aspect = naturalW && naturalH ? naturalW / naturalH : 0;

    // Scale calculations
    const scaleX = figureRect.width / (naturalW || 1);
    const scaleY = figureRect.height / (naturalH || 1);

    // Centerline
    const centerlineX = figureRect.x + figureRect.width / 2;

    // Chakra button diameter (base 48px * scale factor)
    const chakraButtonDiameter = 48 * scale;

    // Anchors in normalized coordinates (0-1)
    const anchorsNorm = Object.entries(CHAKRA_ANCHORS).map(([id, anchor]) => ({
      id: id as ChakraId,
      x: anchor.x,
      y: anchor.y
    }));

    // Convert anchors to pixel coordinates
    const anchorsPx = anchorsNorm.map(anchor => ({
      id: anchor.id,
      x: figureRect.x + anchor.x * figureRect.width,
      y: figureRect.y + anchor.y * figureRect.height
    }));

    // Container constraints analysis
    const containerConstraints = [
      "Outer: relative w-full h-full flex items-center justify-center min-h-[400px] max-w-[880px] mx-auto px-4",
      "Inner: relative transition-all duration-300 ease-out w-full h-full",
      "Inline: minWidth: '300px', minHeight: '400px', maxWidth: '800px', maxHeight: '100vh'",
      "Image: opacity-90 filter invert object-contain transition-all duration-300 w-full h-full"
    ];

    setData({
      figure: {
        x: Math.round(figureRect.x),
        y: Math.round(figureRect.y),
        w: Math.round(figureRect.width),
        h: Math.round(figureRect.height)
      },
      asset: {
        kind: "img",
        naturalW,
        naturalH,
        aspect: Math.round(aspect * 100) / 100
      },
      scale: {
        x: Math.round(scaleX * 1000) / 1000,
        y: Math.round(scaleY * 1000) / 1000
      },
      centerlineX: Math.round(centerlineX),
      sheetHeight: Math.round(sheetHeight),
      chakraButtonDiameter: Math.round(chakraButtonDiameter),
      anchorsNorm,
      anchorsPx: anchorsPx.map(p => ({
        id: p.id,
        x: Math.round(p.x),
        y: Math.round(p.y)
      })),
      containerConstraints
    });
  }, [figureRef, imgRef, scale]);

  const debouncedMeasure = useCallback(() => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }
    rafRef.current = requestAnimationFrame(measureAll);
  }, [measureAll]);

  useEffect(() => {
    if (!figureRef.current || !imgRef.current) return;

    // Initial measurement
    measureAll();

    // Set up ResizeObserver
    const resizeObserver = new ResizeObserver(debouncedMeasure);
    resizeObserver.observe(figureRef.current);
    
    // Observe image load
    const img = imgRef.current;
    if (img && !img.complete) {
      img.addEventListener('load', measureAll);
    }

    // Observe bottom sheet if it exists
    const sheetEl = document.querySelector('[data-bottom-sheet]');
    if (sheetEl) {
      resizeObserver.observe(sheetEl);
    }

    return () => {
      resizeObserver.disconnect();
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      if (img) {
        img.removeEventListener('load', measureAll);
      }
    };
  }, [figureRef, imgRef, measureAll, debouncedMeasure]);

  if (!data) return null;

  return (
    <div className="fixed top-4 left-4 z-[9999] bg-black/90 text-white p-4 rounded-lg font-mono text-xs max-w-sm max-h-[90vh] overflow-auto">
      <div className="font-bold mb-2">Sizing Inspector</div>
      
      <div className="space-y-2">
        <div>
          <div className="text-yellow-300 font-semibold">Figure:</div>
          <div>x: {data.figure.x}, y: {data.figure.y}</div>
          <div>w: {data.figure.w}, h: {data.figure.h}</div>
        </div>

        <div>
          <div className="text-yellow-300 font-semibold">Asset:</div>
          <div>kind: {data.asset.kind}</div>
          <div>natural: {data.asset.naturalW}×{data.asset.naturalH}</div>
          <div>aspect: {data.asset.aspect}</div>
        </div>

        <div>
          <div className="text-yellow-300 font-semibold">Scale:</div>
          <div>x: {data.scale.x}, y: {data.scale.y}</div>
        </div>

        <div>
          <div className="text-yellow-300 font-semibold">Measurements:</div>
          <div>centerlineX: {data.centerlineX}px</div>
          <div>sheetHeight: {data.sheetHeight}px</div>
          <div>chakraButtonDiameter: {data.chakraButtonDiameter}px</div>
        </div>

        <div>
          <div className="text-yellow-300 font-semibold">Anchors (norm 0-1):</div>
          {data.anchorsNorm.map(anchor => (
            <div key={anchor.id}>
              {anchor.id}: {anchor.x}, {anchor.y}
            </div>
          ))}
        </div>

        <div>
          <div className="text-yellow-300 font-semibold">Anchors (px):</div>
          {data.anchorsPx.map(anchor => (
            <div key={anchor.id}>
              {anchor.id}: {anchor.x}, {anchor.y}
            </div>
          ))}
        </div>

        <div>
          <div className="text-yellow-300 font-semibold">Container Constraints:</div>
          {data.containerConstraints.map((constraint, i) => (
            <div key={i} className="text-xs break-words">
              {constraint}
            </div>
          ))}
        </div>
      </div>

      {/* Visual overlays */}
      <div className="fixed inset-0 pointer-events-none z-[9998]">
        {/* Container outline */}
        <div
          className="absolute border-2 border-red-500"
          style={{
            left: data.figure.x,
            top: data.figure.y,
            width: data.figure.w,
            height: data.figure.h
          }}
        />
        
        {/* Centerline */}
        <div
          className="absolute border-l-2 border-yellow-500"
          style={{
            left: data.centerlineX,
            top: 0,
            height: '100vh'
          }}
        />
        
        {/* Chakra anchor markers */}
        {data.anchorsPx.map(anchor => (
          <div
            key={anchor.id}
            className="absolute w-2 h-2 bg-cyan-400 rounded-full transform -translate-x-1 -translate-y-1"
            style={{
              left: anchor.x,
              top: anchor.y
            }}
          />
        ))}
      </div>
    </div>
  );
}