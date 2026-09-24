"use client";

import { useEffect, useRef, useState } from "react";
import { useInViewOnce } from "@/lib/inview";
import { experience } from "@/content/profile";
import FlapLine from "@/components/flap/FlapLine";

const CELLS = 16;

export default function Experience() {
  const [active, setActive] = useState(0);
  const itemsRef = useRef<(HTMLLIElement | null)[]>([]);
  const boardRef = useRef<HTMLDivElement>(null);
  const inView = useInViewOnce(boardRef, 0.5);

  // The board shows whichever role crosses the middle of the viewport.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(Number((entry.target as HTMLElement).dataset.index));
        }
      },
      { rootMargin: "-42% 0px -52% 0px" },
    );
    itemsRef.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const role = experience.roles[active];
  const lines = [
    { label: "Years", text: role.years },
    { label: "Company", text: role.board },
    { label: "Role", text: role.boardTitle },
    { label: "City", text: role.city },
  ];

  return (
    <section id="experience" className="experience" aria-labelledby="experience-heading">
      <div className="container-page">
        <h2 id="experience-heading" className="h-section">
          {experience.heading}
        </h2>
        <div className="exp-layout">
          <div className="exp-aside">
            <div ref={boardRef} className="board exp-board on-board" aria-hidden="true">
              <div className="board-interior exp-board-interior">
                {lines.map((line, i) => (
                  <div key={line.label} className="exp-board-line" data-line={line.label.toLowerCase()}>
                    <span className="board-label exp-board-label">
                      {line.label}
                      {i === 0 && role.current && <span className="lamp" />}
                    </span>
                    <FlapLine text={line.text} cells={CELLS} play={inView} delay={i * 120} srText={false} />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <ol className="exp-list">
            {experience.roles.map((r, i) => (
              <li
                key={r.id}
                ref={(el) => {
                  itemsRef.current[i] = el;
                }}
                data-index={i}
                data-active={i === active}
                className="exp-item"
              >
                <header className="exp-head">
                  <h3 className="exp-title">
                    {r.title}
                    <span className="exp-company">{r.company}</span>
                  </h3>
                  <p className="exp-meta tabular">
                    {r.period}, {r.place}
                  </p>
                </header>
                <ul className="exp-highlights">
                  {r.highlights.map((h) => (
                    <li key={h}>{h}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
