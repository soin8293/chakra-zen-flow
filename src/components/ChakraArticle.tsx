import { Chakra } from "@/types/chakra";
import { Button } from "./ui/button";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";

interface ChakraArticleProps {
  chakra: Chakra;
  onBack: () => void;
}

const subtopics = [
  { id: 'foods', name: 'Foods', icon: '🍎' },
  { id: 'crystals', name: 'Crystals', icon: '💎' },
  { id: 'symptoms', name: 'Blocked Symptoms', icon: '⚠️' },
  { id: 'yoga', name: 'Yoga Poses', icon: '🧘‍♀️' },
];

export function ChakraArticle({ chakra, onBack }: ChakraArticleProps) {
  const [selectedSubtopic, setSelectedSubtopic] = useState<string | null>(null);

  const getSubtopicContent = (subtopicId: string) => {
    const content = {
      foods: ['Red foods (beets, tomatoes)', 'Root vegetables', 'Protein-rich foods'],
      crystals: ['Red Jasper', 'Hematite', 'Black Tourmaline', 'Garnet'],
      symptoms: ['Anxiety', 'Fear', 'Restlessness', 'Lack of focus'],
      yoga: ['Mountain Pose', 'Child\'s Pose', 'Warrior I', 'Tree Pose'],
    };
    return content[subtopicId as keyof typeof content] || [];
  };

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
        <h1 className="text-xl font-bold text-foreground ml-4">{chakra.name}</h1>
      </div>

      <div className="p-6 space-y-6">
        {/* Chakra header */}
        <div className="text-center">
          <div
            className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4 shadow-elevation"
            style={{
              backgroundColor: `hsl(var(--${chakra.color}))`,
              boxShadow: `0 0 40px hsl(var(--${chakra.color}) / 0.4)`
            }}
          >
            <span className="text-4xl">{chakra.symbol}</span>
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-2">{chakra.name}</h2>
          <p className="text-muted-foreground">{chakra.description}</p>
        </div>

        {/* Basic info */}
        <div className="bg-card rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-card-foreground mb-4">Basic Information</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Element:</span>
              <div className="font-medium text-card-foreground">{chakra.element}</div>
            </div>
            <div>
              <span className="text-muted-foreground">Location:</span>
              <div className="font-medium text-card-foreground">{chakra.location}</div>
            </div>
          </div>
        </div>

        {/* Traits */}
        <div className="bg-card rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-card-foreground mb-4">Associated Traits</h3>
          <div className="flex flex-wrap gap-2">
            {chakra.traits.map((trait, index) => (
              <span
                key={index}
                className="px-3 py-1 rounded-full text-sm"
                style={{
                  backgroundColor: `hsl(var(--${chakra.color}) / 0.2)`,
                  color: `hsl(var(--${chakra.color}))`
                }}
              >
                {trait}
              </span>
            ))}
          </div>
        </div>

        {/* Physical associations */}
        <div className="bg-card rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-card-foreground mb-4">Physical Associations</h3>
          <div className="space-y-2">
            {chakra.physicalAssociations.map((association, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: `hsl(var(--${chakra.color}))` }} />
                <span className="text-card-foreground text-sm">{association}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Affirmations */}
        <div className="bg-card rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-card-foreground mb-4">Affirmations</h3>
          <div className="space-y-2">
            {chakra.affirmations.map((affirmation, index) => (
              <div key={index} className="italic text-card-foreground border-l-4 pl-4" style={{ borderColor: `hsl(var(--${chakra.color}))` }}>
                "{affirmation}"
              </div>
            ))}
          </div>
        </div>

        {/* Subtopic bubbles */}
        <div className="bg-card rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-card-foreground mb-4">Explore More</h3>
          <div className="grid grid-cols-2 gap-3">
            {subtopics.map((subtopic) => (
              <button
                key={subtopic.id}
                onClick={() => setSelectedSubtopic(subtopic.id)}
                className="flex items-center gap-3 p-3 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
              >
                <span className="text-2xl">{subtopic.icon}</span>
                <span className="font-medium text-card-foreground">{subtopic.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Subtopic overlay */}
      {selectedSubtopic && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-card rounded-2xl p-6 max-w-sm w-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-card-foreground">
                {subtopics.find(s => s.id === selectedSubtopic)?.name}
              </h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedSubtopic(null)}
              >
                ✕
              </Button>
            </div>
            <div className="space-y-2">
              {getSubtopicContent(selectedSubtopic).map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: `hsl(var(--${chakra.color}))` }} />
                  <span className="text-sm text-card-foreground">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}