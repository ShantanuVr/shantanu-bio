"use client";

import { useEffect, useRef, useState } from "react";
import { useInViewOnce } from "@/lib/inview";
import { ArrowUpRight } from "lucide-react";
import { connect, person } from "@/content/profile";
import { FlapLink } from "@/components/flap/FlapButton";
import FlapLine from "@/components/flap/FlapLine";

const YEAR = new Date().getFullYear();
const [LOCAL, DOMAIN] = person.email.toUpperCase().split("@");

export default function Connect() {
  const [copied, setCopied] = useState(false);
  const [failed, setFailed] = useState(false);
  const boardRef = useRef<HTMLButtonElement>(null);
  const timer = useRef<number | null>(null);
  const inView = useInViewOnce(boardRef, 0.5);

  useEffect(
    () => () => {
      if (timer.current) window.clearTimeout(timer.current);
    },
    [],
  );

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(person.email);
      setCopied(true);
      setFailed(false);
      if (timer.current) window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setCopied(false), 2600);
    } catch {
      setFailed(true);
    }
  };

  let hint: string = connect.copyHint;
  if (copied) hint = "Copied. Paste it into your mail client.";
  else if (failed) hint = `Copy blocked by the browser. The address is ${person.email}.`;

  return (
    <section id="connect" className="connect" aria-labelledby="connect-heading">
      <div className="container-page">
        <h2 id="connect-heading" className="connect-heading">
          {connect.heading}
        </h2>

        <button
          ref={boardRef}
          type="button"
          className="board connect-board on-board"
          onClick={copy}
          aria-label={`Copy email address ${person.email}`}
          aria-describedby="connect-hint"
        >
          <span className="board-interior connect-interior">
            <FlapLine
              className="connect-line-wide"
              text={copied ? connect.copied : `${LOCAL}@${DOMAIN}`}
              cells={26}
              play={inView}
              stagger={24}
              srText={false}
            />
            <span className="connect-lines-narrow">
              <FlapLine text={copied ? "EMAIL" : LOCAL} cells={16} play={inView} stagger={26} srText={false} />
              <FlapLine
                text={copied ? "COPIED" : `@${DOMAIN}`}
                cells={16}
                play={inView}
                delay={180}
                stagger={26}
                srText={false}
              />
            </span>
          </span>
        </button>
        <p id="connect-hint" className="connect-hint" aria-live="polite">
          {hint}
        </p>

        <div className="connect-actions">
          <FlapLink variant="primary" href={`mailto:${person.email}`} label={`Email me at ${person.email}`}>
            Email me
          </FlapLink>
          <ul className="connect-links">
            <li>
              <a href={person.linkedin} target="_blank" rel="noopener noreferrer">
                LinkedIn
                <ArrowUpRight aria-hidden="true" size={16} strokeWidth={2} />
              </a>
            </li>
            <li>
              <a href={person.github} target="_blank" rel="noopener noreferrer">
                GitHub
                <ArrowUpRight aria-hidden="true" size={16} strokeWidth={2} />
              </a>
            </li>
            <li>
              <a href={person.resume} target="_blank" rel="noopener noreferrer">
                Resume (PDF)
                <ArrowUpRight aria-hidden="true" size={16} strokeWidth={2} />
              </a>
            </li>
            <li>
              <a href={person.phoneHref} className="tabular">
                {person.phone}
              </a>
            </li>
          </ul>
        </div>
        <p className="connect-location">Based in {person.location}.</p>
      </div>

      <footer className="site-footer container-page">
        <p>
          &copy; {YEAR} {person.name}
        </p>
        <p>Built with Next.js and a hand-written WebGL split-flap renderer.</p>
      </footer>
    </section>
  );
}
