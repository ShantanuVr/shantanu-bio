// Glue between the DOM board, the model, and the WebGL renderer. The CSS grid owns the
// geometry (so the server-rendered board and the canvas line up), this class reads it,
// maps pointer input onto modules, and renders only while something is moving.
import { drumIndex } from "@/lib/drum";
import { flapSound } from "@/lib/sound";
import { BoardModel, type BoardStatus, type Module } from "./board-model";
import { BoardRenderer, type LightState } from "./board-renderer";

// Must match --gutter on .hero-grid in globals.css.
const GUTTER = 0.05;

type Hooks = {
  onStatus: (status: BoardStatus) => void;
  onLive: (live: boolean) => void;
};

export class BoardController {
  private renderer: BoardRenderer | null = null;
  private model: BoardModel | null = null;
  private raf = 0;
  private visible = true;
  private disposed = false;
  private width = 1;
  private height = 1;
  private moduleW = 1;
  private layoutKey = "";
  private light: LightState = { x: 0, y: 0, mix: 0 };
  private target: LightState = { x: 0, y: 0, mix: 0 };
  private last = { x: 0, y: 0, t: 0, has: false };
  private resize: ResizeObserver | null = null;
  private presence: IntersectionObserver | null = null;

  constructor(
    private grid: HTMLElement,
    private canvas: HTMLCanvasElement,
    private surface: HTMLElement,
    private hooks: Hooks,
  ) {}

  async start() {
    const family =
      getComputedStyle(document.documentElement).getPropertyValue("--font-sofia-xc").trim() || "sans-serif";
    try {
      await document.fonts.load(`800 64px ${family}`);
    } catch {
      // Fall through: the atlas still rasterizes with the fallback face.
    }
    if (this.disposed) return;

    this.renderer = new BoardRenderer(this.canvas, family);
    this.canvas.addEventListener("webglcontextlost", this.onLost);
    this.measure();
    this.light = { ...this.restingLight(), mix: 0 };
    this.target = { ...this.light };

    this.resize = new ResizeObserver(() => this.measure());
    this.resize.observe(this.grid);
    this.presence = new IntersectionObserver(([entry]) => {
      this.visible = entry.isIntersecting;
      if (this.visible) this.kick();
      else this.stop();
    });
    this.presence.observe(this.surface);
    document.addEventListener("visibilitychange", this.onVisibility);
    this.surface.addEventListener("pointermove", this.onMove);
    this.surface.addEventListener("pointerdown", this.onDown);
    this.surface.addEventListener("pointerleave", this.onLeave);

    const now = performance.now();
    this.renderer.render(this.model!, now, this.light);
    this.hooks.onLive(true);
    this.model!.intro(now);
    this.kick();
  }

  /** Rebuild modules from the grid's computed layout; mirrors the CSS formula exactly. */
  private measure() {
    if (!this.renderer) return;
    const style = getComputedStyle(this.grid);
    const cols = parseInt(style.getPropertyValue("--cols"), 10) || 8;
    const rows = parseInt(style.getPropertyValue("--rows"), 10) || 2;
    const width = parseFloat(style.width);
    const height = parseFloat(style.height);
    if (!width || !height) return;
    const key = `${cols}x${rows}@${width.toFixed(1)}x${height.toFixed(1)}`;
    if (key === this.layoutKey) return;
    this.layoutKey = key;

    const cw = width / (cols + GUTTER * (cols - 1));
    const gap = cw * GUTTER;
    const ch = (height - gap * (rows - 1)) / rows;
    const glyphAt = new Map<string, number>();
    this.grid.querySelectorAll<HTMLElement>(".flap[data-glyph]").forEach((cell) => {
      glyphAt.set(`${cell.dataset.row}:${cell.dataset.col}`, drumIndex(cell.dataset.glyph ?? " "));
    });
    const modules: Module[] = [];
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        modules.push({
          x: col * (cw + gap),
          y: row * (ch + gap),
          w: cw,
          h: ch,
          glyph: glyphAt.get(`${row}:${col}`) ?? 0,
          col,
          row,
        });
      }
    }

    this.width = width;
    this.height = height;
    this.moduleW = cw;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.renderer.setLayout(modules, width, height, dpr);
    const model = new BoardModel(modules);
    model.onStatus = this.hooks.onStatus;
    model.onLand = () => flapSound.tick();
    this.model = model;
    this.kick();
  }

  private restingLight(): LightState {
    // A ceiling light above the board, a little left of centre.
    return { x: this.width * 0.4, y: -this.height * 0.35, mix: 0 };
  }

  private toBoard(e: PointerEvent) {
    const rect = this.grid.getBoundingClientRect();
    return {
      x: ((e.clientX - rect.left) * this.width) / rect.width,
      y: ((e.clientY - rect.top) * this.height) / rect.height,
    };
  }

  private inside(x: number, y: number) {
    return x >= 0 && y >= 0 && x <= this.width && y <= this.height;
  }

  private onMove = (e: PointerEvent) => {
    if (!this.model) return;
    const { x, y } = this.toBoard(e);
    const now = performance.now();
    let speed = 0;
    if (this.last.has) speed = Math.hypot(x - this.last.x, y - this.last.y) / Math.max(now - this.last.t, 1);
    this.last = { x, y, t: now, has: true };
    this.target = { x, y, mix: 1 };
    // Slow hovers nudge one module; fast sweeps knock a wider path loose.
    if (this.inside(x, y)) this.model.disturb(x, y, this.moduleW * Math.min(0.1 + speed * 0.35, 0.75), now);
    this.kick();
  };

  private onDown = (e: PointerEvent) => {
    if (!this.model) return;
    const { x, y } = this.toBoard(e);
    this.target = { x, y, mix: 1 };
    if (this.inside(x, y)) this.model.disturb(x, y, this.moduleW * 0.9, performance.now());
    this.kick();
  };

  private onLeave = () => {
    this.last.has = false;
    this.target = this.restingLight();
    this.kick();
  };

  private onVisibility = () => {
    if (document.hidden) this.stop();
    else this.kick();
  };

  private onLost = (e: Event) => {
    e.preventDefault();
    this.stop();
    this.hooks.onLive(false);
  };

  /** Keyboard and button path to the same demonstration. */
  knock() {
    this.model?.knockRandom(performance.now());
    this.kick();
  }

  private stepLight(): boolean {
    const l = this.light;
    const t = this.target;
    l.x += (t.x - l.x) * 0.14;
    l.y += (t.y - l.y) * 0.14;
    l.mix += (t.mix - l.mix) * 0.08;
    return Math.abs(t.x - l.x) > 0.3 || Math.abs(t.y - l.y) > 0.3 || Math.abs(t.mix - l.mix) > 0.004;
  }

  private frame = (now: number) => {
    this.raf = 0;
    if (!this.visible || this.disposed || !this.model || !this.renderer) return;
    const busy = this.model.update(now);
    const moving = this.stepLight();
    this.renderer.render(this.model, now, this.light);
    if (busy || moving) this.raf = requestAnimationFrame(this.frame);
  };

  private kick() {
    if (!this.raf && this.visible && !this.disposed && !document.hidden) {
      this.raf = requestAnimationFrame(this.frame);
    }
  }

  private stop() {
    if (this.raf) cancelAnimationFrame(this.raf);
    this.raf = 0;
  }

  dispose() {
    this.disposed = true;
    this.stop();
    this.resize?.disconnect();
    this.presence?.disconnect();
    document.removeEventListener("visibilitychange", this.onVisibility);
    this.surface.removeEventListener("pointermove", this.onMove);
    this.surface.removeEventListener("pointerdown", this.onDown);
    this.surface.removeEventListener("pointerleave", this.onLeave);
    this.canvas.removeEventListener("webglcontextlost", this.onLost);
    this.renderer?.dispose();
    this.renderer = null;
    this.model = null;
  }
}
