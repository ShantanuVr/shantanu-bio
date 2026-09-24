"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { RAISED, drumIndex, fitToCells } from "@/lib/drum";
import { useReducedMotionPref } from "@/lib/media";
import { bindCell, flipTo, setInstant, type FlapCell } from "./engine";

export type FlapTone = "paint" | "live" | "fault";

/** Static markup for one module. The engine animates it by writing --p and glyph text. */
export function FlapModule({
  ch,
  tone = "paint",
  ...data
}: { ch: string; tone?: FlapTone } & Record<`data-${string}`, string | number>) {
  const raise = RAISED.has(ch) ? { "data-raise": "" } : {};
  return (
    <span className="flap" data-tone={tone} {...data}>
      <span className="flap-half flap-top">
        <span className="flap-glyph" {...raise}>{ch}</span>
      </span>
      <span className="flap-half flap-bottom">
        <span className="flap-glyph" {...raise}>{ch}</span>
      </span>
      <span className="flap-leaf">
        <span className="flap-half flap-front">
          <span className="flap-glyph" {...raise}>{ch}</span>
        </span>
        <span className="flap-half flap-back">
          <span className="flap-glyph" {...raise}>{ch}</span>
        </span>
      </span>
    </span>
  );
}

type Props = {
  text: string;
  cells: number;
  align?: "left" | "right";
  tone?: FlapTone;
  /** While false the line shows `idle` (blank by default) and waits to play. */
  play?: boolean;
  idle?: string;
  delay?: number;
  stagger?: number;
  stepMs?: number;
  maxSteps?: number;
  className?: string;
  /** Accessible text. Defaults to `text`; pass false when the parent already names it. */
  srText?: string | false;
  /** Cells from this index on use `accentTone` (a status column on the same grid). */
  accentFrom?: number;
  accentTone?: FlapTone;
  /** Start blank on mount and flip in, for lines that appear with an interaction. */
  enter?: boolean;
};

export default function FlapLine({
  text,
  cells,
  align = "left",
  tone = "paint",
  play = true,
  idle = "",
  delay = 0,
  stagger = 26,
  stepMs = 58,
  maxSteps = 8,
  className,
  srText,
  accentFrom,
  accentTone,
  enter = false,
}: Props) {
  const reduced = useReducedMotionPref();
  const rootRef = useRef<HTMLSpanElement>(null);
  const cellsRef = useRef<FlapCell[] | null>(null);
  // Server and first client render print the final text, so the line reads without JS.
  // React never re-renders these glyphs; the engine owns them after mount.
  const [initial] = useState(() => fitToCells(text, cells, align));
  const goal = fitToCells(play ? text : idle, cells, align);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const nodes = root.querySelectorAll<HTMLElement>(".flap");
    const list = Array.from(nodes, (node, i) => bindCell(node, drumIndex(initial[i] ?? " ")));
    if (enter && !reduced) list.forEach((cell) => setInstant(cell, 0));
    cellsRef.current = list;
    // Binding happens once per mount; later prop changes are handled by the effect below.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initial]);

  useEffect(() => {
    const list = cellsRef.current;
    if (!list) return;
    if (reduced || !play) {
      list.forEach((cell, i) => setInstant(cell, drumIndex(goal[i])));
      return;
    }
    const now = performance.now();
    list.forEach((cell, i) => flipTo(cell, drumIndex(goal[i]), now + delay + i * stagger, stepMs, maxSteps));
  }, [goal, play, reduced, delay, stagger, stepMs, maxSteps]);

  return (
    <span ref={rootRef} className={className ? `flapline ${className}` : "flapline"}>
      {srText !== false && <span className="sr-only">{srText ?? text}</span>}
      <span className="flapline-grid" style={{ "--n": cells } as CSSProperties} aria-hidden="true">
        {Array.from(initial, (ch, i) => (
          <FlapModule
            key={i}
            ch={ch}
            tone={accentFrom !== undefined && accentTone && i >= accentFrom ? accentTone : tone}
          />
        ))}
      </span>
    </span>
  );
}
