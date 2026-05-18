export const metadata = { title: "Stories bank · Met Prep" };

const stories: { title: string; useFor: string[]; situation: string; task: string; action: string[]; result: string[]; reflect: string }[] = [
  {
    title: "Story 1 — The agentic platform shift",
    useFor: [
      "Tell me about an ambitious project.",
      "How do you think about AI in dev workflows?",
      "What's a problem nobody asked you to fix?",
    ],
    situation: "Manual QA at PowerSchool was a 4-engineer team running regression for every release. Coverage was at ~55% because writing tests was slower than features were shipping. Token cost on early LLM tooling was unpredictable.",
    task: "I wanted to shift from 'people running tests' to 'agents proposing tests, humans reviewing'. The hard part wasn't the LLM — it was the grounding.",
    action: [
      "Built an AI Context Graph that anchored every agent prompt to live OpenAPI specs — agents couldn't invent endpoints.",
      "Wired Copilot Background Agents as the orchestrator, with Playwright MCP, Browser MCP, and Jira MCP as tools.",
      "Drove prompts-per-task from 15 down to 2-3 by codifying scenario templates instead of free-form prompting.",
      "Set hard cost caps per PR; cancelled jobs that exceeded them and surfaced the failure to the requester.",
    ],
    result: [
      "Manual QA effort cut ~80%.",
      "Regression coverage rose 55% → 95%.",
      "First-pass accuracy on generated tests: 90%+.",
      "Same-day prod ships became routine.",
    ],
    reflect: "What I'd do differently: start with cost caps and grounding from day 1, not after the third quarter. The early month of free-form prompting cost real money before we tightened it. Also: I'd write the failure-mode runbook before the success runbook — agents fail in non-obvious ways, and the team trust depends on knowing why something didn't work.",
  },
  {
    title: "Story 2 — The MERN release cockpit",
    useFor: [
      "Tell me about something you built that nobody asked for.",
      "How do you make engineers around you better?",
      "What's the first thing you'd build at Metabase?",
    ],
    situation: "Schoology releases were a 4-hour ad-hoc checklist split across Bamboo, Jira, Sonar, and a wiki page. Different engineers ran different steps; no two release reports looked the same. We routinely missed steps and discovered them in prod.",
    task: "I wanted to give every release captain — including future me — a single page that said 'are we green?' And I wanted it to update itself.",
    action: [
      "Built a MERN stack tool — Mongo, Express, React, Node.",
      "Pulled CI status from Bamboo, defect counts from Jira, coverage trends from Sonar, build artefact integrity from S3.",
      "Designed it as a 'release captain dashboard' — one URL, four panels.",
      "Wrote the runbook FIRST, then built the tool to match.",
      "Added a 'why is this red?' click-through on every panel — the explainer was as important as the metric.",
    ],
    result: [
      "Release checklist 4h → 15min.",
      "Adoption: every release captain on the team uses it. I'm no longer the only maintainer — 2 other engineers now contribute.",
      "Defect-escape-to-prod dropped measurably.",
    ],
    reflect: "The lesson: a tool that 'only the author can run' is worthless. I built two retros into the rollout — one at week 4, one at week 12 — purely on adoption, not on features. Every feature added was driven by an actual release captain's complaint. That's the discipline I'd carry into the four-axis CI dashboard.",
  },
  {
    title: "Story 3 — A flake pattern, not a flake",
    useFor: [
      "How do you triage a flake spike?",
      "Tell me about systemic thinking.",
      "How do you debug something unfamiliar?",
    ],
    situation: "After a Cypress upgrade, our regression suite started showing 8% flake rate — but only on specific specs, on specific runners, at specific times of day.",
    task: "Default reaction would be 'fix the flaky tests'. I refused that frame and looked for the pattern.",
    action: [
      "Pulled JUnit XML from S3 across 200 runs, classified failures by spec / runner / time-of-day / chunk index.",
      "Found that the failures clustered on 3 runners during the EU morning — when our shared test database was getting heavier traffic from EU dev work.",
      "Hypothesis: app-DB query timeouts under shared-DB load were surfacing as Cypress assertion failures.",
      "Validated by spinning up an isolated test DB for one runner and watching the flake rate drop to 0% on that runner.",
      "Shipped: per-job ephemeral test DB instead of shared. Documented the pattern so the next person doesn't re-discover it.",
    ],
    result: [
      "Flake rate dropped from 8% to <1% within a week.",
      "$ saved: ~12 dev-hours/day reclaimed across the team.",
      "The runbook 'is this a real flake or a shared-resource flake?' is now part of the team's triage SOP.",
    ],
    reflect: "The lesson is the one I keep coming back to: 'flake' is rarely random. Once you treat it as a signal, the pattern is almost always findable. That's the systemic thinking the JD asks for.",
  },
  {
    title: "Story 4 — A CI outage I owned end-to-end",
    useFor: [
      "Worst CI outage you've personally owned.",
      "How do you write a post-mortem?",
      "Tell me about a regulated-process moment.",
    ],
    situation: "Our DAST gate (Burp Suite via OWASP ZAP) blocked merges for ~6 hours one afternoon — a stale CA cert in the gate's container.",
    task: "I owned both the live mitigation and the post-mortem.",
    action: [
      "Detection: an engineer pinged me at 14:00; I saw Bamboo queue depth exploding by 14:05.",
      "Mitigation: added a temporary feature flag to bypass the DAST gate for non-security-sensitive paths, gated by repo label. Got merge throughput back within 30 minutes.",
      "Root cause: the cert bundle in the DAST runner image was 9 months stale; the auto-rebuild job had silently failed twice in a row.",
      "Action items: (a) cache-age alarm on the auto-rebuild job — fail 2x → page; (b) cert pinning explicit in the Dockerfile, not implicit; (c) feature-flag bypass became a documented kill-switch with auth controls.",
      "Wrote the post-mortem within 48 hours. Posted in the eng-wide channel. Invited blame-free critique.",
    ],
    result: [
      "0 recurrences in the 14 months since.",
      "Cache-age alarm pattern got reused on 3 other CI jobs that had similar silent-failure modes.",
      "The post-mortem template I wrote is now the team's SOP.",
    ],
    reflect: "What I'd do differently: I should have pushed for the cache-age alarm 6 months earlier, when I first noticed the auto-rebuild had a silent-failure mode. The lesson: if you spot a foot-gun, file the alarm before the foot is shot. That's exactly the cache-age alarm pitch I'd bring to Metabase.",
  },
  {
    title: "Story 5 — The mentorship multiplier",
    useFor: [
      "How do you make engineers around you better?",
      "Have you scaled yourself through teaching?",
      "What's a soft-skill story you'd tell?",
    ],
    situation: "PowerSchool had 6 engineering squads at one point with no shared QA discipline — each squad reinvented test patterns, each had different definitions of 'flaky', and reports rarely cross-pollinated.",
    task: "Without being asked or formally tasked, I wanted to make the squads talk to each other.",
    action: [
      "Started a 30-minute weekly 'CI office hours' — open to anyone, no agenda.",
      "Wrote 4 short (1-page) runbooks: 'how to triage a flake', 'how to add a regression test', 'how to read Bamboo logs', 'how to add a Jira hook'.",
      "Recorded 5 Loom walkthroughs of common debugging sessions, no editing.",
      "Pair-debugged a flake with a different squad each Friday for 12 weeks straight.",
    ],
    result: [
      "20+ engineers across 6 squads ran through the runbooks at least once.",
      "Cross-squad flake-triage time dropped from days to hours.",
      "Two engineers from other squads started contributing to the cockpit — the tool stopped being mine.",
    ],
    reflect: "The framing I keep coming back to: a CI engineer at a 70-person org is a force multiplier. The math is simple — if I save every engineer 30 minutes per week, that's 35 hours per week reclaimed. That's why this kind of scaffolding work matters at Metabase even more than at PowerSchool.",
  },
];

export default function Stories() {
  return (
    <article>
      <div className="mb-2 font-mono text-[11px] uppercase tracking-[0.2em] text-[#a78bfa]">
        Resume-grounded · Stories bank
      </div>
      <h1>Stories bank — STAR-formatted, ready to deliver</h1>

      <p>
        These are the five stories you must be able to tell without notes. Each is structured
        Situation / Task / Action / Result / Reflection. Each maps to multiple likely interview prompts.
      </p>

      <div className="prep-callout">
        <strong>Delivery rule:</strong> 90 seconds max per story. If they want more, they&apos;ll ask.
        Land on the <strong>reflection</strong> — that&apos;s the part Vamsi will remember.
      </div>

      <div className="not-prose mt-6 space-y-5">
        {stories.map((s, i) => (
          <section key={i} className="prep-card">
            <h3 className="mb-2 text-[1.05rem] font-semibold text-white">{s.title}</h3>
            <div className="mb-3 text-[12px] text-[#aab3c0]">
              <strong className="text-[#fbbf24]">Use for:</strong> {s.useFor.join(" · ")}
            </div>

            <h4 className="mb-1 text-xs uppercase tracking-wider text-[#7dd3fc]">Situation</h4>
            <p className="mb-2 text-[14.5px] leading-relaxed text-[#cfd6df]">{s.situation}</p>

            <h4 className="mb-1 text-xs uppercase tracking-wider text-[#7dd3fc]">Task</h4>
            <p className="mb-2 text-[14.5px] leading-relaxed text-[#cfd6df]">{s.task}</p>

            <h4 className="mb-1 text-xs uppercase tracking-wider text-[#7dd3fc]">Action</h4>
            <ul className="mb-2 ml-5 list-disc space-y-1 text-[14.5px] leading-relaxed text-[#cfd6df]">
              {s.action.map((a, j) => <li key={j}>{a}</li>)}
            </ul>

            <h4 className="mb-1 text-xs uppercase tracking-wider text-[#34d399]">Result</h4>
            <ul className="mb-2 ml-5 list-disc space-y-1 text-[14.5px] leading-relaxed text-[#cfd6df]">
              {s.result.map((r, j) => <li key={j}>{r}</li>)}
            </ul>

            <h4 className="mb-1 text-xs uppercase tracking-wider text-[#fbbf24]">Reflection</h4>
            <p className="text-[14.5px] leading-relaxed text-[#f3d6a3]">{s.reflect}</p>
          </section>
        ))}
      </div>
    </article>
  );
}
