"use client";

import { useRef } from "react";
import { useInViewOnce } from "@/lib/inview";
import { results } from "@/content/profile";
import FlapLine from "@/components/flap/FlapLine";

export default function Results() {
  const boardRef = useRef<HTMLDivElement>(null);
  const inView = useInViewOnce(boardRef, 0.25);

  return (
    <section id="results" className="results" aria-labelledby="results-heading">
      <div className="container-page">
        <h2 id="results-heading" className="h-section results-heading">
          {results.heading}
        </h2>
        <div ref={boardRef} className="board results-board on-board">
          <div className="board-interior results-interior">
            <table className="results-table">
              <caption className="sr-only">Measured results of systems Shantanu built at PowerSchool</caption>
              <thead>
                <tr>
                  <th scope="col" className="board-label">
                    System
                  </th>
                  <th scope="col" className="board-label results-col-value">
                    Result
                  </th>
                </tr>
              </thead>
              <tbody>
                {results.rows.map((row, r) => (
                  <tr key={row.system}>
                    <th scope="row" className="results-row-head">
                      <span className="results-system">{row.system}</span>
                      <span className="results-measure">
                        {row.measure}
                        {row.was && <span className="results-was">{row.was}</span>}
                      </span>
                    </th>
                    <td className="results-value">
                      {/* Old figure first, then the flip to where it stands now. */}
                      <FlapLine
                        text={row.after}
                        idle={row.before}
                        cells={7}
                        align="right"
                        play={inView}
                        delay={380 + r * 140}
                        stagger={40}
                        maxSteps={10}
                        srText={row.after}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
