export const metadata = { title: "Flake & quarantine · Met Prep" };

export default function Flake() {
  return (
    <article>
      <div className="mb-2 font-mono text-[11px] uppercase tracking-[0.2em] text-[#7dd3fc]">
        System · Flake &amp; quarantine
      </div>
      <h1>The two parallel quarantine systems</h1>

      <p>
        Don&apos;t conflate them. They&apos;re different layers, with different sources of truth, and
        different ownership.
      </p>

      <h2>1. Trunk.io — test-level quarantine</h2>
      <p>
        Third-party flake quarantine + test analytics service. Used via{" "}
        <code>trunk-io/analytics-uploader@main</code>.
      </p>
      <p>
        Wired through <code>.github/actions/upload-test-results/action.yml</code> (lines ~49-64). Key behaviors:
      </p>
      <ul>
        <li>JUnit also uploaded raw to S3 (<code>AWS_S3_TEST_RESULTS_BUCKET</code>) under <code>$DATE/$RUN_ID/$RUN_ATTEMPT/</code>.</li>
        <li><code>dry-run: true</code> on draft PRs and on forks → <strong>flakes are not learned from drafts or forks</strong>. (Important for OSS — third-party PRs don&apos;t pollute your model.)</li>
        <li>The previous test step ALWAYS sets <code>continue-on-error: true</code>.</li>
        <li>The uploader&apos;s <code>previous-step-outcome</code> input is <strong>what actually determines the GitHub job result</strong>.</li>
      </ul>

      <h2>2. Driver quarantine — Clojure layer</h2>
      <p>
        Lives in <code>mage/src/mage/modules.clj</code>. <strong>Different mechanism, different source of truth</strong>:
      </p>
      <ul>
        <li>List fetched live from <code>metabase/ci-test-config</code> (separate repo).</li>
        <li>PR label <code>break-quarantine-&lt;driver&gt;</code> overrides.</li>
      </ul>

      <div className="prep-callout">
        <strong>Don&apos;t mix these up in conversation.</strong> Trunk handles flaky <em>test cases</em>. The driver
        layer handles flaky <em>driver targets</em>.
      </div>

      <h2>The continue-on-error pattern (trivia probe)</h2>
      <p><strong>Q: &ldquo;Why <code>continue-on-error: true</code> on the test step?&rdquo;</strong></p>
      <blockquote>
        <p>
          &ldquo;Because the analytics uploader controls the real exit code. A quarantined-only failure should
          not turn the job red. The uploader checks the quarantine list and decides pass/fail. This is
          why every test job has the same shape: test step is non-fatal, uploader step is the gate.&rdquo;
        </p>
      </blockquote>

      <h2>Slack notification fabric</h2>
      <ul>
        <li><code>disabled-drivers-slack-notification.yml</code></li>
        <li><code>escalation-slack-notification.yml</code></li>
        <li><code>security-slack-notification.yml</code></li>
        <li><code>team-issues-slack-notification.yml</code></li>
      </ul>
      <p>
        Channels: <code>#engineering-ci</code>, <code>#engineering-ci-warnings</code> (release-status). Slack
        user / team mappings: <code>release/github-slack-map.json</code>.
      </p>

      <h2>Triage flow when something flakes (the script)</h2>
      <ol>
        <li><strong>Trunk first.</strong> Filter by spec, by time window, by variant.</li>
        <li><strong>S3 archive next.</strong> Trunk hides raw signal — go to <code>$DATE/$RUN_ID/$RUN_ATTEMPT/</code> for JUnit XML.</li>
        <li><strong>Group by chunk.</strong> Single chunk hot? Suspect ordering / inter-spec races.</li>
        <li><strong>Check timings PR.</strong> Bad averaging in <code>update-e2e-timings.yml</code> = over-packed chunks.</li>
        <li><strong>Check the cache.</strong> Stale cache = non-deterministic deps. <em>Fix the build, not the cache.</em></li>
        <li><strong>Check Docker images.</strong> maildev / openldap / snowplow micro version drift is classic.</li>
        <li><strong>Burn-in</strong> with <code>e2e-stress-test-flake-fix.yml</code> before and after the fix.</li>
        <li><strong>Communicate</strong> in <code>#engineering-ci</code> with links and timestamps.</li>
      </ol>

      <h2>The audit-story question (likely from Vamsi)</h2>
      <p>
        <strong>Q: &ldquo;Trunk does both flake quarantine and pass/fail. What if Trunk itself misbehaves?&rdquo;</strong>
      </p>
      <blockquote>
        <p>
          &ldquo;Two safety nets I&apos;d want in place. First, raw JUnit lives in S3 under a date-keyed path — that&apos;s
          the audit trail; we can re-derive truth without Trunk. Second, a kill-switch flag that flips the
          uploader step to <code>previous-step-outcome: failure</code> behavior — i.e. real exit code semantics —
          if Trunk is degraded. I&apos;d want it documented so anyone on call can flip it without deploying.&rdquo;
        </p>
      </blockquote>

      <h2>How you&apos;d handle &ldquo;mark my flaky test as quarantined&rdquo;</h2>
      <div className="prep-callout">
        Don&apos;t be the gatekeeper. Be the system. Default 14-day expiry on every quarantine entry,
        owning team attached, and an aging-out report that surfaces in the team&apos;s review queue.
        Soft no with a process, not a hard no with an opinion. <em>This is exactly the kind of answer
          Vamsi values — process over personality.</em>
      </div>
    </article>
  );
}
