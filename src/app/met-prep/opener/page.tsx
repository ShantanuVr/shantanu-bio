export const metadata = { title: "90-sec opener · Met Prep" };

export default function Opener() {
  return (
    <article>
      <div className="mb-2 font-mono text-[11px] uppercase tracking-[0.2em] text-[#fbbf24]">
        The Vamsi Round · Opener
      </div>
      <h1>Your 90-second opener</h1>

      <p>
        <strong>Don&apos;t memorize word-for-word.</strong> Memorize the four beats: zero-P0, 80% via agents,
        MERN cockpit, why this role. Let the words come fresh.
      </p>

      <h2>The script</h2>
      <blockquote>
        <p>
          &ldquo;I&apos;ve spent the last decade making large engineering organisations ship more reliably without
          slowing them down. Most recently at PowerSchool, I&apos;ve owned quality for Schoology — a cloud SaaS
          used by tens of millions of students — and kept it at <strong>zero P0 incidents for four straight
            years</strong> while cutting regression runtime <strong>70%</strong> with containerised
          Playwright/WebdriverIO across ephemeral environments.
        </p>
        <p>
          About two years ago I shifted the team from people-running-tests to an agentic platform: GitHub
          Copilot Background Agents plus Playwright, Browser, and Jira MCPs, anchored to live OpenAPI
          contracts so the agents don&apos;t hallucinate. That cut manual QA effort by <strong>~80%</strong> and
          let us ship same-day to prod. The piece I&apos;m proudest of is a MERN-stack release cockpit that
          compresses our release checklist from <strong>4 hours to 15 minutes</strong> — basically a CI
          observability dashboard for the whole tribe.
        </p>
        <p>
          What pulled me to this role: Metabase already has the <em>right</em> CI structure — immutable
          caches, the e2e matrix split, Trunk-mediated flakes, the <code>mage driver-decisions</code> priority
          chain — and the gap I see is exactly the dashboard-and-prioritisation work I&apos;ve been doing at
          PowerSchool, scaled to a 70-engineer open-source org. I&apos;d like to be the one who owns that.&rdquo;
        </p>
      </blockquote>

      <h2>Why each beat lands</h2>
      <table>
        <thead>
          <tr>
            <th>Beat</th>
            <th>Why it works for Vamsi specifically</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Zero P0 over four years</strong></td>
            <td>Mirrors his News Feed reliability framing. Numeric, durable, defensible.</td>
          </tr>
          <tr>
            <td><strong>70% regression cut + 4h → 15min</strong></td>
            <td>Dollars-and-dev-hours framing. Cost-literate. Exactly the math he wants to hear.</td>
          </tr>
          <tr>
            <td><strong>Agentic platform anchored to OpenAPI</strong></td>
            <td>He shipped and killed claude.yml in 23 days. You sound like someone past the hype.</td>
          </tr>
          <tr>
            <td><strong>Naming <code>mage driver-decisions</code></strong></td>
            <td>Proves you read the codebase. Specific &gt; generic any day.</td>
          </tr>
          <tr>
            <td><strong>&ldquo;I&apos;d like to be the one who owns that&rdquo;</strong></td>
            <td>The proactive ownership phrasing the JD asks for three times.</td>
          </tr>
        </tbody>
      </table>

      <h2>Delivery notes</h2>
      <ul>
        <li><strong>Eyes up, not at notes.</strong> If you stumble, recover with the next beat — don&apos;t restart.</li>
        <li><strong>Pace.</strong> 90 seconds means ~225 words at conversational pace. The script above is ~210 — give yourself room to breathe.</li>
        <li><strong>Land on the question.</strong> Stop after &ldquo;own that.&rdquo; Let him pick which thread to pull. <em>Don&apos;t rush into the next thing.</em></li>
        <li><strong>Energy.</strong> This is a peer conversation, not a pitch. He&apos;s judging whether he&apos;d want a Slack DM from you at 9pm.</li>
      </ul>

      <h2>Rehearsal protocol (the night before)</h2>
      <ol>
        <li>Read it through aloud twice, slow.</li>
        <li>Close the tab. Try to deliver the four beats from memory.</li>
        <li>Open this page again, find the beats you missed, re-read.</li>
        <li>Repeat once more. Stop. Don&apos;t over-rehearse — over-rehearsed sounds canned.</li>
      </ol>

      <div className="prep-callout">
        <strong>One more rehearsal in the morning.</strong> Beats only, no script. If you can land the four
        beats in any order without notes, you&apos;re ready.
      </div>
    </article>
  );
}
