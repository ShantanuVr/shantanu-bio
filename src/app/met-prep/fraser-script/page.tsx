export const metadata = { title: "Fraser · 90-min script · Met Prep" };

export default function FraserScript() {
  return (
    <article>
      <div className="mb-2 font-mono text-[11px] uppercase tracking-[0.2em] text-[#f472b6]">
        The Fraser Round · 90-min tactical script
      </div>
      <h1>Fraser McIntosh — the 90-minute peer technical round</h1>

      <p>
        Expect ~75 minutes of substance. He&apos;s in NZ; the call is likely scheduled morning-NZ / afternoon-IST.{" "}
        <strong>Be fully alert. Coffee.</strong>
      </p>

      <h2>How the round will run</h2>
      <ul>
        <li><strong>0-5 min · Intros.</strong> He&apos;ll probably ask &ldquo;tell me what you&apos;ve been up to.&rdquo; Compress your opener to <strong>60 seconds</strong>; he doesn&apos;t need the full pitch, he wants to get to the work.</li>
        <li>
          <strong>5-25 min · Background deep-dive.</strong> Your release cockpit (MERN), agent platform, DevSecOps gates. Expect follow-ups: &ldquo;how did you decide what to put on the dashboard,&rdquo; &ldquo;what was the data pipeline behind it,&rdquo; &ldquo;who maintains it now.&rdquo;
        </li>
        <li>
          <strong>25-65 min · The screen-share segment.</strong> He will almost certainly show you one of:
          <ul>
            <li>The affected-tests / decide-what-runs branch and ask for review.</li>
            <li>A real flake from the past week and ask how you&apos;d triage.</li>
            <li><code>run-tests.yml</code> and ask &ldquo;what would you change about this?&rdquo;</li>
            <li>The module-boundaries config and ask &ldquo;would you do this differently?&rdquo;</li>
          </ul>
        </li>
        <li><strong>65-80 min · Your questions for him.</strong></li>
        <li><strong>80-90 min · Wrap, next steps.</strong></li>
      </ul>

      <hr />

      <h2>Q1 — &ldquo;Walk me through the most painful CI thing you&apos;ve personally debugged.&rdquo;</h2>
      <div className="prep-callout">
        <strong>Anchor:</strong> Pick something with parallels to the Cypress/Chromium saga. Best candidate from your résumé: a real-hover or locator-flake battle from the Playwright/WDIO regression suite at PowerSchool, or a DAST gate that broke nightly due to dependency drift. Use the SRE structure: <em>detect → mitigate → root-cause → action items → what&apos;d you change next time</em>. Quantify downtime / blast radius.
      </div>
      <p><strong>Hook for Fraser (closing beat):</strong></p>
      <blockquote>
        <p>
          &ldquo;Have you been somewhere similar? I saw the Chromium v131-to-v144 commit chain and the 10 numbered
          scroll-fix commits — I&apos;d love to know what the actual root cause turned out to be.&rdquo;
        </p>
      </blockquote>
      <p><strong>Trap:</strong> Don&apos;t make it sound easy. Fraser respects people who&apos;ve genuinely struggled.</p>

      <hr />

      <h2>Q2 — &ldquo;Let me show you my branch.&rdquo;</h2>
      <p className="text-sm text-[#838d9c]">
        <em>(He shares screen with <code>affected-tests.js</code> / <code>test-suites.js</code> / modified <code>run-tests.yml</code>.)</em>
      </p>
      <div className="prep-callout">
        <strong>Frame:</strong> Highest-leverage moment of the round. Don&apos;t try to be smart. <strong>Read it
        carefully, ask 1-2 clarifying questions, then give an honest reaction.</strong>
      </div>
      <p><strong>Beats:</strong></p>
      <ol>
        <li>
          <strong>Acknowledge the design.</strong>
          <blockquote><p>&ldquo;The pattern of using ESLint&apos;s import resolution to figure out which test files are affected by a source change is clever; it reuses your existing module-boundaries graph.&rdquo;</p></blockquote>
        </li>
        <li>
          <strong>Probe one corner.</strong>
          <blockquote><p>&ldquo;How do you handle the case where a test imports a util via a barrel file and the util file changes — does the chain catch that?&rdquo;</p></blockquote>
        </li>
        <li>
          <strong>Connect to your own work.</strong>
          <blockquote><p>&ldquo;At PowerSchool we did something analogous for API tests using the OpenAPI spec as the dependency graph. The failure mode I hit most was <em>false negatives</em> — tests that <em>should</em> have run didn&apos;t, because we under-traced the dep graph. How are you guarding against that?&rdquo;</p></blockquote>
        </li>
        <li>
          <strong>Offer one concrete suggestion.</strong>
          <blockquote><p>&ldquo;For the rollout, would you consider running the full suite <em>and</em> the affected-only set in parallel for two weeks, and scoring divergence? That&apos;s how I&apos;d avoid silently shipping a regression.&rdquo;</p></blockquote>
        </li>
      </ol>
      <p><strong>Trap:</strong> Don&apos;t say &ldquo;I&apos;d ship this&rdquo; or &ldquo;looks good&rdquo; without engagement. Don&apos;t try to redesign it on the spot.</p>

      <hr />

      <h2>Q3 — &ldquo;How would you approach upgrading Cypress / Chromium next time, given what you saw in our git log?&rdquo;</h2>
      <p><strong>Have an opinion.</strong> Beats:</p>
      <ol>
        <li>
          <strong>Shadow upgrade workflow.</strong> &ldquo;I&apos;d keep a non-blocking job that runs the suite weekly against the next major Chromium, so we catch realhover/scroll regressions in advance.&rdquo;
        </li>
        <li>
          <strong>Centralise the helper layer.</strong> &ldquo;<code>e2e-ui-elements-helpers.js</code> and the scroll helpers — so a Chromium-version change is a 1-line PR plus the helper update, not a 20-spec diff.&rdquo;
        </li>
        <li>
          <strong>Question bundled Chromium itself.</strong> &ldquo;I&apos;d consider whether we need bundled Chromium at all, or pin a Docker image with a known browser version and decouple the upgrade entirely.&rdquo;
        </li>
      </ol>
      <p><strong>Trap:</strong> Don&apos;t bash Cypress. Many CI engineers are in the &ldquo;Cypress is bad&rdquo; camp; <strong>Fraser is not</strong>. He has invested deeply.</p>

      <hr />

      <h2>Q4 — &ldquo;We just migrated to bun. What are the failure modes you&apos;d worry about?&rdquo;</h2>
      <ol>
        <li><strong>Native-binary packages</strong> (cypress, esbuild, etc.) needing per-arch <code>patches/</code>.</li>
        <li><strong>Lockfile churn</strong> in PRs that update unrelated deps.</li>
        <li><strong><code>bun install</code> cold-cache vs warm-cache</strong> behaviour in CI runners.</li>
        <li>The <code><strong>minimumReleaseAge</strong></code> setting they added to mitigate supply-chain attacks — <em>engage with that pattern positively</em>.</li>
      </ol>
      <p><strong>Trap:</strong> Don&apos;t claim deep bun expertise if you don&apos;t have it. Treat it as &ldquo;here&apos;s what I&apos;d watch for based on similar migrations.&rdquo;</p>

      <hr />

      <h2>Q5 — &ldquo;If you joined Monday, what&apos;s the first PR you&apos;d open?&rdquo;</h2>
      <div className="prep-callout">
        <strong>Anchor:</strong> Pick something <em>small, scoped, and visible</em> — <strong>not</strong> the four-axis dashboard moonshot. Best candidates given your résumé:
      </div>
      <ul>
        <li>
          <strong>Weekly Trunk flake digest.</strong> &ldquo;A weekly job that scrapes Trunk&apos;s flake report and posts the top-10 flake offenders to <code>#engineering-ci</code> with file owners auto-tagged&rdquo; — directly extends Fraser&apos;s <code>affected-tests-stats.js</code> pattern.
        </li>
        <li>
          <strong>Extend the decide-what-runs graph.</strong> &ldquo;Adding test-suites coverage to the <code>decide-what-runs</code> job for the embedding-sdk specs, since those don&apos;t currently feed into the affected-tests graph.&rdquo;
        </li>
        <li>
          <strong>Document the Cypress upgrade saga as a runbook.</strong> &ldquo;Documenting the <code>prepare-cypress/action.yml</code> history as a runbook so the next browser upgrade has a checklist.&rdquo;
        </li>
      </ul>
      <p><strong>Trap:</strong> Don&apos;t pitch a refactor of <code>run-tests.yml</code>. He owns it. He&apos;ll feel territorial.</p>

      <hr />

      <h2>Q6 — &ldquo;Why CI engineering, after a decade in QA?&rdquo;</h2>
      <blockquote>
        <p>
          &ldquo;QA at PowerSchool taught me that the lever isn&apos;t writing more tests — it&apos;s making the
          feedback loop fast and reliable enough that engineers <em>want</em> to use it. The release cockpit and the
          agent platform were both that realization in different forms. CI engineering is the same job, scaled to a
          different audience: instead of helping QA scale, you&apos;re helping every engineer move faster.&rdquo;
        </p>
      </blockquote>
      <p><strong>Trap:</strong> Don&apos;t disparage QA. You&apos;re the one with QA on your résumé.</p>

      <hr />

      <h2>Q7 — &ldquo;You haven&apos;t shipped Clojure. Will that hurt you?&rdquo;</h2>
      <blockquote>
        <p>
          &ldquo;No, but I&apos;m honest about the ramp. The CI surface is mostly YAML, JS/TS, and Bash. The Clojure
          I&apos;d encounter is reading <code>mage/src/mage/modules.clj</code> and a handful of build scripts.
          Pair-reading 30 minutes a week for a month and I&apos;d be autonomous. Anything I&apos;d write fresh
          I&apos;d default to TypeScript, given your direction in the May commits.&rdquo;
        </p>
      </blockquote>
      <p><strong>Trap:</strong> Don&apos;t dismiss it. Fraser ships Clojure occasionally too.</p>

      <hr />

      <h2>Q8 — &ldquo;Anything we haven&apos;t covered?&rdquo;</h2>
      <p>One short beat:</p>
      <blockquote>
        <p>
          &ldquo;One thing — I noticed the team grew from 2 to 3 in late April. I&apos;d want to understand from you
          what slice of work you&apos;d want a 4th DevEx engineer to own, ideally non-overlapping with you, Nemanja,
          and Romeo. I have an opinion but I&apos;d rather hear yours first.&rdquo;
        </p>
      </blockquote>
      <p>
        <strong>Why it works:</strong> signals you&apos;ve understood the team shape, you respect the existing division
        of work, and you&apos;re not coming in to step on toes.
      </p>

      <hr />

      <h2>The closing move</h2>
      <p>When he says &ldquo;we&apos;re at time&rdquo;:</p>
      <blockquote>
        <p>
          &ldquo;Thanks Fraser. Two things — first, I&apos;d really like to look at the affected-tests branch more
          carefully tonight and send you a short doc with the false-negative concern I mentioned, plus a
          rollout-shadowing idea. I&apos;ll keep it to one page. Second, on the DevEx team-of-four question —
          I&apos;d like to think about the slice you mentioned and come back with a one-pager on what
          &lsquo;observability + flake-triage&rsquo; would look like as a dedicated remit. Should land in your inbox
          by Wednesday your time.&rdquo;
        </p>
      </blockquote>
      <p>This achieves three things, all pointing at the JD&apos;s &ldquo;without being asked&rdquo; mantra:</p>
      <ul>
        <li>Treats his work as worthy of <em>peer review</em>, not just admiration.</li>
        <li>Commits to two short async deliverables on a deadline he can verify.</li>
        <li>Frames you as already operating as a teammate, not a candidate.</li>
      </ul>
      <p><em>If you only have time for one of those follow-ups, do the team-shape one — it&apos;s higher-leverage.</em></p>

      <hr />

      <h2>Day-of file checklist</h2>
      <p>Have these tabs open <em>before</em> the call:</p>
      <ul>
        <li><code>.github/workflows/run-tests.yml</code> — the orchestrator he&apos;s actively modifying.</li>
        <li><code>.github/actions/prepare-cypress/action.yml</code> — his most-touched file (93 FY26 commits).</li>
        <li><code>.github/workflows/module-boundaries-stats.yml</code> — his shipped module-metrics work.</li>
        <li><code>eslint.config.module-boundaries.mjs</code> — the selective-enforcement config.</li>
        <li><code>frontend/lint/module-boundaries.mjs</code> — the lint rule he iterated.</li>
        <li><code>.github/team.json</code> (DevEx section) — confirm team composition out loud if asked.</li>
        <li>This prep doc collapsed to the Fraser pages for last-minute scan.</li>
      </ul>
    </article>
  );
}
