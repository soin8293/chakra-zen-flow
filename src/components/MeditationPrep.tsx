import { useState } from "react";
import { Chakra } from "@/types/chakra";
import { Button } from "./ui/button";
import { ArrowLeft } from "lucide-react";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "./ui/select";
import { Switch } from "./ui/switch";
import { Slider } from "./ui/slider";

interface MeditationPrepProps {
  chakra: Chakra;
  onBack: () => void;
  onStart: (opts: {
    duration: number;
    level: 'beginner' | 'intermediate' | 'advanced';
    presetOverride: 'spec' | 'calm' | 'balance' | 'energize';
    includeHolds: boolean;
  }) => void;
  onLearn?: () => void;
}

const durations = [1, 5, 10]; // minutes

export function MeditationPrep({ chakra, onBack, onStart, onLearn }: MeditationPrepProps) {
  const [level, setLevel] = useState<'beginner'|'intermediate'|'advanced'>('beginner');
  const [presetOverride, setPresetOverride] = useState<'spec'|'calm'|'balance'|'energize'>('balance');
  const [includeHolds, setIncludeHolds] = useState(false);
  const [minutes, setMinutes] = useState(5);

  return (
    <div className="min-h-screen bg-gradient-cosmic relative overflow-hidden">
      {/* Back button */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-4 left-4 z-10 text-white hover:bg-white/10"
        onClick={onBack}
      >
        <ArrowLeft className="h-6 w-6" />
      </Button>

      {/* Main content */}
      <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center">
        {/* Chakra circle */}
        <div
          className="w-48 h-48 rounded-full flex items-center justify-center mb-8 shadow-elevation"
          style={{
            backgroundColor: `hsl(var(--${chakra.color}))`,
            boxShadow: `0 0 60px hsl(var(--${chakra.color}) / 0.4)`
          }}
        >
          <span className="text-6xl">{chakra.symbol}</span>
        </div>

        {/* Chakra info */}
        <h1 className="text-4xl font-bold text-white mb-2">{chakra.name}</h1>
        <p className="text-xl text-white/80 mb-6 max-w-md">{chakra.description}</p>

        {/* Settings */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 w-full max-w-xl text-left">
          <div>
            <label className="block text-white/90 text-sm mb-2">Level</label>
            <Select value={level} onValueChange={(v) => setLevel(v as any)}>
              <SelectTrigger className="bg-white/10 border-white/20 text-white">
                <SelectValue placeholder="Select level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="beginner">Beginner</SelectItem>
                <SelectItem value="intermediate">Intermediate</SelectItem>
                <SelectItem value="advanced">Advanced</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="block text-white/90 text-sm mb-2">Preset</label>
            <Select value={presetOverride} onValueChange={(v) => setPresetOverride(v as any)}>
              <SelectTrigger className="bg-white/10 border-white/20 text-white">
                <SelectValue placeholder="Spec default" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="balance">Balance</SelectItem>
                <SelectItem value="calm">Calm</SelectItem>
                <SelectItem value="energize">Energize</SelectItem>
                <SelectItem value="spec">Use Spec</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center justify-between gap-4">
            <div>
              <label className="block text-white/90 text-sm mb-1">Holds</label>
              <p className="text-xs text-white/60">Default OFF for safety</p>
            </div>
            <Switch checked={includeHolds} onCheckedChange={setIncludeHolds} />
          </div>
        </div>

        {/* Duration selection */}
        <div className="mb-6">
          <h2 className="text-lg text-white/90 mb-4">Choose your meditation length:</h2>
          <div className="flex gap-4 justify-center">
            {durations.map(duration => (
              <Button
                key={duration}
                onClick={() => onStart({ duration, level, presetOverride, includeHolds })}
                className="w-20 h-20 rounded-full text-lg font-semibold transition-all hover:scale-110"
                style={{
                  backgroundColor: `hsl(var(--${chakra.color}))`,
                  color: 'white',
                  border: '2px solid white',
                }}
              >
                {duration}
                <br />
                min
              </Button>
            ))}
          </div>
        </div>

        {/* Duration slider */}
        <div className="w-full max-w-xl mb-6 text-left">
          <label className="block text-white/90 text-sm mb-2">Custom duration: {minutes} min</label>
          <Slider value={[minutes]} onValueChange={(v) => setMinutes(v[0])} min={1} max={20} step={1} />
        </div>
        <Button onClick={() => onStart({ duration: minutes, level, presetOverride, includeHolds })} className="mb-6">
          Start Meditation
        </Button>

        {onLearn && (
          <Button variant="outline" onClick={onLearn} className="mb-6">
            Learn about this chakra
          </Button>
        )}

        {/* Chakra traits */}
        <div className="text-white/70 text-sm">
          <p><strong>Element:</strong> {chakra.element}</p>
          <p><strong>Location:</strong> {chakra.location}</p>
        </div>
      </div>
    </div>
  );
}
