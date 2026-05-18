import Link from "next/link";

const groups = [
  {
    title: "Read first (15 min)",
    color: "#7dd3fc",
    items: [
      { href: "/met-prep/cheat-sheet", label: "60-second cheat sheet", desc: "Memorize this. The full prep distilled to one page." },
      { href: "/met-prep/architecture", label: "CI mental model", desc: "How run-tests.yml fans out. The diagram you must own." },
      { href: "/met-prep/vocabulary", label: "Vocabulary", desc: "Uberjar, mage, Trunk, cypress-split, bb, CLJS, etc." },
    ],
  },
  {
    title: "The Vamsi round (priority)",
    color: "#fbbf24",
    items: [
      { href: "/met-prep/vamsi", label: "Profile + signals", desc: "Career arc, what he optimizes for, his commits." },
      { href: "/met-prep/vamsi-script", label: "30-min tactical script", desc: "Question-by-question scaffolds, anchored to your resume." },
      { href: "/met-prep/opener", label: "90-sec opener", desc: "The 4-beat opening you'll deliver." },
      { href: "/met-prep/ask-vamsi", label: "Questions to ask him", desc: "3 picks, in order. Lead with the four-axis one." },
    ],
  },
  {
    title: "Resume-grounded answers",
    color: "#a78bfa",
    items: [
      { href: "/met-prep/resume", label: "Resume highlights", desc: "What's on the PDF. Quick recall." },
      { href: "/met-prep/resume-prep", label: "Resume → answers", desc: "Each bullet mapped to interview talking points." },
      { href: "/met-prep/risk-disarms", label: "Risk disarms", desc: "Clojure, Cypress, Bengaluru TZ, OSS, tenure." },
      { href: "/met-prep/stories", label: "Stories bank (STAR)", desc: "Ready-to-tell stories with numbers." },
    ],
  },
  {
    title: "System deep dives",
    color: "#34d399",
    items: [
      { href: "/met-prep/e2e", label: "E2E fan-out", desc: "build-e2e-matrix.js, 50 chunks, retries, cypress-split." },
      { href: "/met-prep/drivers", label: "Driver matrix", desc: "mage -driver-decisions priority chain, quarantine repo." },
      { href: "/met-prep/build-cache", label: "Build & caching", desc: "Uberjar by SHA, cache immutability, weekly keys." },
      { href: "/met-prep/release", label: "Release pipeline", desc: "Release 0/2/3, backports, scheduled cuts." },
      { href: "/met-prep/flake", label: "Flake & quarantine", desc: "Trunk, S3 archive, dry-run on drafts/forks." },
    ],
  },
  {
    title: "Conversation fuel",
    color: "#f472b6",
    items: [
      { href: "/met-prep/prompts", label: "Likely Q&A", desc: "10+ prompts with structured answers." },
      { href: "/met-prep/improvements", label: "90-day proposals", desc: "5 concrete pitches. Pick one, commit." },
      { href: "/met-prep/trivia", label: "Bash/GHA trivia", desc: "continue-on-error, restore-only cache, OIDC, merge_group." },
      { href: "/met-prep/product", label: "Product primer", desc: "What Metabase actually is. Don't sound like an outsider." },
      { href: "/met-prep/process", label: "Loop & process intel", desc: "Glassdoor patterns mapped to CI Engineer loop." },
    ],
  },
  {
    title: "Day-of",
    color: "#22d3ee",
    items: [
      { href: "/met-prep/checklist", label: "Day-of checklist", desc: "Tabs to open, things to rehearse, energy notes." },
    ],
  },
];

export default function MetPrepIndex() {
  return (
    <article>
      <div className="mb-2 font-mono text-[11px] uppercase tracking-[0.2em] text-[#7dd3fc]">
        Private · Interview · Metabase CI Engineer
      </div>
      <h1>Tomorrow you walk in prepared.</h1>
      <p className="text-[#aab3c0]">
        This is your single-page workspace for the Metabase CI Engineer loop. Skim the index below.
        Read top-to-bottom on Day 1, then re-read the &ldquo;1 hour before&rdquo; column the morning of each call.
      </p>

      <div className="prep-callout">
        <strong>Strategy:</strong> the gap your resume signals — agentic platforms, observability cockpit,
        80%+ effort cut — is exactly Metabase&apos;s next CI step. Lead with that. Don&apos;t over-recite YAML;
        Vamsi has shipped some of it. Show ownership, not memorization.
      </div>

      <div className="not-prose mt-6 grid gap-5">
        {groups.map((g) => (
          <section
            key={g.title}
            className="prep-card"
            style={{ borderLeft: `3px solid ${g.color}` }}
          >
            <h3
              className="mb-2 font-mono text-[11px] uppercase tracking-[0.2em]"
              style={{ color: g.color }}
            >
              {g.title}
            </h3>
            <ul className="space-y-1.5">
              {g.items.map((it) => (
                <li key={it.href}>
                  <Link
                    href={it.href}
                    className="group flex flex-col rounded px-2 py-1.5 hover:bg-[#0e131b] sm:flex-row sm:items-baseline sm:gap-3"
                  >
                    <span className="text-[15px] font-medium text-white group-hover:text-[#7dd3fc]">
                      {it.label}
                    </span>
                    <span className="text-[13px] text-[#838d9c]">{it.desc}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      <hr />

      <h2>Hard rules for tomorrow</h2>
      <ul>
        <li><strong>Lead with the gap, not the recital.</strong> Vamsi wrote pieces of this CI. He&apos;ll smell BS in over-explanation.</li>
        <li><strong>Numbers, every time.</strong> 70% regression cut, 80% effort reduction, zero P0 over 4 years, 4h → 15min release checklist.</li>
        <li><strong>Pick one improvement, commit to it.</strong> Don&apos;t list five. The four-axis observability dashboard is your strongest pitch.</li>
        <li><strong>Async-first phrasing.</strong> &ldquo;I&apos;d post in #engineering-ci with X, Y, Z.&rdquo; Not &ldquo;I&apos;d ping someone.&rdquo;</li>
        <li><strong>Pre-empt timezone.</strong> &ldquo;5h overlap with US East from day one — happy to put it in writing.&rdquo;</li>
        <li><strong>Close the loop.</strong> Promise a one-pager that night. Send it.</li>
      </ul>
    </article>
  );
}
