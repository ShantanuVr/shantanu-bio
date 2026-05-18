export const metadata = { title: "CI mental model · Met Prep" };

export default function Architecture() {
  return (
    <article>
      <div className="mb-2 font-mono text-[11px] uppercase tracking-[0.2em] text-[#7dd3fc]">
        System · Mental model
      </div>
      <h1>How a Metabase PR moves from <code>git push</code> to a green tick</h1>

      <p>
        Goal: be able to narrate this for 90 seconds without notes. If you can do that, you&apos;ve
        already cleared the technical bar of the panel round.
      </p>

      <h2>The orchestrator: <code>run-tests.yml</code></h2>
      <ul>
        <li>Triggers on <code>push</code> to <code>master</code> / <code>release-**</code>, <code>pull_request</code>, <code>merge_group</code>, <code>workflow_dispatch</code>.</li>
        <li>First job: <code>files-changed</code> uses <code>dorny/paths-filter</code> with categories defined in <code>.github/file-paths.yaml</code>.</li>
        <li>Outputs of <code>files-changed</code> become <code>skip</code> inputs on the reusable workflows.</li>
        <li>Two PR labels short-circuit: <code>ci skip</code> and <code>minimal-tests</code>.</li>
        <li>Subtle gate: e2e only runs if <code>uberjar.result != &apos;failure&apos; &amp;&amp; != &apos;cancelled&apos;</code>.</li>
      </ul>

      <h2>The fan-out</h2>
      <pre><code>{`push / PR ──► run-tests.yml
                │
                ├─ files-changed
                ├─ uberjar.yml       ──► EE + OSS jars (cached by SHA, fetched from S3 if exists)
                ├─ backend.yml       ──► clj-kondo, eastwood, cljfmt, BE unit tests (partitioned)
                ├─ app-db.yml        ──► EE/OSS app db x (Postgres/MySQL/MariaDB) x version
                ├─ drivers.yml       ──► per-driver, gated by mage -driver-decisions
                ├─ frontend.yml      ──► eslint, oxfmt, css, type-check, Jest sharded, TZ, custom-viz
                ├─ e2e-tests.yml     ──► e2e-matrix-builder ──► 50 chunks + 3 specials
                │                            └─ oss-subset (@OSS @prerelease+-@EE), mongo, python
                ├─ embedding-sdk.yml ──► component + host sample-app tests
                ├─ loki.yml          ──► visual regression (Storybook + Loki)
                └─ pr-env.yml        ──► label-gated PR ephemeral env

scheduled / dispatch:
  cache-generator.yml     Mon 03:00 UTC  weekly cache (M2, node_modules, Cypress, eslint)
  update-e2e-timings.yml  Sun cron       averages timings -> opens auto PR to timings.json
  cross-version.yml       nightly        migration tests across releases
  rerun-workflows.yml     event-driven   auto-rerun failed master/release/backport, ping #engineering-ci

release pipeline:
  build-for-release.yml ──► tag-for-release.yml ──► release.yml (Release 0/2/3)
  cut-release-branch.yml   schedule-minor.yml   schedule-patch.yml
  release-tag.yml          release-tests.yml    containerize-uberjar.yml`}</code></pre>

      <h2>file-paths.yaml — why a docs-only PR still satisfies required checks</h2>
      <ul>
        <li>Categories: <code>backend_all</code>, <code>frontend_all</code>, <code>e2e_all</code>, <code>e2e_specs</code>, <code>embedding_sdk_*</code>, <code>documentation</code>, etc.</li>
        <li>YAML anchors (<code>*shared_ci</code>) are reused across categories.</li>
        <li>When a category doesn&apos;t match, the reusable workflow runs with <code>skip: true</code>.</li>
        <li>The skipped workflow still emits a <code>-tests-result</code> job that returns success — that&apos;s how required checks resolve green without actually running tests.</li>
      </ul>

      <div className="prep-callout">
        <strong>Be ready to explain:</strong> &ldquo;The required-check bypass works because <em>the skip path produces
          a success-equivalent result job</em>, not because the rule is loose. That&apos;s a deliberate design.&rdquo;
      </div>

      <h2>The auto-rerun loop</h2>
      <ul>
        <li><code>rerun-workflows.yml</code> auto re-runs failed master / release / backport runs <strong>once</strong>.</li>
        <li>Then pings <code>#engineering-ci</code> on Slack with a per-job link.</li>
        <li>Does NOT trigger on PRs — engineers re-run those manually.</li>
        <li>On rerun, <code>e2e-test.yml</code> only re-runs previously-failed specs (downloads <code>failed-tests-*</code> artifact, sets <code>specs=…</code> in <code>$GITHUB_ENV</code>). Smart pattern worth name-checking.</li>
      </ul>

      <h2>Concurrency groups (trivia they may probe)</h2>
      <pre><code>{`concurrency:
  group: \${{ github.workflow }}-\${{ github.head_ref && github.ref || github.run_id }}-e2e
  cancel-in-progress: true`}</code></pre>
      <p>
        Why this shape? Cancel in-progress runs <strong>on the same PR</strong>, but never collapse two
        distinct master runs into one (because <code>github.ref</code> is unique per master commit when
        <code>head_ref</code> is empty).
      </p>

      <h2>Narration script (out loud, 90 seconds)</h2>
      <blockquote>
        <p>
          &ldquo;Push hits <code>run-tests.yml</code>. <code>files-changed</code> runs paths-filter, decides which
          reusable workflows to skip. <code>uberjar.yml</code> tries to fetch a previously built jar from S3 by SHA;
          if it&apos;s a hit, the build is skipped. Then everything fans out in parallel: backend, app-db,
          drivers (gated by <code>mage -driver-decisions</code>), frontend, e2e (50 chunks via <code>build-e2e-matrix.js</code>),
          embedding SDK, Loki visual regression. Each test step is <code>continue-on-error: true</code> — Trunk
          decides the real pass/fail by checking the quarantine list. JUnit gets uploaded to S3 and to Trunk.
          On master failures, <code>rerun-workflows.yml</code> retries once and pings <code>#engineering-ci</code>.&rdquo;
        </p>
      </blockquote>
    </article>
  );
}
