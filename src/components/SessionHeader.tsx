import { cn } from "@/lib/utils";

interface SessionHeaderProps {
  title?: string;
  timeRemaining?: number;
  progress?: number;
  className?: string;
}

export function SessionHeader({ 
  title = "Meditation Session", 
  timeRemaining = 0, 
  progress = 0,
  className 
}: SessionHeaderProps) {
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className={cn(
      "sticky top-0 z-40 bg-background/95 backdrop-blur-sm",
      "border-b border-border/50 px-4 py-3",
      className
    )}>
      <div className="max-w-[880px] mx-auto">
        {/* Session info */}
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg font-semibold text-foreground">{title}</h2>
          <div className="text-sm font-mono text-muted-foreground">
            {formatTime(timeRemaining)}
          </div>
        </div>
        
        {/* Progress bar */}
        <div className="w-full h-0.5 bg-muted rounded-full overflow-hidden">
          <div 
            className="h-full bg-primary transition-all duration-300 ease-out"
            style={{ width: `${Math.max(0, Math.min(100, progress * 100))}%` }}
          />
        </div>
      </div>
    </div>
  );
}