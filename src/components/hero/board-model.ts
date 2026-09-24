// State machine for the hero board. Pure data: the renderer reads it, React only hears
// about status changes. Modules knocked out of place drift (dim red); after a pause a
// repair sweep flips each one forward through the drum back to its letter (amber).
import { DRUM_SIZE, drumPath, randomGlyph } from "@/lib/drum";

export const TINT_OK = 0;
export const TINT_DRIFT = 1;
export const TINT_HEAL = 2;

const IDLE = 0;
const FLIPPING = 1;
const BOUNCING = 2;

const BOUNCE_MS = 150;
// Each knocked module waits this long after its last touch before repair starts, so a
// dragged cursor leaves a wake that closes up behind it.
const HEAL_DELAY_MS = 850;
const RETOUCH_MS = 320;

export type BoardStatus =
  | { kind: "idle" }
  | { kind: "drift"; count: number }
  | { kind: "repaired"; count: number; ms: number };

export type Module = { x: number; y: number; w: number; h: number; glyph: number; col: number; row: number };

export type ModuleView = { from: number; to: number; angle: number; tint: number };

export class BoardModel {
  readonly n: number;
  readonly modules: Module[];
  private target: Uint8Array;
  private cur: Uint8Array;
  private prev: Uint8Array;
  private next: Uint8Array;
  private phase: Uint8Array;
  private tint: Uint8Array;
  private t0: Float64Array;
  private dur: Float32Array;
  private landed: Float64Array;
  private touched: Float64Array;
  private queue: number[][];

  private episodeStart = 0;
  private episode = new Set<number>();

  onStatus: ((status: BoardStatus) => void) | null = null;
  onLand: (() => void) | null = null;

  constructor(modules: Module[]) {
    this.modules = modules;
    const n = (this.n = modules.length);
    this.target = Uint8Array.from(modules, (m) => m.glyph);
    this.cur = Uint8Array.from(this.target);
    this.prev = Uint8Array.from(this.target);
    this.next = Uint8Array.from(this.target);
    this.phase = new Uint8Array(n);
    this.tint = new Uint8Array(n);
    this.t0 = new Float64Array(n);
    this.dur = new Float32Array(n).fill(50);
    this.landed = new Float64Array(n);
    this.touched = new Float64Array(n);
    this.queue = Array.from({ length: n }, () => []);
  }

  private begin(i: number, path: number[], at: number, stepMs: number) {
    if (path.length === 0) return;
    if (this.phase[i] === FLIPPING) {
      // A leaf is already falling: let it land, then continue along the new path.
      this.queue[i] = path;
      return;
    }
    this.phase[i] = FLIPPING;
    this.next[i] = path[0];
    this.queue[i] = path.slice(1);
    this.t0[i] = at;
    this.dur[i] = stepMs;
  }

  /** Where a module will rest once its current leaf lands. */
  private resting(i: number) {
    return this.phase[i] === FLIPPING ? this.next[i] : this.cur[i];
  }

  /** The arrival: every module shuffles, then runs up the drum onto its letter. */
  intro(now: number) {
    for (let i = 0; i < this.n; i++) {
      const m = this.modules[i];
      const t = this.target[i];
      const path = [randomGlyph(t), randomGlyph(t), randomGlyph(t)];
      const runUp = t === 0 ? [0] : drumPath((t - 5 + DRUM_SIZE) % DRUM_SIZE, t, 5);
      const start = now + 120 + m.col * 46 + m.row * 140;
      this.begin(i, [...path, ...runUp], start, 52);
    }
  }

  /** Knock loose every module inside an ellipse around (x, y), in board pixels. */
  disturb(x: number, y: number, reach: number, now: number) {
    let hits = 0;
    for (let i = 0; i < this.n; i++) {
      const m = this.modules[i];
      const dx = (m.x + m.w / 2 - x) / (m.w / 2 + reach);
      const dy = (m.y + m.h / 2 - y) / (m.h / 2 + reach * 0.5);
      if (dx * dx + dy * dy > 1) continue;
      if (now - this.touched[i] < RETOUCH_MS) continue;
      this.knock(i, now);
      hits++;
    }
    if (hits > 0) this.afterDisturb(now);
  }

  /** Keyboard and button path: knock a handful of letters loose at random. */
  knockRandom(now: number, count = 6) {
    const letters = [];
    for (let i = 0; i < this.n; i++) if (this.target[i] !== 0) letters.push(i);
    for (let k = letters.length - 1; k > 0; k--) {
      const j = Math.floor(Math.random() * (k + 1));
      [letters[k], letters[j]] = [letters[j], letters[k]];
    }
    letters.slice(0, count).forEach((i, k) => this.knock(i, now + k * 45));
    this.afterDisturb(now);
  }

  private knock(i: number, at: number) {
    this.touched[i] = at;
    const t = this.target[i];
    const path = Math.random() < 0.45 ? [randomGlyph(t)] : [randomGlyph(t), randomGlyph(t)];
    this.begin(i, path, at, 46);
    this.tint[i] = TINT_DRIFT;
    this.episode.add(i);
  }

  private afterDisturb(now: number) {
    if (this.episodeStart === 0) this.episodeStart = now;
    this.onStatus?.({ kind: "drift", count: this.episode.size });
  }

  /** Advance every module to `now`. Returns true while anything still needs frames. */
  update(now: number): boolean {
    let busy = this.episode.size > 0;
    for (let i = 0; i < this.n; i++) {
      if (this.phase[i] === FLIPPING) {
        busy = true;
        if (now < this.t0[i]) continue;
        let p = (now - this.t0[i]) / this.dur[i];
        while (p >= 1) {
          this.prev[i] = this.cur[i];
          this.cur[i] = this.next[i];
          this.onLand?.();
          const q = this.queue[i];
          if (q.length === 0) {
            this.phase[i] = BOUNCING;
            this.landed[i] = this.t0[i] + this.dur[i];
            break;
          }
          this.next[i] = q.shift()!;
          this.t0[i] += this.dur[i];
          p = (now - this.t0[i]) / this.dur[i];
        }
      }
      if (this.phase[i] === BOUNCING) {
        if (now - this.landed[i] >= BOUNCE_MS) {
          this.phase[i] = IDLE;
          this.prev[i] = this.cur[i];
          this.next[i] = this.cur[i];
          if (this.tint[i] === TINT_HEAL && this.cur[i] === this.target[i]) this.tint[i] = TINT_OK;
        } else busy = true;
      }
    }
    this.sweep(now);
    return busy;
  }

  private sweep(now: number) {
    if (this.episode.size === 0) return;
    // Modules left alone long enough start repairing, left to right within a frame.
    const due: number[] = [];
    for (let i = 0; i < this.n; i++) {
      if (this.tint[i] === TINT_DRIFT && now - this.touched[i] >= HEAL_DELAY_MS) due.push(i);
    }
    due.sort((a, b) => this.modules[a].col - this.modules[b].col || this.modules[a].row - this.modules[b].row);
    due.forEach((i, k) => {
      this.tint[i] = TINT_HEAL;
      this.begin(i, drumPath(this.resting(i), this.target[i], 7), now + k * 55, 50);
    });
    for (let i = 0; i < this.n; i++) if (this.tint[i] !== TINT_OK) return;
    this.onStatus?.({ kind: "repaired", count: this.episode.size, ms: now - this.episodeStart });
    this.episode.clear();
    this.episodeStart = 0;
  }

  /** What the renderer draws for module i at time `now`. */
  view(i: number, now: number, out: ModuleView): ModuleView {
    const phase = this.phase[i];
    out.tint = this.tint[i];
    if (phase === FLIPPING && now >= this.t0[i]) {
      const p = Math.min((now - this.t0[i]) / this.dur[i], 1);
      out.from = this.cur[i];
      out.to = this.next[i];
      out.angle = Math.PI * Math.pow(p, 1.6);
    } else if (phase === BOUNCING) {
      const t = Math.min((now - this.landed[i]) / BOUNCE_MS, 1);
      out.from = this.prev[i];
      out.to = this.cur[i];
      out.angle = Math.PI - 0.34 * Math.sin(Math.PI * t) * (1 - t);
    } else {
      out.from = this.cur[i];
      out.to = this.cur[i];
      out.angle = 0;
    }
    return out;
  }
}
