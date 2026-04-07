"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { ChevronDown } from "lucide-react";

const HeroScene = dynamic(() => import("./HeroScene"), { ssr: false });

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative h-screen w-full flex items-center justify-center overflow-hidden scanline-overlay"
    >
      <HeroScene />

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background z-[5]" />

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <p className="font-mono text-neon-blue text-sm md:text-base tracking-[0.3em] uppercase mb-4">
            &gt; initializing context_hub...
          </p>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-4"
        >
          <span className="text-foreground">SHANTANU</span>{" "}
          <span className="text-neon-blue text-glow-blue">VICHARE</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col items-center gap-3"
        >
          <p className="text-xl md:text-2xl text-foreground/70 font-light">
            AI Automation Architect{" "}
            <span className="text-neon-purple">&</span> QA Leader
          </p>
          <div className="font-mono text-sm text-foreground/40 flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-neon-blue animate-pulse" />
            <span>11 years of engineering excellence</span>
            <span className="text-neon-purple">@</span>
            <span className="text-neon-blue">PowerSchool</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="mt-8 flex gap-4 justify-center"
        >
          <a
            href="#lab"
            className="px-6 py-3 border border-neon-blue/50 text-neon-blue font-mono text-sm hover:bg-neon-blue/10 transition-all duration-300 hover:border-neon-blue border-glow-blue"
          >
            [ EXPLORE_LAB ]
          </a>
          <a
            href="#connect"
            className="px-6 py-3 border border-neon-purple/50 text-neon-purple font-mono text-sm hover:bg-neon-purple/10 transition-all duration-300 hover:border-neon-purple"
          >
            [ CONNECT ]
          </a>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 z-10"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-6 h-6 text-neon-blue/60" />
        </motion.div>
      </motion.div>
    </section>
  );
}
