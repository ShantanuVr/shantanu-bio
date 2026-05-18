export const metadata = { title: "Resume → answers · Met Prep" };

const mappings: { bullet: string; transformsInto: string; numberToDrop: string }[] = [
  {
    bullet: "Lead QA Engineer for Schoology, 6 years.",
    transformsInto: "Multi-year ownership of a complex SaaS — proves you don't job-hop, and you handle long-tail complexity. Map to Metabase: 'team-of-one CI engineer' is also a long-horizon role.",
    numberToDrop: "Tens of millions of students using Schoology.",
  },
  {
    bullet: "Zero P0 incidents for 4 straight years.",
    transformsInto: "Your strongest reliability claim. Mirrors Vamsi's News Feed reliability axis. Use it in the opener and the 'why Metabase' answer.",
    numberToDrop: "Zero P0 over 4 years.",
  },
  {
    bullet: "70% regression runtime cut via containerised Playwright/WebdriverIO.",
    transformsInto: "Speed-axis story. Connects directly to 'reduce p50 PR cycle time by X%' (your 6-month dashboard target).",
    numberToDrop: "70% regression runtime cut.",
  },
  {
    bullet: "Agentic platform — 80% effort cut, 90%+ first-pass accuracy.",
    transformsInto: "AI-in-CI story. Use it to bridge to Vamsi's claude.yml experiment. 'Here's what worked at scale and what I'd be careful of.'",
    numberToDrop: "55% → 95% regression coverage. Prompts-per-task 15 → 2-3.",
  },
  {
    bullet: "MERN-stack release cockpit, 4h → 15min.",
    transformsInto: "DIRECT ANALOGUE to the four-axis CI dashboard you'll pitch. 'I've shipped this exact shape of tool before.'",
    numberToDrop: "4h → 15min.",
  },
  {
    bullet: "DevSecOps blueprint — OWASP ZAP, Burp, SAST, deps audits as gated CI stages.",
    transformsInto: "Label-gating instinct already proven. 'Same idiom you use for chromatic and pr-env — I'd extend that pattern.'",
    numberToDrop: "30+ vulnerabilities caught pre-prod.",
  },
  {
    bullet: "20+ engineers mentored across 6 squads.",
    transformsInto: "Force-multiplier instinct. 'Even as a team-of-one IC, I think of the role as making 70 engineers measurably faster.'",
    numberToDrop: "20+ engineers, 6 squads.",
  },
  {
    bullet: "MSc AI/ML at LJMU + PGDip at IIIT Bangalore (part-time, 1+ year in).",
    transformsInto: "Continuous learning signal + grounds the agentic-platform work as informed, not opportunistic. Pre-empt: 'factored into a 50-55h week, steady for over a year.'",
    numberToDrop: "1+ year into both.",
  },
  {
    bullet: "FireEye SDET background.",
    transformsInto: "Cybersecurity domain credibility. Useful if security/compliance comes up. Connects to DevSecOps story.",
    numberToDrop: "35% defect reduction at FireEye via instrumentation.",
  },
  {
    bullet: "Quick Heal earlier role.",
    transformsInto: "Foundational. Don't dwell — use as 'cybersecurity domain background' if asked.",
    numberToDrop: "—",
  },
];

const tieIns: { theme: string; lines: string[] }[] = [
  {
    theme: "When asked 'why CI specifically?'",
    lines: [
      "I've spent the last decade making engineering organizations ship more reliably without slowing them down.",
      "The last two years pushed me from 'gatekeeper' to 'force multiplier' — the agentic platform let one person leverage a whole squad.",
      "CI engineering at Metabase is the same shape, scaled to 70 engineers and a 15+ database driver matrix.",
    ],
  },
  {
    theme: "When asked 'what would you change in 90 days?'",
    lines: [
      "Lead with the four-axis dashboard pitch.",
      "Bridge: 'I built this exact shape at PowerSchool — a MERN release cockpit. Same idea, applied to CI metrics.'",
      "Make the bridge explicit: tool I shipped → tool I'd ship at Metabase.",
    ],
  },
  {
    theme: "When asked about AI in CI",
    lines: [
      "Lead with the OpenAPI grounding — the agents can't hallucinate endpoints.",
      "Mention cost discipline (15 → 2-3 prompts).",
      "Then ask about claude.yml: 'Was it triggers, token cost, or politics?'",
      "Don't oversell. 'We got 80%; here's where I'd be careful before rolling it out broadly.'",
    ],
  },
  {
    theme: "When asked about flake / reliability",
    lines: [
      "Lead with zero P0 over 4 years.",
      "Tie it to systemic thinking: I built containerised ephemeral environments precisely to make flake patterns observable.",
      "Map to Metabase: Trunk-mediated quarantine is the same systemic instinct.",
    ],
  },
  {
    theme: "When asked 'why now?'",
    lines: [
      "Positive: agentic platform at PowerSchool is at 80% effort cut; the next step is scale-up across a more diverse codebase.",
      "Specific: Metabase has Clojure AND TypeScript, OSS AND enterprise, 15+ databases. That heterogeneity is what I want next.",
      "Optional: open source matters to me personally.",
      "DO NOT criticize PowerSchool.",
    ],
  },
];

export default function ResumePrep() {
  return (
    <article>
      <div className="mb-2 font-mono text-[11px] uppercase tracking-[0.2em] text-[#a78bfa]">
        Resume-grounded · Mapping
      </div>
      <h1>Each résumé bullet → an interview answer</h1>

      <p>
        The reason this loop has high-stakes leverage is that <strong>your résumé already proves the
          shape Metabase is hiring for.</strong> Your job in the call is to <em>translate</em> the bullets
        into the language Vamsi will recognize.
      </p>

      <h2>The translation table</h2>
      <table>
        <thead>
          <tr>
            <th>Résumé bullet</th>
            <th>Transforms into…</th>
            <th>Number to drop</th>
          </tr>
        </thead>
        <tbody>
          {mappings.map((m, i) => (
            <tr key={i}>
              <td><strong>{m.bullet}</strong></td>
              <td>{m.transformsInto}</td>
              <td><code>{m.numberToDrop}</code></td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Themed tie-ins</h2>
      <p>For each common interview theme, here&apos;s how to weave the résumé in:</p>

      <div className="not-prose mt-4 space-y-4">
        {tieIns.map((t, i) => (
          <section key={i} className="prep-card">
            <h3 className="mb-2 text-[1.05rem] font-semibold text-white">{t.theme}</h3>
            <ul className="ml-5 list-disc space-y-1 text-[15px] leading-relaxed text-[#cfd6df]">
              {t.lines.map((l, j) => (
                <li key={j}>{l}</li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      <h2>The over-arching narrative arc</h2>
      <ol>
        <li><strong>Decade of QA / SDET</strong> — the foundation.</li>
        <li><strong>Last 6 at PowerSchool</strong> — multi-year ownership; zero P0; 70% regression cut.</li>
        <li><strong>Last 2 years: agentic shift</strong> — 80% effort cut; 95% coverage; OpenAPI-grounded.</li>
        <li><strong>The cockpit</strong> — observability instinct; 4h → 15min; the same shape Metabase needs.</li>
        <li><strong>Why Metabase, why now</strong> — heterogeneity, OSS, 70-engineer leverage, the four-axis dashboard.</li>
      </ol>
      <p>
        That&apos;s the story you tell. Five beats. Each one has a number. Each one connects to the next.
      </p>
    </article>
  );
}
