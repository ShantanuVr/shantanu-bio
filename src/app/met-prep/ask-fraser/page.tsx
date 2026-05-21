export const metadata = { title: "Questions to ask Fraser · Met Prep" };

export default function AskFraser() {
  return (
    <article>
      <div className="mb-2 font-mono text-[11px] uppercase tracking-[0.2em] text-[#f472b6]">
        The Fraser Round · Questions to ask him
      </div>
      <h1>Questions to ask Fraser — prioritized</h1>

      <p>
        Ask <strong>3 of these</strong>. <strong>Lead with #1</strong> — it proves you found his bleeding-edge work
        and asks a real engineering question, not a generic one.
      </p>

      <h2>1 — The affected-tests rollout plan <span className="text-sm font-normal text-[#838d9c]">(lead with this)</span></h2>
      <blockquote>
        <p>
          &ldquo;I want to ask about the affected-tests / decide-what-runs work I saw on the branch — assuming
          you&apos;re able to talk about it. What&apos;s the rollout plan? Are you running affected-only and
          full-suite in parallel for a while to score divergence, or are you confident enough to flip directly?&rdquo;
        </p>
      </blockquote>
      <p>
        <strong>Why it lands:</strong> It proves you found his bleeding-edge work. It asks a <em>real</em> engineering
        question, not a generic one. The answer tells you what stage he&apos;s at and what kind of help he&apos;d
        actually want.
      </p>

      <h2>2 — The 4th DevEx slot</h2>
      <blockquote>
        <p>
          &ldquo;The DevEx team grew from 2 to 3 in late April with Romeo joining. If I were the 4th, what&apos;s the
          slice of work that you&apos;d want me to own — ideally one that doesn&apos;t overlap with what you,
          Nemanja, or Romeo are already doing? Or is the role intentionally a generalist?&rdquo;
        </p>
      </blockquote>
      <p>
        <strong>Why it lands:</strong> Signals you&apos;ve read the team&apos;s commit history (you know about
        Romeo&apos;s recent move). Surfaces the unspoken question of <em>role definition</em> in a small team.
        Forces a clear answer that helps you understand fit.
      </p>

      <h2>3 — The Cypress-Chromium post-mortem</h2>
      <blockquote>
        <p>
          &ldquo;The Cypress-Chromium upgrade chain in February — 14 days, 93 commits to{" "}
          <code>prepare-cypress/action.yml</code>, ten numbered scroll fixes. What&apos;s the post-mortem? What would
          you change about how that landed?&rdquo;
        </p>
      </blockquote>
      <p>
        <strong>Why it lands:</strong> It&apos;s vulnerable — you&apos;re asking him to talk about a hard time, in
        detail. People who&apos;d be good teammates respond to this question <em>warmly</em>. People who
        wouldn&apos;t, deflect. The signal is genuine.
      </p>

      <h2>4 — Bun, measured <span className="text-sm font-normal text-[#838d9c]">(if there&apos;s time)</span></h2>
      <blockquote>
        <p>
          &ldquo;Bun was the third package manager you tried in four months. What was the actual measured win —
          install time? CI runner cost? Cold-start latency? And what&apos;s the next bottleneck you see now that bun
          is in?&rdquo;
        </p>
      </blockquote>
      <p>
        <strong>Why it lands:</strong> Treats the migration as a measured engineering decision, not a tech-fashion
        choice. Engineers who did the work love being asked to share the numbers.
      </p>

      <h2>5 — Backup fit-check</h2>
      <blockquote>
        <p>
          &ldquo;If you&apos;d hire me, what&apos;s the moment in the first 90 days where you&apos;d think{" "}
          &lsquo;great, this person is going to work out&rsquo;? And conversely — what&apos;s the moment that would
          make you worried?&rdquo;
        </p>
      </blockquote>
      <p>
        <strong>Why it lands:</strong> Asks for both signals. Most candidates only ask the upside. Useful for{" "}
        <em>your own</em> decision-making too.
      </p>

      <hr />

      <h2>Delivery notes</h2>
      <ul>
        <li><strong>Don&apos;t batch them.</strong> Ask one, listen fully, then choose the next based on his answer.</li>
        <li><strong>Take a beat after #1.</strong> If he opens up on the branch, follow with #3 (Cypress) — both are war-story openers and he&apos;ll be warmed up.</li>
        <li><strong>If he&apos;s cagey on #1,</strong> pivot to #2 (team shape) — it&apos;s safer territory and equally informative.</li>
        <li><strong>Save #5 for last</strong> if you do ask it — it reads as a closing question, not an opener.</li>
        <li><strong>Take notes visibly</strong> while he answers. Reinforces the &ldquo;peer, not candidate&rdquo; posture.</li>
      </ul>
    </article>
  );
}
