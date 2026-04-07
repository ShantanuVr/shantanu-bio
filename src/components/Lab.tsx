"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState, useCallback } from "react";
import anime from "animejs";
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
  duration = 2000,
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
  const animated = useRef(false);

  useEffect(() => {
    if (!isInView || animated.current) return;
    animated.current = true;
    const obj = { val: from };
    anime({
      targets: obj,
      val: to,
      round: 1,
      duration,
      easing: "easeOutExpo",
      update: () => setCount(obj.val),
    });
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

function GlitchSkill({ name, index }: { name: string; index: number }) {
  const [isHovered, setIsHovered] = useState(false);
  const [display, setDisplay] = useState(name);
  const skillRef = useRef<HTMLDivElement>(null);
  const sectionInView = useInView(skillRef, { once: true, margin: "-50px" });
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!sectionInView || hasAnimated.current || !skillRef.current) return;
    hasAnimated.current = true;
    anime({
      targets: skillRef.current,
      opacity: [0, 1],
      translateY: [20, 0],
      translateX: [-10, 0],
      duration: 600,
      easing: "easeOutExpo",
      delay: index * 60,
    });
  }, [sectionInView, index]);

  const handleHover = useCallback(() => {
    setIsHovered(true);
    if (!skillRef.current) return;
    anime({
      targets: skillRef.current,
      scale: [1, 1.08, 1.04],
      duration: 400,
      easing: "easeOutElastic(1, .6)",
    });
  }, []);

  const handleLeave = useCallback(() => {
    setIsHovered(false);
    if (!skillRef.current) return;
    anime({
      targets: skillRef.current,
      scale: [1.04, 1],
      duration: 300,
      easing: "easeOutQuad",
    });
  }, []);

  useEffect(() => {
    if (!isHovered) {
      setDisplay(name);
      return;
    }
    const chars = "!@#$%^&*()_+-=[]{}|;:,.<>?0123456789";
    let frame = 0;
    const interval = setInterval(() => {
      frame++;
      if (frame > 10) {
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
    }, 40);
    return () => clearInterval(interval);
  }, [isHovered, name]);

  return (
    <div
      ref={skillRef}
      onMouseEnter={handleHover}
      onMouseLeave={handleLeave}
      className="px-4 py-2 border border-border bg-surface font-mono text-sm text-foreground/70 hover:text-neon-blue hover:border-neon-blue/50 transition-colors cursor-default relative overflow-hidden group"
      style={{ opacity: 0 }}
    >
      <span className="relative z-10">{display}</span>
      <div
        className="absolute inset-0 bg-neon-blue/5 transition-opacity duration-200"
        style={{ opacity: isHovered ? 1 : 0 }}
      />
      <div
        className="absolute bottom-0 left-0 h-[2px] bg-neon-blue transition-all duration-300"
        style={{ width: isHovered ? "100%" : "0%" }}
      />
    </div>
  );
}

function BentoCard({
  item,
  index,
}: {
  item: (typeof bentoItems)[number];
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-80px" });
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isInView || hasAnimated.current || !cardRef.current) return;
    hasAnimated.current = true;
    anime({
      targets: cardRef.current,
      opacity: [0, 1],
      translateY: [40, 0],
      scale: [0.95, 1],
      duration: 800,
      easing: "easeOutExpo",
      delay: index * 120,
    });
  }, [isInView, index]);

  const handleHover = useCallback(() => {
    if (!cardRef.current) return;
    anime({
      targets: cardRef.current,
      translateY: -4,
      duration: 300,
      easing: "easeOutQuad",
    });
    const icon = cardRef.current.querySelector(".bento-icon");
    if (icon) {
      anime({
        targets: icon,
        rotate: [0, 10, -10, 5, 0],
        duration: 600,
        easing: "easeOutElastic(1, .6)",
      });
    }
  }, []);

  const handleLeave = useCallback(() => {
    if (!cardRef.current) return;
    anime({
      targets: cardRef.current,
      translateY: 0,
      duration: 400,
      easing: "easeOutQuad",
    });
  }, []);

  return (
    <div
      ref={cardRef}
      onMouseEnter={handleHover}
      onMouseLeave={handleLeave}
      className={`glass rounded-lg p-6 group hover:border-${item.color}/50 transition-all duration-300 ${item.span}`}
      style={{ opacity: 0 }}
    >
      <item.icon
        className={`bento-icon w-8 h-8 text-${item.color} mb-4`}
      />
      <h3 className="text-lg font-bold mb-2">{item.title}</h3>
      <p className="text-sm text-foreground/50 leading-relaxed">
        {item.description}
      </p>
    </div>
  );
}

export default function Lab() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const metricsRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
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
      targets: metricsRef.current,
      opacity: [0, 1],
      translateY: [50, 0],
      duration: 1000,
      easing: "easeOutExpo",
      delay: 300,
    });

    if (progressRef.current) {
      anime({
        targets: progressRef.current,
        width: ["100%", "20%"],
        duration: 2500,
        easing: "easeInOutExpo",
        delay: 800,
      });
    }
  }, [isInView]);

  return (
    <section id="lab" className="relative py-32 px-4 md:px-8" ref={sectionRef}>
      <div className="max-w-6xl mx-auto">
        <div ref={headingRef} className="mb-20" style={{ opacity: 0 }}>
          <p className="font-mono text-neon-purple text-sm tracking-widest mb-2">
            // SECTION_02
          </p>
          <h2 className="text-4xl md:text-5xl font-bold">
            The <span className="text-neon-blue text-glow-blue">Lab</span>
          </h2>
        </div>

        {/* Efficiency Slider */}
        <div
          ref={metricsRef}
          className="glass rounded-lg p-8 md:p-12 mb-16"
          style={{ opacity: 0 }}
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
                <div
                  ref={progressRef}
                  className="h-full rounded-full"
                  style={{
                    width: "100%",
                    background: "linear-gradient(90deg, #a855f7, #00f0ff)",
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
        </div>

        {/* Bento Grid */}
        <div className="grid md:grid-cols-3 gap-4 mb-16">
          {bentoItems.map((item, i) => (
            <BentoCard key={item.title} item={item} index={i} />
          ))}
        </div>

        {/* Skills Grid */}
        <div>
          <p className="font-mono text-neon-purple text-sm tracking-widest mb-6">
            // SKILL_MATRIX
          </p>
          <div className="flex flex-wrap gap-3">
            {skills.map((skill, i) => (
              <GlitchSkill key={skill} name={skill} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
