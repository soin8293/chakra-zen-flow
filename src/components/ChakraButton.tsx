import { Chakra } from "@/types/chakra";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface ChakraButtonProps {
  chakra: Chakra;
  position: { x: number; y: number; scale: number };
  onClick: () => void;
  isExpanding?: boolean;
  isSelected?: boolean;
  scale?: number;
}

export function ChakraButton({ chakra, position, onClick, isExpanding, isSelected = false, scale = 1 }: ChakraButtonProps) {
  const handleClick = () => {
    // Haptic feedback
    if ('vibrate' in navigator) {
      navigator.vibrate(50);
    }
    onClick();
  };

  // Calculate responsive button size
  const buttonSize = Math.max(32, Math.min(56, 48 * position.scale));
  const fontSize = Math.max(12, Math.min(20, 16 * position.scale));

  // Check for reduced motion preference
  const prefersReducedMotion = typeof window !== 'undefined' && 
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          className={cn(
            "absolute rounded-full flex items-center justify-center",
            "transition-all duration-300 will-change-transform",
            "shadow-lg border-2 group relative overflow-hidden",
            "touch-manipulation min-w-[48px] min-h-[48px]", // Better accessibility
            // State-based styling
            {
              // Rest state
              "border-white/30 hover:border-white/60": !isSelected && !isExpanding,
              // Hover state (if not reduced motion)
              "hover:scale-125": !prefersReducedMotion && !isSelected,
              // Selected state
              "border-white/80 scale-110": isSelected,
              // Expanding state
              "animate-ping z-50": isExpanding,
              // Breathing animation (if not reduced motion)
              "chakra-pulse": !prefersReducedMotion && !isSelected && !isExpanding,
              // Static glow for reduced motion
              "chakra-glow-static": prefersReducedMotion && !isSelected
            }
          )}
          style={{
            left: `${position.x}%`,
            top: `${position.y}%`,
            transform: "translate(-50%, -50%)",
            width: `${buttonSize}px`,
            height: `${buttonSize}px`,
            backgroundColor: `hsl(var(--${chakra.color}))`,
            boxShadow: isSelected 
              ? `0 0 ${Math.max(25, 35 * scale)}px hsl(var(--${chakra.color}) / 0.8)`
              : `0 0 ${Math.max(15, 20 * scale)}px hsl(var(--${chakra.color}) / 0.3)`,
            fontSize: `${fontSize}px`
          }}
          onMouseEnter={(e) => {
            if (prefersReducedMotion) return;
            const target = e.currentTarget as HTMLElement;
            target.style.boxShadow = `0 0 ${Math.max(30, 40 * scale)}px hsl(var(--${chakra.color}) / 0.6)`;
          }}
          onMouseLeave={(e) => {
            if (prefersReducedMotion) return;
            const target = e.currentTarget as HTMLElement;
            const baseGlow = isSelected ? 0.8 : 0.3;
            target.style.boxShadow = `0 0 ${Math.max(15, 20 * scale)}px hsl(var(--${chakra.color}) / ${baseGlow})`;
          }}
          onClick={handleClick}
          aria-label={`${chakra.name} chakra meditation`}
          aria-pressed={isSelected}
        >
          {/* Ripple effect */}
          <div className="absolute inset-0 rounded-full bg-white/20 transform scale-0 group-active:scale-110 transition-transform duration-200" />
          
          <span 
            className="relative text-white font-bold select-none z-10"
            style={{ fontSize: 'inherit' }}
          >
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