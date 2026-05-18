export const metadata = { title: "Vocabulary · Met Prep" };

const terms: { term: string; def: string }[] = [
  { term: "Uberjar", def: "Metabase's deployable artifact: a single self-contained JAR. CI builds two — ee and oss. Don't say 'binary' or 'build'." },
  { term: "Driver", def: "A Clojure plugin that lets Metabase query a particular DB. Lives in modules/drivers/<name>/. Each has its own deps + test tree." },
  { term: "Trunk", def: "Third-party flake quarantine + analytics service. Every test job uploads JUnit to it. Trunk decides final pass/fail using the quarantine list." },
  { term: "mage", def: "In-repo Clojure CLI tool (./bin/mage ...). Does kondo, eastwood, lint-migrations, driver-decisions, etc. Source: mage/src/mage/." },
  { term: "Babashka (bb.edn)", def: "Task runner for shell-friendly Clojure scripts. The bb.edn file is 48KB — full of CI/dev shortcuts." },
  { term: "cypress-split", def: "Third-party utility distributing Cypress specs across N parallel jobs using timings.json." },
  { term: "Loki", def: "Visual regression on top of Storybook. Has its own workflow loki.yml, uses a privileged Docker-in-Docker service." },
  { term: "bun", def: "JS package manager / runtime Metabase uses. Replaces npm/yarn. Frontend everything is `bun run ...`." },
  { term: "shadow-cljs / CLJS", def: "ClojureScript compiled to JS. Some Metabase logic lives in CLJS so it runs identically in backend and frontend (notably MBQL transforms). `bun run build-pure:cljs` shows up everywhere." },
  { term: "MBQL", def: "Metabase Query Language. The intermediate JSON between the visual Query Builder and SQL. mbql4 / mbql5 are versions in flight." },
  { term: "App DB", def: "Metabase's own database — users, questions, dashboards, permissions. H2 trial / Postgres or MySQL prod. NOT the customer's data." },
  { term: "Driver target / data source", def: "The customer's DB Metabase queries on their behalf — Snowflake, BigQuery, Redshift, etc." },
  { term: "Serdes", def: "Serialization. Exporting/importing Metabase content as portable YAML so it can be version-controlled / moved between instances." },
  { term: "Static viz", def: "Server-rendered chart images for emails and PDF exports. Built from frontend/src/metabase/static-viz/." },
  { term: "Snowplow", def: "Telemetry pipeline. Schemas in snowplow/, validated in CI. Snowplow micro container also runs in e2e env." },
  { term: "Token / premium features", def: "Paid-edition gating. Cypress needs 4 different tokens: Starter Cloud, Pro Cloud, Pro Self-Hosted, All-Features." },
  { term: "Crowdin / locales", def: "Translations. ~37 PO files plus en_ZZ pseudo-locale used by E2E." },
  { term: "DEFAULT_RUNNER_KEY", def: "Repo-level GH variable, likely a self-hosted runner label. Worth asking explicitly in the panel." },
  { term: "merge_group", def: "GH Actions trigger required for GitHub merge queues. You'll see this in run-tests.yml." },
];

const labels: { label: string; meaning: string }[] = [
  { label: "ci skip", meaning: "Skip all CI." },
  { label: "minimal-tests", meaning: "Run a reduced subset only." },
  { label: "backport / double-backport / triple-backport", meaning: "auto-backport.yml opens 1/2/3 backport PRs." },
  { label: "no-backport", meaning: "Required if not backporting (Vamsi shipped this convention #33799)." },
  { label: "PR-Env*", meaning: "Spin up an ephemeral PR env via pr-env.yml." },
  { label: "build-docker-uberjar", meaning: "Force build a Docker uberjar image." },
  { label: "ci:run-<driver>", meaning: "Force a specific driver job." },
  { label: "ci:run-all-drivers", meaning: "Force the full driver matrix." },
  { label: "break-quarantine-<driver>", meaning: "Override quarantine for that driver." },
  { label: "chromatic", meaning: "Opt-in to chromatic visual regression (Vamsi's design idiom)." },
];

export default function Vocabulary() {
  return (
    <article>
      <div className="mb-2 font-mono text-[11px] uppercase tracking-[0.2em] text-[#7dd3fc]">
        Reference · Vocabulary
      </div>
      <h1>The vocabulary they will use</h1>

      <p>
        Master these. Mixing up &ldquo;app db&rdquo; vs &ldquo;driver target&rdquo;, or saying &ldquo;binary&rdquo; instead of &ldquo;uberjar&rdquo;,
        is a tell that signals you haven&apos;t done the reading.
      </p>

      <h2>Core terms</h2>
      <table>
        <thead>
          <tr><th>Term</th><th>Definition</th></tr>
        </thead>
        <tbody>
          {terms.map((t) => (
            <tr key={t.term}>
              <td><code>{t.term}</code></td>
              <td>{t.def}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>PR labels that drive CI</h2>
      <table>
        <thead>
          <tr><th>Label</th><th>What it does</th></tr>
        </thead>
        <tbody>
          {labels.map((l) => (
            <tr key={l.label}>
              <td><code>{l.label}</code></td>
              <td>{l.meaning}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Vars vs Secrets</h2>
      <p>
        Metabase uses repo-level <strong>Variables</strong> heavily; secrets are tightly scoped. Vars you&apos;ll see:
      </p>
      <ul>
        <li><code>vars.DEFAULT_RUNNER_KEY</code></li>
        <li><code>vars.AWS_S3_TEST_RESULTS_BUCKET</code></li>
        <li><code>vars.CURRENT_VERSION</code></li>
        <li><code>vars.SLACK_RELEASE_CHANNEL</code></li>
      </ul>

      <h2>Three things to drop into conversation</h2>
      <ol>
        <li>Refer to a saved query as &ldquo;a card&rdquo; or &ldquo;a question&rdquo; — never &ldquo;a chart&rdquo; or &ldquo;a report&rdquo;.</li>
        <li>Call the build &ldquo;the uberjar&rdquo; — never &ldquo;the binary&rdquo; or &ldquo;the build&rdquo;.</li>
        <li>Distinguish &ldquo;the app db&rdquo; from &ldquo;the data source&rdquo; / &ldquo;the driver target&rdquo;.</li>
      </ol>
    </article>
  );
}
