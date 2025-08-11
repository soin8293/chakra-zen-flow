import { BuiltPhase, cycleLength } from "./spec";

export type EngineUpdate = {
  phase: BuiltPhase["name"];
  progress: number; // 0..1 within current phase
  direction: "ltr" | "rtl" | "none";
  totalElapsed: number; // seconds
  totalRemaining: number; // seconds
};

export class BreathEngine {
  private ctx: AudioContext | null = null;
  private rafId: number | null = null;
  private startAt = 0; // audio time
  private pausedAt: number | null = null;
  private readonly totalSeconds: number;
  private readonly phases: BuiltPhase[];
  private readonly cycleSeconds: number;
  private onUpdate: (u: EngineUpdate) => void;
  private onComplete: () => void;

  constructor(phases: BuiltPhase[], totalSeconds: number, onUpdate: (u: EngineUpdate) => void, onComplete: () => void) {
    this.phases = phases;
    this.cycleSeconds = Math.max(1, cycleLength(phases));
    this.totalSeconds = totalSeconds;
    this.onUpdate = onUpdate;
    this.onComplete = onComplete;
  }

  start() {
    if (!this.ctx) this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    if (!this.ctx) throw new Error("AudioContext not supported");
    this.startAt = this.ctx.currentTime;
    this.pausedAt = null;
    this.loop();
  }

  private loop = () => {
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const elapsed = Math.max(0, (this.pausedAt ?? now) - this.startAt);
    const remaining = Math.max(0, this.totalSeconds - elapsed);

    if (remaining <= 0) {
      this.onUpdate({ phase: "exhale", progress: 1, direction: "ltr", totalElapsed: this.totalSeconds, totalRemaining: 0 });
      this.onComplete();
      this.stop();
      return;
    }

    const t = elapsed % this.cycleSeconds;
    let acc = 0;
    let current = this.phases[0];
    for (const p of this.phases) {
      if (t < acc + p.duration) { current = p; break; }
      acc += p.duration;
    }
    const within = Math.max(0, Math.min(1, (t - acc) / Math.max(0.0001, current.duration)));
    this.onUpdate({ phase: current.name, progress: within, direction: current.direction, totalElapsed: elapsed, totalRemaining: remaining });

    this.rafId = requestAnimationFrame(this.loop);
  };

  pause() {
    if (!this.ctx || this.pausedAt !== null) return;
    this.pausedAt = this.ctx.currentTime;
  }

  resume() {
    if (!this.ctx || this.pausedAt === null) return;
    const pausedDuration = this.ctx.currentTime - this.pausedAt;
    this.startAt += pausedDuration;
    this.pausedAt = null;
    this.loop();
  }

  toggle() {
    if (this.pausedAt === null) this.pause(); else this.resume();
  }

  stop() {
    if (this.rafId) cancelAnimationFrame(this.rafId);
    this.rafId = null;
    // Do not close audio context to allow quick restarts
  }
}
