"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import anime from "animejs";
import { Mail, Phone, ExternalLink } from "lucide-react";

function GitHubIcon({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
    </svg>
  );
}

function LinkedInIcon({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  );
}

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
    icon: GitHubIcon,
    label: "GitHub",
    value: "ShantanuVr",
    href: "https://github.com/ShantanuVr",
    color: "#e0e0e8",
  },
  {
    icon: LinkedInIcon,
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
      className="magnetic-icon w-16 h-16 md:w-20 md:h-20 rounded-full glass flex items-center justify-center hover:scale-110 transition-transform duration-200"
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
  const headingRef = useRef<HTMLDivElement>(null);
  const iconsRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);
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

    const icons = iconsRef.current?.querySelectorAll(".magnetic-icon");
    if (icons) {
      anime({
        targets: icons,
        opacity: [0, 1],
        scale: [0, 1],
        duration: 600,
        easing: "easeOutElastic(1, .5)",
        delay: anime.stagger(100, { start: 400 }),
      });
    }

    const cards = cardsRef.current?.querySelectorAll(".contact-card");
    if (cards) {
      anime({
        targets: cards,
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 600,
        easing: "easeOutExpo",
        delay: anime.stagger(100, { start: 800 }),
      });
    }

    anime({
      targets: footerRef.current,
      opacity: [0, 1],
      duration: 800,
      easing: "easeOutQuad",
      delay: 1200,
    });
  }, [isInView]);

  return (
    <section
      id="connect"
      className="relative py-32 px-4 md:px-8"
      ref={sectionRef}
    >
      <div className="max-w-4xl mx-auto text-center">
        <div ref={headingRef} className="mb-16" style={{ opacity: 0 }}>
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
        </div>

        {/* Floating magnetic icons */}
        <div ref={iconsRef} className="flex justify-center gap-6 md:gap-10 mb-16">
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
        </div>

        {/* Contact details */}
        <div ref={cardsRef} className="grid sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
          {socials.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-card glass rounded-lg p-4 flex items-center gap-4 group hover:border-neon-blue/30 transition-all duration-300"
              style={{ opacity: 0 }}
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
            </a>
          ))}
        </div>

        {/* Footer */}
        <div ref={footerRef} className="mt-24 font-mono text-xs text-foreground/20" style={{ opacity: 0 }}>
          <p>
            &gt; designed & built by{" "}
            <span className="text-neon-blue/40">Shantanu Vichare</span> •{" "}
            {new Date().getFullYear()}
          </p>
          <p className="mt-1">
            &gt; powered by Next.js + Three.js + anime.js
          </p>
        </div>
      </div>
    </section>
  );
}
