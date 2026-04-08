"use client";

import { useEffect, useRef } from "react";
import anime from "animejs";
import dynamic from "next/dynamic";
import { ChevronDown } from "lucide-react";

const HeroScene = dynamic(() => import("./HeroScene"), { ssr: false });

function StaggeredText({
  text,
  className,
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  const containerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const chars = containerRef.current.querySelectorAll(".char");
    anime({
      targets: chars,
      opacity: [0, 1],
      translateY: [50, 0],
      rotateX: [90, 0],
      easing: "easeOutExpo",
      duration: 1200,
      delay: (_, i) => delay + i * 40,
    });
  }, [delay]);

  return (
    <span ref={containerRef} className={className} style={{ display: "inline-block" }}>
      {text.split("").map((char, i) => (
        <span
          key={i}
          className="char"
          style={{
            display: "inline-block",
            opacity: 0,
            whiteSpace: char === " " ? "pre" : undefined,
          }}
        >
          {char}
        </span>
      ))}
    </span>
  );
}

function TypewriterLine({ text, delay = 0 }: { text: string; delay?: number }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    el.textContent = "";
    let i = 0;
    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        if (i < text.length) {
          el.textContent += text[i];
          i++;
        } else {
          clearInterval(interval);
        }
      }, 35);
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(timeout);
  }, [text, delay]);

  return (
    <span ref={ref} className="font-mono text-neon-blue text-sm md:text-base tracking-[0.3em] uppercase" />
  );
}

export default function Hero() {
  const subtitleRef = useRef<HTMLDivElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const chevronRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = anime.timeline({ easing: "easeOutExpo" });

    tl.add({
      targets: subtitleRef.current,
      opacity: [0, 1],
      translateY: [30, 0],
      duration: 1000,
    }, 1400)
      .add({
        targets: statusRef.current,
        opacity: [0, 0.6],
        translateY: [20, 0],
        duration: 800,
      }, 1800)
      .add({
        targets: ctaRef.current?.querySelectorAll("a"),
        opacity: [0, 1],
        translateY: [20, 0],
        scale: [0.9, 1],
        duration: 800,
        delay: anime.stagger(150),
      }, 2000)
      .add({
        targets: chevronRef.current,
        opacity: [0, 1],
        duration: 600,
      }, 2400);

    anime({
      targets: chevronRef.current,
      translateY: [0, 12, 0],
      duration: 2000,
      easing: "easeInOutSine",
      loop: true,
      delay: 2600,
    });
  }, []);

  return (
    <section
      id="hero"
      className="relative h-screen w-full flex items-center justify-center overflow-hidden scanline-overlay"
    >
      <HeroScene />

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background z-[5]" />

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <div className="mb-4">
          <TypewriterLine text="> initializing context_hub..." delay={200} />
        </div>

        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-4">
          <StaggeredText text="SHANTANU" className="text-foreground" delay={600} />{" "}
          <StaggeredText text="VICHARE" className="text-neon-blue text-glow-blue" delay={900} />
        </h1>

        <div ref={subtitleRef} className="flex flex-col items-center gap-3" style={{ opacity: 0 }}>
          <p className="text-xl md:text-2xl text-foreground/70 font-light">
            Lead SDET{" "}
            <span className="text-neon-purple">&</span> AI Quality Engineering Pioneer
          </p>
        </div>

        <div ref={statusRef} className="mt-3 font-mono text-sm text-foreground/40 flex items-center justify-center gap-2" style={{ opacity: 0 }}>
          <span className="inline-block w-2 h-2 rounded-full bg-neon-blue animate-pulse" />
          <span>10+ years of engineering excellence</span>
          <span className="text-neon-purple">@</span>
          <span className="text-neon-blue">PowerSchool</span>
        </div>

        <div ref={ctaRef} className="mt-8 flex gap-4 justify-center">
          <a
            href="#lab"
            className="px-6 py-3 border border-neon-blue/50 text-neon-blue font-mono text-sm hover:bg-neon-blue/10 transition-all duration-300 hover:border-neon-blue border-glow-blue"
            style={{ opacity: 0 }}
          >
            [ EXPLORE_LAB ]
          </a>
          <a
            href="#connect"
            className="px-6 py-3 border border-neon-purple/50 text-neon-purple font-mono text-sm hover:bg-neon-purple/10 transition-all duration-300 hover:border-neon-purple"
            style={{ opacity: 0 }}
          >
            [ CONNECT ]
          </a>
        </div>
      </div>

      <div ref={chevronRef} className="absolute bottom-8 z-10" style={{ opacity: 0 }}>
        <ChevronDown className="w-6 h-6 text-neon-blue/60" />
      </div>
    </section>
  );
}
