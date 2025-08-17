import { useEffect } from "react";
import { Chakra } from "@/types/chakra";
import { Button } from "./ui/button";
import { useBreathEngine } from "@/hooks/useBreathEngine";
import { useHapticFeedback } from "@/hooks/useHapticFeedback";
import { Pause, Play, X } from "lucide-react";
import { 
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "./ui/alert-dialog";

interface MeditationSessionProps {
  chakra: Chakra;
  duration: number; // in minutes
  level?: 'beginner' | 'intermediate' | 'advanced';
  presetOverride?: 'spec' | 'calm' | 'balance' | 'energize';
  includeHolds?: boolean;
  onComplete: () => void;
  onExit: () => void;
}

export function MeditationSession({ chakra, duration, onComplete, onExit, level, presetOverride, includeHolds }: MeditationSessionProps) {
  const { phase, progress, direction, isPlaying, remaining, currentPhaseDuration, toggle } = useBreathEngine({
    chakraAppId: chakra.id,
    level: level ?? 'beginner',
    presetOverride: presetOverride ?? 'balance',
    includeHolds: includeHolds ?? false,
    minutes: duration,
    onComplete,
  });

  const { vibrate, isSupported } = useHapticFeedback();

  // Enhanced haptic feedback for breathing phases
  useEffect(() => {
    if (!isPlaying || !isSupported) return;

    if (phase === 'inhale') {
      vibrate('medium');
    } else if (phase === 'exhale') {
      vibrate('light');
    } else if (phase.includes('hold')) {
      vibrate('light');
    }
  }, [phase, isPlaying, vibrate, isSupported]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const togglePlayPause = () => {
    toggle();
  };

  const progressWidth = (direction === 'ltr' ? progress : 1 - progress) * 100;

return (
    <div 
      className="min-h-screen flex flex-col items-center justify-center relative transition-all ease-in-out"
      style={{
        backgroundColor: phase === 'inhale' 
          ? `hsl(var(--${chakra.color}))` 
          : 'hsl(220 15% 8%)',
        transitionDuration: `${currentPhaseDuration}s`,
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

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/10"
            >
              <X className="h-6 w-6" />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>End session early?</AlertDialogTitle>
              <AlertDialogDescription>
                Your progress for this session won&apos;t be saved.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Continue</AlertDialogCancel>
              <AlertDialogAction onClick={onExit}>End session</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>

      {/* Main timer display */}
<div className="text-center">
<div 
          className="text-8xl font-bold text-white mb-4 transition-all duration-1000"
          style={{
            textShadow: phase === 'inhale' ? '0 0 30px rgba(255,255,255,0.5)' : 'none'
          }}
        >
          {formatTime(remaining)}
        </div>
        
        <div className="text-2xl text-white/80 mb-8">
          {phase.includes('hold') ? 'Hold' : (phase === 'inhale' ? 'Breathe In' : 'Breathe Out')}
        </div>

        {/* Breathing indicator */}
<div 
          className="w-24 h-24 rounded-full border-4 border-white/50 mx-auto transition-all ease-in-out"
          style={{
            transform: phase === 'inhale' ? 'scale(1.5)' : 'scale(1)',
            borderColor: phase === 'inhale' ? 'white' : 'rgba(255,255,255,0.3)',
            transitionDuration: `${currentPhaseDuration}s`,
          }}
        />
      </div>

      {/* Phase progress indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="w-40 h-2 bg-white/20 rounded-full overflow-hidden">
<div 
            className="h-full bg-white transition-all ease-linear"
            style={{ 
              width: `${progressWidth}%`,
              transitionDuration: `${currentPhaseDuration}s`,
            }}
          />
        </div>
      </div>
    </div>
  );
}