import { chakras } from "@/types/chakra";
import { ChakraButton } from "./ChakraButton";
import { useResponsiveChakras } from "@/hooks/useResponsiveChakras";

interface MeditationFigureProps {
  onChakraClick: (chakraId: string) => void;
  expandingChakraId?: string;
}

export function MeditationFigure({ onChakraClick, expandingChakraId }: MeditationFigureProps) {
  const { positions, config } = useResponsiveChakras();

  return (
    <div className="relative w-full h-full flex items-center justify-center min-h-[400px]">
      {/* Responsive Meditation Figure Container */}
      <div 
        className="relative transition-all duration-300 ease-out"
        data-meditation-container
        style={{
          width: `clamp(200px, ${config.containerWidth}px, 90vw)`,
          height: `clamp(250px, ${config.containerHeight}px, 80vh)`,
          aspectRatio: '4/5'
        }}
      >
        {/* Layer 1: Multi-layer glowing background effects */}
        <div className="absolute inset-0 flex items-center justify-center z-0">
          <div 
            className="rounded-full bg-white/8 blur-3xl animate-pulse"
            style={{
              width: `${Math.max(200, config.containerWidth * 0.8)}px`,
              height: `${Math.max(200, config.containerWidth * 0.8)}px`
            }}
          />
          <div 
            className="absolute rounded-full bg-white/15 blur-2xl animate-pulse"
            style={{ 
              animationDelay: '0.5s',
              width: `${Math.max(150, config.containerWidth * 0.6)}px`,
              height: `${Math.max(150, config.containerWidth * 0.6)}px`
            }}
          />
          <div 
            className="absolute rounded-full bg-white/25 blur-xl animate-pulse"
            style={{ 
              animationDelay: '1s',
              width: `${Math.max(100, config.containerWidth * 0.4)}px`,
              height: `${Math.max(100, config.containerWidth * 0.4)}px`
            }}
          />
        </div>

        {/* Layer 2: Responsive spine energy line */}
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div 
            className="rounded-full opacity-40 transition-all duration-300"
            style={{
              width: `${Math.max(2, config.figureScale * 4)}px`,
              height: `${Math.max(200, config.containerHeight * 0.7)}px`,
              background: `linear-gradient(to bottom, 
                hsl(var(--chakra-crown) / 0.4),
                hsl(var(--chakra-third-eye) / 0.4),
                hsl(var(--chakra-throat) / 0.4),
                hsl(var(--chakra-heart) / 0.4),
                hsl(var(--chakra-solar) / 0.4),
                hsl(var(--chakra-sacral) / 0.4),
                hsl(var(--chakra-root) / 0.4)
              )`
            }}
          />
        </div>

        {/* Layer 3: Responsive meditation figure */}
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <img 
            src="/lovable-uploads/367d80a7-5795-4dfa-a351-9d3588def8bd.png"
            alt="Meditation figure in lotus position"
            className="opacity-90 filter invert object-contain transition-all duration-300"
            style={{
              width: `${Math.max(150, config.containerWidth * 0.7)}px`,
              height: `${Math.max(150, config.containerWidth * 0.7)}px`,
              transform: `scale(${config.figureScale})`
            }}
          />
        </div>

        {/* Layer 4: Chakra positioning overlay */}
        <div className="absolute inset-0 z-30" aria-label="Interactive chakra points">
          {/* Layer 5: Individual chakra buttons */}
          {chakras.map((chakra, index) => (
            <ChakraButton
              key={chakra.id}
              chakra={chakra}
              position={positions[index]}
              onClick={() => onChakraClick(chakra.id)}
              isExpanding={expandingChakraId === chakra.id}
              scale={config.figureScale}
            />
          ))}
        </div>

        {/* Layer 6: Expanding chakra effects overlay */}
        {expandingChakraId && (
          <div className="absolute inset-0 z-50 pointer-events-none">
            <div 
              className="absolute rounded-full animate-ping"
              style={{
                left: '50%',
                top: `${positions.find((_, i) => chakras[i].id === expandingChakraId)?.y || 50}%`,
                transform: 'translate(-50%, -50%)',
                width: `${Math.max(60, config.figureScale * 80)}px`,
                height: `${Math.max(60, config.figureScale * 80)}px`,
                backgroundColor: `hsl(var(--${chakras.find(c => c.id === expandingChakraId)?.color}) / 0.3)`
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}