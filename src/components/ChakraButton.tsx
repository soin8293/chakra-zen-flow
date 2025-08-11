import { Chakra } from "@/types/chakra";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface ChakraButtonProps {
  chakra: Chakra;
  position: { x: number; y: number; scale: number };
  onClick: () => void;
  isExpanding?: boolean;
  scale?: number;
}

export function ChakraButton({ chakra, position, onClick, isExpanding, scale = 1 }: ChakraButtonProps) {
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

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          className={cn(
            "absolute rounded-full flex items-center justify-center",
            "transition-all duration-300 hover:scale-125 hover:shadow-2xl",
            "shadow-lg animate-pulse-gentle",
            "border-2 border-white/30 hover:border-white/60",
            "group relative overflow-hidden",
            "touch-manipulation", // Better mobile interaction
            isExpanding && "animate-expand-chakra z-50"
          )}
          style={{
            left: `${position.x}%`,
            top: `${position.y}%`,
            transform: "translate(-50%, -50%)",
            width: `${buttonSize}px`,
            height: `${buttonSize}px`,
            backgroundColor: `hsl(var(--${chakra.color}))`,
            boxShadow: `0 0 ${Math.max(15, 20 * scale)}px hsl(var(--${chakra.color}) / 0.3)`,
            minWidth: '32px',
            minHeight: '32px',
            fontSize: `${fontSize}px`
          }}
          onMouseEnter={(e) => {
            // Enhanced glow on hover with responsive sizing
            const target = e.currentTarget as HTMLElement;
            target.style.boxShadow = `0 0 ${Math.max(30, 40 * scale)}px hsl(var(--${chakra.color}) / 0.6)`;
          }}
          onMouseLeave={(e) => {
            const target = e.currentTarget as HTMLElement;
            target.style.boxShadow = `0 0 ${Math.max(15, 20 * scale)}px hsl(var(--${chakra.color}) / 0.3)`;
          }}
          onClick={handleClick}
          aria-label={`${chakra.name} chakra meditation`}
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