"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Mail, Phone, ExternalLink, Globe, Link } from "lucide-react";

const socials = [
  {
    icon: Mail,
    label: "Email",
    value: "vichare.shantanu@gmail.com",
    href: "mailto:vichare.shantanu@gmail.com",
    color: "#00f0ff",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+91 9673993987",
    href: "tel:+919673993987",
    color: "#a855f7",
  },
  {
    icon: Globe,
    label: "GitHub",
    value: "ShantanuVr",
    href: "https://github.com/ShantanuVr",
    color: "#e0e0e8",
  },
  {
    icon: Link,
    label: "LinkedIn",
    value: "Shantanu Vichare",
    href: "https://www.linkedin.com/in/shantanuvichare/",
    color: "#0077b5",
  },
];

function MagneticIcon({
  children,
  href,
  color,
}: {
  children: React.ReactNode;
  href: string;
  color: string;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const x = (e.clientX - centerX) * 0.3;
    const y = (e.clientY - centerY) * 0.3;
    setPosition({ x, y });
  };

  const handleMouseLeave = () => setPosition({ x: 0, y: 0 });

  return (
    <motion.a
      ref={ref}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      className="w-16 h-16 md:w-20 md:h-20 rounded-full glass flex items-center justify-center hover:scale-110 transition-transform duration-200"
      style={{
        boxShadow: `0 0 0px ${color}00`,
      }}
      whileHover={{
        boxShadow: `0 0 20px ${color}40, 0 0 40px ${color}20`,
      }}
    >
      {children}
    </motion.a>
  );
}

export default function Connect() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      id="connect"
      className="relative py-32 px-4 md:px-8"
      ref={sectionRef}
    >
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="font-mono text-neon-purple text-sm tracking-widest mb-2">
            // SECTION_05
          </p>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Let&apos;s{" "}
            <span className="text-neon-blue text-glow-blue">Connect</span>
          </h2>
          <p className="text-foreground/50 max-w-md mx-auto">
            Open to collaboration on AI-driven QA innovations, multi-agent
            systems, and automation architecture.
          </p>
        </motion.div>

        {/* Floating magnetic icons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex justify-center gap-6 md:gap-10 mb-16"
        >
          {socials.map((social) => (
            <MagneticIcon
              key={social.label}
              href={social.href}
              color={social.color}
            >
              <social.icon
                className="w-6 h-6 md:w-8 md:h-8"
                style={{ color: social.color }}
              />
            </MagneticIcon>
          ))}
        </motion.div>

        {/* Contact details */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="grid sm:grid-cols-2 gap-4 max-w-2xl mx-auto"
        >
          {socials.map((social, i) => (
            <motion.a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6 + i * 0.1 }}
              className="glass rounded-lg p-4 flex items-center gap-4 group hover:border-neon-blue/30 transition-all duration-300"
            >
              <social.icon
                className="w-5 h-5 shrink-0"
                style={{ color: social.color }}
              />
              <div className="text-left flex-1 min-w-0">
                <p className="font-mono text-xs text-foreground/40">
                  {social.label}
                </p>
                <p className="text-sm text-foreground/70 truncate">
                  {social.value}
                </p>
              </div>
              <ExternalLink className="w-4 h-4 text-foreground/20 group-hover:text-neon-blue transition-colors shrink-0" />
            </motion.a>
          ))}
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1 }}
          className="mt-24 font-mono text-xs text-foreground/20"
        >
          <p>
            &gt; designed & built by{" "}
            <span className="text-neon-blue/40">Shantanu Vichare</span> •{" "}
            {new Date().getFullYear()}
          </p>
          <p className="mt-1">
            &gt; powered by Next.js + Three.js + Framer Motion
          </p>
        </motion.div>
      </div>
    </section>
  );
}
