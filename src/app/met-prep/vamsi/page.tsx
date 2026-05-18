export const metadata = { title: "Vamsi · profile · Met Prep" };

export default function VamsiProfile() {
  return (
    <article>
      <div className="mb-2 font-mono text-[11px] uppercase tracking-[0.2em] text-[#fbbf24]">
        The Vamsi Round · Profile + signals
      </div>
      <h1>Vamsi Peri — profile, optimization function, signals</h1>

      <p>
        This is <strong>not a peer-level CI deep-dive</strong>. Vamsi is the VP of Engineering — this round is the
        <em> judgment / leadership / values</em> loop. Calibrate accordingly: less YAML, more &ldquo;how do you think,
          how do you communicate, how do you create leverage.&rdquo;
      </p>

      <h2>Career arc (read twice)</h2>
      <ul>
        <li><strong>IIT Bombay, B.Tech (2003-2007).</strong> Same alma mater pattern as many of his hires. Baseline of technical rigor.</li>
        <li><strong>Morgan Stanley, 2007-2018 (10 years).</strong> Engineer → tech lead → engineering manager. Teams across NY / London / Budapest / Mumbai. Counterparty Risk, OTC Derivatives reforms, KYC. <em>He grew up the ladder over a decade in regulated finance — he respects careful operators, documentation, process discipline.</em></li>
        <li><strong>AQR Capital, 2018-2019.</strong> VP / Head of Portfolio Finance Engineering. Balanced $100B of bank borrowing across cost vs risk. Containerized C#/.NET/Angular/SQL Server from on-prem Windows to Linux/AWS. <em>He has personally led a platform migration.</em></li>
        <li><strong>Facebook, 2019-2022 (2y 4m).</strong> Senior EM on News Feed (3B users). His framing: <strong>performance, reliability, efficiency, engagement</strong>. <em>This four-axis frame is exactly how he&apos;ll think about CI. Memorize.</em> Team saved $2B in infra costs — he is cost-literate at a level most managers are not.</li>
        <li><strong>AtoB, 2022-2023.</strong> Senior Director at YC Series-B fintech. Led Product, Growth, Infra Engineering. Stack: Rails, React, TS, Postgres, Heroku, CI/CD into prod. <em>He knows fast-moving startup CI, not just hyperscale.</em></li>
        <li><strong>Metabase, 2023-present.</strong> Director then VP. Two years in. Familiar enough to call BS.</li>
        <li><strong>Forbes Tech Council, 2022-2023.</strong> Writes publicly. <em>Skim vamsiperi.com beforehand.</em> Quote a post back if it lands naturally.</li>
      </ul>

      <h2>What he optimizes for in this loop</h2>
      <ol>
        <li><strong>Ownership without being asked.</strong> JD says &ldquo;without being asked&rdquo; <strong>three times</strong>. He is the one who put it there.</li>
        <li><strong>Written, async communication.</strong> He&apos;s run teams across 4 timezones for a decade.</li>
        <li><strong>Business-tied framing.</strong> &ldquo;CI is faster&rdquo; loses. &ldquo;Median PR cycle 35min → 22min, ~13 dev-hours/day reclaimed across 70 engineers&rdquo; wins.</li>
        <li><strong>Trade-off literacy.</strong> Risk vs cost (AQR). Speed vs reliability (FB). Velocity vs quality (AtoB). Have a story for each.</li>
        <li><strong>Career growth thinking.</strong> Even as IC, talk about how your work makes <em>other</em> engineers better.</li>
        <li><strong>Pragmatism over purity.</strong> He moved a stack from on-prem Windows to AWS Linux. Suspicious of &ldquo;let&apos;s rewrite in $shiny&rdquo;.</li>
      </ol>

      <h2>His CI commits — know these</h2>
      <p>
        Vamsi has 48 commits to <code>metabase/metabase</code>. <strong>14 touch <code>.github/</code></strong>. He is not a
        &ldquo;VP who only reviews&rdquo;; he ships code. Lead with what&apos;s broken, not with a recital of design.
      </p>

      <h3>Most relevant CI commits</h3>
      <ul>
        <li>
          <strong>Jul 8 → Jul 31 2025: <code>.github/workflows/claude.yml</code></strong> (#60675 create, #60677 fix container, #61666 delete).<br />
          He shipped a Claude-Code GitHub workflow, hit a container issue next day, kept it ~3 weeks, ripped it out. <em>He experiments with AI in CI, willing to ship and revert quickly. Have a thoughtful take on AI-assisted CI: scoped permissions, deterministic triggers, opt-in labels, no GITHUB_TOKEN escalation.</em>
        </li>
        <li>
          <strong>Jan 15 2025: &ldquo;Run nightly point releases at 4 pm ET&rdquo;</strong> (#52197). Cron in <code>release-patch.yml</code>: <code>15 0 * * 2-6</code> → <code>0 21 * * 1-5</code>. <em>He cares about release cadence and ET-aligned scheduling. Worth asking: &ldquo;Why 4pm? Aligned to support coverage?&rdquo;</em>
        </li>
        <li>
          <strong>Aug 21 2024: &ldquo;fix auto request review fail&rdquo;</strong> (#47109). Switched <code>auto-request-review.yml</code> from <code>secrets.GITHUB_TOKEN</code> → <code>secrets.METABASE_AUTOMATION_USER_TOKEN</code>. Replaced inline <code>migration-owners</code> with GH team <code>team:core-backend-components</code>. <em>He thinks token scopes + GH permission model + converting ad-hoc lists into teams. Exactly the unglamorous CI plumbing you&apos;d own.</em>
        </li>
        <li>
          <strong>Aug 21-29 2023: Chromatic + Cloverage label-gating + master-only triggers</strong> (#33462, #33507, #33396, #33398). Made chromatic visual-regression opt-in via <code>chromatic</code> label. Cloverage runs only on master. <em>He helped establish the label-gating pattern you see in <code>pr-env.yml</code> and <code>e2e-stress-test-flake-fix.yml</code>. Don&apos;t pitch reinventing it — acknowledge it.</em>
        </li>
        <li>
          <strong>Sep 7 2023: backport-label reminder</strong> (#33799). Convention: every PR labeled <code>backport</code> or <code>no-backport</code>. Foundation of current <code>auto-backport.yml</code>.
        </li>
      </ul>

      <h3>His non-CI work tells you something too</h3>
      <ul>
        <li><strong>Feb 3 2026: Workspaces for Transforms</strong> (#66015) — co-authored with 6 engineers. VP who still lands big features alongside ICs.</li>
        <li><strong>Oct 6 2025: Dark mode</strong> (#64016, 744 files). He personally ships cross-cutting frontend work.</li>
        <li>Long tail: SQL Server connection bug, iOS dashboard perf, PDF export filters, FK remapping sandboxing, TLS cert bundle updates, sync log levels. <em>He picks up unglamorous bug fixes. Project the same value system.</em></li>
      </ul>

      <p>
        He also owns <code>team.json</code> updates (metabot team, semantic-layer team, removing departed engineers).
        <em> He participates in org design.</em> Don&apos;t propose CI changes that silently shift work onto another team without naming them.
      </p>

      <h2>Three things to say <em>because</em> of his commit history</h2>
      <ol>
        <li>
          <blockquote><p>&ldquo;I noticed you label-gate cost-heavy jobs like chromatic and the PR-env build. I think the e2e fan-out could borrow the same pattern for some matrix dimensions — for example, <code>@external</code> specs only on a label unless something in <code>e2e/test/scenarios/admin/databases/</code> changed.&rdquo;</p></blockquote>
          <p className="text-sm text-[#838d9c]">Echoes his own design idiom back at him.</p>
        </li>
        <li>
          <blockquote><p>&ldquo;The Claude Code workflow experiment — I&apos;d want to understand what didn&apos;t work. My instinct is that any AI agent in CI needs (a) scoped token, (b) deterministic triggers, (c) cost cap per PR. Did you run into one of those, or was it something else?&rdquo;</p></blockquote>
          <p className="text-sm text-[#838d9c]">Shows you read the commit history. Opens a real conversation he cares about.</p>
        </li>
        <li>
          <blockquote><p>&ldquo;The recent shift in <code>auto-request-review.yml</code> to <code>METABASE_AUTOMATION_USER_TOKEN</code> plus team-based reviewers — that&apos;s a pattern I&apos;d like to extend. Right now <code>mage driver-decisions</code> fetches the quarantine list from <code>metabase/ci-test-config</code> using the default GH token; I&apos;d move that to the automation user too, with read-only scope, so quarantine ownership is auditable.&rdquo;</p></blockquote>
          <p className="text-sm text-[#838d9c]">Specific, low-ego, references his own work.</p>
        </li>
      </ol>

      <h2>Tonal calibration</h2>
      <ul>
        <li>Engineers from Mumbai / London / Budapest / NY for 10+ years. Cultural fluency high. Over-explaining basics is a red flag.</li>
        <li>Left finance for fintech then OSS. Values mission-aligned, low-ego operators. Avoid name-dropping; lean into outcomes.</li>
        <li>10 years at Morgan Stanley — wary of job-hoppers. If your tenure is short anywhere, lead with what you learned.</li>
        <li>Personally containerized a legacy stack and saved $2B. <strong>Do not over-explain migrations or cost.</strong> Match his level.</li>
        <li>Mentioning a vamsiperi.com post is high-leverage social proof — but only if you actually engage with the idea. Don&apos;t flatter.</li>
      </ul>
    </article>
  );
}
