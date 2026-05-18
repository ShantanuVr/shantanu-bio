export const metadata = { title: "Release pipeline · Met Prep" };

export default function Release() {
  return (
    <article>
      <div className="mb-2 font-mono text-[11px] uppercase tracking-[0.2em] text-[#7dd3fc]">
        System · Release pipeline
      </div>
      <h1>The release pipeline</h1>

      <p>
        You don&apos;t need to memorize 586 lines of <code>release.yml</code>. You need to know the <em>shape</em>:
        check version → start message → publish steps → tag → docker push → release notes → status update.
      </p>

      <h2>Three release modes</h2>
      <ol>
        <li>Automated CI (the normal path).</li>
        <li>GitHub-action-less local.</li>
        <li>Totally GitHub-less local (offline emergency).</li>
      </ol>
      <p>
        See <code>release/README.md</code> — only 63 lines.
      </p>

      <h2>The TypeScript release library</h2>
      <p>Lives at <code>release/src/</code>. Every file has a <code>*.unit.spec.ts</code> next to it.</p>
      <ul>
        <li><code>version-helpers.ts</code></li>
        <li><code>milestones.ts</code></li>
        <li><code>release-notes.ts</code></li>
        <li><code>slack.ts</code></li>
        <li><code>github.ts</code></li>
        <li><code>version-info.ts</code></li>
      </ul>

      <h2>Workflow flow</h2>
      <ol>
        <li><code>build-for-release.yml</code> — &ldquo;Release 0 — Build Release Artifact&rdquo;. <em>Only used in exceptional cases.</em></li>
        <li><code>tag-for-release.yml</code> — normal path, tags an already-built jar.</li>
        <li><code>release.yml</code> — &ldquo;Release 3 — Publish Release&rdquo;. Checks version isn&apos;t already released, sends Slack notifications, runs publish steps.</li>
        <li><code>cut-release-branch.yml</code>, <code>schedule-minor.yml</code>, <code>schedule-patch.yml</code> — branch cuts and scheduled releases.</li>
        <li><code>pre-release.yml</code>, <code>release-tests.yml</code>, <code>release-auto.yml</code> — pre-flight checks.</li>
      </ol>

      <h2>Backport automation</h2>
      <p>
        <code>auto-backport.yml</code> reads three labels — <code>backport</code> / <code>double-backport</code> /{" "}
        <code>triple-backport</code> — and <code>vars.CURRENT_VERSION</code> to open up to <strong>three</strong> backport PRs against
        the three latest release branches. Conflict resolution is in <code>resolve-backport-conflicts.yml</code>.
      </p>
      <ul>
        <li>Convention enforced by <code>backport-label-reminder</code> (Vamsi shipped this in #33799, Sep 2023): every PR must be labeled <code>backport</code> or <code>no-backport</code>.</li>
      </ul>

      <h2>Vamsi&apos;s release-pipeline commits — know these</h2>
      <ul>
        <li><strong>Jan 15 2025</strong> — &ldquo;Run nightly point releases at 4 pm ET&rdquo; (#52197). Changed <code>release-patch.yml</code> cron from <code>15 0 * * 2-6</code> (7:15 pm Eastern) to <code>0 21 * * 1-5</code> (4 pm Eastern). <em>He cares about ET-aligned scheduling and support coverage.</em></li>
        <li><strong>Aug 21 2024</strong> — &ldquo;fix auto request review fail&rdquo; (#47109). Switched from <code>secrets.GITHUB_TOKEN</code> to <code>secrets.METABASE_AUTOMATION_USER_TOKEN</code>. Replaced inline <code>migration-owners</code> with GH team <code>team:core-backend-components</code>. <em>He thinks token scopes + teams.</em></li>
        <li><strong>Aug 21–29 2023</strong> — Chromatic + Cloverage label-gating + master-only triggers (#33462, #33507, #33396, #33398). <em>He helped establish the label-gating idiom you see today in <code>pr-env.yml</code> and <code>e2e-stress-test-flake-fix.yml</code>. Don&apos;t pitch reinventing it.</em></li>
        <li><strong>Sep 7 2023</strong> — backport-label reminder (#33799).</li>
      </ul>

      <h2>The pricing tier matrix (4 premium tokens for tests)</h2>
      <ul>
        <li>Starter Cloud</li>
        <li>Pro Cloud</li>
        <li>Pro Self-Hosted</li>
        <li>All-Features (internal)</li>
      </ul>
      <p>
        Cypress tests need different tokens to exercise different tier-gated features. <strong>Be aware
          this exists</strong> — secrets management is part of the role.
      </p>

      <h2>OIDC / AWS</h2>
      <p>
        <code>pr-env.yml</code> deploys uberjar Docker images to ECR via AWS OIDC:
      </p>
      <pre><code>{`permissions:
  id-token: write
- uses: aws-actions/configure-aws-credentials@v4
  with:
    role-to-assume: ...`}</code></pre>
      <p>
        <strong>Why <code>id-token: write</code>?</strong> Required for OIDC against AWS — no long-lived secrets.
      </p>
    </article>
  );
}
