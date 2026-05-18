export const metadata = { title: "Loop & process intel · Met Prep" };

export default function Process() {
  return (
    <article>
      <div className="mb-2 font-mono text-[11px] uppercase tracking-[0.2em] text-[#7dd3fc]">
        Context · Loop &amp; process
      </div>
      <h1>The interview loop &amp; process intel</h1>

      <p>
        Three independent Glassdoor reports on Metabase&apos;s <strong>Success Engineer</strong> loop (different role,
        same recruiters, same VP-level screening culture, same panel rhythm). Translate the pattern.
      </p>

      <h2>Mapped interview flow (best estimate for CI Engineer)</h2>
      <ol>
        <li><strong>Recruiter intro</strong> — 30 min, logistics + culture screen.</li>
        <li><strong>Hiring manager / team-member</strong> — 30-45 min, light debug or &ldquo;tell me about your CI stack&rdquo; + team-fit.</li>
        <li><strong>VP Engineering (Vamsi)</strong> — 30-45 min, judgment + a focused exercise. <em>This is the round you&apos;re prepping for.</em></li>
        <li><strong>Panel: Communication</strong> — 45-60 min. Whiteboard / explain. Lean on the §5 prompts.</li>
        <li><strong>Panel: CI / Infrastructure deep-dive</strong> — 45-60 min. <code>run-tests.yml</code>, e2e split, Trunk integration, driver quarantine.</li>
        <li><strong>Take-home + demo</strong> — multi-day. Likely scoped to: instrument a real workflow, propose a structural improvement, or triage a flake pattern.</li>
        <li><strong>Cultural fit / vision</strong> — possibly with Sameer (CEO) or another senior leader.</li>
      </ol>

      <p>Plan for <strong>~6 distinct conversations and roughly 4 weeks of elapsed time.</strong> Block calendar.</p>

      <h2>Transferable signals from Success Engineer reports</h2>

      <h3>Expect an early hands-on debug screen.</h3>
      <p>
        Success Engineers got &ldquo;debug a React app&rdquo; or &ldquo;debug a SQL query&rdquo;. <strong>For CI Engineer the analog
          is almost certainly</strong> a broken workflow YAML, a flaky test, a misbehaving Bash script, or a
        &ldquo;walk us through <code>run-tests.yml</code>&rdquo; reading exercise.
      </p>
      <p>Before the interview:</p>
      <ul>
        <li>Have <code>./bin/mage doctor</code> passing on your machine (run it 24h ahead — first run takes time).</li>
        <li>Have run <code>bun install</code> + <code>clojure -X:dev:run</code> at least once.</li>
        <li>Have actually opened five <code>.github/workflows/*.yml</code> files in your editor.</li>
      </ul>

      <h3>The VP-level call is short, technical, and gated.</h3>
      <p>
        One Success report: <em>&ldquo;30 min call with VP of Success with a SQL query to complete.&rdquo;</em> Mirror
        prediction: your call with Vamsi will combine values/judgment + a focused technical task in 30 min.
      </p>
      <p>Don&apos;t waste time on chitchat. Have <code>run-tests.yml</code> open in a tab BEFORE the call.</p>

      <h3>Multi-panel loop has a dedicated Communication panel.</h3>
      <p>
        That&apos;s not soft-skill code; it&apos;s a real panel where you&apos;re judged on whether you can explain a technical
        thing crisply. <strong>Practice explaining one of these out loud in &lt;3 minutes, no notes:</strong>
      </p>
      <ol>
        <li>How a Metabase PR moves from <code>git push</code> to a green tick.</li>
        <li>Why caches are immutable and what would break if you violated that.</li>
        <li>The decision priority order in <code>mage -driver-decisions</code> (skip → labels → quarantine → master/release → deps-affected).</li>
      </ol>

      <h3>Take-home with demo is on the table.</h3>
      <p>
        Both Success reports mention it. Be ready for a 2-4-day take-home, likely involving instrumenting /
        improving a real piece of CI. Plan for a <strong>20-min demo + Q&amp;A</strong>.
      </p>
      <p>The deliverable that wins:</p>
      <ul>
        <li>A focused, working improvement.</li>
        <li>A written README that explains trade-offs.</li>
        <li>A &ldquo;what I&apos;d do next&rdquo; section.</li>
      </ul>

      <h3>A CEO/founder call may be the final round.</h3>
      <p>
        One report mentions a final &ldquo;Call with CEO&rdquo;. Sameer (the CEO) is highly likely to be in your loop if
        you reach the end. Prepare a <em>vision-level</em> answer to:
      </p>
      <ul>
        <li>&ldquo;Why open source?&rdquo;</li>
        <li>&ldquo;Where does CI sit in Metabase&apos;s product strategy 2-3 years out?&rdquo;</li>
      </ul>

      <h3>Cultural fit + vision alignment is its own round.</h3>
      <p>Don&apos;t treat the final round as a victory lap.</p>

      <h3>Recruiter communication can be slow.</h3>
      <p>
        Two reports flag silence on emails or last-minute cancellations. <strong>Counter-move:</strong> be the one
        who over-communicates. Send a brief recap after each round (&ldquo;here&apos;s what we covered, here&apos;s a follow-up
        thought I had&rdquo;). Ask for the next-step timeline explicitly. Don&apos;t sulk if a step is delayed.
      </p>

      <h3>The team has been hiring slowly and is picky.</h3>
      <p>
        Success role was vacant 10+ months. CI Engineer JD has been live a while too. Translate as: they will
        reject good candidates because they want a <em>very specific</em> shape — proactive + async written +
        CI-fluent + team-of-one comfortable. Don&apos;t drift on any of those four axes.
      </p>
      <p>
        If you sense an interviewer is unsure, name the gap and address it directly: <em>&ldquo;I notice I haven&apos;t
          shown you my async written work yet; I can share a Notion / docs sample after this call.&rdquo;</em>
      </p>

      <h3>&ldquo;You don&apos;t need to check every box&rdquo; — but they operate like you do.</h3>
      <p>
        One report calls this out as a contradiction. The honest read: they don&apos;t expect every checkbox, but
        they DO expect you to <em>acknowledge</em> every gap and have a credible plan to close it.
      </p>
      <p>Don&apos;t bluff over a missing skill. <strong>Name it, name your bridge.</strong></p>

      <h2>The post-round follow-up template</h2>
      <p>Send within 24 hours after every round:</p>
      <pre><code>{`Hi [Name],

Thanks for the conversation today. Quick recap of what we covered:
- [Topic 1]
- [Topic 2]
- [Topic 3]

One follow-up thought: [a specific, useful idea you had after the call —
not generic praise, an actual technical or process thought].

Looking forward to the next step. Could you share the rough timeline?

Best,
Shantanu`}</code></pre>

      <p>This template is your differentiator. Most candidates don&apos;t do this. The ones who get hired do.</p>
    </article>
  );
}
