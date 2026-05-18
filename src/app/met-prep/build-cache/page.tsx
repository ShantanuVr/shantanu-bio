export const metadata = { title: "Build & caching · Met Prep" };

export default function BuildCache() {
  return (
    <article>
      <div className="mb-2 font-mono text-[11px] uppercase tracking-[0.2em] text-[#7dd3fc]">
        System · Build artifacts &amp; caching
      </div>
      <h1>The uberjar &amp; the cache discipline</h1>

      <h2>uberjar.yml — the artifact pipeline</h2>
      <ul>
        <li>First job: <code>check-existing-artifacts</code> tries to fetch a previously built EE+OSS jar from S3 by commit SHA.</li>
        <li>If <strong>both</strong> jars exist for that SHA → matrix build is skipped entirely.</li>
        <li>Build itself is a <code>(ee, oss)</code> matrix.</li>
        <li>On <code>release-x.*</code> branches: <code>get-build-requirements</code> reads <code>release/dist/index.cjs</code> to choose Java / Node versions.</li>
        <li>For PRs: <code>SKIP_LICENSES: true</code>.</li>
      </ul>

      <h2>cache-generator.yml — the only writer</h2>
      <p>
        Monday 03:00 UTC cron. <strong>Read its preamble — it&apos;s a beautifully written design doc.</strong>{" "}
        Quote it back to the panel:
      </p>
      <blockquote>
        <p>
          &ldquo;The cache is never wrong! Caches are immutable once created. Caches are for speeding up builds,
          not for correctness. It is faster to download a large cache than to re-resolve missing dependencies.&rdquo;
        </p>
      </blockquote>

      <h2>The immutability rule</h2>
      <ul>
        <li>Every other job uses <code>actions/cache/restore@v4</code> (NEVER <code>actions/cache@v4</code>).</li>
        <li>Only <code>cache-generator.yml</code> can write.</li>
        <li><strong>Why:</strong> if anyone could write, two parallel jobs could populate inconsistent caches and the next reader inherits non-determinism. One writer = predictable.</li>
      </ul>

      <div className="prep-callout">
        <strong>Trivia probe ready:</strong> &ldquo;Why <code>actions/cache/restore@v4</code> and not <code>actions/cache@v4</code>?&rdquo;
        Answer: cache immutability — exactly one writer, in <code>cache-generator.yml</code>.
      </div>

      <h2>The 4 deterministic weekly cache keys</h2>
      <p>From <code>.github/actions/get-cache-keys/</code>:</p>
      <ul>
        <li><code>m2-cache-key</code> — Maven / Clojure deps.</li>
        <li><code>node-cache-key</code> — node_modules.</li>
        <li><code>eslint-cache-key</code> — eslint cache.</li>
        <li><code>cypress-cache-key</code> — Cypress binary.</li>
      </ul>
      <p>Jobs that need fresh deps can fall back to last week&apos;s key.</p>

      <h2>Composite actions you&apos;d reach for daily</h2>
      <ul>
        <li><code>.github/actions/prepare-frontend/</code></li>
        <li><code>.github/actions/prepare-backend/</code></li>
        <li><code>.github/actions/prepare-cypress/</code> — installs Chrome v144 deterministically (<code>browser-actions/setup-chrome@v2</code>).</li>
        <li><code>.github/actions/prepare-node-bun/</code></li>
        <li><code>.github/actions/e2e-prepare-containers/</code></li>
      </ul>

      <h2>Improvement to pitch (cost-literate, Vamsi-shaped)</h2>
      <div className="prep-callout prep-callout-good">
        <strong>Cache-age alarms.</strong> If <code>cache-generator.yml</code> fails twice in a row, every subsequent
        CI run pays the cold-cache cost <em>silently</em>. Wire a 2nd-consecutive-failure alarm into{" "}
        <code>#engineering-ci</code>. Trivial cost; saves 10s of dev-hours per quiet week.
      </div>

      <h2>Cost framing (Vamsi&apos;s native language)</h2>
      <blockquote>
        <p>
          &ldquo;I&apos;d instrument GH Actions minutes per workflow weekly, plot vs PRs merged, and look at $/PR.
          If cost grows faster than throughput, I&apos;d target the biggest workflow first — likely the 50-way
          e2e split — and ask whether we can drop chunks during low-risk hours, use spot/self-hosted runners
          for non-blocking jobs, or reuse uberjar artifacts more aggressively. The codebase already does
          this by commit SHA; I&apos;d extend the same principle to docker images and snowplow micro.&rdquo;
        </p>
      </blockquote>
    </article>
  );
}
