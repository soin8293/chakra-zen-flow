/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * MEDITATION FIGURE COMPONENT - MAIN UI RENDERER
 * ═══════════════════════════════════════════════════════════════════════════════
 * 
 * This component renders the visual meditation figure with interactive chakra points.
 * It's the main UI component that users see and interact with.
 * 
 * KEY RESPONSIBILITIES FOR AI AGENTS:
 * ----------------------------------
 * 1. VISUAL RENDERING: Displays the meditation figure image as background
 * 2. CHAKRA POSITIONING: Uses useChakraLayout to position chakra buttons
 * 3. USER INTERACTION: Handles chakra clicks and visual feedback
 * 4. RESPONSIVE LAYOUT: Adapts to different screen sizes automatically
 * 5. DEVELOPMENT TOOLS: Includes debug visualization when needed
 * 
 * DATA FLOW:
 * ---------
 * ChakraAnchors.ts → useChakraLayout() → MeditationFigure → ChakraButton components
 * 
 * POSITIONING SYSTEM:
 * ------------------
 * - useChakraLayout() provides positions array with CSS percentages
 * - Each position has {id, xPercent, yPercent} for absolute positioning
 * - CSS absolute positioning places chakras over the meditation figure image
 * - Scale factor from useChakraLayout adjusts chakra sizes responsively
 * 
 * INTERACTION FLOW:
 * ----------------
 * User clicks chakra → ChakraButton onClick → onChakraClick prop → parent component
 */

import { useRef, useState } from "react";
import { chakras } from "@/types/chakra";           // Chakra data (names, colors, descriptions)
import { ChakraButton } from "./ChakraButton";       // Individual chakra button component
import { useChakraLayout } from "@/hooks/useChakraLayout";  // Position calculation hook

/**
 * DEVELOPMENT TOOLS SETUP
 * =======================
 * Lazy-loaded sizing inspector for development debugging
 */
let SizingInspector: any = null;
if (process.env.NODE_ENV !== "production") {
  import("@/features/zenflow/dev/SizingInspector").then(m => {
    SizingInspector = m.SizingInspector;
  });
}

/**
 * COMPONENT PROPS INTERFACE
 * ========================
 * AI AGENTS: These props control the component's behavior
 */
interface MeditationFigureProps {
  onChakraClick: (chakraId: string) => void;  // Callback when user clicks a chakra
  expandingChakraId?: string;                 // ID of chakra to show expanding animation
}

/**
 * MAIN MEDITATION FIGURE COMPONENT
 * ===============================
 * 
 * AI AGENTS: This component combines the layout calculations with visual rendering.
 * It takes the positions from useChakraLayout and renders chakra buttons at those locations.
 */
export function MeditationFigure({ onChakraClick, expandingChakraId }: MeditationFigureProps) {
  /**
   * LAYOUT CALCULATION
   * =================
   * Get chakra positions and layout information from the positioning system
   */
  const { positions, spineStyle, spineRect, scale } = useChakraLayout();
  
  /**
   * DEVELOPMENT DEBUGGING SETUP
   * ==========================
   */
  const figureRef = useRef<HTMLDivElement>(null);     // Reference to figure container
  const imgRef = useRef<HTMLImageElement>(null);      // Reference to meditation image
  const [showSizing, setShowSizing] = useState(false); // Toggle for sizing inspector
  const isDev = process.env.NODE_ENV !== "production"; // Development environment check

  /**
   * COMPONENT RENDERING
   * ==================
   * 
   * AI AGENTS: The JSX below creates a layered UI with the meditation figure
   * and positioned chakra buttons. Here's how the layers work:
   * 
   * LAYER STRUCTURE (bottom to top):
   * 1. Background vignette (visual effect)
   * 2. Spine energy line (visual guide using spineStyle from useChakraLayout)
   * 3. Meditation figure image (background image)
   * 4. Chakra buttons (positioned using positions from useChakraLayout)
   * 5. Expanding effects (animations)
   * 6. Development tools (debugging)
   * 
   * POSITIONING EXPLANATION:
   * - The container has data-meditation-container attribute (used by useChakraLayout)
   * - Each chakra button gets positioned using CSS absolute positioning
   * - Positions come from useChakraLayout as {xPercent, yPercent} values
   * - Scale factor adjusts chakra sizes responsively
   */
  return (
    <div className="relative w-full h-full flex items-center justify-center min-h-[400px] max-w-[880px] mx-auto px-4">
      {/* 
        MAIN CONTAINER: Responsive Meditation Figure Container
        ===================================================
        
        AI AGENTS: This container is tracked by useChakraLayout via data-meditation-container.
        Size changes here trigger position recalculations automatically.
      */}
      <div 
        ref={figureRef}
        className="relative transition-all duration-300 ease-out w-full h-full"
        data-meditation-container  // ← IMPORTANT: This is how useChakraLayout finds the container
        style={{
          minWidth: '300px',      // Prevent too small on mobile
          minHeight: '400px',     // Ensure minimum usable height
          maxWidth: '800px',      // Prevent too large on desktop
          maxHeight: '100vh'      // Don't exceed viewport height
        }}
      >
        {/* 
          LAYER 1: Background Vignette Effect
          ==================================
          
          AI AGENTS: Visual enhancement only - doesn't affect positioning.
          Creates a subtle radial glow behind the meditation figure.
        */}
        <div className="absolute inset-0 flex items-center justify-center z-0">
          <div 
            className="rounded-full bg-gradient-radial from-white/10 via-white/5 to-transparent"
            style={{
              // Size vignette based on spine height for visual consistency
              width: `${Math.min(400, spineRect.heightPx * 0.8)}px`,
              height: `${Math.min(400, spineRect.heightPx * 0.8)}px`
            }}
          />
        </div>

        {/* 
          LAYER 2: Spine Energy Line Visualization
          =======================================
          
          AI AGENTS: This renders a colored line showing the spine area where chakras align.
          Uses spineStyle calculated by useChakraLayout for exact positioning.
          
          VISUAL PURPOSE: Helps users understand chakra alignment along the energy spine.
        */}
        <div 
          className="absolute rounded-full opacity-40 transition-all duration-300"
          style={{
            position: "absolute",
            top: spineStyle.top,        // ← Position from useChakraLayout
            left: spineStyle.left,      // ← Always "50%" (center)
            height: spineStyle.height,  // ← Height from useChakraLayout
            width: spineStyle.width,    // ← Thin responsive width
            transform: spineStyle.transform,  // ← Centers the line
            background: `linear-gradient(to bottom, 
              hsl(var(--chakra-crown) / 0.4),     /* Crown chakra color */
              hsl(var(--chakra-third-eye) / 0.4), /* Third eye chakra color */
              hsl(var(--chakra-throat) / 0.4),    /* Throat chakra color */
              hsl(var(--chakra-heart) / 0.4),     /* Heart chakra color */
              hsl(var(--chakra-solar) / 0.4),     /* Solar chakra color */
              hsl(var(--chakra-sacral) / 0.4),    /* Sacral chakra color */
              hsl(var(--chakra-root) / 0.4)       /* Root chakra color */
            )`,
            borderRadius: 9999  // Perfectly round
          }}
        />

        {/* 
          LAYER 3: Meditation Figure Image
          ===============================
          
          AI AGENTS: This is the background image that chakras are positioned over.
          The image has data-meditation-figure attribute so useChakraLayout can track it.
        */}
        <div data-spine-wrapper className="absolute inset-0 flex items-center justify-center z-20">
          <img 
            ref={imgRef}
            data-meditation-figure  // ← IMPORTANT: useChakraLayout tracks this for positioning
            src="/lovable-uploads/367d80a7-5795-4dfa-a351-9d3588def8bd.png"
            alt="Meditation figure in lotus position with seven chakra energy centers - interactive guide for chakra healing and energy balance"
            className="opacity-90 filter invert object-contain transition-all duration-300 w-full h-full scale-[1.55]"
            loading="lazy"
            aria-describedby="chakra-instructions"
          />
        </div>

        {/* 
          LAYER 4: Interactive Chakra Buttons
          ===================================
          
          AI AGENTS: This is where the magic happens! The positioning system 
          places chakra buttons at calculated screen positions.
          
          POSITIONING PROCESS:
          1. useChakraLayout provides positions array with {id, xPercent, yPercent}
          2. We map over positions to create ChakraButton components
          3. Each button gets positioned using CSS absolute positioning
          4. The entire layer scales with the scale factor for responsiveness
        */}
        <div 
          className="absolute inset-0 z-30 w-full h-full" 
          style={{ 
            transform: `scale(${scale})`,     // ← Scale from useChakraLayout for responsiveness
            transformOrigin: 'center'         // Scale from center point
          }} 
          aria-label="Interactive chakra energy points - tap to explore each energy center"
          role="application"
          aria-describedby="chakra-instructions"
        >
          {/* 
            CHAKRA BUTTON RENDERING LOOP
            ===========================
            
            AI AGENTS: This maps positions to actual UI components.
            Each position becomes a clickable chakra button.
          */}
          {positions.map((pos) => {
            // Find chakra data that matches this position
            const chakra = chakras.find(c => c.id === pos.id);
            if (!chakra) return null;  // Skip if chakra data not found
            
            return (
              <ChakraButton
                key={chakra.id}
                chakra={chakra}                    // Chakra info (name, color, description)
                position={{ 
                  x: pos.xPercent,                 // ← Horizontal position from useChakraLayout
                  y: pos.yPercent,                 // ← Vertical position from useChakraLayout  
                  scale 
                }}
                onClick={() => onChakraClick(chakra.id)}  // Handle user interaction
                isExpanding={expandingChakraId === chakra.id}  // Visual feedback
                scale={scale}                      // Size scaling
              />
            );
          })}
        </div>

        {/* 
          LAYER 5: Expanding Chakra Effects
          ================================
          
          AI AGENTS: Visual feedback when a chakra is selected.
          Shows an animated "ping" effect at the selected chakra's position.
        */}
        {expandingChakraId && (
          <div className="absolute inset-0 z-50 pointer-events-none">
            <div 
              className="absolute rounded-full animate-ping"
              style={{
                left: '50%',  // Center horizontally
                // Find the Y position of the expanding chakra
                top: `${positions.find(p => p.id === expandingChakraId)?.yPercent || 50}%`,
                transform: 'translate(-50%, -50%)',  // Perfect centering
                width: `60px`,
                height: `60px`,
                // Use the chakra's color for the ping effect
                backgroundColor: `hsl(var(--${chakras.find(c => c.id === expandingChakraId)?.color}) / 0.3)`
              }}
            />
          </div>
        )}

        {/* 
          LAYER 6: Development Tools
          =========================
          
          AI AGENTS: Debug visualization only visible in development.
          Shows sizing information and layout details.
        */}
        {showSizing && SizingInspector && (
          <SizingInspector
            figureRef={figureRef}    // Container reference
            imgRef={imgRef}          // Image reference
            scale={scale}            // Current scale factor
          />
        )}

      </div>

      {/* Development toggle button */}
      {isDev && (
        <button
          onClick={() => setShowSizing(!showSizing)}
          className="fixed bottom-4 right-4 z-[10000] bg-purple-600 hover:bg-purple-700 text-white px-3 py-2 rounded-lg text-sm font-mono transition-colors"
        >
          {showSizing ? "Hide" : "Show"} Sizing
        </button>
      )}
    </div>
  );
}