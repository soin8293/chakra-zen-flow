import { chakras } from "@/types/chakra";
import { ChakraButton } from "./ChakraButton";

interface MeditationFigureProps {
  onChakraClick: (chakraId: string) => void;
  expandingChakraId?: string;
}

export function MeditationFigure({ onChakraClick, expandingChakraId }: MeditationFigureProps) {
  // Chakra positions aligned with the meditation figure image
  const chakraPositions = [
    { x: 50, y: 85 }, // Root - base/pelvis
    { x: 50, y: 75 }, // Sacral - lower abdomen  
    { x: 50, y: 65 }, // Solar Plexus - upper abdomen
    { x: 50, y: 55 }, // Heart - chest center
    { x: 50, y: 45 }, // Throat - neck area
    { x: 50, y: 35 }, // Third Eye - forehead
    { x: 50, y: 25 }, // Crown - top of head
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
            className="w-40 h-48 opacity-40 animate-pulse-gentle filter invert object-contain"
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