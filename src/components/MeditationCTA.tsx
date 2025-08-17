import { Play, Pause } from "lucide-react";
import { cn } from "@/lib/utils";

interface MeditationCTAProps {
  isActive?: boolean;
  onStart: () => void;
  onResume?: () => void;
  disabled?: boolean;
}

export function MeditationCTA({ isActive = false, onStart, onResume, disabled = false }: MeditationCTAProps) {
  const handleClick = () => {
    if (isActive && onResume) {
      onResume();
    } else {
      onStart();
    }
  };

  return (
    <div className="flex justify-center mb-6">
      <button
        onClick={handleClick}
        disabled={disabled}
        className={cn(
          "flex items-center gap-3 px-8 py-4 rounded-full",
          "bg-primary text-primary-foreground font-semibold text-lg",
          "hover:bg-primary/90 active:scale-95",
          "transition-all duration-200 ease-out",
          "shadow-lg hover:shadow-xl",
          "min-w-[200px] h-14",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          "touch-manipulation" // Better mobile interaction
        )}
        style={{
          boxShadow: "var(--glow-active)"
        }}
      >
        {isActive ? (
          <>
            <Play className="h-5 w-5" />
            Resume Session
          </>
        ) : (
          <>
            <Play className="h-5 w-5" />
            Start Meditation
          </>
        )}
      </button>
    </div>
  );
}