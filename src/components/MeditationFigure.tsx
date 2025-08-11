import { chakras } from "@/types/chakra";
import { ChakraButton } from "./ChakraButton";
import { useChakraLayout } from "@/hooks/useChakraLayout";

interface MeditationFigureProps {
  onChakraClick: (chakraId: string) => void;
  expandingChakraId?: string;
}

export function MeditationFigure({ onChakraClick, expandingChakraId }: MeditationFigureProps) {
  const { positions, spineStyle, spineRect, debug, setYNorm } = useChakraLayout();
  const scaleFactor = Math.min(Math.max(spineRect.heightPx / 560, 0.85), 1.25);

  return (
    <div className="relative w-full h-full flex items-center justify-center min-h-[400px]">
      {/* Responsive Meditation Figure Container */}
      <div 
        className="relative transition-all duration-300 ease-out w-full h-full max-w-md max-h-[80vh]"
        data-meditation-container
        style={{
          aspectRatio: '4/5'
        }}
      >
        {/* Layer 1: Multi-layer glowing background effects */}
        <div className="absolute inset-0 flex items-center justify-center z-0">
          <div 
            className="rounded-full bg-white/8 blur-3xl animate-pulse"
            style={{
              width: `300px`,
              height: `300px`
            }}
          />
          <div 
            className="absolute rounded-full bg-white/15 blur-2xl animate-pulse"
            style={{ 
              animationDelay: '0.5s',
              width: `200px`,
              height: `200px`
            }}
          />
          <div 
            className="absolute rounded-full bg-white/25 blur-xl animate-pulse"
            style={{ 
              animationDelay: '1s',
              width: `100px`,
              height: `100px`
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
            data-meditation-figure
            src="/lovable-uploads/367d80a7-5795-4dfa-a351-9d3588def8bd.png"
            alt="Meditation figure in lotus position"
            className="opacity-90 filter invert object-contain transition-all duration-300 w-full h-full"
          />
        </div>

        {/* Layer 4: Chakra positioning overlay */}
        <div className="absolute inset-0 z-30" aria-label="Interactive chakra points">
          {/* Layer 5: Individual chakra buttons */}
          {positions.map((pos) => {
            const chakra = chakras.find(c => c.id === pos.id);
            if (!chakra) return null;
            
            return (
              <ChakraButton
                key={chakra.id}
                chakra={chakra}
                position={{ x: pos.xPercent, y: pos.yPercent, scale: scaleFactor }}
                onClick={() => onChakraClick(chakra.id)}
                isExpanding={expandingChakraId === chakra.id}
                scale={scaleFactor}
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

        {/* Debug overlay for calibration */}
        {debug && spineRect.heightPx > 0 && (
          <div className="absolute inset-0 pointer-events-none text-[10px] text-white/70 z-40">
            <div
              className="absolute border border-white/30"
              style={{
                top: spineRect.topPx,
                left: '50%',
                height: spineRect.heightPx,
                width: Number(spineStyle.width) + 8,
                transform: 'translateX(-50%)',
                borderRadius: 8
              }}
            />
            {[0, 0.25, 0.5, 0.75, 1].map((t) => (
              <div
                key={t}
                className="absolute left-0 right-0 border-t border-white/20"
                style={{ top: spineRect.topPx + t * spineRect.heightPx }}
              >
                <span className="absolute left-2 -translate-y-1/2">{t}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}