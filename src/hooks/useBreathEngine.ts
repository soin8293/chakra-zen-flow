import { useEffect, useMemo, useRef, useState } from "react";
import { BreathEngine } from "@/breath/engine";
import { LevelKey, buildCycle, getChakraSpecByAppId } from "@/breath/spec";

export type PresetOverride = "spec" | "calm" | "balance" | "energize";

export function useBreathEngine(params: {
  chakraAppId: string;
  level: LevelKey;
  presetOverride: PresetOverride; // currently informational only
  includeHolds: boolean;
  minutes: number;
  onComplete?: () => void;
}) {
  const { chakraAppId, level, presetOverride, includeHolds, minutes, onComplete } = params;
  const [phase, setPhase] = useState<"inhale" | "exhale" | "hold_top" | "hold_bottom">("inhale");
  const [progress, setProgress] = useState(0);
  const [direction, setDirection] = useState<"ltr" | "rtl" | "none">("ltr");
  const [isPlaying, setIsPlaying] = useState(true);
  const [remaining, setRemaining] = useState(minutes * 60);
  const [currentPhaseDuration, setCurrentPhaseDuration] = useState(5); // Default 5 seconds

  const engineRef = useRef<BreathEngine | null>(null);

  const cyclePhases = useMemo(() => {
    const spec = getChakraSpecByAppId(chakraAppId);
    if (!spec) return null;
    const levelCfg = spec.levels[level];
    return buildCycle(levelCfg, includeHolds);
  }, [chakraAppId, level, includeHolds]);

  // Track current phase duration for UI synchronization
  const getCurrentPhaseDuration = (phaseName: string) => {
    if (!cyclePhases) return 5;
    const currentPhase = cyclePhases.find(p => p.name === phaseName);
    return currentPhase?.duration || 5;
  };

  useEffect(() => {
    if (!cyclePhases) return;
    engineRef.current?.stop();
    const total = minutes * 60;
    const engine = new BreathEngine(cyclePhases, total, (u) => {
      setPhase(u.phase);
      setProgress(u.progress);
      setDirection(u.direction);
      setRemaining(Math.ceil(u.totalRemaining));
      setCurrentPhaseDuration(getCurrentPhaseDuration(u.phase));
    }, () => {
      onComplete?.();
    });
    engineRef.current = engine;
    engine.start();
    setIsPlaying(true);
    return () => engine.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cyclePhases, minutes]);

  const toggle = () => {
    if (!engineRef.current) return;
    engineRef.current.toggle();
    setIsPlaying((p) => !p);
  };

  return {
    phase,
    progress,
    direction,
    isPlaying,
    remaining,
    currentPhaseDuration,
    toggle,
  };
}
