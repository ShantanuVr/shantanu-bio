// One animation loop for every DOM split-flap on the page. Each module writes a single
// custom property (--p) per frame and touches glyphs (data-ch) only when a step lands.
import { DRUM, RAISED, drumPath } from "@/lib/drum";
import { flapSound } from "@/lib/sound";

export type FlapCell = {
  root: HTMLElement;
  top: HTMLElement;
  bottom: HTMLElement;
  front: HTMLElement;
  back: HTMLElement;
  current: number;
  to: number;
  queue: number[];
  t0: number;
  dur: number;
  running: boolean;
  painted: boolean;
};

const active = new Set<FlapCell>();
let frame = 0;

export function bindCell(root: HTMLElement, current: number): FlapCell {
  const glyphs = root.querySelectorAll<HTMLElement>(".flap-glyph");
  return {
    root,
    top: glyphs[0],
    bottom: glyphs[1],
    front: glyphs[2],
    back: glyphs[3],
    current,
    to: current,
    queue: [],
    t0: 0,
    dur: 60,
    running: false,
    painted: false,
  };
}

function write(node: HTMLElement, ch: string) {
  node.dataset.ch = ch;
  if (RAISED.has(ch)) node.dataset.raise = "";
  else delete node.dataset.raise;
}

function showStep(cell: FlapCell) {
  const from = DRUM[cell.current];
  const to = DRUM[cell.to];
  write(cell.top, to);
  write(cell.bottom, from);
  write(cell.front, from);
  write(cell.back, to);
}

function showIdle(cell: FlapCell) {
  const ch = DRUM[cell.current];
  write(cell.top, ch);
  write(cell.bottom, ch);
  write(cell.front, ch);
  write(cell.back, ch);
  cell.root.style.setProperty("--p", "0");
}

function tick(now: number) {
  for (const cell of active) {
    if (now < cell.t0) continue;
    if (!cell.painted) {
      showStep(cell);
      cell.painted = true;
    }
    let p = (now - cell.t0) / cell.dur;
    let done = false;
    while (p >= 1) {
      cell.current = cell.to;
      flapSound.tick();
      const next = cell.queue.shift();
      if (next === undefined) {
        done = true;
        break;
      }
      cell.to = next;
      cell.t0 += cell.dur;
      p = (now - cell.t0) / cell.dur;
      showStep(cell);
    }
    if (done) {
      cell.running = false;
      active.delete(cell);
      showIdle(cell);
      continue;
    }
    // The leaf falls under gravity: slow release, fast arrival.
    cell.root.style.setProperty("--p", Math.pow(Math.max(p, 0), 1.7).toFixed(3));
  }
  frame = active.size > 0 ? requestAnimationFrame(tick) : 0;
}

/** Flip a module forward through the drum to `target`, starting at `startAt` (ms). */
export function flipTo(cell: FlapCell, target: number, startAt: number, stepMs: number, maxSteps: number) {
  if (cell.running) {
    // Let the leaf in flight land, then head for the new target from there.
    cell.queue = drumPath(cell.to, target, maxSteps);
    return;
  }
  const path = drumPath(cell.current, target, maxSteps);
  if (path.length === 0) return;
  cell.to = path[0];
  cell.queue = path.slice(1);
  cell.t0 = startAt;
  cell.dur = stepMs;
  cell.running = true;
  cell.painted = false;
  active.add(cell);
  if (!frame) frame = requestAnimationFrame(tick);
}

/** Jump straight to a glyph with no animation. */
export function setInstant(cell: FlapCell, glyph: number) {
  active.delete(cell);
  cell.running = false;
  cell.queue = [];
  cell.current = glyph;
  cell.to = glyph;
  showIdle(cell);
}
