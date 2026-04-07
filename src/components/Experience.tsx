"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Terminal, Shield, Bug } from "lucide-react";

const experiences = [
  {
    title: "Lead Quality Assurance Engineer",
    company: "PowerSchool",
    period: "November 2020 — Present",
    location: "Bengaluru",
    icon: Terminal,
    color: "#00f0ff",
    highlights: [
      "Zero P0 production incidents over 6 years on Schoology product",
      "Developed AI Context Graph Architecture for hallucination-free test generation",
      "Autonomous API Testing with Playwright MCPs and Agentic Workflows",
      "80% reduction in human workload via focused context delivery",
      "Multi-Agent Ecosystems with n8n, Anthropic/OpenAI integration",
      "Custom MERN stack release tool automating deployment checklists",
    ],
  },
  {
    title: "Software Development Engineer in Test",
    company: "FireEye",
    period: "March 2018 — November 2020",
    location: "Bengaluru",
    icon: Shield,
    color: "#a855f7",
    highlights: [
      "Built UI and security testing frameworks from scratch",
      "Pioneered E2E test automation with Python and Nosetests",
      "Rigorous manual, feature, and regression testing under Agile",
      "Cross-functional collaboration resolving intricate software bugs",
      "Leveraged Python, Selenium, and Robot Framework expertise",
    ],
  },
  {
    title: "Associate Threat Research Engineer",
    company: "QuickHeal Technologies",
    period: "August 2015 — March 2018",
    location: "Pune",
    icon: Bug,
    color: "#f472b6",
    highlights: [
      "Lead customer escalations with root cause analysis for security breaches",
      "Malware analysis, threat intelligence, and security blog authorship",
      "Created custom tools for automated workflows eliminating manual work",
      "Daily testing of Malware Engines and product features",
      "Ideated new security features incorporated into Quick Heal products",
    ],
  },
];

function DecryptText({ text, delay = 0 }: { text: string; delay?: number }) {
  const [display, setDisplay] = useState("");
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";

  useEffect(() => {
    if (!isInView) return;
    const timeout = setTimeout(() => {
      let frame = 0;
      const interval = setInterval(() => {
        frame++;
        const revealed = Math.min(frame, text.length);
        setDisplay(
          text.substring(0, revealed) +
            text
              .substring(revealed)
              .split("")
              .map(() => chars[Math.floor(Math.random() * chars.length)])
              .join("")
        );
        if (revealed >= text.length) clearInterval(interval);
      }, 40);
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(timeout);
  }, [isInView, text, delay, chars]);

  return (
    <span ref={ref} className="font-mono">
      {display || text.replace(/./g, "█")}
    </span>
  );
}

export default function Experience() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      id="experience"
      className="relative py-32 px-4 md:px-8"
      ref={sectionRef}
    >
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <p className="font-mono text-neon-purple text-sm tracking-widest mb-2">
            // SECTION_03
          </p>
          <h2 className="text-4xl md:text-5xl font-bold">
            Experience{" "}
            <span className="text-neon-purple text-glow-purple">Timeline</span>
          </h2>
        </motion.div>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-neon-blue via-neon-purple to-neon-pink" />

          {experiences.map((exp, i) => {
            const Icon = exp.icon;
            return (
              <motion.div
                key={exp.company}
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.2 }}
                className="relative pl-16 md:pl-20 pb-16 last:pb-0 group"
              >
                {/* Node */}
                <div
                  className="absolute left-3 md:left-5 w-7 h-7 rounded-full flex items-center justify-center border-2 bg-background z-10 transition-all duration-500 group-hover:scale-125"
                  style={{
                    borderColor: exp.color,
                    boxShadow: `0 0 10px ${exp.color}40, 0 0 20px ${exp.color}20`,
                  }}
                >
                  <Icon className="w-3.5 h-3.5" style={{ color: exp.color }} />
                </div>

                {/* Content */}
                <div className="glass rounded-lg p-6 hover:border-[var(--neon-blue)]/30 transition-all duration-300">
                  <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 mb-4">
                    <h3 className="text-lg font-bold">
                      <DecryptText text={exp.title} delay={300 + i * 200} />
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
                      <motion.li
                        key={j}
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : {}}
                        transition={{ delay: 0.5 + i * 0.2 + j * 0.05 }}
                        className="text-sm text-foreground/60 flex gap-3"
                      >
                        <span className="text-neon-blue mt-1 shrink-0">▹</span>
                        {h}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
