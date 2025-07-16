import { useEffect, useState } from "react";
import { Chakra } from "@/types/chakra";
import { Button } from "./ui/button";
import { Pause, Play, X } from "lucide-react";

interface MeditationSessionProps {
  chakra: Chakra;
  duration: number; // in minutes
  onComplete: () => void;
  onExit: () => void;
}

export function MeditationSession({ chakra, duration, onComplete, onExit }: MeditationSessionProps) {
  const [timeRemaining, setTimeRemaining] = useState(duration * 60); // Convert to seconds
  const [isPlaying, setIsPlaying] = useState(true);
  const [phase, setPhase] = useState<'inhale' | 'exhale'>('inhale');
  const [phaseTime, setPhaseTime] = useState(0);

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          onComplete();
          return 0;
        }
        return prev - 1;
      });

      setPhaseTime(prev => {
        const newPhaseTime = prev + 1;
        if (newPhaseTime >= 5) { // 5 seconds per phase
          setPhase(current => current === 'inhale' ? 'exhale' : 'inhale');
          return 0;
        }
        return newPhaseTime;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isPlaying, onComplete]);

  // Enhanced vibration effect for inhale phase
  useEffect(() => {
    if (phase === 'inhale' && isPlaying && 'vibrate' in navigator) {
      navigator.vibrate([100, 50, 100]); // Pattern for deeper awareness
    }
  }, [phase, isPlaying]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div 
      className="min-h-screen flex flex-col items-center justify-center relative transition-all duration-[5s] ease-in-out"
      style={{
        backgroundColor: phase === 'inhale' 
          ? `hsl(var(--${chakra.color}))` 
          : 'hsl(220 15% 8%)',
      }}
    >
      {/* Control buttons - fade in on hover/touch */}
      <div className="absolute top-4 right-4 flex gap-2 opacity-20 hover:opacity-100 transition-opacity">
        <Button
          variant="ghost"
          size="icon"
          className="text-white hover:bg-white/10"
          onClick={togglePlayPause}
        >
          {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="text-white hover:bg-white/10"
          onClick={onExit}
        >
          <X className="h-6 w-6" />
        </Button>
      </div>

      {/* Main timer display */}
      <div className="text-center">
        <div 
          className="text-8xl font-bold text-white mb-4 transition-all duration-1000"
          style={{
            textShadow: phase === 'inhale' ? '0 0 30px rgba(255,255,255,0.5)' : 'none'
          }}
        >
          {formatTime(timeRemaining)}
        </div>
        
        <div className="text-2xl text-white/80 mb-8">
          {phase === 'inhale' ? 'Breathe In' : 'Breathe Out'}
        </div>

        {/* Breathing indicator */}
        <div 
          className="w-24 h-24 rounded-full border-4 border-white/50 mx-auto transition-all duration-[5s] ease-in-out"
          style={{
            transform: phase === 'inhale' ? 'scale(1.5)' : 'scale(1)',
            borderColor: phase === 'inhale' ? 'white' : 'rgba(255,255,255,0.3)'
          }}
        />
      </div>

      {/* Phase progress indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="w-40 h-2 bg-white/20 rounded-full overflow-hidden">
          <div 
            className="h-full bg-white transition-all duration-1000 ease-linear"
            style={{ width: `${(phaseTime / 5) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}