export const metadata = { title: "Questions to ask Vamsi · Met Prep" };

const questions: { rank: string; q: string; why: string; when: string }[] = [
  {
    rank: "1 (always lead with this)",
    q: "At Facebook you framed News Feed's KPIs across performance, reliability, efficiency, and engagement. If you applied that same four-axis lens to Metabase's CI today, which axis is doing the worst — and is that the one you'd want me focused on first?",
    why: "References a specific, public detail of his career. Hands him an easy, structured way to answer. The signal you get back is gold — it tells you which problem actually keeps him up at night.",
    when: "Always lead with this. It flatters without flattering, and pre-loads your follow-up.",
  },
  {
    rank: "2",
    q: "I saw the Claude Code workflow you shipped in July 2025 and removed three weeks later. I'd love to understand which part didn't hold — was it the trigger surface, token cost, or the politics of an agent commenting on every PR? I ask because I've shipped agent platforms at PowerSchool and the failure mode I hit most often was trigger noise.",
    why: "Demonstrates you read the repo's git log, not just the README. Opens a conversation he genuinely cares about — AI in CI is a live topic. Positions you as someone who has scars from this problem, not just opinions.",
    when: "Use after he's answered Q1 and has clearly opened up.",
  },
  {
    rank: "3",
    q: "In the JD it's a team of one. Six months from now, if this role is going well, what does my dashboard or weekly post in #engineering-ci actually look like? Concretely — what's on it, who reads it, and what action does it drive?",
    why: "Surfaces the unspoken success metric. Lets him pre-commit to what he'll evaluate you on, which de-risks the role for you.",
    when: "Use as your closer if there's a clean window.",
  },
  {
    rank: "4 (only if there's time)",
    q: "You spent ten years at Morgan Stanley growing from engineer to manager. As a VP now, when you bring in a team-of-one CI engineer, are you optimising for someone who eventually grows a CI/platform team — or for someone who stays deliberately leveraged-solo? Both are good answers; I'd just want to know what shape you're hiring for.",
    why: "Signals you're thinking past the first year. Uses his career arc respectfully without flattering. The answer tells you whether the role caps out as IC or has a management path.",
    when: "If he seems open and there's time.",
  },
  {
    rank: "5 (sense-of-room)",
    q: "What's the part of this role you find hardest to explain to candidates? I'd rather know upfront than discover it in month three.",
    why: "Signals self-awareness and that you're evaluating fit both ways.",
    when: "Use only if the conversation feels open enough.",
  },
  {
    rank: "6 (fallback)",
    q: "What would I have to do in the first 90 days for you to consider this an unambiguous win?",
    why: "Forces a concrete answer, gives you a measurable bar, ends the call on a forward-looking note.",
    when: "If you have <2 minutes left and need to land cleanly.",
  },
];

export default function AskVamsi() {
  return (
    <article>
      <div className="mb-2 font-mono text-[11px] uppercase tracking-[0.2em] text-[#fbbf24]">
        The Vamsi Round · Questions to ask
      </div>
      <h1>Questions to ask Vamsi — pick 3, in order</h1>

      <div className="prep-callout">
        <strong>Pick THREE.</strong> Don&apos;t ask all six — Vamsi will read that as performance. Lead with #1,
        always. The rest depend on the conversation flow.
      </div>

      <div className="not-prose mt-6 space-y-5">
        {questions.map((item, i) => (
          <section key={i} className="prep-card">
            <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#fbbf24]">
              Priority {item.rank}
            </div>
            <blockquote className="my-2 border-l-2 border-[#fbbf24] bg-[#1a1407] px-4 py-3 text-[15px] leading-relaxed text-[#f3d6a3]">
              <p>{item.q}</p>
            </blockquote>
            <p className="mb-1 text-sm leading-relaxed">
              <strong className="text-[#34d399]">Why it lands:</strong>{" "}
              <span className="text-[#cfd6df]">{item.why}</span>
            </p>
            <p className="text-sm leading-relaxed">
              <strong className="text-[#a78bfa]">When to use:</strong>{" "}
              <span className="text-[#aab3c0]">{item.when}</span>
            </p>
          </section>
        ))}
      </div>

      <h2>Bonus: questions to ask the panel (not Vamsi specifically)</h2>
      <p>If you reach the CI / Infra deep-dive panel, save these:</p>
      <ol>
        <li>What&apos;s the median wall-clock time for a green PR today, and what&apos;s the long pole? My read is the 50-way e2e split — am I right?</li>
        <li>How is the <code>metabase/ci-test-config</code> quarantine list maintained? Is there a review SLO before a quarantine becomes permanent?</li>
        <li>When a driver job is quarantined but the PR touches its module, the quarantine-conflict step blocks. How often do engineers reach for the <code>break-quarantine-&lt;driver&gt;</code> label legitimately vs as an escape hatch?</li>
        <li>Trunk does both flake quarantine and pass/fail. What&apos;s the audit story when Trunk itself misbehaves — kill-switch back to exit code semantics?</li>
        <li><code>update-e2e-timings.yml</code> averages timings from the last 7 days. Have you considered EWMA or per-PR-author cohorts to detect spec drift faster?</li>
        <li>The cache generator runs Mondays. How often have you had to manually trigger it, and is there a metric watching cache-miss rate per workflow?</li>
        <li>What does on-call look like for CI? Explicit rotation for release weeks vs flake weeks?</li>
        <li>What&apos;s the relationship between the release pipeline and downstream Docker repos? Are there other repos a CI engineer needs to know about, beyond <code>metabase/metabase</code> and <code>metabase/ci-test-config</code>?</li>
      </ol>
    </article>
  );
}
