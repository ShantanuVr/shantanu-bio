"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { GraduationCap, Award, BookOpen } from "lucide-react";

const certifications = [
  {
    title: "CopilotXcelerate: AI-Powered Python for Data Science",
    issuer: "upGrad",
    year: "2023",
  },
  {
    title: "Certified Ethical Hacker (CEH)",
    issuer: "Simplilearn",
    year: "2019",
  },
  {
    title: "Oracle Certified Expert Database SQL",
    issuer: "Oracle",
    year: "2016",
  },
];

function ProgressBar({ progress, label }: { progress: number; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div ref={ref} className="w-full">
      <div className="flex justify-between mb-2 font-mono text-xs text-foreground/50">
        <span>{label}</span>
        <span className="text-neon-blue">{progress}%</span>
      </div>
      <div className="w-full h-2 bg-surface-light rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={isInView ? { width: `${progress}%` } : {}}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="h-full rounded-full"
          style={{
            background: "linear-gradient(90deg, #00f0ff, #a855f7)",
          }}
        />
      </div>
    </div>
  );
}

export default function Education() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const currentYear = new Date().getFullYear();
  const startYear = 2025;
  const endYear = 2027;
  const mscProgress = Math.min(
    100,
    Math.round(((currentYear - startYear) / (endYear - startYear)) * 100)
  );

  return (
    <section
      id="education"
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
            // SECTION_04
          </p>
          <h2 className="text-4xl md:text-5xl font-bold">
            Education{" "}
            <span className="text-neon-blue text-glow-blue">&</span> Certs
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Education Cards */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="glass rounded-lg p-6"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="p-2 rounded-lg bg-neon-blue/10 border border-neon-blue/20">
                  <GraduationCap className="w-6 h-6 text-neon-blue" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">
                    MSc in Machine Learning & AI
                  </h3>
                  <p className="text-sm text-foreground/50">
                    Liverpool John Moores University • England
                  </p>
                </div>
              </div>
              <ProgressBar
                progress={mscProgress}
                label={`Expected: 2027 • In Progress`}
              />
              <div className="mt-3 font-mono text-xs text-neon-blue/60">
                &gt; status: ACTIVE | loading knowledge_base...
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="glass rounded-lg p-6"
            >
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-lg bg-neon-purple/10 border border-neon-purple/20">
                  <BookOpen className="w-6 h-6 text-neon-purple" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">
                    Bachelor of Engineering in IT
                  </h3>
                  <p className="text-sm text-foreground/50">
                    Shah & Anchor Kutchhi Engineering College • Mumbai
                  </p>
                  <p className="font-mono text-xs text-foreground/30 mt-1">
                    Graduated: 2015
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Certifications */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <div className="flex items-center gap-2 mb-6">
              <Award className="w-5 h-5 text-neon-purple" />
              <p className="font-mono text-neon-purple text-sm">CERTIFICATIONS</p>
            </div>
            <div className="space-y-4">
              {certifications.map((cert, i) => (
                <motion.div
                  key={cert.title}
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.7 + i * 0.15 }}
                  className="glass rounded-lg p-4 group hover:border-neon-purple/30 transition-all duration-300"
                >
                  <h4 className="font-semibold text-sm mb-1">{cert.title}</h4>
                  <div className="flex gap-4 font-mono text-xs text-foreground/40">
                    <span>{cert.issuer}</span>
                    <span className="text-neon-purple">{cert.year}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
