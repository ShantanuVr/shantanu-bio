export const metadata = { title: "Product primer · Met Prep" };

export default function Product() {
  return (
    <article>
      <div className="mb-2 font-mono text-[11px] uppercase tracking-[0.2em] text-[#7dd3fc]">
        Context · Product primer
      </div>
      <h1>What Metabase actually is</h1>

      <p>
        A CI engineer doesn&apos;t ship product features — but you&apos;ll be the audience for every product PR.
        Knowing the lay of the land prevents you from sounding like an outsider. <strong>5-minute briefing.</strong>
      </p>

      <h2>One sentence</h2>
      <p>
        <strong>Open-source business intelligence (BI):</strong> a web app you point at any database that lets
        non-technical people ask questions of the data, build dashboards, get alerts, and (now) ask an AI
        agent — without writing SQL.
      </p>
      <p>Think Looker / Tableau / Mode / Hex, but OSS-first, self-hostable, with a generous free tier and a paid Enterprise / Cloud edition.</p>

      <h2>Business model — and why <code>enterprise/</code> exists</h2>
      <ul>
        <li><strong>OSS edition (AGPL)</strong> — main <code>src/</code> tree. Free, self-hosted, full SQL editor + dashboards + alerts + embedding-lite.</li>
        <li><strong>Enterprise edition</strong> — <code>enterprise/</code> tree, separate commercial licence. SSO/SAML/LDAP, audit, advanced permissions/sandboxing, content moderation, white-label, dashboard subscriptions with filters, official driver support for paid databases, embedding-SDK pro, content translations, Metabot AI, advanced caching. <strong>Loaded as a plugin</strong> on top of OSS at startup if a valid token is present.</li>
        <li><strong>Cloud</strong> — Metabase-hosted SaaS. Same uberjar, plus Metabase-managed Postgres app db, SMTP, SSL, backups, SOC2.</li>
        <li><strong>Pricing tiers</strong> — Starter Cloud, Pro Cloud, Pro Self-Hosted, All-Features (internal). <strong>CI must produce 4 different premium tokens for tests.</strong></li>
      </ul>
      <p>
        This is why nearly every CI workflow has a <code>(ee, oss)</code> matrix axis. <strong>Two builds, one repo.</strong>
      </p>

      <h2>Product surface — engineer-named</h2>
      <ul>
        <li><strong>Questions</strong> — the core unit. A &ldquo;question&rdquo; is a saved query, built visually (Query Builder, MBQL-based) or written as native SQL.</li>
        <li><strong>Dashboards</strong> — collections of cards with filters, click-behavior, fullscreen, auto-refresh, subscriptions (email/Slack/webhook).</li>
        <li><strong>Data Studio / Transforms</strong> — new and important. Turns raw DB tables into analytics-ready tables. Tracks dependencies. Defines canonical metrics. Vamsi co-authored &ldquo;Workspaces for Transforms&rdquo;.</li>
        <li><strong>Metabot / Agent API</strong> — the AI assistant. Answers questions, helps write SQL, can act as an agent. Available as in-product chat AND a public Agent API. Dirs: <code>agent_api</code>, <code>agent_lib</code>, <code>metabot_v3</code>.</li>
        <li><strong>Documents</strong> — new long-form analysis surface (Notion-for-data) with embedded charts and comments.</li>
        <li><strong>Library</strong> — curated content area with Git-backed version control (<code>remote-sync</code>).</li>
        <li><strong>Alerts</strong> — value-based or time-based notifications on questions.</li>
        <li><strong>Embedding</strong> — three flavors:
          <ol>
            <li>Static iframe embedding (signed URLs, the cheap option).</li>
            <li>Interactive embedding (full Metabase iframed into your app with SSO).</li>
            <li>Embedding SDK (React) — <code>enterprise/frontend/src/embedding-sdk-package/</code>, the modern way. Has its own CI workflow.</li>
          </ol>
        </li>
        <li><strong>Permissions / Sandboxing</strong> — row-level filtering by user attribute. Heavy enterprise feature, lots of E2E coverage.</li>
        <li><strong>Drivers</strong> — per-database adapters in <code>modules/drivers/</code>. 18 first-party plus community. Each implements a Clojure protocol.</li>
      </ul>

      <h2>Codebase shape</h2>
      <table>
        <thead>
          <tr><th>Directory</th><th>What it is</th><th>Language</th></tr>
        </thead>
        <tbody>
          <tr><td><code>src/metabase/</code></td><td>OSS backend (132 top-level subdirs)</td><td>Clojure</td></tr>
          <tr><td><code>enterprise/backend/src/metabase_enterprise/</code></td><td>EE backend plugins (55 subdirs)</td><td>Clojure</td></tr>
          <tr><td><code>modules/drivers/</code></td><td>DB adapters (18 drivers)</td><td>Clojure (mostly JDBC)</td></tr>
          <tr><td><code>frontend/src/metabase/</code></td><td>OSS frontend (89 modules)</td><td>TypeScript + React</td></tr>
          <tr><td><code>enterprise/frontend/src/</code></td><td>EE frontend incl. embedding SDK</td><td>TypeScript + React</td></tr>
          <tr><td><code>e2e/test/scenarios/</code></td><td>Cypress E2E specs (mirrors app URLs)</td><td>TS/JS</td></tr>
          <tr><td><code>test/metabase/</code> + <code>enterprise/backend/test/</code></td><td>Clojure unit/integration tests</td><td>Clojure</td></tr>
          <tr><td><code>docs/</code></td><td>User handbook (387 files)</td><td>Markdown</td></tr>
          <tr><td><code>bin/</code></td><td>Operational scripts (mage, test-agent, drivers build, i18n)</td><td>Bash + Clojure</td></tr>
          <tr><td><code>release/</code></td><td>TS release-automation library</td><td>TypeScript</td></tr>
          <tr><td><code>mage/</code></td><td>In-repo Clojure CLI for CI/dev helpers</td><td>Clojure</td></tr>
          <tr><td><code>bb.edn</code> (48KB!)</td><td>Babashka tasks — many CI/dev shortcuts</td><td>Clojure</td></tr>
          <tr><td><code>resources/migrations/</code></td><td>Liquibase migrations for app DB</td><td>YAML</td></tr>
          <tr><td><code>.github/workflows/</code></td><td>The 100+ workflows you&apos;ll own</td><td>YAML</td></tr>
        </tbody>
      </table>

      <p>
        <strong>The build artifact</strong> is a single fat JAR (uberjar) bundling backend + frontend + drivers
        + (optionally) EE plugins. That JAR is what ships to Docker Hub, to Cloud, and to self-hosters.
        <strong> CI&apos;s job is to make sure that JAR is correct, gets there fast, and only when the test suite says so.</strong>
      </p>

      <h2>Terms not to stumble on</h2>
      <ul>
        <li><strong>MBQL</strong> — Metabase Query Language. Intermediate JSON between Query Builder UI and SQL. <code>mbql4</code>, <code>mbql5</code> are versions in flight.</li>
        <li><strong>App DB</strong> — Metabase&apos;s OWN database (users, questions, dashboards, permissions). H2 trial / Postgres or MySQL prod. <strong>Different from the data Metabase queries on behalf of users.</strong></li>
        <li><strong>Driver / driver target / data source</strong> — customer&apos;s DB. Snowflake, BigQuery, Redshift, etc.</li>
        <li><strong>Serdes</strong> — serialization. Exporting/importing Metabase content as portable YAML.</li>
        <li><strong>Static viz</strong> — server-rendered chart images for emails / PDF exports. <code>frontend/src/metabase/static-viz/</code>.</li>
        <li><strong>Loki / Storybook</strong> — visual-regression and component-explorer. Both have dedicated CI workflows.</li>
        <li><strong>Snowplow</strong> — telemetry. Schemas in <code>snowplow/</code>, validated in CI. Snowplow micro container also runs in e2e env.</li>
        <li><strong>Token / premium features</strong> — paid-edition gating. 4 different Cypress tokens.</li>
        <li><strong>Locales / Crowdin</strong> — translations. ~37 PO files plus <code>en_ZZ</code> pseudo-locale used by E2E.</li>
        <li><strong>CLJS / shadow-cljs</strong> — ClojureScript compiled to JS. Some logic lives in CLJS so it runs identically in backend and frontend (notably MBQL transforms). <code>bun run build-pure:cljs</code> shows up everywhere.</li>
      </ul>

      <h2>What this means for the CI engineer</h2>
      <ul>
        <li>Every PR can touch any combination of: Clojure backend, ClojureScript shared layer, TypeScript frontend, driver code, EE plugin code, docs, i18n, migrations, embedding SDK, release scripts. <code>file-paths.yaml</code> is the only thing that keeps every PR from running every test.</li>
        <li>Drivers are the highest-variance test surface. <strong>Most CI cost lives there.</strong> When you read <code>drivers.yml</code> (1707 lines), every block is the same shape; the cost is in the matrix.</li>
        <li>The Embedding SDK and Cloud / self-host releases share the same uberjar but have their own deploy paths. Release engineering is more complex than typical SaaS.</li>
        <li>The product team ships fast — see Vamsi&apos;s commit list (dark mode in one PR, Workspaces in a six-author PR). <strong>Your CI must not be the bottleneck.</strong></li>
        <li>You don&apos;t need to understand MBQL, drivers, or Metabot internals. You only need to recognize the names so an engineer saying &ldquo;the dashboard-filters E2E chunk is flaking because Loki broke after the new pivot table&rdquo; makes sense.</li>
      </ul>

      <h2>Three things to drop into conversation to sound like you&apos;ve been here a while</h2>
      <ol>
        <li>Refer to a saved query as &ldquo;a card&rdquo; or &ldquo;a question&rdquo; — not &ldquo;a chart&rdquo; or &ldquo;a report&rdquo;.</li>
        <li>Refer to the build as &ldquo;the uberjar&rdquo; — not &ldquo;the binary&rdquo; or &ldquo;the build&rdquo;.</li>
        <li>Distinguish &ldquo;the <strong>app db</strong>&rdquo; (Metabase&apos;s own) from &ldquo;the <strong>data source</strong>&rdquo; / &ldquo;the <strong>driver target</strong>&rdquo; (customer&apos;s DB). Mixing these up is a tell.</li>
      </ol>
    </article>
  );
}
