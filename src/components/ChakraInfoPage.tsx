import { chakras, Chakra } from "@/types/chakra";
import { Button } from "./ui/button";
import { ArrowLeft, ChevronRight } from "lucide-react";

interface ChakraInfoPageProps {
  onBack: () => void;
  onChakraSelect: (chakra: Chakra) => void;
}

export function ChakraInfoPage({ onBack, onChakraSelect }: ChakraInfoPageProps) {
  return (
    <div className="min-h-screen bg-gradient-meditation">
      {/* Header */}
      <div className="flex items-center p-4 border-b border-border/50">
        <Button
          variant="ghost"
          size="icon"
          className="text-foreground hover:bg-muted"
          onClick={onBack}
        >
          <ArrowLeft className="h-6 w-6" />
        </Button>
        <h1 className="text-xl font-bold text-foreground ml-4">Chakra Guide</h1>
      </div>

      {/* Intro */}
      <div className="p-6">
        <div className="bg-card rounded-2xl p-6 mb-6">
          <h2 className="text-lg font-semibold text-card-foreground mb-2">
            Understanding Your Energy Centers
          </h2>
          <p className="text-muted-foreground text-sm">
            Chakras are energy centers in your body that influence your physical, emotional, 
            and spiritual well-being. Tap any chakra below to learn more about its unique properties.
          </p>
        </div>

        {/* Chakra cards */}
        <div className="space-y-3">
          {chakras.map((chakra) => (
            <button
              key={chakra.id}
              onClick={() => onChakraSelect(chakra)}
              className="w-full bg-card rounded-2xl p-4 text-left hover:bg-muted/50 transition-colors group"
            >
              <div className="flex items-center gap-4">
                {/* Chakra circle */}
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg"
                  style={{
                    backgroundColor: `hsl(var(--${chakra.color}))`,
                    boxShadow: `0 0 20px hsl(var(--${chakra.color}) / 0.3)`
                  }}
                >
                  <span className="text-white font-bold">{chakra.position}</span>
                </div>

                {/* Chakra info */}
                <div className="flex-1">
                  <h3 className="font-semibold text-card-foreground group-hover:text-primary transition-colors">
                    {chakra.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">{chakra.description}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs bg-muted px-2 py-1 rounded-full text-muted-foreground">
                      {chakra.element}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {chakra.location}
                    </span>
                  </div>
                </div>

                {/* Arrow */}
                <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}