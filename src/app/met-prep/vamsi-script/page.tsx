export const metadata = { title: "Vamsi · 30-min script · Met Prep" };

const questions: { q: string; testing: string; anchor: string; beats: string[]; trap: string }[] = [
  {
    q: "Q1. Walk me through the release cockpit you built at PowerSchool.",
    testing: "Can you build dev-facing observability, not just QA dashboards?",
    anchor: "MERN-stack release tool. 4h → 15min checklist. Unifies CI + defect + test-coverage telemetry across Bamboo, Jira, Sonar.",
    beats: [
      "Problem: release checklists were ad-hoc, fragmented across Bamboo / Jira / Sonar.",
      "Approach: unified API layer pulling from all three plus build artefacts.",
      "Result: 4h → 15min, plus an adoption story — how many releases per quarter use it, who else maintains it, what I'd change if doing again.",
      "Map to Metabase: this becomes my week-one proposal — same cockpit applied to the four-axis framing (speed/reliability/efficiency/engagement). Say so explicitly.",
    ],
    trap: "Don't make it sound bespoke and unmaintained. Vamsi sniffs out tools that 'only the author can run'.",
  },
  {
    q: "Q2. Tell me about the agentic platform. What worked, what didn't.",
    testing: "Have you been past the hype? He shipped claude.yml and killed it 23 days later.",
    anchor: "AI Context Graph + Copilot Background Agents + Playwright/Browser/Jira MCPs. 90%+ first-pass accuracy. 55% → 95% regression coverage.",
    beats: [
      "Grounding was the hard part — anchoring to OpenAPI specs so the LLM couldn't invent endpoints.",
      "Cost discipline — prompts-per-task went 15 → 2-3, predictable $/PR.",
      "Honest failure: name ONE thing that didn't work — agents producing tests that passed but tested the wrong invariant. Or token cost spiking when the spec was ambiguous.",
      "Map to Metabase: 'I noticed your Claude Code workflow shipped July, removed three weeks later. I'm curious which part broke — was it triggers, token cost, or politics of an agent commenting on every PR?'",
    ],
    trap: "Do not oversell. He'll respect 'we got 80%; here's where I'd be careful' over 'AI solved everything'.",
  },
  {
    q: "Q3. What does CI engineering at a 70-person OSS company look like vs QA at PowerSchool?",
    testing: "Can you pivot from 'I gate releases' to 'I own developer leverage'?",
    anchor: "This is the most important answer. You currently gate releases. Metabase needs you to accelerate engineers — CI is a product, not a checkpoint.",
    beats: [
      "Acknowledge the shift explicitly: at PowerSchool the customer is the end-user; at Metabase the customer is the engineer pushing code.",
      "What transfers: observability and prioritization muscle — the cockpit, dashboards, defect-flow telemetry I built.",
      "What's new: treating engineer NPS / cycle time as first-class metrics, not side effects.",
      "Tie it to his News Feed framing: speed, reliability, efficiency, engagement.",
    ],
    trap: "Never say 'QA and CI are basically the same'. He'll close the call.",
  },
  {
    q: "Q4. You've been at PowerSchool six years. Why now? Why Metabase?",
    testing: "Anti job-hopper signal already passes. He's testing for a clear positive reason, not a frustration push.",
    anchor: "Positive: agentic platform is at 80% effort reduction; the next step is scale-up across a more diverse codebase.",
    beats: [
      "Specific: Metabase's CI is unusual — Clojure AND TypeScript, OSS AND enterprise, 15+ database driver matrix. That heterogeneity is what I want to work on next.",
      "Optional one-line on open source mattering personally.",
    ],
    trap: "Never criticize PowerSchool. He spent 10 years at Morgan Stanley — he respects long tenures.",
  },
  {
    q: "Q5. You're in Bengaluru. Team distributed across the Americas. How do you make it work?",
    testing: "MOST LIKELY DEAL-BREAKER QUESTION. Get it right and the rest is downhill.",
    anchor: "Concrete plan: 4-5 hour overlap with US East daily — 6:30 pm to 11:30 pm IST.",
    beats: [
      "That window catches morning US-East and full day US-West.",
      "Async muscle: point to the MERN cockpit as proof I ship things that don't require synchronous demos.",
      "Reference his own background: 'You've run teams across Mumbai, London, Budapest, NY for a decade — I assume the playbook exists; I'd want to fit, not invent.'",
    ],
    trap: "Don't be vague ('I'm flexible'). Be specific about hours and the protocol.",
  },
  {
    q: "Q6. What's the first thing you'd change about Metabase's CI in 90 days?",
    testing: "Have you actually read the repo, or are you bluffing?",
    anchor: "Pick ONE and commit. Best candidate for you: the four-axis observability dashboard.",
    beats: [
      "I've done this twice — at PowerSchool's release cockpit and at FireEye where we instrumented a 35% defect reduction.",
      "Model: one URL, one source of truth, public to the eng org.",
      "Use Vamsi's News Feed framing explicitly: speed, reliability, efficiency, engagement.",
    ],
    trap: "Don't pitch the moonshot first (e.g. self-hosted runner overhaul). Vamsi values pragmatism over purity.",
  },
  {
    q: "Q7. Show me you can read this. (He shares his screen with a workflow file.)",
    testing: "Can you parse unfamiliar GHA / Clojure / TS quickly?",
    anchor: "Narrate as you read.",
    beats: [
      "'OK, this is a reusable workflow called by run-tests.yml, runs on workflow_call, the matrix has X axes...'",
      "'I notice continue-on-error: true on the test step — that's the Trunk integration pattern, real exit code comes from the uploader.'",
      "'The thing I'd want to verify is...'",
    ],
    trap: "Don't go silent. Don't pretend to know. Reading aloud + naming what you'd Google later is the right move.",
  },
  {
    q: "Q8. How do you stay current technically while leading a team?",
    testing: "Growth signal + that the MSc isn't going to burn you out.",
    anchor: "MSc AI/ML at LJMU + PGDip at IIIT Bangalore, both part-time, both already a year in.",
    beats: [
      "The agentic platform was a by-product of that learning, not separate.",
      "Time budget: factored into a 50-55 hour week, steady for over a year.",
    ],
    trap: "Don't downplay or oversell the degrees. Treat as evidence, not distraction.",
  },
  {
    q: "Q9. What's the worst CI outage you've personally owned?",
    testing: "Post-mortem maturity. He came up through 10 years of finance regulatory work.",
    anchor: "Pick one specific incident with numbers — Bamboo meltdown / DAST gate blocking merges / similar.",
    beats: [
      "SRE structure: detection → mitigation → root cause → action items → what you'd do differently.",
      "Quantify blast radius (PRs blocked, duration, $ impact).",
      "Mention audit trail / repeatability / prevention.",
    ],
    trap: "Don't blame teammates. Don't blame the tool. Own the systemic gap that let it happen.",
  },
  {
    q: "Q10. Anything we haven't covered that you want me to know?",
    testing: "Self-edit signal.",
    anchor: "Two short beats. Stop.",
    beats: [
      "Beat 1: DevSecOps blueprint at PowerSchool — OWASP ZAP, Burp, SAST, dependency audits as gated CI stages — caught 30+ vulns pre-prod. Same label-gating idiom Metabase uses for chromatic / pr-env. I'd extend that pattern.",
      "Beat 2: Mentored 20+ engineers across 6 squads. Team-of-one CI engineer at 70-person org is a force-multiplier role; I've done that math before.",
    ],
    trap: "Don't list five more things.",
  },
];

export default function VamsiScript() {
  return (
    <article>
      <div className="mb-2 font-mono text-[11px] uppercase tracking-[0.2em] text-[#fbbf24]">
        The Vamsi Round · Tactical script
      </div>
      <h1>The 30-min Vamsi call — question-by-question</h1>

      <h2>How he&apos;ll run the clock</h2>
      <ul>
        <li><strong>0-3 min:</strong> logistics, small talk, &ldquo;tell me about yourself&rdquo;.</li>
        <li><strong>3-10 min:</strong> your background, 2-3 deep follow-ups on whatever he found interesting.</li>
        <li><strong>10-22 min:</strong> a concrete exercise / scenario — debug a workflow, walk through how you&apos;d approach a CI problem, or react to a real Metabase artifact.</li>
        <li><strong>22-28 min:</strong> your questions for him.</li>
        <li><strong>28-30 min:</strong> wrap, next steps.</li>
      </ul>

      <div className="prep-callout">
        <strong>Default to brief.</strong> Each answer 60-90 seconds, with one concrete number, then stop.
        He has run this drill across 4 timezones for a decade. He expects crisp, factual, structured.
      </div>

      <div className="not-prose mt-6 space-y-5">
        {questions.map((item, i) => (
          <section key={i} className="prep-card">
            <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#fbbf24]">
              Likely question
            </div>
            <h3 className="mt-1 mb-2 text-[1.05rem] font-semibold text-white">{item.q}</h3>
            <p className="mb-2 text-sm">
              <strong className="text-[#fbbf24]">Testing:</strong>{" "}
              <span className="text-[#cfd6df]">{item.testing}</span>
            </p>
            <p className="mb-2 text-sm">
              <strong className="text-[#a78bfa]">Anchor:</strong>{" "}
              <span className="text-[#cfd6df]">{item.anchor}</span>
            </p>
            <div className="mb-1 text-xs uppercase tracking-wider text-[#34d399]">Beats</div>
            <ul className="ml-5 list-disc space-y-1 text-[15px] leading-relaxed text-[#cfd6df]">
              {item.beats.map((b, j) => (
                <li key={j}>{b}</li>
              ))}
            </ul>
            <div className="mt-3 rounded border-l-2 border-[#f87171] bg-[#170808] px-3 py-2 text-sm text-[#fbcaca]">
              <strong>Trap:</strong> {item.trap}
            </div>
          </section>
        ))}
      </div>

      <h2>The closing move (90 seconds)</h2>
      <p>When he says &ldquo;we&apos;re at time&rdquo;, take 20 seconds — don&apos;t skip this:</p>
      <blockquote>
        <p>
          &ldquo;Thanks Vamsi. Two quick things before we wrap. First, I&apos;d like to send you a one-page write-up
          tonight on how I&apos;d approach the four-axis CI dashboard in the first 90 days — based on what you
          said about [the specific axis he named in Q1]. Second, on the timezone — I&apos;d commit to a 5-hour
          overlap with US East starting day one, and I&apos;m happy to put that in writing. Looking forward to
          next steps.&rdquo;
        </p>
      </blockquote>

      <h2>Three things this closing does at once</h2>
      <ol>
        <li>Closes the loop on his biggest implicit doubt (timezone) without prompting.</li>
        <li>Gives you a written deliverable to send within 24 hours — proof of async ownership.</li>
        <li>Frames you as the kind of person who acts without being asked — the JD&apos;s stated north star.</li>
      </ol>

      <p>
        Then send the one-pager that night. Markdown, 1 page, headed &ldquo;CI 4-Axis Dashboard — 90-day plan&rdquo;,
        with sections: <strong>What I&apos;d measure / Where the data lives today / What I&apos;d ship in week 1, week 4,
          week 12 / Open questions for you.</strong>
      </p>
    </article>
  );
}
