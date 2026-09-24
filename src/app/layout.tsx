import type { Metadata, Viewport } from "next";
import { Sofia_Sans, Sofia_Sans_Extra_Condensed } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";

const sofia = Sofia_Sans({
  subsets: ["latin"],
  variable: "--font-sofia",
  display: "swap",
});

// The flap face: every character on every board is set in this.
const sofiaExtraCondensed = Sofia_Sans_Extra_Condensed({
  subsets: ["latin"],
  variable: "--font-sofia-xc",
  display: "swap",
});

const description =
  "Lead QA engineer at PowerSchool building AI agents that write, run, and repair tests: multi-agent QA with Playwright, MCP, and GitHub Copilot agents. Manual QA effort down 80%, zero P0 incidents in 4+ years.";

export const metadata: Metadata = {
  title: "Shantanu Vichare | Lead QA Engineer, AI Quality Engineering",
  description,
  keywords: [
    "Shantanu Vichare",
    "AI quality engineering",
    "Agentic QA",
    "Multi-agent systems",
    "Playwright",
    "MCP",
    "LangChain",
    "n8n",
    "Test automation",
  ],
  authors: [{ name: "Shantanu Vichare" }],
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/apple-icon.svg",
  },
  openGraph: {
    title: "Shantanu Vichare, Lead QA Engineer",
    description,
    type: "profile",
  },
  twitter: {
    card: "summary",
    title: "Shantanu Vichare, Lead QA Engineer",
    description,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#e6e8eb" },
    { media: "(prefers-color-scheme: dark)", color: "#0e1012" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${sofia.variable} ${sofiaExtraCondensed.variable}`}>
      <body>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
