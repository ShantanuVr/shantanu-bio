export const metadata = { title: "Driver matrix · Met Prep" };

export default function Drivers() {
  return (
    <article>
      <div className="mb-2 font-mono text-[11px] uppercase tracking-[0.2em] text-[#7dd3fc]">
        System · Database / driver matrix
      </div>
      <h1>Driver matrix &amp; quarantine</h1>

      <p>
        Drivers are the <strong>highest-variance test surface</strong>. Most CI cost lives here.
        <code>drivers.yml</code> is 1707 lines but every block is the same shape — the cost is in the matrix,
        not the YAML.
      </p>

      <h2>The two database concepts (don&apos;t mix them up)</h2>
      <ul>
        <li><strong>App DB</strong> — Metabase&apos;s <em>own</em> database (users, questions, dashboards, permissions). Postgres / MySQL / MariaDB in CI; H2 for trial; production uses PG/MySQL.</li>
        <li><strong>Driver target / data source</strong> — the customer&apos;s DB Metabase queries on their behalf (Snowflake, BigQuery, Redshift, Athena, ClickHouse, Vertica, Druid, SparkSQL, SQL Server, Mongo, Databricks, Presto, etc.).</li>
      </ul>

      <div className="prep-callout">
        <strong>Confusing them is a tell.</strong> Always say &ldquo;the app db&rdquo; or &ldquo;the driver target&rdquo;.
      </div>

      <h2>app-db.yml</h2>
      <ul>
        <li>Postgres / MySQL / MariaDB matrix using GH <code>services:</code> blocks (NOT Docker compose).</li>
        <li>Matrix axes: <code>version</code> × <code>job</code> (Enterprise / EE App DB part 1 / part 2 / OSS part 1 / OSS part 2).</li>
        <li>Clojure test runner exposes <code>:partition/total</code> and <code>:partition/index</code> — <strong>that&apos;s how BE tests are sharded</strong>.</li>
      </ul>

      <h2>drivers.yml — gating logic</h2>
      <p>
        First job: <code>determine-driver-skips</code> calls <code>./bin/mage -driver-decisions</code> and emits per
        driver:
      </p>
      <ul>
        <li><code>&lt;driver&gt;-should-run</code> — boolean.</li>
        <li><code>&lt;driver&gt;-quarantine-conflict</code> — boolean.</li>
      </ul>
      <p>Every driver job gates on those.</p>

      <h2>The decision priority order (memorize this)</h2>
      <p>From <code>mage/src/mage/modules.clj</code> (lines 313-530, function <code>driver-decision</code>):</p>
      <ol>
        <li><strong>Global skip flag.</strong> Hard off.</li>
        <li><strong>PR labels:</strong> <code>ci:run-all-drivers</code> / <code>ci:run-&lt;driver&gt;</code>.</li>
        <li><strong>Quarantined?</strong> List fetched <em>live</em> from{" "}
          <code>https://raw.githubusercontent.com/metabase/ci-test-config/refs/heads/master/ci-test-config.json</code>{" "}
          — a separate repo. Skipped <em>unless</em> the PR has <code>break-quarantine-&lt;driver&gt;</code>.</li>
        <li><strong>Master/release branch?</strong> Run everything non-quarantined.</li>
        <li><strong>Driver-deps-affected?</strong> Analyzed via Clojure module dependency graph.</li>
      </ol>

      <h2>The quarantine-conflict signal</h2>
      <p>
        Driver is quarantined <em>but</em> the PR touches its module → <code>&lt;driver&gt;-quarantine-conflict=true</code> →
        a <code>Fail on quarantine conflict</code> step prints an actionable error.
      </p>

      <h2>Cloud-only drivers (need secrets, separate workflows)</h2>
      <ul>
        <li>Athena, BigQuery, Snowflake, Redshift, Databricks, Vertica.</li>
        <li>ClickHouse — sometimes.</li>
        <li>Files: <code>athena.yml</code>, <code>presto-kerberos-integration-test.yml</code>, <code>transforms-python-stress-test.yml</code>, <code>reset-cloud-test-dataset.yml</code>.</li>
        <li>Run on a smaller schedule than per-PR.</li>
      </ul>

      <h2>The composite that actually runs the test</h2>
      <p>
        <code>.github/actions/test-driver/action.yml</code> — runs:
      </p>
      <pre><code>{`clojure -X:dev:ci:<edition>:<edition>-dev:drivers:drivers-dev:test ...`}</code></pre>
      <p>Uploads JUnit. Attaches logs on failure.</p>

      <h2>Improvement to pitch (the one you commit to second)</h2>
      <div className="prep-callout prep-callout-good">
        <strong>Quarantine observability.</strong> No dashboard surfaces &ldquo;currently quarantined drivers&rdquo;
        and how long they&apos;ve been quarantined. Two implementations:
        <ul>
          <li>Scheduled job → Slack reminder in <code>#engineering-ci</code> when a quarantine ages past N days.</li>
          <li>Static status page generated from <code>ci-test-config.json</code>, hosted alongside CI dashboards.</li>
        </ul>
        <strong>Why it lands:</strong> uses a JSON file in another repo with no audit trail; quarantines drift
        permanent; this is exactly the kind of unglamorous CI plumbing Vamsi has personally shipped (auto-request-review token swap, backport-label reminders).
      </div>

      <h2>Token swap angle (echoes Vamsi&apos;s own commit)</h2>
      <blockquote>
        <p>
          &ldquo;The recent shift in <code>auto-request-review.yml</code> to <code>METABASE_AUTOMATION_USER_TOKEN</code> plus team-based
          reviewers — that&apos;s a pattern I&apos;d like to extend. Right now <code>mage driver-decisions</code> fetches
          quarantine state from <code>metabase/ci-test-config</code> using the default GH token; I&apos;d move that
          to the automation user too, with read-only scope, so quarantine ownership is auditable.&rdquo;
        </p>
      </blockquote>
    </article>
  );
}
