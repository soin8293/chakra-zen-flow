import { Chakra } from "@/types/chakra";
import { Button } from "./ui/button";
import { ArrowLeft } from "lucide-react";

interface MeditationPrepProps {
  chakra: Chakra;
  onBack: () => void;
  onStart: (duration: number) => void;
}

const durations = [1, 5, 10]; // minutes

export function MeditationPrep({ chakra, onBack, onStart }: MeditationPrepProps) {
  return (
    <div className="min-h-screen bg-gradient-cosmic relative overflow-hidden">
      {/* Back button */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-4 left-4 z-10 text-white hover:bg-white/10"
        onClick={onBack}
      >
        <ArrowLeft className="h-6 w-6" />
      </Button>

      {/* Main content */}
      <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center">
        {/* Chakra circle */}
        <div
          className="w-48 h-48 rounded-full flex items-center justify-center mb-8 shadow-elevation"
          style={{
            backgroundColor: `hsl(var(--${chakra.color}))`,
            boxShadow: `0 0 60px hsl(var(--${chakra.color}) / 0.4)`
          }}
        >
          <span className="text-6xl">{chakra.symbol}</span>
        </div>

        {/* Chakra info */}
        <h1 className="text-4xl font-bold text-white mb-4">{chakra.name}</h1>
        <p className="text-xl text-white/80 mb-8 max-w-md">{chakra.description}</p>

        {/* Duration selection */}
        <div className="mb-8">
          <h2 className="text-lg text-white/90 mb-4">Choose your meditation length:</h2>
          <div className="flex gap-4">
            {durations.map(duration => (
              <Button
                key={duration}
                onClick={() => onStart(duration)}
                className="w-20 h-20 rounded-full text-lg font-semibold transition-all hover:scale-110"
                style={{
                  backgroundColor: `hsl(var(--${chakra.color}))`,
                  color: 'white',
                  border: '2px solid white',
                }}
              >
                {duration}
                <br />
                min
              </Button>
            ))}
          </div>
        </div>

        {/* Chakra traits */}
        <div className="text-white/70 text-sm">
          <p><strong>Element:</strong> {chakra.element}</p>
          <p><strong>Location:</strong> {chakra.location}</p>
        </div>
      </div>
    </div>
  );
}