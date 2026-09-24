"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { person } from "@/content/profile";
import { getLenis } from "@/lib/scroll";
import { FlapLink } from "@/components/flap/FlapButton";
import FlapLine from "@/components/flap/FlapLine";

const LINKS = [
  { id: "lab", label: "Lab" },
  { id: "experience", label: "Experience" },
  { id: "education", label: "Education" },
] as const;

// Sections without their own nav entry light up the entry they belong to.
const OWNER: Record<string, string | null> = {
  hero: null,
  lab: "lab",
  results: "lab",
  toolkit: "lab",
  experience: "experience",
  education: "education",
  connect: null,
};

export default function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const firstLink = useRef<HTMLAnchorElement>(null);
  const sentinel = useRef<HTMLSpanElement>(null);

  // The bar picks up its ground once the top of the page scrolls out from under it.
  useEffect(() => {
    const el = sentinel.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setScrolled(!entry.isIntersecting));
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(OWNER[entry.target.id] ?? null);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    Object.keys(OWNER).forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;
    const trigger = menuButton.current;
    const lenis = getLenis();
    lenis?.stop();
    document.documentElement.style.overflow = "hidden";
    firstLink.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
      lenis?.start();
      trigger?.focus();
    };
  }, [open]);

  return (
    <>
    <span ref={sentinel} className="nav-sentinel" aria-hidden="true" />
    <header className="site-nav" data-scrolled={scrolled || open}>
      <nav className="container-page nav-inner" aria-label="Primary">
        <a href="#hero" className="nav-brand" onClick={() => setOpen(false)}>
          Shantanu Vichare
        </a>
        <div className="nav-links">
          {LINKS.map((link) => (
            <a key={link.id} href={`#${link.id}`} className="nav-link" aria-current={active === link.id ? "true" : undefined}>
              {link.label}
            </a>
          ))}
          <a href={person.resume} className="nav-link nav-link-out" target="_blank" rel="noopener noreferrer">
            Resume
            <ArrowUpRight aria-hidden="true" size={15} strokeWidth={2} />
            <span className="sr-only">, PDF, opens in a new tab</span>
          </a>
          <FlapLink size="sm" variant="primary" href={`mailto:${person.email}`} label={`Email me at ${person.email}`}>
            Email me
          </FlapLink>
        </div>
        <button
          ref={menuButton}
          type="button"
          className="nav-menu-button"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X aria-hidden="true" size={20} /> : <Menu aria-hidden="true" size={20} />}
          <span>{open ? "Close" : "Menu"}</span>
        </button>
      </nav>

      {open && (
        <div id="mobile-menu" className="mobile-menu on-board" data-lenis-prevent>
          <ul className="mobile-menu-list">
            {LINKS.map((link, i) => (
              <li key={link.id}>
                <a
                  ref={i === 0 ? firstLink : undefined}
                  href={`#${link.id}`}
                  className="mobile-menu-link"
                  onClick={() => setOpen(false)}
                >
                  <FlapLine text={link.label} cells={10} delay={60 + i * 70} stagger={22} srText={link.label} enter />
                </a>
              </li>
            ))}
          </ul>
          <div className="mobile-menu-actions">
            <FlapLink variant="primary" href={`mailto:${person.email}`} label={`Email me at ${person.email}`}>
              Email me
            </FlapLink>
            <FlapLink href={person.resume} label="Resume, PDF, opens in a new tab" external>
              Resume
              <ArrowUpRight aria-hidden="true" size={18} strokeWidth={2} />
            </FlapLink>
          </div>
        </div>
      )}
    </header>
    </>
  );
}
