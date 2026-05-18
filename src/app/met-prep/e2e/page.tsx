export const metadata = { title: "E2E fan-out · Met Prep" };

export default function E2E() {
  return (
    <article>
      <div className="mb-2 font-mono text-[11px] uppercase tracking-[0.2em] text-[#7dd3fc]">
        System · Highest blast-radius surface
      </div>
      <h1>The e2e fan-out — own this conversation</h1>

      <p>
        E2E is the most expensive surface and the one most likely to flake. Vamsi himself has called
        out cost-heavy CI in his commits. <strong>If you can speak fluently about this one, you&apos;ve covered
          half the technical panel.</strong>
      </p>

      <h2>build-e2e-matrix.js — the splitter</h2>
      <ul>
        <li>Splits the default spec pattern into <strong>N regular chunks (default 50)</strong>.</li>
        <li>Plus three &ldquo;special&rdquo; configs:
          <ul>
            <li><code>oss-subset</code> — runs <code>@OSS @prerelease+-@EE</code> tagged specs.</li>
            <li><code>mongo</code> — <code>@mongo</code> tagged.</li>
            <li><code>python</code> — <code>@python</code> tagged.</li>
          </ul>
        </li>
        <li>If <code>inputSpecs</code> is a custom CSV (engineer touched only specs), build <code>ceil(N/5)</code> chunks
          of up to 5 specs each — and skip the 3 specials. <em>This is why a spec-only PR is fast.</em></li>
      </ul>

      <h2>e2e-test.yml — per-chunk runner (steps in order)</h2>
      <ol>
        <li><code>./.github/actions/e2e-prepare-containers</code> — Docker compose for postgres / mysql / mongo / maildev / openldap / webhook / snowplow on fixed ports.</li>
        <li><code>./.github/actions/fetch-artifact</code> — pulls the uberjar built by <code>uberjar.yml</code>.</li>
        <li><code>./.github/actions/prepare-cypress</code> — installs Chrome v144 deterministically via <code>browser-actions/setup-chrome@v2</code>.</li>
        <li>Compile CLJS (<code>bun run build-pure:cljs</code>).</li>
        <li><code>node e2e/runner/run_cypress_ci.js start</code> — boots the uberjar.</li>
        <li><code>... snapshot</code> — materializes app-db snapshots.</li>
        <li><code>... e2e</code> with cypress-split env vars:
          <ul>
            <li><code>SPLIT</code>, <code>SPLIT_INDEX</code></li>
            <li><code>SPLIT_FILE: e2e/support/timings.json</code></li>
            <li><code>SPLIT_OUTPUT_FILE: newTimes.json</code></li>
            <li><code>SPLIT_TIME_THRESHOLD: 0.01</code></li>
          </ul>
        </li>
        <li><strong>Both spec-run steps are <code>continue-on-error: true</code></strong>. Trunk decides job result.</li>
        <li>On retry (<code>run_attempt != 1</code>): download <code>failed-tests-*</code> artifact, set <code>specs=…</code> in <code>$GITHUB_ENV</code>, only re-run failed specs.</li>
        <li>Always upload JUnit + zip to S3 (<code>.github/actions/upload-test-results</code>) and to Trunk.</li>
      </ol>

      <h2>update-e2e-timings.yml — the weekly tuning loop</h2>
      <ul>
        <li>Sunday cron.</li>
        <li>Walks recent timing-data artifacts.</li>
        <li>Calls <code>.github/scripts/average-e2e-timings.js</code> (has a unit test next to it: <code>*.unit.spec.js</code>).</li>
        <li>Opens auto PR via <code>peter-evans/create-pull-request</code> updating <code>e2e/support/timings.json</code>.</li>
      </ul>

      <div className="prep-callout">
        <strong>Improvement angle:</strong> the timings averaging is a flat 7-day mean. EWMA or per-PR-author
        cohorts would surface drift faster. Worth raising as a question to the panel — shows you read
        the script.
      </div>

      <h2>e2e-stress-test-flake-fix.yml — the burn-in tool</h2>
      <ul>
        <li><code>workflow_dispatch</code> only.</li>
        <li>Fetches a previously built jar.</li>
        <li>Re-runs a spec N times (default <code>burn_in: 20</code>).</li>
        <li>Uses <code>e2e/support/cypress-stress-test.config.js</code>.</li>
      </ul>
      <p>
        <strong>How you&apos;d use it:</strong> verify a flake fix on master <em>before</em> shipping → run again on
        the branch to confirm. Mention this unprompted. Vamsi values this kind of disciplined verification.
      </p>

      <h2>The 1-attempt cap problem (a real improvement to pitch)</h2>
      <p>
        <code>rerun-workflows.yml</code> retries failed runs <strong>once</strong>. A flaky external dep
        (DockerHub rate-limit, Snowplow micro container drift, etc.) often kills <code>master</code>. Pitch:
      </p>
      <blockquote>
        <p>
          &ldquo;Classify failure reasons — docker pull error vs. test assertion vs. snapshot drift — and apply
          different retry policies. Engineering minutes saved is measurable; the policy is dozens of lines.&rdquo;
        </p>
      </blockquote>

      <h2>How you&apos;d triage a sudden e2e flake spike</h2>
      <ol>
        <li><strong>Trunk first</strong>, not GitHub. Filter by spec, time window, variant.</li>
        <li>Cross-reference the S3 archive — Trunk hides some signal.</li>
        <li><strong>Group failures by chunk index.</strong> If only chunk-37 fails, suspect ordering / race between specs in that chunk.</li>
        <li>Check recent <code>update-e2e-timings.yml</code> PRs — bad timings re-skew <code>cypress-split</code> and over-pack chunks past the 40-min job timeout.</li>
        <li>Check <code>cache-generator.yml</code> last successful run — stale cache produces non-determinism. <em>The principle &ldquo;the cache is never wrong&rdquo; means you fix builds, not poke the cache.</em></li>
        <li>Check Docker images in <code>e2e/test/scenarios/docker-compose.yml</code> — maildev / openldap / snowplow micro version drift is classic.</li>
        <li>Use <code>e2e-stress-test-flake-fix.yml</code> with <code>burn_in: 20</code> against the suspect spec on master before the fix; again on branch after.</li>
        <li>Communicate continuously in <code>#engineering-ci</code> — async, written, with links.</li>
      </ol>

      <h2>One-liner for the spec-change scenario</h2>
      <p className="prep-prose-q">
        <strong>Q: &ldquo;Engineer pushes a PR changing a Cypress spec. Walk me through what runs.&rdquo;</strong>
      </p>
      <ol>
        <li><code>run-tests.yml</code> triggers on <code>pull_request</code>.</li>
        <li><code>files-changed</code> matches <code>e2e_specs</code> (subset of <code>e2e_all</code>). <code>e2e_specs_files == e2e_all_files</code>, so <code>e2e-tests</code> is called with <code>specs: &lt;changed_files_csv&gt;</code> and <code>skip: false</code>.</li>
        <li><code>uberjar</code> runs first — <code>check-existing-artifacts</code> likely finds the jars (note <code>SKIP_LICENSES: true</code> for PRs).</li>
        <li><code>build-e2e-matrix.js</code> sees a CSV → builds <code>ceil(N/5)</code> chunks of up to 5 specs. <strong>No</strong> <code>mongo</code> / <code>python</code> / <code>oss-subset</code> specials.</li>
        <li>Each chunk: docker compose up, fetch jar, install Chrome 144, snapshot DB, run Cypress.</li>
        <li>JUnit → S3 + Trunk. Trunk decides job result.</li>
        <li>On failure: <code>rerun-workflows.yml</code> doesn&apos;t trigger (it only does on master/release/backport), so engineer manually re-runs. On rerun: only previously-failed specs run.</li>
      </ol>
    </article>
  );
}
