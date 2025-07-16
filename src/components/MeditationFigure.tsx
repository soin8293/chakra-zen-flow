import { chakras } from "@/types/chakra";
import { ChakraButton } from "./ChakraButton";

interface MeditationFigureProps {
  onChakraClick: (chakraId: string) => void;
  expandingChakraId?: string;
}

export function MeditationFigure({ onChakraClick, expandingChakraId }: MeditationFigureProps) {
  // Chakra positions aligned with the simple meditation figure
  const chakraPositions = [
    { x: 50, y: 88 }, // Root - base
    { x: 50, y: 78 }, // Sacral - lower abdomen
    { x: 50, y: 68 }, // Solar Plexus - upper abdomen
    { x: 50, y: 58 }, // Heart - chest center
    { x: 50, y: 48 }, // Throat - throat area
    { x: 50, y: 38 }, // Third Eye - forehead
    { x: 50, y: 28 }, // Crown - top of head
  ];

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Simple Meditation Figure Container */}
      <div className="relative w-48 h-64">
        {/* Meditation figure from uploaded image */}
        <div className="absolute inset-0 flex items-center justify-center">
          <img 
            src="/lovable-uploads/68914da5-0095-4573-9463-0fe7454a8848.png"
            alt="Meditation figure"
            className="w-32 h-32 opacity-40 animate-pulse-gentle filter invert"
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