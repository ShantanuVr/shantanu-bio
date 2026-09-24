"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { fitToCells } from "@/lib/drum";
import { useMediaQuery, useReducedMotionPref } from "@/lib/media";
import { flapSound } from "@/lib/sound";
import { FlapModule } from "@/components/flap/FlapLine";
import { BoardController } from "./board-controller";
import type { BoardStatus } from "./board-model";

// The CSS grid decides how many of these columns are visible at each viewport.
const LINES = ["SHANTANU", "VICHARE"];
const MAX_COLS = 12;

function plural(n: number) {
  return n === 1 ? "flap" : "flaps";
}

export default function HeroBoard() {
  const reduced = useReducedMotionPref();
  const coarse = useMediaQuery("(pointer: coarse)");
  const soundOn = useSyncExternalStore(flapSound.subscribe, flapSound.isEnabled, () => false);
  const [live, setLive] = useState(false);
  const [status, setStatus] = useState<BoardStatus>({ kind: "idle" });
  const [announcement, setAnnouncement] = useState("");
  const surfaceRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const controllerRef = useRef<BoardController | null>(null);

  useEffect(() => {
    if (reduced) return;
    const grid = gridRef.current;
    const canvas = canvasRef.current;
    const surface = surfaceRef.current;
    if (!grid || !canvas || !surface) return;
    const controller = new BoardController(grid, canvas, surface, {
      onStatus: (next) => {
        setStatus(next);
        if (next.kind === "repaired") {
          setAnnouncement(`Repaired ${next.count} ${plural(next.count)} in ${(next.ms / 1000).toFixed(1)} seconds.`);
        }
      },
      onLive: setLive,
    });
    controllerRef.current = controller;
    controller.start().catch(() => {
      controller.dispose();
      setLive(false);
    });
    return () => {
      controller.dispose();
      controllerRef.current = null;
    };
  }, [reduced]);

  const showCanvas = live && !reduced;
  let statusText: string;
  if (status.kind === "drift") {
    statusText = `${status.count} ${plural(status.count)} out of place. Repairing…`;
  } else if (status.kind === "repaired") {
    statusText = `Repaired ${status.count} ${plural(status.count)} in ${(status.ms / 1000).toFixed(1)} s.`;
  } else {
    statusText = coarse
      ? "Tap the board to knock letters out of place."
      : "Move across the board to knock letters out of place.";
  }

  return (
    <div className="hero-board-wrap">
      {/* Tips back into the concourse as the hero scrolls away (CSS scroll timeline). */}
      <div className="hero-board-motion">
        <div ref={surfaceRef} className="board hero-board" data-live={showCanvas}>
          <div className="board-interior hero-interior">
            <div ref={gridRef} className="hero-grid" aria-hidden="true">
              {LINES.map((line, row) => (
                <div key={row} className="hero-row" data-row={row}>
                  {Array.from(fitToCells(line, MAX_COLS), (ch, col) => (
                    <FlapModule key={col} ch={ch} data-glyph={ch} data-col={col} data-row={row} />
                  ))}
                </div>
              ))}
              <canvas ref={canvasRef} className="hero-canvas" />
            </div>
          </div>
        </div>
      </div>

      {!reduced && (
        <div className="hero-readout">
          <p className="hero-status" data-state={status.kind}>
            <span className="hero-status-mark" aria-hidden="true" />
            {statusText}
          </p>
          <div className="hero-tools">
            <button type="button" className="text-button" onClick={() => controllerRef.current?.knock()}>
              Knock letters loose
            </button>
            <button
              type="button"
              className="text-button"
              aria-pressed={soundOn}
              onClick={() => flapSound.toggle()}
            >
              {soundOn ? <Volume2 aria-hidden="true" size={16} strokeWidth={1.75} /> : <VolumeX aria-hidden="true" size={16} strokeWidth={1.75} />}
              Sound {soundOn ? "on" : "off"}
            </button>
          </div>
          <p className="sr-only" aria-live="polite">
            {announcement}
          </p>
        </div>
      )}
    </div>
  );
}
