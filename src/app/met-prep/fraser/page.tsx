export const metadata = { title: "Fraser · profile · Met Prep" };

export default function FraserProfile() {
  return (
    <article>
      <div className="mb-2 font-mono text-[11px] uppercase tracking-[0.2em] text-[#f472b6]">
        The Fraser Round · Profile + signals
      </div>
      <h1>Fraser McIntosh — profile, themes, what he tests for</h1>

      <p>
        This is the <strong>technical peer round</strong>. Vamsi was judgment/values; Fraser is{" "}
        <em>the engineer currently doing the work you&apos;re applying for</em>. He has no public LinkedIn and no
        conference presence. The only profile that matters is his commit history. The good news: it tells you almost
        everything.
      </p>

      <div className="prep-callout">
        <strong>One line frame:</strong> Fraser is in NZ doing a job almost no other engineering org does well. He
        works alone-but-on-a-small-team, ships fast, and just spent two weeks fighting a browser upgrade. He is{" "}
        <em>tired, proud of his work, and looking for help</em>. Walk in as someone who&apos;s been in the same trench,
        has nothing to prove, and is genuinely interested in his branch.
      </div>

      <h2>Who he is</h2>
      <ul>
        <li>
          <strong>GitHub: <code>fraserdrops</code></strong> (in <code>.github/team.json</code> and{" "}
          <code>release/github-slack-map.json</code>). <strong>Slack: <code>U08BWAHB80Y</code></strong>.
        </li>
        <li>
          <strong>941 commits</strong> to <code>metabase/metabase</code> across his work + personal emails. Vamsi
          has 48. <strong>Fraser ships ~20× more code than the VP.</strong>
        </li>
        <li>
          <strong>Joined Metabase ~Feb 2025</strong> (his &ldquo;Add fraserdrops to team lists&rdquo; PR is #53150).
          About <strong>15 months in</strong> by interview day.
        </li>
        <li>
          <strong>Based in New Zealand.</strong> Every commit timestamp is <code>+1200</code> (NZST) or{" "}
          <code>+1300</code> (NZDT). <strong>Enormous for you:</strong> Metabase already accommodates a Pacific-TZ
          DevEx engineer. Bengaluru ↔ NZ is a 6-7 hour gap — closer than NZ ↔ US-East. The &ldquo;you&apos;re in
          India&rdquo; objection is materially weaker here. <em>Mention if it lands naturally; don&apos;t flatter him with it.</em>
        </li>
      </ul>

      <h2>The DevEx team shape — you&apos;d be the 4th</h2>
      <p>
        DevEx is currently 3 engineers across NZ + 2 European/American timezones. Frame your answers accordingly —
        this is <strong>not</strong> &ldquo;team of one.&rdquo; It&apos;s &ldquo;small distributed team where each
        person owns a slice.&rdquo;
      </p>
      <ul>
        <li>
          <strong>Fraser McIntosh</strong> (<code>fraserdrops</code>) — 941 commits. The CI/E2E orchestration owner.
          Active on smart test selection, module boundaries, Cypress/Chromium, package-manager migration.
        </li>
        <li>
          <strong>Nemanja Glumac</strong> (<code>nemanjaglumac</code>) — 2,543 commits. Owns{" "}
          <strong>release engineering</strong>: backport automation, milestone management,{" "}
          <code>@prerelease</code> tag rename (#74264), release workflow consolidation (#74172), Cypress grep plugin
          upgrade (#70244). The release-pipeline cluster of workflows is largely his domain.
        </li>
        <li>
          <strong>Romeo Van Snick</strong> (<code>romeovs</code>) — 1,955 commits.{" "}
          <strong>Just joined DevEx on April 30, 2026</strong> (PR #73429, three weeks before your interview). Came
          from the frontend org. Works on Python runner CI, MBQL e2e helpers, module reorganisation.{" "}
          <em>Team is actively expanding. The role you&apos;re applying for is almost certainly the next DevEx hire.</em>
        </li>
      </ul>

      <h2>What he&apos;s actually been working on (most recent first)</h2>

      <h3 style={{ color: "#7dd3fc" }}>Theme A — Smart test selection / &ldquo;decide-what-runs&rdquo; (active, May 2026)</h3>
      <p>
        <strong>The single most important thing to know.</strong> As of mid-May 2026, Fraser is{" "}
        <strong>actively building smart test selection</strong> — figuring out which tests need to run for a given PR
        based on what files changed. On a feature branch, not yet merged. <strong>He will almost certainly screen-share it.</strong>
      </p>
      <p>Files:</p>
      <ul>
        <li><code>.github/scripts/affected-tests-stats.js</code></li>
        <li><code>frontend/lint/affected-tests.js</code> (new, branch-only)</li>
        <li><code>frontend/lint/test-suites.js</code> (new)</li>
        <li><code>frontend/lint/affected-tests.unit.spec.js</code> (new tests)</li>
        <li><code>.github/workflows/run-tests.yml</code> (heavy modifications)</li>
        <li><code>.github/workflows/frontend.yml</code></li>
      </ul>
      <p>Commit chain:</p>
      <ul>
        <li><strong>2026-04-29:</strong> &ldquo;Add affected tests into run tests&rdquo; — first cut, +404 lines.</li>
        <li><strong>2026-05-01:</strong> &ldquo;Tighten tests&rdquo; / &ldquo;Update tests.&rdquo;</li>
        <li><strong>2026-05-04:</strong> &ldquo;Add decide-what-runs job&rdquo; — refactors into a separate workflow job, +364/-149.</li>
        <li><strong>2026-05-04:</strong> &ldquo;Continue on error for the upload step&rdquo; — making the stats job non-blocking.</li>
        <li><strong>2026-05-05 → 2026-05-12:</strong> tidy-ups: &ldquo;Use dorny&apos;s all changed files,&rdquo; &ldquo;Use ts and bun,&rdquo; &ldquo;Add real table id.&rdquo;</li>
      </ul>
      <p>
        <strong>This is the conversation he wants to have.</strong> He&apos;s been on this for 2-3 weeks, it&apos;s
        not merged, and he&apos;d love peer review from someone who has done it before.{" "}
        <em>Your AI-context-graph + OpenAPI-grounded test generation work at PowerSchool is the closest analogue.</em>{" "}
        Connect them explicitly.
      </p>

      <h3 style={{ color: "#a78bfa" }}>Theme B — Module-boundary enforcement (Mar-Apr 2026)</h3>
      <p>Treats <em>frontend code modularity</em> as a CI metric. Shipped:</p>
      <ul>
        <li><strong>2026-03-14 (#70841):</strong> &ldquo;Add module metrics&rdquo; — <code>.github/workflows/module-boundaries-stats.yml</code>.</li>
        <li><strong>2026-03-29 (#71385):</strong> &ldquo;Fix module stats upload script.&rdquo;</li>
        <li>
          <strong>2026-04-14 (#72436): &ldquo;Selectively enforce module boundaries&rdquo;</strong> — adds{" "}
          <code>eslint.config.module-boundaries.mjs</code>, evolves <code>frontend/lint/module-boundaries.mjs</code>{" "}
          (+179/-50). The word <em>selectively</em> matters: the lint rule only fires on <em>new</em> violations
          relative to a baseline. <em>Sophisticated — incremental rollout of strictness without a big-bang refactor.</em>
        </li>
      </ul>
      <p>
        If asked about your DevSecOps blueprint, this is the analogue. Show you understand{" "}
        <em>incremental enforcement</em>, not just &ldquo;we lint.&rdquo;
      </p>

      <h3 style={{ color: "#fbbf24" }}>Theme C — Cypress + Chromium upgrade saga (Feb 2026)</h3>
      <p>
        A two-week debugging marathon. The most-touched file in his FY26 history is{" "}
        <code>.github/actions/prepare-cypress/action.yml</code> — <strong>93 commits in 2026 alone</strong>. The story:
      </p>
      <ul>
        <li>Tried to upgrade Cypress&apos;s bundled Chromium from v131 → v144.</li>
        <li>Hit <code>realhover</code> failures in the database-routing admin spec.</li>
        <li>Tried v112, v113, v114, v115, v131, v136-v144 in sequence.</li>
        <li>Hit a separate scroll-smooth bug — wrote 10 numbered &ldquo;Fix 01: animated scroll&rdquo; → &ldquo;Fix 10: native element.scrollTo smooth&rdquo; commits before settling on a fix.</li>
        <li><strong>Final ship: <code>da223ea0a1e</code> (2026-02-25, #69721)</strong> &ldquo;Updated Chromium to v144 in Cypress&rdquo; — touched <code>prepare-cypress/action.yml</code> + 8 e2e specs adjusted for scroll/hover assertions.</li>
      </ul>
      <p>
        <strong>This is a war story.</strong> Be ready to engage: what you&apos;d have done differently, how you&apos;d
        avoid this kind of upgrade pain (e.g., <em>shadow CI runs of new browser versions weekly so the regression is
        caught before the upgrade lands</em>).
      </p>

      <h3 style={{ color: "#34d399" }}>Theme D — Package manager migration: yarn → pnpm → bun (Nov 2025 - Feb 2026)</h3>
      <p>A 4-month, cross-cutting build-toolchain migration. Notable commits:</p>
      <ul>
        <li><strong>2025-11-26:</strong> &ldquo;Migrate to pnpm.&rdquo;</li>
        <li><strong>2025-12-01:</strong> &ldquo;Make release its own workspace&rdquo; — restructured the monorepo.</li>
        <li><strong>2025-12-19:</strong> &ldquo;Migrate to yarnv4&rdquo; — <em>they tried yarnv4 in parallel</em>.</li>
        <li><strong>2026-01-12:</strong> &ldquo;Generate bun.lock files,&rdquo; &ldquo;Remove pnpm files.&rdquo;</li>
        <li><strong>2026-02-11: &ldquo;Use bun package manager&rdquo; (#68170)</strong> — the canonical commit landing bun.</li>
        <li><strong>2026-02-12:</strong> &ldquo;Pin bun version in workflows&rdquo; (#69514).</li>
      </ul>
      <p>
        <strong>Why bun?</strong> Faster installs, faster CI cold-starts. Same dollars-and-dev-hours framing Vamsi
        cares about. Be conversant: bun ≈ 2-3× faster install vs npm/pnpm; trade-off is ecosystem maturity (some native-binary
        packages needed <code>patches/</code>).
      </p>

      <h3 style={{ color: "#22d3ee" }}>Theme E — Action plumbing modernisation (current, May 2026)</h3>
      <ul>
        <li><strong>2026-05-08:</strong> &ldquo;Use dorny&apos;s all changed files&rdquo; — switching paths-filter tools.</li>
        <li><strong>2026-05-12:</strong> &ldquo;Use ts and bun&rdquo; — converting JS CI scripts to TypeScript.</li>
      </ul>
      <p>Team-wide direction: <strong>CI scripts as first-class TS code, not throwaway JS.</strong></p>

      <h2>What he is testing for</h2>
      <p>Different from Vamsi. Fraser is a working engineer evaluating a future peer.</p>
      <ol>
        <li><strong>Can you read code at speed.</strong> Whether you can sit down with him on Monday and be useful.</li>
        <li><strong>Real CI scars.</strong> He has spent 14 days on a Chromium upgrade. He wants someone who&apos;s been in that mud.</li>
        <li><strong>Engineering taste.</strong> When he shows you his branch, the question isn&apos;t &ldquo;do you like it&rdquo; — it&apos;s &ldquo;what would you change, and why.&rdquo; Structural opinions, not nitpicks.</li>
        <li><strong>Pragmatism over ideology.</strong> He migrated yarn → pnpm → bun pragmatically. He won&apos;t respect a &ldquo;Trunk is bad&rdquo; or &ldquo;TS is the only way&rdquo; lecture.</li>
        <li><strong>Team-fit.</strong> DevEx is 3 people. Someone he&apos;d happily DM at 4pm-NZ. Warmth, low ego, written discipline.</li>
        <li><strong>Honesty about tradeoffs.</strong> &ldquo;We tried it, it didn&apos;t, here&apos;s what we learned&rdquo; — he&apos;ll respect it enormously.</li>
      </ol>

      <h2>Risk areas — pre-emptive disarms specific to Fraser</h2>
      <ul>
        <li>
          <strong>He&apos;s the incumbent.</strong> Biggest unspoken dynamic. The role might overlap with what{" "}
          <em>he</em> currently owns. <strong>Never imply you&apos;d &ldquo;fix&rdquo; what he built.</strong> Always
          frame as &ldquo;extend,&rdquo; &ldquo;instrument,&rdquo; &ldquo;scale&rdquo; what&apos;s there. Acknowledge
          his recent work by name (affected-tests, module-boundaries, bun) when relevant. Make him want you on the
          team, not threatened by you.
        </li>
        <li>
          <strong>You don&apos;t have his velocity.</strong> 941 commits in 15 months ≈ <strong>~3/day</strong>. He
          works very fast. If asked about shipping cadence, answer with shipped artifacts and rough numbers
          (&ldquo;averaged ~X meaningful PRs/week at PowerSchool&rdquo;), not promises.
        </li>
        <li>
          <strong>Cypress vs Playwright.</strong> Fraser has invested heavily in the Cypress/Chromium toolchain. Be
          respectful: &ldquo;Playwright is what I&apos;ve used; Cypress&apos;s bundled-Chromium pattern has trade-offs
          I&apos;d want to understand before having an opinion.&rdquo;
        </li>
        <li>
          <strong>TypeScript strictness.</strong> His &ldquo;Use ts and bun&rdquo; commit signals he&apos;s pulling
          the team toward TS-first CI scripts. If your CI scripts were mostly JS/Python, name that and say you&apos;d
          happily write new scripts in TS.
        </li>
        <li>
          <strong>&ldquo;Team of one&rdquo; JD vs reality.</strong> The JD says team of one; Fraser&apos;s existence
          says otherwise. Don&apos;t pretend. Acknowledge the team and frame your value as &ldquo;the 4th member,
          owning observability + flake-triage + a slice you decide.&rdquo;
        </li>
      </ul>

      <h2>Tonal calibration</h2>
      <ul>
        <li>NZ-based, asynchronous, peer-to-peer. Compress small talk. Get to the work fast.</li>
        <li>Project warmth and curiosity about <em>his</em> branch. Don&apos;t monologue.</li>
        <li>When you disagree, disagree with a question, not a verdict.</li>
        <li>Numbers and trade-offs. He&apos;s spent 4 months migrating package managers — he respects the work behind the choice.</li>
      </ul>
    </article>
  );
}
