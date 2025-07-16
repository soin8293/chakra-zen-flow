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
          className="w-full h-full animate-float"
          style={{ filter: 'drop-shadow(0 0 20px rgba(255,255,255,0.1))' }}
        >
          {/* Head with subtle gradient */}
          <defs>
            <linearGradient id="figureGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="white" stopOpacity="0.8" />
              <stop offset="100%" stopColor="white" stopOpacity="0.4" />
            </linearGradient>
            <linearGradient id="chakraSpine" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="hsl(var(--chakra-crown))" stopOpacity="0.2" />
              <stop offset="16%" stopColor="hsl(var(--chakra-third-eye))" stopOpacity="0.2" />
              <stop offset="32%" stopColor="hsl(var(--chakra-throat))" stopOpacity="0.2" />
              <stop offset="48%" stopColor="hsl(var(--chakra-heart))" stopOpacity="0.2" />
              <stop offset="64%" stopColor="hsl(var(--chakra-solar))" stopOpacity="0.2" />
              <stop offset="80%" stopColor="hsl(var(--chakra-sacral))" stopOpacity="0.2" />
              <stop offset="100%" stopColor="hsl(var(--chakra-root))" stopOpacity="0.2" />
            </linearGradient>
          </defs>

          {/* Head */}
          <circle
            cx="100"
            cy="50"
            r="25"
            fill="none"
            stroke="url(#figureGradient)"
            strokeWidth="2.5"
          />
          
          {/* Chakra spine line */}
          <path
            d="M 100 75 L 100 180"
            stroke="url(#chakraSpine)"
            strokeWidth="4"
            fill="none"
          />
          
          {/* Body outline */}
          <path
            d="M 100 75 L 100 180"
            stroke="url(#figureGradient)"
            strokeWidth="2"
            fill="none"
          />
          
          {/* Shoulders */}
          <path
            d="M 85 95 Q 100 90 115 95"
            stroke="url(#figureGradient)"
            strokeWidth="2"
            fill="none"
          />
          
          {/* Arms in meditation pose */}
          <path
            d="M 85 95 Q 70 115 75 135 Q 80 145 90 150"
            stroke="url(#figureGradient)"
            strokeWidth="2"
            fill="none"
          />
          <path
            d="M 115 95 Q 130 115 125 135 Q 120 145 110 150"
            stroke="url(#figureGradient)"
            strokeWidth="2"
            fill="none"
          />
          
          {/* Hands in mudra position */}
          <circle cx="90" cy="150" r="4" fill="url(#figureGradient)" opacity="0.8" />
          <circle cx="110" cy="150" r="4" fill="url(#figureGradient)" opacity="0.8" />
          
          {/* Crossed legs - more anatomical */}
          <path
            d="M 100 180 Q 85 190 70 200 Q 60 210 65 225"
            stroke="url(#figureGradient)"
            strokeWidth="2"
            fill="none"
          />
          <path
            d="M 100 180 Q 115 190 130 200 Q 140 210 135 225"
            stroke="url(#figureGradient)"
            strokeWidth="2"
            fill="none"
          />
          
          {/* Thighs */}
          <path
            d="M 85 190 Q 95 185 105 190"
            stroke="url(#figureGradient)"
            strokeWidth="2"
            fill="none"
          />
          
          {/* Feet in lotus position */}
          <ellipse cx="65" cy="230" rx="12" ry="6" fill="none" stroke="url(#figureGradient)" strokeWidth="2" />
          <ellipse cx="135" cy="230" rx="12" ry="6" fill="none" stroke="url(#figureGradient)" strokeWidth="2" />
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