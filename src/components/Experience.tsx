"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState, useCallback } from "react";
import anime from "animejs";
import { Terminal, Shield, Bug } from "lucide-react";

const experiences = [
  {
    title: "Lead Quality Assurance Engineer",
    company: "PowerSchool",
    period: "November 2020 — Present",
    location: "Bengaluru, India (Remote)",
    icon: Terminal,
    color: "#00f0ff",
    highlights: [
      "Self-Healing Test Automation Pipeline: CI/CD agentic workflow where test failures trigger a background AI agent — analyzes logs, screenshots & pipeline context — generates a Playwright fix via MCP and raises a PR. No manual debugging. Flaky test MTTR near-zero.",
      "AI-Driven Test Generation from User Stories: Operationalising a pipeline where every automatable User Story flows through AI agents to generate a Test Case Map, create a context-rich automation subtask, and hand off to a GitHub Copilot background agent that delivers a working Playwright PR.",
      "GitHub Copilot QA Orchestration: Configured GitHub Copilot background agents with custom Skills and instructions for PR code review quality gates, test coverage checks, and automation workflow delivery integrated into the engineering pipeline.",
      "AI Context Graph — Agent Knowledge Infrastructure: Built a context graph indexing 10,000+ test cases from legacy automation suites and full API documentation across all PowerSchool product lines. Eliminated hallucinations and duplicate test generation entirely.",
      "Multi-Agent QA Lifecycle Orchestration — 80% Workload Reduction: Multi-agent pipeline via Atlassian MCP fetching Epics, User Stories, PRs and comments to generate TCMs. AI then builds Playwright automation; downstream agents run i18n, WCAG, and security validation.",
      "Quality Strategy Ownership: Zero P0 production incidents over 4+ years on Schoology SaaS platform through shift-left practices, CI/CD quality gates, and proactive risk identification.",
    ],
  },
  {
    title: "Software Development Engineer in Test",
    company: "FireEye (Mandiant)",
    period: "March 2018 — November 2020",
    location: "Bengaluru, India",
    icon: Shield,
    color: "#a855f7",
    highlights: [
      "Python Automation Framework from Scratch: Built UI and E2E test automation frameworks in Python + Nosetests for enterprise security products — accelerating release cycles and establishing automation standards.",
      "Cross-Functional QA at Scale: Partnered with security engineers and PMs to test complex threat detection systems — high-stakes product quality in a security SaaS context.",
    ],
  },
  {
    title: "Associate Threat Research Engineer",
    company: "Quick Heal Technologies",
    period: "August 2015 — March 2018",
    location: "Pune, India",
    icon: Bug,
    color: "#f472b6",
    highlights: [
      "Security Research & Automation: Malware analysis, threat classification, and Python tooling to eliminate manual analysis workflows.",
      "Foundation of prevention-first quality mindset applied throughout career.",
    ],
  },
];

function DecryptText({ text, delay = 0 }: { text: string; delay?: number }) {
  const [display, setDisplay] = useState("");
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const hasRun = useRef(false);

  useEffect(() => {
    if (!isInView || hasRun.current) return;
    hasRun.current = true;
    const scrambleChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*<>/\\|";

    const timeout = setTimeout(() => {
      const obj = { progress: 0 };
      anime({
        targets: obj,
        progress: text.length,
        duration: text.length * 50,
        easing: "easeInOutQuad",
        round: 1,
        update: () => {
          const revealed = obj.progress;
          setDisplay(
            text.substring(0, revealed) +
              text
                .substring(revealed)
                .split("")
                .map(() =>
                  scrambleChars[Math.floor(Math.random() * scrambleChars.length)]
                )
                .join("")
          );
        },
      });
    }, delay);
    return () => clearTimeout(timeout);
  }, [isInView, text, delay]);

  return (
    <span ref={ref} className="font-mono">
      {display || text.replace(/./g, "█")}
    </span>
  );
}

function TimelineCard({
  exp,
  index,
}: {
  exp: (typeof experiences)[number];
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const nodeRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-80px" });
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isInView || hasAnimated.current) return;
    hasAnimated.current = true;

    anime({
      targets: nodeRef.current,
      scale: [0, 1],
      opacity: [0, 1],
      duration: 600,
      easing: "easeOutElastic(1, .5)",
      delay: index * 200,
    });

    anime({
      targets: cardRef.current,
      opacity: [0, 1],
      translateX: [-40, 0],
      duration: 800,
      easing: "easeOutExpo",
      delay: 100 + index * 200,
    });

    const highlights = cardRef.current?.querySelectorAll(".highlight-item");
    if (highlights) {
      anime({
        targets: highlights,
        opacity: [0, 1],
        translateX: [-15, 0],
        duration: 500,
        easing: "easeOutQuad",
        delay: anime.stagger(60, { start: 400 + index * 200 }),
      });
    }
  }, [isInView, index]);

  const handleHover = useCallback(() => {
    if (!nodeRef.current) return;
    anime({
      targets: nodeRef.current,
      scale: [1, 1.3, 1.15],
      duration: 500,
      easing: "easeOutElastic(1, .6)",
    });
  }, []);

  const handleLeave = useCallback(() => {
    if (!nodeRef.current) return;
    anime({
      targets: nodeRef.current,
      scale: 1,
      duration: 300,
      easing: "easeOutQuad",
    });
  }, []);

  const Icon = exp.icon;

  return (
    <div
      className="relative pl-16 md:pl-20 pb-16 last:pb-0 group"
      onMouseEnter={handleHover}
      onMouseLeave={handleLeave}
    >
      {/* Node */}
      <div
        ref={nodeRef}
        className="absolute left-3 md:left-5 w-7 h-7 rounded-full flex items-center justify-center border-2 bg-background z-10"
        style={{
          borderColor: exp.color,
          boxShadow: `0 0 10px ${exp.color}40, 0 0 20px ${exp.color}20`,
          opacity: 0,
        }}
      >
        <Icon className="w-3.5 h-3.5" style={{ color: exp.color }} />
      </div>

      {/* Content */}
      <div
        ref={cardRef}
        className="glass rounded-lg p-6 hover:border-[var(--neon-blue)]/30 transition-all duration-300"
        style={{ opacity: 0 }}
      >
        <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 mb-4">
          <h3 className="text-lg font-bold">
            <DecryptText text={exp.title} delay={300 + index * 250} />
          </h3>
          <span
            className="font-mono text-sm px-3 py-1 rounded-full border w-fit"
            style={{
              color: exp.color,
              borderColor: `${exp.color}40`,
            }}
          >
            {exp.company}
          </span>
        </div>

        <div className="flex flex-col sm:flex-row gap-2 sm:gap-6 mb-4 font-mono text-xs text-foreground/40">
          <span>{exp.period}</span>
          <span>{exp.location}</span>
        </div>

        <ul className="space-y-2">
          {exp.highlights.map((h, j) => (
            <li
              key={j}
              className="highlight-item grid grid-cols-[auto_1fr] items-start gap-3 text-sm leading-relaxed text-foreground/60"
              style={{ opacity: 0 }}
            >
              <span className="pt-[2px] text-neon-blue">▹</span>
              {h}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function Experience() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isInView || hasAnimated.current) return;
    hasAnimated.current = true;

    anime({
      targets: headingRef.current,
      opacity: [0, 1],
      translateY: [40, 0],
      duration: 800,
      easing: "easeOutExpo",
    });

    anime({
      targets: lineRef.current,
      scaleY: [0, 1],
      duration: 1500,
      easing: "easeInOutExpo",
      delay: 200,
    });
  }, [isInView]);

  return (
    <section
      id="experience"
      className="relative py-32 px-4 md:px-8"
      ref={sectionRef}
    >
      <div className="max-w-5xl mx-auto">
        <div ref={headingRef} className="mb-20" style={{ opacity: 0 }}>
          <p className="font-mono text-neon-purple text-sm tracking-widest mb-2">
            // SECTION_03
          </p>
          <h2 className="text-4xl md:text-5xl font-bold">
            Experience{" "}
            <span className="text-neon-purple text-glow-purple">Timeline</span>
          </h2>
        </div>

        <div className="relative">
          {/* Vertical line */}
          <div
            ref={lineRef}
            className="absolute left-6 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-neon-blue via-neon-purple to-neon-pink origin-top"
            style={{ transform: "scaleY(0)" }}
          />

          {experiences.map((exp, i) => (
            <TimelineCard key={exp.company} exp={exp} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
