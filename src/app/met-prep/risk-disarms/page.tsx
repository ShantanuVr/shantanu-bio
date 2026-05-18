export const metadata = { title: "Risk disarms · Met Prep" };

const risks: { risk: string; preempt: string; phrasing: string; whenToDeploy: string }[] = [
  {
    risk: "No production Clojure experience",
    preempt: "They will probe this. Don't wait — name it.",
    phrasing: "I haven't shipped Clojure, but I read it well enough to follow mage/src/mage/modules.clj — and the CI surface is mostly YAML, JS, and Bash. My plan for the first month is paired reading with a Clojure engineer for 30 minutes a week until I'm autonomous.",
    whenToDeploy: "Either they ask, or you raise it the moment you hit the language topic. Don't let it surface as a surprise in the panel round.",
  },
  {
    risk: "Cypress unfamiliarity (you use Playwright/WebdriverIO)",
    preempt: "Acknowledge briefly; signal the overlap.",
    phrasing: "Playwright and Cypress overlap ~80% in mental model. The Metabase-specific bits — cypress-split, timings.json, the snapshot pattern in *.cy.snap.js — I've read but haven't worked with. I'd expect a week of ramp-up there.",
    whenToDeploy: "If they ask 'have you used Cypress?' OR if you're discussing the e2e fan-out and want to head off the implicit question.",
  },
  {
    risk: "Bengaluru timezone vs Americas team",
    preempt: "MOST LIKELY DEAL-BREAKER. Get specific, not flexible.",
    phrasing: "I'd commit to a 4-5 hour overlap with US East daily — 6:30 pm to 11:30 pm IST. That catches morning US-East and full day US-West. Async muscle: the MERN cockpit at PowerSchool is proof I ship things that don't require synchronous demos. I'd want to fit into the playbook you've already run for Mumbai/London/Budapest/NY teams, not invent a new one.",
    whenToDeploy: "Either they ask, or you raise it explicitly in the closing 90 seconds. NEVER leave it unaddressed.",
  },
  {
    risk: "No open-source contributions on the resume",
    preempt: "Be honest; frame the gap as motivation.",
    phrasing: "I've worked on closed-source SaaS for a decade. The MSc and PGDip work has been my forcing function for public-facing technical writing; the Metabase role would be my first sustained OSS work, and that's part of the pull.",
    whenToDeploy: "Only if they ask about OSS specifically. Don't volunteer this unless prompted.",
  },
  {
    risk: "Six years at PowerSchool — has it become comfortable?",
    preempt: "Reframe tenure as evolution, not stasis.",
    phrasing: "The role has evolved enough that I've effectively had three different jobs at PowerSchool — Core QA, then AI test tooling lead, now agent platform architect. But yes, the next step is a different shape: stepping out of a 6-squad mentorship structure into a leveraged-solo CI role at an OSS company.",
    whenToDeploy: "Only if directly asked. Vamsi RESPECTS long tenure (10 years at MS himself), so don't assume this is a negative.",
  },
  {
    risk: "QA/SDET background vs CI Engineer role expectation",
    preempt: "Acknowledge the title shift; assert the muscle is the same.",
    phrasing: "The title shift is real — but the muscle isn't 'I gate releases', it's 'I own developer leverage'. The cockpit, the agentic platform, the DevSecOps gates — all of those are CI work in everything but the title. I want to do that explicitly, at scale, in OSS.",
    whenToDeploy: "When they ask 'why are you applying for a CI role with a QA background?' Or pre-empt at the start of the 'why this role?' answer.",
  },
  {
    risk: "Salary / compensation expectations (this is a screening question)",
    preempt: "Don't lock yourself in. Defer with a range.",
    phrasing: "I'd want to understand the full compensation structure — base, equity, location adjustment for India — before naming a number. Happy to share my current range and target range in writing once we know the role's structure.",
    whenToDeploy: "If asked. Defer to email.",
  },
  {
    risk: "Why are you leaving PowerSchool? (negative-framing trap)",
    preempt: "Always positive. Never negative.",
    phrasing: "I've taken the agentic platform from concept to 80% effort reduction at PowerSchool. The next step for me is scaling that muscle across a more diverse codebase — Metabase's mix of Clojure, TypeScript, OSS, enterprise, and a 15+ DB driver matrix is exactly that next problem.",
    whenToDeploy: "Whenever 'why leaving?' surfaces. NEVER mention frustration, comp, management issues — even if true.",
  },
];

export default function RiskDisarms() {
  return (
    <article>
      <div className="mb-2 font-mono text-[11px] uppercase tracking-[0.2em] text-[#a78bfa]">
        Resume-grounded · Pre-emptive disarms
      </div>
      <h1>Risk disarms — name them before they do</h1>

      <p>
        Don&apos;t wait for them to find these. Name them <em>before</em> they do where it&apos;s natural. Vamsi
        explicitly values candidates who self-acknowledge gaps and have a credible bridge — that&apos;s exactly
        the &ldquo;don&apos;t need to check every box&rdquo; pattern from Glassdoor. <strong>The gap that goes unnamed becomes
          the silent rejection reason.</strong>
      </p>

      <div className="not-prose mt-6 space-y-5">
        {risks.map((r, i) => (
          <section key={i} className="prep-card">
            <div className="mb-1 font-mono text-[10px] uppercase tracking-[0.18em] text-[#f87171]">
              Risk
            </div>
            <h3 className="mb-2 text-[1.05rem] font-semibold text-white">{r.risk}</h3>
            <p className="mb-2 text-sm leading-relaxed">
              <strong className="text-[#fbbf24]">Approach:</strong>{" "}
              <span className="text-[#cfd6df]">{r.preempt}</span>
            </p>
            <blockquote className="my-2 border-l-2 border-[#7dd3fc] bg-[#0e131b] px-4 py-3 text-[15px] leading-relaxed text-[#c8d2de]">
              <p>&ldquo;{r.phrasing}&rdquo;</p>
            </blockquote>
            <p className="text-sm leading-relaxed">
              <strong className="text-[#34d399]">When to deploy:</strong>{" "}
              <span className="text-[#aab3c0]">{r.whenToDeploy}</span>
            </p>
          </section>
        ))}
      </div>

      <h2>The general phrasing pattern</h2>
      <ol>
        <li><strong>Name the gap explicitly.</strong> &ldquo;I haven&apos;t X.&rdquo;</li>
        <li><strong>Show what you DO have that&apos;s adjacent.</strong> &ldquo;But I have Y, which gets you most of the way.&rdquo;</li>
        <li><strong>Name the bridge.</strong> &ldquo;In month one I&apos;d Z.&rdquo;</li>
      </ol>
      <p>This three-beat structure works for any gap. Practice it once.</p>
    </article>
  );
}
