import { chakras } from "@/types/chakra";
import { ChakraButton } from "./ChakraButton";

interface MeditationFigureProps {
  onChakraClick: (chakraId: string) => void;
  expandingChakraId?: string;
}

export function MeditationFigure({ onChakraClick, expandingChakraId }: MeditationFigureProps) {
  // Chakra positions along the figure's centerline
  const chakraPositions = [
    { x: 50, y: 85 }, // Root - base
    { x: 50, y: 75 }, // Sacral - lower abdomen
    { x: 50, y: 65 }, // Solar Plexus - upper abdomen
    { x: 50, y: 55 }, // Heart - chest
    { x: 50, y: 45 }, // Throat - throat
    { x: 50, y: 35 }, // Third Eye - forehead
    { x: 50, y: 25 }, // Crown - top of head
  ];

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Meditation Figure SVG */}
      <div className="relative w-48 h-64">
        <svg
          viewBox="0 0 200 300"
          className="w-full h-full drop-shadow-lg"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Body outline */}
          <path
            d="M100 50 C85 50 75 60 75 75 L75 200 C75 210 85 220 100 220 C115 220 125 210 125 200 L125 75 C125 60 115 50 100 50 Z"
            stroke="hsl(var(--foreground) / 0.3)"
            strokeWidth="2"
            fill="hsl(var(--foreground) / 0.1)"
          />
          
          {/* Head */}
          <circle
            cx="100"
            cy="40"
            r="25"
            stroke="hsl(var(--foreground) / 0.3)"
            strokeWidth="2"
            fill="hsl(var(--foreground) / 0.1)"
          />
          
          {/* Arms in meditation pose */}
          <path
            d="M75 100 C60 100 50 110 50 125 C50 140 60 150 75 150"
            stroke="hsl(var(--foreground) / 0.3)"
            strokeWidth="2"
            fill="none"
          />
          <path
            d="M125 100 C140 100 150 110 150 125 C150 140 140 150 125 150"
            stroke="hsl(var(--foreground) / 0.3)"
            strokeWidth="2"
            fill="none"
          />
          
          {/* Legs in lotus position */}
          <path
            d="M85 220 C75 230 65 240 55 250 C45 260 45 270 55 275"
            stroke="hsl(var(--foreground) / 0.3)"
            strokeWidth="2"
            fill="none"
          />
          <path
            d="M115 220 C125 230 135 240 145 250 C155 260 155 270 145 275"
            stroke="hsl(var(--foreground) / 0.3)"
            strokeWidth="2"
            fill="none"
          />
        </svg>

        {/* Chakra buttons positioned over the figure */}
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
  );
}