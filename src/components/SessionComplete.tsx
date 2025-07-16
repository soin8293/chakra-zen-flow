import { Chakra } from "@/types/chakra";
import { Button } from "./ui/button";

interface SessionCompleteProps {
  chakra: Chakra;
  duration: number;
  onRestart: () => void;
  onBackToHome: () => void;
}

export function SessionComplete({ chakra, duration, onRestart, onBackToHome }: SessionCompleteProps) {
  return (
    <div className="min-h-screen bg-gradient-cosmic flex flex-col items-center justify-center p-6 text-center">
      {/* Success animation */}
      <div className="mb-8">
        <div
          className="w-32 h-32 rounded-full flex items-center justify-center animate-pulse-glow mx-auto mb-6"
          style={{
            backgroundColor: `hsl(var(--${chakra.color}))`,
            boxShadow: `0 0 60px hsl(var(--${chakra.color}) / 0.5)`
          }}
        >
          <span className="text-6xl">✨</span>
        </div>
      </div>

      {/* Completion message */}
      <h1 className="text-3xl font-bold text-white mb-4">
        Session Complete!
      </h1>
      
      <p className="text-white/80 mb-2">
        You meditated on your <span className="font-semibold">{chakra.name}</span>
      </p>
      
      <p className="text-white/60 mb-8">
        for {duration} minute{duration !== 1 ? 's' : ''}
      </p>

      {/* Motivational quote */}
      <div className="bg-white/10 rounded-2xl p-6 mb-8 max-w-md">
        <p className="text-white/90 italic text-lg">
          "Your energy is balanced, your spirit is aligned."
        </p>
      </div>

      {/* Action buttons */}
      <div className="space-y-4 w-full max-w-xs">
        <Button
          onClick={onRestart}
          className="w-full h-12 text-lg font-semibold"
          style={{
            backgroundColor: `hsl(var(--${chakra.color}))`,
            color: 'white',
            border: '2px solid white',
          }}
        >
          Restart Session
        </Button>
        
        <Button
          onClick={onBackToHome}
          variant="outline"
          className="w-full h-12 text-lg bg-white/10 border-white/30 text-white hover:bg-white/20"
        >
          Back to Home
        </Button>
      </div>
    </div>
  );
}