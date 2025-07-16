import { Chakra } from "@/types/chakra";
import { cn } from "@/lib/utils";

interface ChakraButtonProps {
  chakra: Chakra;
  position: { x: number; y: number };
  onClick: () => void;
  isExpanding?: boolean;
}

export function ChakraButton({ chakra, position, onClick, isExpanding }: ChakraButtonProps) {
  return (
    <button
      className={cn(
        "absolute w-12 h-12 rounded-full flex items-center justify-center",
        "transition-all duration-300 hover:scale-110",
        "shadow-lg hover:shadow-glow",
        "border-2 border-white/20",
        `bg-${chakra.color}`,
        isExpanding && "animate-expand-chakra z-50"
      )}
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        transform: "translate(-50%, -50%)",
        backgroundColor: `hsl(var(--${chakra.color}))`,
        boxShadow: `0 0 20px hsl(var(--${chakra.color}) / 0.3)`
      }}
      onClick={onClick}
      aria-label={`${chakra.name} meditation`}
    >
      <span className="text-white text-lg font-bold select-none">
        {chakra.position}
      </span>
    </button>
  );
}