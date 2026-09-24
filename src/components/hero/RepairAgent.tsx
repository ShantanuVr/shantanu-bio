"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Pause, Play, RotateCcw } from "lucide-react";
import { useReducedMotionPref } from "@/lib/media";
import type { AgentScene, AgentPhase } from "./agent-scene";

const captions: Record<AgentPhase, string> = {
  idle: "A little agent. A very particular job.",
  scanning: "Locating the broken test…",
  repairing: "A small fix. Back into alignment.",
  passed: "Test repaired. Ready for human review.",
};

// An inline illustration keeps the composition intact before WebGL loads, and on
// devices that cannot create a context. No external models or images are fetched.
function AgentPoster() {
  return (
    <svg className="agent-poster" viewBox="0 0 540 360" aria-hidden="true">
      <ellipse cx="270" cy="314" rx="100" ry="13" fill="currentColor" opacity=".09" />
      <path d="M177 293v14c0 25 186 25 186 0v-14" fill="#292c30" />
      <ellipse cx="270" cy="292" rx="93" ry="19" fill="#a5a9af" />
      <g transform="rotate(-7 270 170)">
        <rect x="225" y="197" width="91" height="64" rx="23" fill="#c2c5c8" />
        <rect x="235" y="194" width="69" height="58" rx="17" fill="#f1ede3" />
        <rect x="252" y="211" width="36" height="23" rx="5" fill="#292c30" />
        <path d="m261 222 6 5 11-13" fill="none" stroke="#ffb224" strokeWidth="4" />
        <rect x="190" y="103" width="161" height="102" rx="33" fill="#babec3" />
        <rect x="185" y="96" width="161" height="102" rx="33" fill="#f1ede3" />
        <rect x="200" y="112" width="133" height="68" rx="24" fill="#202327" />
        <rect x="227" y="131" width="13" height="30" rx="6" fill="#ffb224" />
        <rect x="288" y="131" width="13" height="30" rx="6" fill="#ffb224" />
        <path d="M264 95V77" stroke="#41464b" strokeWidth="7" />
        <circle cx="264" cy="71" r="8" fill="#ffb224" />
        <path d="m218 213-19 25m122-25 19 25" stroke="#92979d" strokeWidth="18" strokeLinecap="round" />
      </g>
      <g transform="rotate(-16 124 190)"><rect x="103" y="169" width="44" height="52" rx="7" fill="#292c30" /><path d="m116 190 18 0m-9-9v18" stroke="#ec5a50" strokeWidth="3" /></g>
      <g transform="rotate(14 401 135)"><rect x="380" y="110" width="44" height="52" rx="7" fill="#292c30" /><path d="m391 135 7 7 15-18" fill="none" stroke="#f1ede3" strokeWidth="3" /></g>
    </svg>
  );
}

export default function RepairAgent() {
  const host = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const scene = useRef<AgentScene | null>(null);
  const reduced = useReducedMotionPref();
  const [ready, setReady] = useState(false);
  const [paused, setPaused] = useState(false);
  const [phase, setPhase] = useState<AgentPhase>("idle");
  const phaseRef = useRef(phase);
  const motionRef = useRef(true);
  const motion = !paused && !reduced;

  useEffect(() => {
    motionRef.current = motion;
    scene.current?.setMotion(motion);
  }, [motion]);

  useEffect(() => {
    phaseRef.current = phase;
    scene.current?.setPhase(phase);
    if (phase !== "scanning" && phase !== "repairing") return;
    const timer = window.setTimeout(() => {
      setPhase(phase === "scanning" ? "repairing" : "passed");
    }, reduced || paused ? 0 : phase === "scanning" ? 1400 : 1900);
    return () => window.clearTimeout(timer);
  }, [phase, reduced, paused]);

  useEffect(() => {
    const element = host.current;
    const surface = canvas.current;
    if (!element || !surface) return;
    let disposed = false;
    let started = false;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || started) return;
      started = true;
      // The 3D engine is a separate chunk, only loaded near this exhibit.
      import("./agent-scene").then(({ createAgentScene }) => {
        if (disposed) return;
        scene.current = createAgentScene(surface, element, () => setReady(false));
        scene.current.setMotion(motionRef.current);
        scene.current.setPhase(phaseRef.current);
        setReady(true);
      }).catch((error: unknown) => {
        console.warn("The repair agent is using its static illustration.", error);
        if (!disposed) setReady(false);
      });
    }, { rootMargin: "160px" });
    observer.observe(element);
    return () => {
      disposed = true;
      observer.disconnect();
      scene.current?.dispose();
      scene.current = null;
    };
  }, []);

  const running = phase === "scanning" || phase === "repairing";
  return (
    <aside className="repair-agent" aria-label="Meet the repair agent" data-phase={phase}>
      <div className="agent-label"><span className="agent-indicator" />Meet the repair agent<span className="agent-serial">SV / 01</span></div>
      <div className="agent-stage" ref={host} data-ready={ready}>
        <AgentPoster />
        <canvas ref={canvas} aria-hidden="true" className="agent-canvas" />
        <span className="agent-stage-note">{ready ? "DRAG TO EXPLORE" : "REPAIR AGENT / STUDY 01"}</span>
        <span className="agent-stage-cross" aria-hidden="true">+</span>
      </div>
      <div className="agent-console">
        <div className="agent-caption"><p aria-live="polite" aria-atomic="true">{captions[phase]}</p><span>Interactive illustration · simulated repair</span></div>
        <button type="button" className="agent-run" disabled={running} onClick={() => setPhase(reduced || paused ? "passed" : "scanning")}>
          {running ? "Working…" : phase === "passed" ? "Run again" : "Run a repair"}<span aria-hidden="true">↗</span>
        </button>
      </div>
      <div className="agent-controls" aria-label="3D character controls">
        <button type="button" disabled={!ready} aria-label="Rotate agent left" onClick={() => scene.current?.rotate(-0.45)}><ArrowLeft size={15} /></button>
        <button type="button" disabled={!ready} aria-label="Rotate agent right" onClick={() => scene.current?.rotate(0.45)}><ArrowRight size={15} /></button>
        <button type="button" disabled={!ready} aria-label="Reset agent view" onClick={() => scene.current?.reset()}><RotateCcw size={14} /></button>
        {!reduced && <button type="button" disabled={!ready} aria-label={paused ? "Resume agent animation" : "Pause agent animation"} aria-pressed={paused} onClick={() => setPaused(!paused)}>{paused ? <Play size={14} /> : <Pause size={14} />}</button>}
      </div>
    </aside>
  );
}
