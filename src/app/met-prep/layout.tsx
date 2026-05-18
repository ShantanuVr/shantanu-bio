import type { Metadata } from "next";
import Link from "next/link";
import PrepNav from "./PrepNav";

export const metadata: Metadata = {
  title: "Met Prep · Private",
  description: "Private interview prep workspace.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
};

export default function MetPrepLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#0b0d12] text-[#dde3ea]">
      <header className="sticky top-0 z-30 border-b border-[#1d2330] bg-[#0b0d12]/85 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
          <Link
            href="/met-prep"
            className="font-mono text-sm tracking-wider text-[#7dd3fc] hover:text-white"
          >
            ← met-prep
          </Link>
          <div className="flex items-center gap-3 text-xs text-[#6b7585]">
            <span className="hidden sm:inline">private · noindex</span>
            <a
              href="/ShantanuVichare.pdf"
              download
              className="rounded border border-[#2a3040] bg-[#11151c] px-3 py-1.5 font-mono text-[11px] text-[#7dd3fc] hover:border-[#3a4358] hover:text-white"
            >
              Download Resume.pdf
            </a>
          </div>
        </div>
      </header>
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-8 lg:flex-row">
        <PrepNav />
        <main className="prep-prose min-w-0 flex-1">{children}</main>
      </div>
      <footer className="border-t border-[#1d2330] py-6 text-center font-mono text-[11px] text-[#4d5666]">
        Last refresh: open the next section before the call ·{" "}
        <a href="/ShantanuVichare.pdf" download className="text-[#7dd3fc] hover:text-white">
          Resume.pdf
        </a>
      </footer>
    </div>
  );
}
