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
        {/* Glowing light background */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-48 h-48 rounded-full bg-white/10 blur-2xl animate-pulse" />
          <div className="absolute w-32 h-32 rounded-full bg-white/20 blur-xl animate-pulse" style={{ animationDelay: '0.5s' }} />
          <div className="absolute w-16 h-16 rounded-full bg-white/30 blur-lg animate-pulse" style={{ animationDelay: '1s' }} />
        </div>

        {/* Meditation figure from uploaded image */}
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <img 
            src="/lovable-uploads/367d80a7-5795-4dfa-a351-9d3588def8bd.png"
            alt="Meditation figure"
            className="w-48 h-48 opacity-90 filter invert object-contain"
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