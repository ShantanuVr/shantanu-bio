"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { lab } from "@/content/profile";
import { fitToCells } from "@/lib/drum";
import { useInViewOnce } from "@/lib/inview";
import { useReducedMotionPref } from "@/lib/media";
import { scrollToY } from "@/lib/scroll";
import FlapLine from "@/components/flap/FlapLine";

const SUITE_CELLS = 12;
const STATUS_CELLS = 7;
const WIDTH = SUITE_CELLS + 1 + STATUS_CELLS;

export default function Lab() {
  const reduced = useReducedMotionPref();
  const trackRef = useRef<HTMLDivElement>(null);
  const boardRef = useRef<HTMLDivElement>(null);
  const inView = useInViewOnce(boardRef, 0.35);
  const [stage, setStage] = useState(0);

  // Scroll is time here. Four sentinels split the pinned stretch into equal quarters;
  // whichever one sits under the middle of the viewport is the stage on the board.
  useEffect(() => {
    const track = trackRef.current;
    if (!track || reduced) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setStage(Number((entry.target as HTMLElement).dataset.stage));
        }
      },
      { rootMargin: "-50% 0px -50% 0px" },
    );
    track.querySelectorAll(".lab-sentinel").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [reduced]);

  const shown = reduced ? lab.stages.length - 1 : stage;
  const current = lab.stages[shown];

  const goTo = (i: number) => {
    const track = trackRef.current;
    if (!track || reduced) return;
    const top = track.getBoundingClientRect().top + window.scrollY;
    const span = track.offsetHeight - window.innerHeight;
    scrollToY(top + span * ((i + 0.5) / lab.stages.length));
  };

  return (
    <section id="lab" className="lab" aria-labelledby="lab-heading">
      <div className="container-page lab-intro">
        <h2 id="lab-heading" className="h-section">
          {lab.heading}
        </h2>
        <p className="lede lab-lede">{lab.lede}</p>
      </div>

      <div ref={trackRef} className="lab-track" data-static={reduced}>
        {lab.stages.map((s, i) => (
          <span key={s.id} className="lab-sentinel" data-stage={i} style={{ "--i": i } as CSSProperties} aria-hidden="true" />
        ))}
        <div className="lab-sticky">
          <div className="container-page lab-layout">
            <ol className="lab-rail" aria-label="Pipeline stages">
              {lab.stages.map((s, i) => (
                <li key={s.id}>
                  <button
                    type="button"
                    className="lab-step"
                    aria-current={i === shown ? "step" : undefined}
                    onClick={() => goTo(i)}
                  >
                    <span className="lab-step-lamp" aria-hidden="true" />
                    {s.label}
                  </button>
                </li>
              ))}
            </ol>

            <div ref={boardRef} className="board lab-board on-board" aria-hidden="true">
              <div className="board-interior lab-board-interior">
                <span className="flapline lab-board-head">
                  <span className="flapline-grid" style={{ "--n": WIDTH } as CSSProperties}>
                    <span className="board-label lab-head-suite">Suite</span>
                    <span className="board-label lab-head-status">Status</span>
                  </span>
                </span>
                {lab.suites.map((suite, row) => {
                  const broken = row === lab.brokenRow;
                  const status = broken ? current.status : "PASSED";
                  const line = (
                    <FlapLine
                      key={suite}
                      className={broken ? "lab-board-row lab-module" : "lab-board-row"}
                      text={`${fitToCells(suite, SUITE_CELLS)} ${fitToCells(status, STATUS_CELLS)}`}
                      cells={WIDTH}
                      accentFrom={SUITE_CELLS + 1}
                      accentTone={broken ? current.tone : "paint"}
                      play={inView}
                      delay={row * 110}
                      srText={false}
                    />
                  );
                  if (!broken) return line;
                  // The broken module lifts out on a top hinge; the cavity behind it opens to
                  // show what the agent checks, and wires up while the repair runs.
                  return (
                    <div key={suite} className="lab-slot" data-stage={current.id}>
                      {line}
                      <div className="lab-cavity">
                        <div>
                          <div className="lab-schematic">
                            {lab.schematic.map((node) => (
                              <span key={node} className="board-label lab-node">
                                {node}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
                <FlapLine
                  className="lab-board-note"
                  text={current.note}
                  cells={WIDTH}
                  tone={current.tone}
                  play={inView}
                  delay={620}
                  srText={false}
                />
              </div>
            </div>

            <ol className="lab-captions">
              {lab.stages.map((s, i) => (
                <li key={s.id} className="lab-caption" aria-current={i === shown ? "step" : undefined}>
                  <h3 className="lab-caption-title">{s.label}</h3>
                  <p>{s.caption}</p>
                </li>
              ))}
            </ol>

            <p className="lab-footnote">
              <span>{lab.proof}</span>
              <span className="lab-footnote-note">{lab.simulatedNote}</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
