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
        {/* Clean meditation figure icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <svg
            viewBox="0 0 100 100"
            className="w-32 h-32 text-white/40 animate-pulse-gentle"
            fill="currentColor"
          >
            {/* Simple meditation figure silhouette */}
            <path d="M50 20c-5 0-9 4-9 9s4 9 9 9 9-4 9-9-4-9-9-9zm-8 25v20l-8 8v5h32v-5l-8-8V45c0-2-2-4-4-4h-8c-2 0-4 2-4 4zm-12 25c-3 0-5 2-5 5v8c0 3 2 5 5 5s5-2 5-5v-8c0-3-2-5-5-5zm40 0c-3 0-5 2-5 5v8c0 3 2 5 5 5s5-2 5-5v-8c0-3-2-5-5-5z"/>
          </svg>
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