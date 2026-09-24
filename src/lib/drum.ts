// The character drum shared by every split-flap on the page. A real module can only
// flip forward through its drum, so letters settle in drum order during a cascade.
export const DRUM = " ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789.,:-+%~@&/#!?()'";
export const DRUM_SIZE = DRUM.length;

const INDEX = new Map<string, number>(Array.from(DRUM, (ch, i) => [ch, i]));

// "+" and "~" put their strokes exactly on the hinge, where the split erases them
// ("90%+" reads as "90%÷"). Both renderers lift these glyphs clear of the split.
export const RAISED = new Set(["+", "~"]);
export const RAISE_EM = 0.13;

export function drumIndex(ch: string): number {
  return INDEX.get(ch.toUpperCase()) ?? 0;
}

/** Uppercase, map characters outside the drum to blanks, then pad or trim to `cells`. */
export function fitToCells(text: string, cells: number, align: "left" | "right" = "left"): string {
  const clean = Array.from(text.toUpperCase(), (ch) => (INDEX.has(ch) ? ch : " ")).join("");
  const trimmed = clean.slice(0, cells);
  return align === "right" ? trimmed.padStart(cells, " ") : trimmed.padEnd(cells, " ");
}

/**
 * Glyphs a module passes through going from `from` to `to`, excluding `from`.
 * Long trips jump straight to the last `maxSteps` letters before the target, which
 * still reads as a drum run-up but keeps the cascade short.
 */
export function drumPath(from: number, to: number, maxSteps: number): number[] {
  const distance = (to - from + DRUM_SIZE) % DRUM_SIZE;
  if (distance === 0) return [];
  const steps = Math.min(distance, maxSteps);
  const path: number[] = [];
  for (let k = steps - 1; k >= 0; k--) path.push((to - k + DRUM_SIZE) % DRUM_SIZE);
  return path;
}

// Letters and digits only: scrambled flaps look like real mis-set modules, not punctuation noise.
const SCRAMBLE_POOL = Array.from("ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789", (ch) => drumIndex(ch));

export function randomGlyph(except: number): number {
  let g = except;
  while (g === except) g = SCRAMBLE_POOL[Math.floor(Math.random() * SCRAMBLE_POOL.length)];
  return g;
}
