import specData from "./spec-data.json";

export type Preset = "calm" | "balance" | "energize";

export type PhaseName = "inhale" | "hold_top" | "exhale" | "hold_bottom";

export type PhaseFillDirection = {
  inhale: "ltr" | "rtl";
  exhale: "ltr" | "rtl";
};

export type CountCues = {
  inhale_counts: number;
  exhale_counts: number;
  hold_top_counts: number;
  hold_bottom_counts: number;
};

export type UILayer = {
  phase_fill_direction: PhaseFillDirection;
  count_cues: CountCues;
};

export type LevelConfig = {
  preset: Preset;
  phases: { inhale: number; hold_top: number; exhale: number; hold_bottom: number };
  breath_ratio_label: string;
  cycle_length_seconds: number;
  recommended_cycles: { "5min": number; "10min": number; "15min": number };
  ui: UILayer;
  notes: string;
  contraindications: string[];
};

export type Levels = {
  beginner: LevelConfig;
  intermediate: LevelConfig;
  advanced: LevelConfig;
};

export type BreathChakraSpec = {
  id:
    | "root"
    | "sacral"
    | "solar_plexus"
    | "heart"
    | "throat"
    | "third_eye"
    | "crown";
  name: string;
  meditation_type: string;
  intent: string;
  levels: Levels;
  justification: string;
  references: { title: string; url: string; type: string }[];
};

export type Spec = {
  version: string;
  presets: Preset[];
  chakras: BreathChakraSpec[];
};

export type LevelKey = keyof Levels; // 'beginner' | 'intermediate' | 'advanced'

export const SPEC = specData as Spec;

export function validateSpec(spec: Spec) {
  if (!spec.version) throw new Error("Spec missing version");
  for (const c of spec.chakras) {
    for (const lvl of Object.values(c.levels) as LevelConfig[]) {
      const p = lvl.phases;
      const times = [p.inhale, p.hold_top, p.exhale, p.hold_bottom];
      if (times.some((t) => t < 0)) throw new Error(`Negative phase in ${c.id}`);
      if (lvl.cycle_length_seconds < 6 || lvl.cycle_length_seconds > 30) {
        throw new Error(`Cycle length out of range in ${c.id}`);
      }
    }
  }
}

validateSpec(SPEC);

export function mapAppIdToSpecId(id: string): BreathChakraSpec["id"] {
  switch (id) {
    case "solar":
      return "solar_plexus";
    case "thirdEye":
      return "third_eye";
    default:
      return id as BreathChakraSpec["id"];
  }
}

export function getChakraSpecByAppId(appId: string): BreathChakraSpec | undefined {
  const specId = mapAppIdToSpecId(appId);
  return SPEC.chakras.find((c) => c.id === specId);
}

export type BuiltPhase = {
  name: PhaseName;
  duration: number; // seconds
  direction: "ltr" | "rtl" | "none";
};

export function buildCycle(levelCfg: LevelConfig, includeHolds: boolean): BuiltPhase[] {
  const { inhale, hold_top, exhale, hold_bottom } = levelCfg.phases;
  const dir = levelCfg.ui.phase_fill_direction;
  return [
    { name: "inhale", duration: inhale, direction: dir.inhale },
    { name: "hold_top", duration: includeHolds ? hold_top : 0, direction: "none" },
    { name: "exhale", duration: exhale, direction: dir.exhale },
    { name: "hold_bottom", duration: includeHolds ? hold_bottom : 0, direction: "none" },
  ];
}

export function cycleLength(phases: BuiltPhase[]) {
  return phases.reduce((s, p) => s + p.duration, 0);
}
