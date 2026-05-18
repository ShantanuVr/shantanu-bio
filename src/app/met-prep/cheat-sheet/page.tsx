export const metadata = { title: "60-sec cheat sheet · Met Prep" };

export default function CheatSheet() {
  return (
    <article>
      <div className="mb-2 font-mono text-[11px] uppercase tracking-[0.2em] text-[#7dd3fc]">
        Memorize · 60 seconds
      </div>
      <h1>The CI Engineer cheat sheet</h1>

      <h2>The role in one sentence</h2>
      <p>
        Team-of-one CI engineer for ~70 engineers at Metabase. <strong>You don&apos;t ship product code.</strong>{" "}
        You own GitHub Actions pipelines, the flake-triage loop, the release process, and a 15+ database driver matrix.
        Strong async written communication is non-negotiable.
      </p>

      <h2>The four signals they hire for</h2>
      <ol>
        <li><strong>Proactive ownership</strong> — you see drift and fix before outage. (JD says &ldquo;without being asked&rdquo; <strong>three times</strong>.)</li>
        <li><strong>Systemic thinking about flakes</strong> — patterns, not single test fixes.</li>
        <li><strong>Fluency</strong> with GitHub Actions, Docker, Bash, Cypress, Jest.</li>
        <li><strong>Comfort reading unfamiliar systems</strong> — Clojure / TS, even if you don&apos;t ship product code in them.</li>
      </ol>

      <h2>The mental model (must say out loud)</h2>
      <pre><code>{`push / PR ──► run-tests.yml (orchestrator)
                │
                ├─ files-changed (dorny/paths-filter + .github/file-paths.yaml)
                ├─ uberjar.yml      ──► EE + OSS jar artifacts (cached by SHA on S3)
                ├─ backend.yml      ──► clj-kondo, eastwood, cljfmt, BE tests (partitioned)
                ├─ app-db.yml       ──► EE/OSS app db tests on PG/MySQL/Maria (matrix x version)
                ├─ drivers.yml      ──► per-driver matrix, gated by mage driver-decisions
                ├─ frontend.yml     ──► eslint, oxfmt, css, type-check, Jest, TZ tests
                ├─ e2e-tests.yml    ──► e2e-matrix-builder ──► 50 chunks + oss-subset/mongo/python
                ├─ embedding-sdk.yml
                ├─ loki.yml         ──► visual regression
                └─ pr-env.yml       ──► label-gated ephemeral PR environment`}</code></pre>

      <h2>Three files to remember</h2>
      <ul>
        <li><code>.github/workflows/run-tests.yml</code> — top-level orchestrator.</li>
        <li><code>.github/workflows/e2e-tests.yml</code> + <code>build-e2e-matrix.js</code> — the e2e fan-out.</li>
        <li><code>.github/workflows/drivers.yml</code> driven by <code>mage -driver-decisions</code> — heart of the cloud DB matrix.</li>
      </ul>

      <h2>Trunk + flake — one mental model</h2>
      <ul>
        <li>Every test step has <code>continue-on-error: true</code>.</li>
        <li><code>trunk-io/analytics-uploader</code> determines pass/fail using the <strong>quarantine list</strong>.</li>
        <li>JUnit also goes to S3: <code>$DATE/$RUN_ID/$RUN_ATTEMPT/</code>.</li>
        <li><code>dry-run: true</code> on draft PRs and forks → flakes not learned from those.</li>
      </ul>

      <h2>Driver decisions — priority order</h2>
      <ol>
        <li>Global skip flag.</li>
        <li>PR labels <code>ci:run-all-drivers</code> / <code>ci:run-&lt;driver&gt;</code>.</li>
        <li>Quarantined (live JSON from <code>metabase/ci-test-config</code>) — skipped unless <code>break-quarantine-&lt;driver&gt;</code> label.</li>
        <li>Master/release branch — run everything non-quarantined.</li>
        <li>Driver-deps-affected (Clojure module dependency graph).</li>
      </ol>

      <h2>The four-axis frame (Vamsi&apos;s, from News Feed)</h2>
      <p>
        <strong>Speed · Reliability · Efficiency · Engagement.</strong> This is how he thinks. Use it for any
        &ldquo;what would you change?&rdquo; question. <em>Speed</em> = PR cycle time. <em>Reliability</em> = master green %.{" "}
        <em>Efficiency</em> = $ / GH minutes per PR. <em>Engagement</em> = engineer NPS on CI.
      </p>

      <h2>One pitch you commit to</h2>
      <div className="prep-callout prep-callout-good">
        <strong>The four-axis CI dashboard.</strong> One URL, public to the eng org. Quarter 1: ship it.
        Quarter 2: act on whatever it surfaces (likely quarantine observability or e2e cost). Year 1:
        70-person eng org is measurably faster without thinking about CI. Bridge to your résumé:
        you built the same thing at PowerSchool (4h → 15min release cockpit).
      </div>

      <h2>Two-line headline (60 seconds, no notes)</h2>
      <blockquote>
        <p>
          &ldquo;I want to own developer leverage at Metabase. The CI surface today has the right structure —
          immutable caches, smart matrix splits, Trunk-mediated flake handling — and the gap I see is observability
          and prioritization across the same four axes you&apos;d recognize from News Feed: speed, reliability,
          efficiency, engagement. In Q1 I&apos;d publish that dashboard, in Q2 I&apos;d act on whatever it surfaces, and in
          year one I&apos;d want the 70-person eng org measurably faster without anyone thinking about CI.&rdquo;
        </p>
      </blockquote>
    </article>
  );
}
