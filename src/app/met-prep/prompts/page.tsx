export const metadata = { title: "Likely Q&A · Met Prep" };

const qa: { q: string; testing: string; answer: string[]; trap?: string }[] = [
  {
    q: "Walk me through what happens when an engineer pushes a PR that changes a Cypress spec.",
    testing: "Can you narrate the full pipeline without flailing? Trivia probe disguised as walkthrough.",
    answer: [
      "run-tests.yml triggers on pull_request.",
      "files-changed runs dorny/paths-filter against .github/file-paths.yaml. Touching only e2e/**/*.cy.spec.* matches e2e_specs (subset of e2e_all). e2e_specs_files == e2e_all_files → e2e-tests is called with specs: <changed_files_csv> and skip: false.",
      "uberjar runs first; check-existing-artifacts likely finds the EE+OSS jars on that commit (note SKIP_LICENSES: true on PRs).",
      "e2e-tests.yml calls e2e-matrix-builder. Because specs is a CSV, build-e2e-matrix.js makes ceil(N/5) chunks of up to 5 specs each — no mongo / python / oss-subset specials.",
      "Each chunk runs e2e-test.yml: docker compose for postgres/mysql/mongo/maildev/openldap/webhook/snowplow on fixed ports, fetch jar, install Chrome 144, snapshot DB, run Cypress.",
      "JUnit goes to S3 + Trunk. Trunk decides job result.",
      "On failure, Re-run Flaky Workflows doesn't trigger (master/release/backport only), so the developer manually re-runs. On rerun, only previously-failed specs run.",
    ],
  },
  {
    q: "How would you triage a sudden spike in e2e flakes?",
    testing: "Systemic flake thinking — patterns over single fixes.",
    answer: [
      "Trunk first, not GitHub. Filter by spec, time window, variant.",
      "Cross-reference S3 archive at $DATE/$RUN_ID/$RUN_ATTEMPT/ for raw JUnit — Trunk hides some signal.",
      "Group failures by chunk index. If only chunk-37 fails, suspect ordering / inter-spec races.",
      "Check recent update-e2e-timings.yml PRs — bad timings re-skew cypress-split, over-pack chunks past the 40-min job timeout, surfaces as fake timeouts.",
      "Check cache-generator.yml last successful run — stale cache produces non-deterministic deps. The principle 'the cache is never wrong' means you fix builds, not poke the cache.",
      "Check Docker images that landed recently in e2e/test/scenarios/docker-compose.yml — maildev / openldap / snowplow micro version drift is classic.",
      "Use e2e-stress-test-flake-fix.yml with burn_in: 20 against the suspect spec on master before shipping a fix; again on branch to confirm.",
      "Communicate continuously in #engineering-ci. Async, written, with links — exactly what the JD asks for.",
    ],
  },
  {
    q: "Tell me about the database test matrix.",
    testing: "Comfort across app-db vs driver matrix; can you parse mage's decision logic?",
    answer: [
      "App DB tests (Postgres / MySQL / MariaDB) run in app-db.yml using GH services: containers (not docker compose), partitioned 2 ways via :partition/total 2 :partition/index 0|1.",
      "Driver tests are gated by mage -driver-decisions. Priority order: global skip → PR labels (ci:run-all-drivers, ci:run-<driver>) → quarantine list (live JSON from metabase/ci-test-config, overridable via break-quarantine-<driver>) → master/release runs everything → driver-deps-affected (Clojure module dep graph).",
      "Cloud drivers (Athena, BigQuery, Snowflake, Redshift, Databricks, Vertica) need credentials via secrets and run on a smaller schedule.",
      "Conflict signal: driver quarantined AND PR touches its module → <driver>-quarantine-conflict=true → 'Fail on quarantine conflict' step prints actionable error.",
    ],
  },
  {
    q: "What would you improve in the first 90 days?",
    testing: "Have you read the repo? Can you prioritize? Did you bring the cost-literate framing he wants?",
    answer: [
      "Pick ONE and commit. Don't list five.",
      "Lead pitch: a four-axis observability dashboard — speed (PR cycle time), reliability (master green %), efficiency ($/PR), engagement (engineer NPS on CI). Public to the eng org. Bridge: I built the same thing at PowerSchool (4h → 15min release cockpit).",
      "Why this first: it informs every other prioritization. Without it, every other improvement is a guess.",
      "Backup ideas (if probed): quarantine observability dashboard from ci-test-config.json; smarter e2e auto-retry classified by failure reason; cache-age alarms; per-chunk telemetry beyond test runtimes (setup time, compile-cljs time).",
    ],
    trap: "Don't pitch the moonshot first (e.g. self-hosted runner overhaul). Vamsi values pragmatism over purity.",
  },
  {
    q: "What does CI engineering at a 70-person OSS company look like to you, vs QA at PowerSchool?",
    testing: "Can you pivot from 'I gate releases' to 'I own developer leverage'?",
    answer: [
      "Acknowledge the shift explicitly: at PowerSchool the customer is the end-user; at Metabase the customer is the engineer pushing code.",
      "What transfers: observability and prioritization muscle — the cockpit, dashboards, defect-flow telemetry I built.",
      "What's new: treating engineer NPS / cycle time as first-class metrics, not side effects.",
      "Tie it to his News Feed framing: speed, reliability, efficiency, engagement.",
    ],
    trap: "Never say 'QA and CI are basically the same'. He'll close the call.",
  },
  {
    q: "You're in Bengaluru. The team is distributed across the Americas. How do you make that work?",
    testing: "Most likely deal-breaker question.",
    answer: [
      "Concrete plan: 4-5 hour daily overlap with US East — say 6:30 pm to 11:30 pm IST. Catches morning US-East and full day US-West.",
      "Async muscle: point to the MERN release cockpit as proof I ship things that don't require synchronous demos.",
      "Reference his own background: 'You've run teams across Mumbai, London, Budapest, NY for a decade — I assume the playbook exists; I'd want to fit, not invent.'",
    ],
    trap: "Don't be vague ('I'm flexible'). Be specific about hours and protocol.",
  },
  {
    q: "Tell me about the agentic platform you built.",
    testing: "Have you been past the hype? He shipped claude.yml and killed it 23 days later.",
    answer: [
      "Anchor: AI Context Graph + Copilot Background Agents + Playwright/Browser/Jira MCPs. 90%+ first-pass accuracy. 55% → 95% regression coverage. 80% manual effort cut.",
      "The grounding was the hard part — anchor to OpenAPI specs so the LLM couldn't invent endpoints.",
      "Cost discipline — prompts-per-task went 15 → 2-3, predictable $/PR.",
      "Honest failure: name ONE thing that didn't work — agents producing tests that passed but tested the wrong invariant. Or: token cost spiking when the spec was ambiguous.",
      "Map to Metabase: 'I noticed your Claude Code workflow shipped July, removed three weeks later. I'm curious which part broke — was it triggers, token cost, or the politics of an agent commenting on every PR?'",
    ],
    trap: "Don't oversell. He'll respect 'we got 80%; here's where I'd be careful' over 'AI solved everything'.",
  },
  {
    q: "What's the worst CI outage you've personally owned?",
    testing: "Post-mortem maturity. He came up through 10 years of finance regulatory work.",
    answer: [
      "Pick ONE specific incident with numbers — Bamboo pipeline meltdown / DAST gate blocking merges for a day / similar.",
      "SRE structure: detection → mitigation → root cause → action items → what you'd do differently.",
      "Quantify blast radius (how many PRs blocked, how long, $ impact).",
      "Mention audit trail / repeatability / prevention — he'll viscerally appreciate it.",
    ],
    trap: "Don't blame teammates or 'the tool'. Own the systemic gap that let it happen.",
  },
  {
    q: "How would you say no to an engineer who wants their flaky test marked as quarantined immediately?",
    testing: "Process maturity. Are you a gatekeeper or a system?",
    answer: [
      "Be the system, not the gatekeeper.",
      "Default 14-day expiry on every quarantine entry.",
      "Owning team attached to the entry.",
      "Aging-out report surfaces in the team's review queue.",
      "Soft no with a process, not a hard no with an opinion.",
    ],
  },
  {
    q: "How do you balance cost against developer velocity?",
    testing: "His specialty. He saved $2B at FB. Be concrete.",
    answer: [
      "Instrument GH Actions minutes per workflow weekly, plot vs PRs merged, look at $/PR.",
      "If cost grows faster than throughput, target the biggest workflow first — likely the 50-way e2e split.",
      "Tactics: drop chunks during low-risk hours, use spot/self-hosted runners for non-blocking jobs, reuse uberjar artifacts more aggressively (the codebase already does this by SHA — extend the principle to docker images and snowplow micro).",
    ],
  },
  {
    q: "How do you stay current technically while leading a team?",
    testing: "Growth signal + that the MSc isn't going to burn you out.",
    answer: [
      "Honest: MSc AI/ML at LJMU + PGDip at IIIT Bangalore, both part-time, both already a year in.",
      "Practical: the agentic platform was a by-product of that learning, not separate.",
      "Time budget: explicitly factored into a 50-55 hour week, steady for over a year.",
    ],
    trap: "Don't downplay or oversell the degrees. They're evidence, not a distraction.",
  },
  {
    q: "What do you do when you're stuck?",
    testing: "Async-first thinking. Don't say 'I ask my manager'.",
    answer: [
      "Write up what I've tried in a doc.",
      "Post to the right Slack channel with explicit ask + context + a deadline.",
      "Set a 24h timer.",
      "Parallelize with a fallback path.",
    ],
  },
  {
    q: "How do you make engineers around you better?",
    testing: "Force-multiplier instinct. CI engineer leverages 70 people — that's the whole job.",
    answer: [
      "Post-mortems and runbooks that are educational, not just informational.",
      "Office hours / Loom walkthroughs for new infra.",
      "Pair-debug a flake with a different team member each time.",
      "Frame it as: 'Even as an IC, I think of the role as force multiplication.'",
    ],
  },
  {
    q: "Anything we haven't covered that you want me to know?",
    testing: "Self-edit signal. Do you ramble or land two crisp beats?",
    answer: [
      "Pick TWO short beats. Stop.",
      "Beat 1: DevSecOps blueprint at PowerSchool — OWASP ZAP, Burp, SAST, dependency audits as gated CI stages — caught 30+ vulns pre-prod. Same label-gating idiom Metabase uses for chromatic / pr-env. I'd extend that pattern.",
      "Beat 2: Mentored 20+ engineers across 6 squads. Team-of-one CI engineer at a 70-person org is fundamentally a force-multiplier role; I've done that math before.",
    ],
    trap: "Don't list five more things.",
  },
];

export default function Prompts() {
  return (
    <article>
      <div className="mb-2 font-mono text-[11px] uppercase tracking-[0.2em] text-[#7dd3fc]">
        Conversation fuel · Likely Q&amp;A
      </div>
      <h1>Likely interview prompts &amp; answer scaffolds</h1>

      <p>
        Each prompt has: <strong>what they&apos;re testing → the answer beats → traps to avoid</strong>. Don&apos;t
        memorize verbatim. Memorize the beats; let the words come fresh.
      </p>

      <div className="prep-callout">
        <strong>Default to brief.</strong> Each answer should land in 60-90 seconds with one concrete number,
        then stop. Let them probe.
      </div>

      <div className="not-prose mt-6 space-y-5">
        {qa.map((item, i) => (
          <section key={i} className="prep-card">
            <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#7dd3fc]">
              Prompt {i + 1}
            </div>
            <h3 className="mt-1 mb-2 text-[1.05rem] font-semibold text-white">{item.q}</h3>
            <p className="mb-2 text-sm text-[#aab3c0]">
              <strong className="text-[#fbbf24]">Testing:</strong> {item.testing}
            </p>
            <div className="mb-1 text-xs uppercase tracking-wider text-[#34d399]">Answer beats</div>
            <ul className="ml-5 list-disc space-y-1 text-[15px] leading-relaxed text-[#cfd6df]">
              {item.answer.map((a, j) => (
                <li key={j}>{a}</li>
              ))}
            </ul>
            {item.trap && (
              <div className="mt-3 rounded border-l-2 border-[#f87171] bg-[#170808] px-3 py-2 text-sm text-[#fbcaca]">
                <strong>Trap:</strong> {item.trap}
              </div>
            )}
          </section>
        ))}
      </div>
    </article>
  );
}
