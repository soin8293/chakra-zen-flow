import { Play } from "lucide-react";
import { cn } from "@/lib/utils";

interface MeditationCTAProps {
  isActive?: boolean;
  onStart: () => void;
  onResume?: () => void;
  disabled?: boolean;
  className?: string;
}

export function MeditationCTA({ 
  isActive = false, 
  onStart, 
  onResume, 
  disabled = false,
  className 
}: MeditationCTAProps) {
  const handleClick = () => {
    if (isActive && onResume) {
      onResume();
    } else {
      onStart();
    }
  };

  return (
    <div className={cn("flex justify-center meditation-cta-mobile", className)}>
      <button
        onClick={handleClick}
        disabled={disabled}
        className={cn(
          "flex items-center justify-center gap-3",
          "h-12 md:h-14 px-8 rounded-full",
          "bg-primary text-primary-foreground",
          "font-semibold text-base md:text-lg",
          "hover:bg-primary/90 active:scale-95",
          "transition-all duration-200 ease-out",
          "shadow-lg hover:shadow-xl",
          "min-w-[200px] max-w-[280px]",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          "touch-manipulation",
          "focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2",
          "safe-area-below"
        )}
      >
        <Play className="h-5 w-5 flex-shrink-0" />
        <span className="truncate">
          {isActive ? "Resume Session" : "Start Meditation"}
        </span>
      </button>
    </div>
  );
}