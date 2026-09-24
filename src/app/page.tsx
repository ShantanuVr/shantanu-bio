import { person } from "@/content/profile";
import SiteNav from "@/components/SiteNav";
import Hero from "@/components/hero/Hero";
import Lab from "@/components/sections/Lab";
import Results from "@/components/sections/Results";
import Toolkit from "@/components/sections/Toolkit";
import Experience from "@/components/sections/Experience";
import Education from "@/components/sections/Education";
import Connect from "@/components/sections/Connect";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: person.name,
  url: person.url,
  jobTitle: "Lead Quality Assurance Engineer",
  worksFor: { "@type": "Organization", name: "PowerSchool" },
  email: `mailto:${person.email}`,
  sameAs: [person.linkedin, person.github],
  knowsAbout: [
    "AI quality engineering",
    "Multi-agent systems",
    "Playwright",
    "Model Context Protocol",
    "LangChain",
    "Test automation",
    "DevSecOps",
  ],
  alumniOf: [
    { "@type": "CollegeOrUniversity", name: "Liverpool John Moores University" },
    { "@type": "CollegeOrUniversity", name: "IIIT Bangalore" },
  ],
};

export default function Home() {
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <SiteNav />
      <main id="main">
        <Hero />
        <Lab />
        <Results />
        <Toolkit />
        <Experience />
        <Education />
        <Connect />
      </main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
    </>
  );
}
