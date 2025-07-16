import { Chakra } from "@/types/chakra";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface ChakraButtonProps {
  chakra: Chakra;
  position: { x: number; y: number };
  onClick: () => void;
  isExpanding?: boolean;
}

export function ChakraButton({ chakra, position, onClick, isExpanding }: ChakraButtonProps) {
  const handleClick = () => {
    // Haptic feedback
    if ('vibrate' in navigator) {
      navigator.vibrate(50);
    }
    onClick();
  };

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          className={cn(
            "absolute w-12 h-12 rounded-full flex items-center justify-center",
            "transition-all duration-300 hover:scale-125 hover:shadow-2xl",
            "shadow-lg animate-pulse-gentle",
            "border-2 border-white/30 hover:border-white/60",
            "group relative overflow-hidden",
            `bg-${chakra.color}`,
            isExpanding && "animate-expand-chakra z-50"
          )}
          style={{
            left: `${position.x}%`,
            top: `${position.y}%`,
            transform: "translate(-50%, -50%)",
            backgroundColor: `hsl(var(--${chakra.color}))`,
            boxShadow: `0 0 20px hsl(var(--${chakra.color}) / 0.3)`,
          }}
          onMouseEnter={() => {
            // Enhanced glow on hover
            const element = document.activeElement as HTMLElement;
            if (element) {
              element.style.boxShadow = `0 0 40px hsl(var(--${chakra.color}) / 0.6)`;
            }
          }}
          onMouseLeave={() => {
            const element = document.activeElement as HTMLElement;
            if (element) {
              element.style.boxShadow = `0 0 20px hsl(var(--${chakra.color}) / 0.3)`;
            }
          }}
          onClick={handleClick}
          aria-label={`${chakra.name} chakra meditation`}
        >
          {/* Ripple effect */}
          <div className="absolute inset-0 rounded-full bg-white/20 transform scale-0 group-active:scale-110 transition-transform duration-200" />
          
          <span className="relative text-white text-lg font-bold select-none z-10">
            {chakra.position}
          </span>
        </button>
      </TooltipTrigger>
      <TooltipContent side="right" className="bg-background/95 backdrop-blur-sm border-white/20">
        <p className="font-medium">{chakra.name}</p>
        <p className="text-sm text-muted-foreground">{chakra.description}</p>
      </TooltipContent>
    </Tooltip>
  );
}