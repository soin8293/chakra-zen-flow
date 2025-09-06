/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * CHAKRA BUTTON COMPONENT - INDIVIDUAL INTERACTIVE CHAKRA
 * ═══════════════════════════════════════════════════════════════════════════════
 * 
 * This component renders a single interactive chakra button that users can click.
 * Each button is positioned on the meditation figure using coordinates from the layout system.
 * 
 * KEY RESPONSIBILITIES FOR AI AGENTS:
 * ----------------------------------
 * 1. VISUAL RENDERING: Shows chakra as a colored, numbered button
 * 2. POSITIONING: Uses CSS absolute positioning with percentages from layout system
 * 3. INTERACTION: Handles user clicks with haptic feedback
 * 4. ANIMATIONS: Provides visual feedback for hover, selection, and expanding states
 * 5. ACCESSIBILITY: Includes tooltips and ARIA labels for screen readers
 * 
 * POSITIONING EXPLANATION:
 * -----------------------
 * - Receives position as {x: percentage, y: percentage, scale: number}
 * - Uses CSS absolute positioning: left: x%, top: y%
 * - The percentages come from useChakraLayout calculations
 * - Scale factor adjusts button size for responsive design
 * 
 * VISUAL STATE SYSTEM:
 * -------------------
 * - Normal: Default appearance with hover effects
 * - Selected: Highlighted appearance when isSelected=true
 * - Expanding: Special animation when isExpanding=true
 * - Responsive scaling based on scale prop
 */

import { Chakra } from "@/types/chakra";                    // Chakra data interface
import { ChakraId } from "@/features/zenflow/ChakraAnchors"; // Chakra ID type
import { cn } from "@/lib/utils";                           // Class name utility
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";  // Tooltip component

/**
 * PROPS INTERFACE
 * ==============
 * AI AGENTS: These props control how each chakra button behaves and appears
 */
interface ChakraButtonProps {
  chakra: Chakra;                              // Chakra information (name, color, description, etc.)
  position: { x: number; y: number; scale: number };  // Position and scale from layout system
  onClick: () => void;                         // Click handler function
  isExpanding?: boolean;                       // Whether to show expanding animation
  isSelected?: boolean;                        // Whether chakra is currently selected
  scale?: number;                              // Additional scale factor for sizing
}

/**
 * MAIN CHAKRA BUTTON COMPONENT
 * ===========================
 * 
 * AI AGENTS: This component takes position data and renders a clickable chakra.
 * The positioning happens via CSS absolute positioning using the provided percentages.
 */
export function ChakraButton({ chakra, position, onClick, isExpanding, isSelected = false, scale = 1 }: ChakraButtonProps) {
  
  /**
   * CLICK HANDLER WITH HAPTIC FEEDBACK
   * =================================
   * Provides tactile feedback on mobile devices when available
   */
  const handleClick = () => {
    // Haptic feedback for mobile devices
    if ('vibrate' in navigator) {
      navigator.vibrate(50);  // 50ms vibration
    }
    onClick();  // Call the provided click handler
  };

  /**
   * RESPONSIVE SIZING CALCULATIONS
   * =============================
   * 
   * AI AGENTS: These calculations ensure chakra buttons scale appropriately
   * with screen size and the scale factor from useChakraLayout.
   */
  
  // Button size: scales with position.scale from layout system, mobile-optimized
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const minSize = isMobile ? 28 : 32; // Smaller minimum on mobile
  const maxSize = isMobile ? 48 : 56; // Smaller maximum on mobile
  const baseSize = isMobile ? 42 : 48; // Smaller base size on mobile
  const buttonSize = Math.max(minSize, Math.min(maxSize, baseSize * position.scale));
  
  // Font size: scales proportionally with button size
  const fontSize = Math.max(10, Math.min(18, 14 * position.scale));

  /**
   * ACCESSIBILITY AND MOTION PREFERENCES
   * ===================================
   * Respect user's motion preferences for animations
   */
  const prefersReducedMotion = typeof window !== 'undefined' && 
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Debug mode detection for enhanced tooltips
  const isDebug = typeof window !== 'undefined' && new URLSearchParams(window.location.search).has('debug');

  /**
   * CHAKRA BUTTON RENDERING
   * ======================
   * 
   * AI AGENTS: This JSX renders the actual chakra button with:
   * - Absolute positioning using CSS percentages from layout system
   * - Dynamic styling based on chakra color and state
   * - Responsive sizing and accessibility features
   * - Tooltip with chakra information
   */
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          // IMPORTANT: data-chakra-id allows DebugChakraHUD to find this element
          data-chakra-id={chakra.id as ChakraId}
          
          // Debug tooltip shows exact position coordinates
          title={isDebug ? `ID: ${chakra.id}\nX: ${position.x.toFixed(1)}%\nY: ${position.y.toFixed(1)}%` : undefined}
          
          className={cn(
            "absolute rounded-full flex items-center justify-center",
            "transition-all duration-300 will-change-transform",
            "shadow-lg border-2 group relative overflow-hidden",
            "touch-manipulation", // Improved touch for mobile
            {
              // STATE-BASED STYLING: Different appearances for different states
              "border-white/30 hover:border-white/60": !isSelected && !isExpanding,
              "hover:scale-125": !prefersReducedMotion && !isSelected,
              "border-white/80 scale-110": isSelected,
              "animate-ping z-50": isExpanding,
              "chakra-pulse": !prefersReducedMotion && !isSelected && !isExpanding,
              "chakra-glow-static": prefersReducedMotion && !isSelected
            }
          )}
          style={{
            // POSITIONING: These CSS properties place the chakra at calculated coordinates
            left: `${position.x}%`,        // ← Horizontal position from useChakraLayout
            top: `${position.y}%`,         // ← Vertical position from useChakraLayout
            transform: "translate(-50%, -50%)",  // Perfect centering
            
            // SIZING: Responsive dimensions
            width: `${buttonSize}px`,
            height: `${buttonSize}px`,
            
            // STYLING: Dynamic chakra color and glow effects
            backgroundColor: `hsl(var(--${chakra.color}))`,  // Use design system color
            boxShadow: isSelected 
              ? `0 0 ${Math.max(25, 35 * scale)}px hsl(var(--${chakra.color}) / 0.8)`  // Selected glow
              : `0 0 ${Math.max(15, 20 * scale)}px hsl(var(--${chakra.color}) / 0.3)`, // Normal glow
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