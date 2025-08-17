import { useRef, useState } from "react";
import { chakras } from "@/types/chakra";
import { ChakraButton } from "./ChakraButton";
import { useChakraLayout } from "@/hooks/useChakraLayout";

// Development sizing inspector (lazy loaded)
let SizingInspector: any = null;
if (process.env.NODE_ENV !== "production") {
  import("@/features/zenflow/dev/SizingInspector").then(m => {
    SizingInspector = m.SizingInspector;
  });
}

interface MeditationFigureProps {
  onChakraClick: (chakraId: string) => void;
  expandingChakraId?: string;
}

export function MeditationFigure({ onChakraClick, expandingChakraId }: MeditationFigureProps) {
  const { positions, spineStyle, spineRect, scale } = useChakraLayout();
  
  // Refs for sizing inspector
  const figureRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  
  // Development sizing inspector toggle
  const [showSizing, setShowSizing] = useState(false);
  const isDev = process.env.NODE_ENV !== "production";

  return (
    <div className="relative w-full h-full flex items-center justify-center min-h-[400px] max-w-[880px] mx-auto px-4">
      {/* Responsive Meditation Figure Container */}
      <div 
        ref={figureRef}
        className="relative transition-all duration-300 ease-out w-full h-full"
        data-meditation-container
        style={{
          minWidth: '300px',
          minHeight: '400px',
          maxWidth: '800px',
          maxHeight: '100vh'
        }}
      >
        {/* Layer 1: Radial vignette */}
        <div className="absolute inset-0 flex items-center justify-center z-0">
          <div 
            className="rounded-full bg-gradient-radial from-white/10 via-white/5 to-transparent"
            style={{
              width: `${Math.min(400, spineRect.heightPx * 0.8)}px`,
              height: `${Math.min(400, spineRect.heightPx * 0.8)}px`
            }}
          />
        </div>

        {/* Layer 2: Responsive spine energy line */}
        <div 
          className="absolute rounded-full opacity-40 transition-all duration-300"
          style={{
            position: "absolute",
            top: spineStyle.top,
            left: spineStyle.left,
            height: spineStyle.height,
            width: spineStyle.width,
            transform: spineStyle.transform,
            background: `linear-gradient(to bottom, 
              hsl(var(--chakra-crown) / 0.4),
              hsl(var(--chakra-third-eye) / 0.4),
              hsl(var(--chakra-throat) / 0.4),
              hsl(var(--chakra-heart) / 0.4),
              hsl(var(--chakra-solar) / 0.4),
              hsl(var(--chakra-sacral) / 0.4),
              hsl(var(--chakra-root) / 0.4)
            )`,
            borderRadius: 9999
          }}
        />

        {/* Layer 3: Responsive meditation figure */}
        <div data-spine-wrapper className="absolute inset-0 flex items-center justify-center z-20">
          <img 
            ref={imgRef}
            data-meditation-figure
            src="/lovable-uploads/367d80a7-5795-4dfa-a351-9d3588def8bd.png"
            alt="Meditation figure in lotus position"
            className="opacity-90 filter invert object-contain transition-all duration-300 w-full h-full scale-[1.75]"
          />
        </div>

        {/* Layer 4: Chakra positioning overlay */}
        <div className="absolute inset-0 z-30 w-full h-full" 
             style={{ transform: `scale(${scale})`, transformOrigin: 'center' }} 
             aria-label="Interactive chakra points">
          {/* Layer 5: Individual chakra buttons */}
          {positions.map((pos) => {
            const chakra = chakras.find(c => c.id === pos.id);
            if (!chakra) return null;
            
            return (
              <ChakraButton
                key={chakra.id}
                chakra={chakra}
                position={{ x: pos.xPercent, y: pos.yPercent, scale }}
                onClick={() => onChakraClick(chakra.id)}
                isExpanding={expandingChakraId === chakra.id}
                scale={scale}
              />
            );
          })}
        </div>

        {/* Layer 6: Expanding chakra effects overlay */}
        {expandingChakraId && (
          <div className="absolute inset-0 z-50 pointer-events-none">
            <div 
              className="absolute rounded-full animate-ping"
              style={{
                left: '50%',
                top: `${positions.find(p => p.id === expandingChakraId)?.yPercent || 50}%`,
                transform: 'translate(-50%, -50%)',
                width: `60px`,
                height: `60px`,
                backgroundColor: `hsl(var(--${chakras.find(c => c.id === expandingChakraId)?.color}) / 0.3)`
              }}
            />
          </div>
        )}

        {/* Development sizing inspector */}
        {showSizing && SizingInspector && (
          <SizingInspector
            figureRef={figureRef}
            imgRef={imgRef}
            scale={scale}
          />
        )}

      </div>

      {/* Development toggle button */}
      {isDev && (
        <button
          onClick={() => setShowSizing(!showSizing)}
          className="fixed bottom-4 right-4 z-[10000] bg-purple-600 hover:bg-purple-700 text-white px-3 py-2 rounded-lg text-sm font-mono transition-colors"
        >
          {showSizing ? "Hide" : "Show"} Sizing
        </button>
      )}
    </div>
  );
}