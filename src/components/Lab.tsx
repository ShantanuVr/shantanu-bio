"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import {
  Brain,
  Bot,
  Workflow,
  Zap,
  Target,
  GitBranch,
} from "lucide-react";

function AnimatedCounter({
  from,
  to,
  duration = 2,
  suffix = "",
  prefix = "",
}: {
  from: number;
  to: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
}) {
  const [count, setCount] = useState(from);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isInView) return;
    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = (Date.now() - startTime) / (duration * 1000);
      if (elapsed >= 1) {
        setCount(to);
        clearInterval(interval);
      } else {
        setCount(Math.round(from + (to - from) * elapsed));
      }
    }, 30);
    return () => clearInterval(interval);
  }, [isInView, from, to, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}{count}{suffix}
    </span>
  );
}

const bentoItems = [
  {
    icon: Brain,
    title: "AI Context Graph",
    description:
      "Innovative Context Graph system leveraging internal API documentation and test suites to anchor AI models. Eliminates hallucinations — complete accuracy on first try.",
    color: "neon-blue",
    span: "md:col-span-2",
  },
  {
    icon: Bot,
    title: "Multi-Agent Ecosystems",
    description:
      "Playwright, Browser & Jira MCPs managed by n8n + Anthropic/OpenAI for seamless E2E test creation and automated ticket management.",
    color: "neon-purple",
    span: "md:col-span-1",
  },
  {
    icon: Workflow,
    title: "Autonomous API Testing",
    description:
      "Agent-driven approach using OpenAPI specs, Playwright, and Agentic Workflows to automate creation, validation, and execution of API tests.",
    color: "neon-pink",
    span: "md:col-span-1",
  },
  {
    icon: GitBranch,
    title: "CI/CD & DevOps",
    description:
      "Resilient Bamboo, GitLab & GitHub pipelines with integrated quality gates that block problematic code.",
    color: "neon-blue",
    span: "md:col-span-1",
  },
  {
    icon: Zap,
    title: "Full-Stack Tooling",
    description:
      "Custom MERN stack internal release tool automating manual release checklists, dramatically speeding deployment cycles.",
    color: "neon-purple",
    span: "md:col-span-1",
  },
];

const skills = [
  "Python",
  "TypeScript",
  "Playwright",
  "MCP",
  "Cursor",
  "n8n",
  "Selenium",
  "PHP",
  "RAG",
  "Claude Code",
  "Jira",
  "BDD",
  "JMeter",
  "WDIO",
  "Anthropic",
  "OpenAI",
];

function GlitchSkill({ name }: { name: string }) {
  const [isHovered, setIsHovered] = useState(false);
  const [display, setDisplay] = useState(name);

  useEffect(() => {
    if (!isHovered) {
      setDisplay(name);
      return;
    }
    const chars = "!@#$%^&*()_+-=[]{}|;:,.<>?";
    let frame = 0;
    const interval = setInterval(() => {
      frame++;
      if (frame > 8) {
        setDisplay(name);
        clearInterval(interval);
        return;
      }
      setDisplay(
        name
          .split("")
          .map((char, i) =>
            i < frame ? char : chars[Math.floor(Math.random() * chars.length)]
          )
          .join("")
      );
    }, 50);
    return () => clearInterval(interval);
  }, [isHovered, name]);

  return (
    <motion.div
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ scale: 1.05 }}
      className="px-4 py-2 border border-border bg-surface font-mono text-sm text-foreground/70 hover:text-neon-blue hover:border-neon-blue/50 transition-colors cursor-default relative overflow-hidden group"
    >
      <span className="relative z-10">{display}</span>
      {isHovered && (
        <motion.div
          className="absolute inset-0 bg-neon-blue/5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        />
      )}
    </motion.div>
  );
}

export default function Lab() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section id="lab" className="relative py-32 px-4 md:px-8" ref={sectionRef}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <p className="font-mono text-neon-purple text-sm tracking-widest mb-2">
            // SECTION_02
          </p>
          <h2 className="text-4xl md:text-5xl font-bold">
            The <span className="text-neon-blue text-glow-blue">Lab</span>
          </h2>
        </motion.div>

        {/* Efficiency Slider */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="glass rounded-lg p-8 md:p-12 mb-16"
        >
          <div className="flex items-center gap-3 mb-6">
            <Target className="w-5 h-5 text-neon-blue" />
            <p className="font-mono text-neon-blue text-sm">
              EFFICIENCY_METRICS
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 items-center">
            <div className="text-center">
              <p className="text-5xl md:text-6xl font-bold text-foreground/30 line-through decoration-neon-pink/50">
                <AnimatedCounter from={0} to={15} suffix="" />
              </p>
              <p className="font-mono text-sm text-foreground/40 mt-2">
                prompts_before
              </p>
            </div>

            <div className="flex flex-col items-center gap-4">
              <div className="w-full h-2 bg-surface-light rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: "100%" }}
                  animate={isInView ? { width: "20%" } : {}}
                  transition={{ duration: 2, delay: 0.5, ease: "easeOut" }}
                  className="h-full rounded-full"
                  style={{
                    background:
                      "linear-gradient(90deg, #a855f7, #00f0ff)",
                  }}
                />
              </div>
              <p className="text-4xl font-bold text-neon-blue text-glow-blue">
                <AnimatedCounter from={0} to={80} suffix="%" />
              </p>
              <p className="font-mono text-xs text-foreground/50">
                workload_reduction
              </p>
            </div>

            <div className="text-center">
              <p className="text-5xl md:text-6xl font-bold text-neon-blue text-glow-blue">
                <AnimatedCounter from={15} to={2} suffix="-3" />
              </p>
              <p className="font-mono text-sm text-foreground/40 mt-2">
                prompts_after
              </p>
            </div>
          </div>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid md:grid-cols-3 gap-4 mb-16">
          {bentoItems.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 + i * 0.1 }}
              className={`glass rounded-lg p-6 group hover:border-${item.color}/50 transition-all duration-300 ${item.span}`}
            >
              <item.icon
                className={`w-8 h-8 text-${item.color} mb-4 group-hover:animate-pulse`}
              />
              <h3 className="text-lg font-bold mb-2">{item.title}</h3>
              <p className="text-sm text-foreground/50 leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Skills Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <p className="font-mono text-neon-purple text-sm tracking-widest mb-6">
            // SKILL_MATRIX
          </p>
          <div className="flex flex-wrap gap-3">
            {skills.map((skill) => (
              <GlitchSkill key={skill} name={skill} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
