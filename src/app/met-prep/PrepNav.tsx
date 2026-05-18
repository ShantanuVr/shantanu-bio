"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const sections: { title: string; items: { href: string; label: string }[] }[] = [
  {
    title: "Quick Drills",
    items: [
      { href: "/met-prep", label: "Index" },
      { href: "/met-prep/cheat-sheet", label: "60-sec cheat sheet" },
      { href: "/met-prep/checklist", label: "Day-of checklist" },
    ],
  },
  {
    title: "The System",
    items: [
      { href: "/met-prep/architecture", label: "CI mental model" },
      { href: "/met-prep/e2e", label: "E2E fan-out" },
      { href: "/met-prep/drivers", label: "Driver matrix" },
      { href: "/met-prep/build-cache", label: "Build & caching" },
      { href: "/met-prep/release", label: "Release pipeline" },
      { href: "/met-prep/flake", label: "Flake & quarantine" },
    ],
  },
  {
    title: "Talking Points",
    items: [
      { href: "/met-prep/vocabulary", label: "Vocabulary" },
      { href: "/met-prep/prompts", label: "Likely Q&A" },
      { href: "/met-prep/improvements", label: "90-day proposals" },
      { href: "/met-prep/trivia", label: "Bash/GHA trivia" },
    ],
  },
  {
    title: "The Vamsi Round",
    items: [
      { href: "/met-prep/vamsi", label: "Profile + signals" },
      { href: "/met-prep/vamsi-script", label: "30-min tactical script" },
      { href: "/met-prep/opener", label: "90-sec opener" },
      { href: "/met-prep/ask-vamsi", label: "Questions to ask him" },
    ],
  },
  {
    title: "Resume-Grounded",
    items: [
      { href: "/met-prep/resume", label: "Resume highlights" },
      { href: "/met-prep/resume-prep", label: "Resume → answers" },
      { href: "/met-prep/risk-disarms", label: "Risk disarms" },
      { href: "/met-prep/stories", label: "Stories bank (STAR)" },
    ],
  },
  {
    title: "Context",
    items: [
      { href: "/met-prep/product", label: "Product primer" },
      { href: "/met-prep/process", label: "Loop & process intel" },
    ],
  },
];

export default function PrepNav() {
  const pathname = usePathname();
  return (
    <aside className="lg:w-60 lg:shrink-0">
      <nav className="lg:sticky lg:top-20 lg:max-h-[calc(100vh-6rem)] lg:overflow-y-auto pr-2">
        {sections.map((section) => (
          <div key={section.title} className="mb-5">
            <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.18em] text-[#5b6573]">
              {section.title}
            </div>
            <ul className="space-y-0.5">
              {section.items.map((item) => {
                const active = pathname === item.href;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`block rounded px-2 py-1.5 text-sm transition-colors ${
                        active
                          ? "bg-[#15202b] text-[#7dd3fc]"
                          : "text-[#aab3c0] hover:bg-[#11161e] hover:text-white"
                      }`}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  );
}
