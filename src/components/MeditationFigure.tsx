import { chakras } from "@/types/chakra";
import { ChakraButton } from "./ChakraButton";

interface MeditationFigureProps {
  onChakraClick: (chakraId: string) => void;
  expandingChakraId?: string;
}

export function MeditationFigure({ onChakraClick, expandingChakraId }: MeditationFigureProps) {
  // Dynamic chakra positioning based on anatomical proportions
  const imageHeight = 320; // h-80 in pixels
  const chakraPositions = chakras.map((_, index) => {
    // All chakras centered in the middle of the screen
    const anatomicalPositions = [0.50, 0.50, 0.50, 0.50, 0.50, 0.50, 0.50]; // Root to Crown
    return {
      x: 50, // Center horizontally
      y: anatomicalPositions[index] * 100 // Convert to percentage
    };
  });

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Meditation Figure Container - Much Larger */}
      <div className="relative w-64 h-80">
        {/* Meditation figure from uploaded image */}
        <div className="absolute inset-0 flex items-center justify-center">
          <img 
            src="/lovable-uploads/68914da5-0095-4573-9463-0fe7454a8848.png"
            alt="Meditation figure"
            className="w-56 h-72 opacity-40 animate-pulse-gentle filter invert object-contain"
          />
        </div>

        {/* Subtle spine energy line */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div 
            className="w-1 h-40 rounded-full opacity-30"
            style={{
              background: `linear-gradient(to bottom, 
                hsl(var(--chakra-crown) / 0.3),
                hsl(var(--chakra-third-eye) / 0.3),
                hsl(var(--chakra-throat) / 0.3),
                hsl(var(--chakra-heart) / 0.3),
                hsl(var(--chakra-solar) / 0.3),
                hsl(var(--chakra-sacral) / 0.3),
                hsl(var(--chakra-root) / 0.3)
              )`
            }}
          />
        </div>

        {/* Chakra buttons positioned over the figure */}
        <div className="absolute inset-0 z-10">
          {chakras.map((chakra, index) => (
            <ChakraButton
              key={chakra.id}
              chakra={chakra}
              position={chakraPositions[index]}
              onClick={() => onChakraClick(chakra.id)}
              isExpanding={expandingChakraId === chakra.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
}