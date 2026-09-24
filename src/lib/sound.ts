// Opt-in flap sound. Synthesized with Web Audio (no audio files) and throttled so a
// cascade reads as a clatter rather than a roar. Off on every visit until chosen.

type Listener = () => void;

class FlapSound {
  private ctx: AudioContext | null = null;
  private buffer: AudioBuffer | null = null;
  private out: GainNode | null = null;
  private enabled = false;
  private last = 0;
  private listeners = new Set<Listener>();

  subscribe = (fn: Listener) => {
    this.listeners.add(fn);
    return () => this.listeners.delete(fn);
  };

  isEnabled = () => this.enabled;

  toggle() {
    if (this.enabled) {
      this.enabled = false;
      void this.ctx?.suspend();
    } else {
      this.ensureContext();
      void this.ctx?.resume();
      this.enabled = true;
    }
    this.listeners.forEach((fn) => fn());
  }

  private ensureContext() {
    if (this.ctx) return;
    const Ctor = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!Ctor) return;
    const ctx = new Ctor();
    const length = Math.floor(ctx.sampleRate * 0.03);
    const buffer = ctx.createBuffer(1, length, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < length; i++) {
      const t = i / ctx.sampleRate;
      // A bright tick (noise, fast decay) over a short low knock (the flap hitting its stop).
      const tick = (Math.random() * 2 - 1) * Math.exp(-t / 0.0026);
      const knock = Math.sin(2 * Math.PI * 190 * t) * Math.exp(-t / 0.007) * 0.55;
      data[i] = (tick + knock) * 0.8;
    }
    const out = ctx.createGain();
    out.gain.value = 0.55;
    out.connect(ctx.destination);
    this.ctx = ctx;
    this.buffer = buffer;
    this.out = out;
  }

  /** One flap landing. Cheap to call from animation loops; no-ops while disabled. */
  tick() {
    if (!this.enabled || !this.ctx || !this.buffer || !this.out) return;
    const now = this.ctx.currentTime;
    if (now - this.last < 0.016) return;
    this.last = now;
    const src = this.ctx.createBufferSource();
    src.buffer = this.buffer;
    src.playbackRate.value = 0.82 + Math.random() * 0.36;
    const band = this.ctx.createBiquadFilter();
    band.type = "bandpass";
    band.frequency.value = 1400 + Math.random() * 1800;
    band.Q.value = 0.9;
    const gain = this.ctx.createGain();
    gain.gain.value = 0.35 + Math.random() * 0.25;
    src.connect(band).connect(gain).connect(this.out);
    src.start(now);
  }
}

export const flapSound = new FlapSound();
