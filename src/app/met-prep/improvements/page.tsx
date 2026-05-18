export const metadata = { title: "90-day proposals · Met Prep" };

const ideas: { title: string; pitch: string; why: string; risk: string }[] = [
  {
    title: "Four-axis CI dashboard (LEAD WITH THIS)",
    pitch: "Single public URL showing speed (PR cycle time), reliability (master green %), efficiency ($/PR via GH minutes), engagement (engineer NPS). Mirrors Vamsi's News Feed framing.",
    why: "Without it, every other prioritization is a guess. I built the same thing at PowerSchool — a MERN release cockpit that compressed a 4h checklist into 15 min. This is a direct port of muscle I've already built.",
    risk: "Don't over-engineer. Day-1 should be one URL with three or four metrics; iterate weekly based on what engineers actually use.",
  },
  {
    title: "Quarantine observability (the second pitch)",
    pitch: "Scheduled job that reads ci-test-config.json, posts a weekly Slack digest in #engineering-ci listing all currently-quarantined drivers + how long each has been quarantined. Auto-escalate entries past N days.",
    why: "The current system depends on a remote JSON file in a separate repo with no audit trail. Quarantines drift permanent. Vamsi has personally shipped this kind of unglamorous plumbing (auto-request-review token swap, backport-label reminders).",
    risk: "Frame as observability, not policy. Don't try to set quarantine SLAs in the same PR — that's a separate conversation.",
  },
  {
    title: "Smarter e2e auto-retry classification",
    pitch: "rerun-workflows.yml retries master/release/backport once. A flaky external dep (DockerHub rate-limit, snowplow micro version drift) often kills master. Classify failure reasons — docker pull error vs test assertion vs network — and apply different retry policies.",
    why: "Direct $-saving. One bad master morning costs the whole eng org commit velocity for half a day. The classification logic is dozens of lines.",
    risk: "Don't retry assertion failures more aggressively — that hides real bugs. Retry only infrastructure-class failures.",
  },
  {
    title: "Cache-age alarms",
    pitch: "If cache-generator.yml fails twice consecutively, fire a #engineering-ci alert. Currently every CI run pays the cold-cache cost silently when the generator is broken.",
    why: "Trivial implementation. Saves dozens of dev-hours per quiet week. Echoes the cache-immutability principle Metabase already takes seriously.",
    risk: "None real. The alert should have a clear runbook — who fixes, by when.",
  },
  {
    title: "Per-chunk telemetry (setup time, not just test time)",
    pitch: "e2e timings currently capture only spec runtime. Also capture: 'Prepare Docker containers', 'Compile CLJS', 'Run Metabase' setup phases. Spot drift in non-test phases that today shows up as flake noise.",
    why: "Setup-phase regressions today look like flakes; they're actually environmental drift. Distinguishing them is high-leverage.",
    risk: "Storage cost of more telemetry — manage with a 30-day retention policy on the new fields.",
  },
  {
    title: "Backport CI cost reduction",
    pitch: "auto-backport.yml opens up to 3 PRs and each triggers a full run-tests.yml. For label-only changes (e.g. cherry-pick of a docs PR), use merge_group: to bundle them.",
    why: "Backports often touch identical code; running full e2e + drivers on each is wasteful. Verify before pitching — but the math looks favorable.",
    risk: "Verify behavior on a real backport PR before proposing. Don't pitch as 'definitely works' — pitch as 'I'd want to validate this in week 2'.",
  },
];

export default function Improvements() {
  return (
    <article>
      <div className="mb-2 font-mono text-[11px] uppercase tracking-[0.2em] text-[#7dd3fc]">
        Conversation fuel · Improvements
      </div>
      <h1>90-day improvement proposals</h1>

      <div className="prep-callout">
        <strong>Pick ONE and commit.</strong> Don&apos;t list five. The four-axis CI dashboard is your strongest
        opening because it sets up every subsequent prioritization. Have backups in your pocket if probed,
        but always lead with the dashboard.
      </div>

      <div className="not-prose mt-6 space-y-4">
        {ideas.map((idea, i) => (
          <section key={i} className="prep-card">
            <div className="mb-1 font-mono text-[10px] uppercase tracking-[0.18em] text-[#a78bfa]">
              Pitch #{i + 1}
            </div>
            <h3 className="mb-2 text-[1.05rem] font-semibold text-white">{idea.title}</h3>
            <p className="mb-2 text-[15px] leading-relaxed text-[#cfd6df]">
              <strong className="text-[#7dd3fc]">Pitch:</strong> {idea.pitch}
            </p>
            <p className="mb-2 text-[15px] leading-relaxed text-[#cfd6df]">
              <strong className="text-[#34d399]">Why it lands:</strong> {idea.why}
            </p>
            <p className="text-sm leading-relaxed text-[#aab3c0]">
              <strong className="text-[#fbbf24]">Risk / nuance:</strong> {idea.risk}
            </p>
          </section>
        ))}
      </div>

      <h2>How to deliver them in conversation</h2>
      <p>
        The format Vamsi expects, from the prep guide:
      </p>
      <blockquote>
        <p>
          &ldquo;If I had to pick one for the first quarter, it&apos;s observability around quarantines, because the
          current system depends on a remote JSON file in another repo and there&apos;s no obvious signal when
          something has been quarantined too long. Cost is second because the e2e fan-out is expensive but
          it&apos;s not on fire.&rdquo;
        </p>
      </blockquote>
      <p>Note the structure: <strong>pick → reasoning → ranked alternative</strong>. Mirror that.</p>
    </article>
  );
}
