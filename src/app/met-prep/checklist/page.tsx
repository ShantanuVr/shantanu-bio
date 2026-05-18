export const metadata = { title: "Day-of checklist · Met Prep" };

export default function Checklist() {
  return (
    <article>
      <div className="mb-2 font-mono text-[11px] uppercase tracking-[0.2em] text-[#22d3ee]">
        Day-of · Final checklist
      </div>
      <h1>Day-of checklist</h1>

      <h2>Tonight (the night before)</h2>
      <ul>
        <li><span className="prep-kbd">[ ]</span> Run <code>./bin/mage doctor</code> — first run takes time, do it now.</li>
        <li><span className="prep-kbd">[ ]</span> Run <code>bun install</code> in the metabase repo.</li>
        <li><span className="prep-kbd">[ ]</span> Open <code>.github/workflows/run-tests.yml</code> in your editor.</li>
        <li><span className="prep-kbd">[ ]</span> Open <code>.github/workflows/e2e-tests.yml</code> &amp; <code>e2e-test.yml</code>.</li>
        <li><span className="prep-kbd">[ ]</span> Open <code>.github/scripts/build-e2e-matrix.js</code> in your editor.</li>
        <li><span className="prep-kbd">[ ]</span> Open <code>mage/src/mage/modules.clj</code> — scroll to <code>driver-decision</code> (lines 313-530).</li>
        <li><span className="prep-kbd">[ ]</span> Open <code>release/README.md</code> — read all 63 lines.</li>
        <li><span className="prep-kbd">[ ]</span> Read <code>docs/developers-guide/e2e-tests.md</code> end-to-end (291 lines).</li>
        <li><span className="prep-kbd">[ ]</span> Skim <code>vamsiperi.com</code> for any post you can naturally cite.</li>
        <li><span className="prep-kbd">[ ]</span> Rehearse the <a href="/met-prep/opener">90-sec opener</a> aloud, 3 times.</li>
        <li><span className="prep-kbd">[ ]</span> Pick top 3 questions to ask Vamsi (lead with #1, the four-axis one).</li>
        <li><span className="prep-kbd">[ ]</span> Pick ONE story for &ldquo;worst CI outage&rdquo; with numbers ready.</li>
        <li><span className="prep-kbd">[ ]</span> Read <a href="/met-prep/cheat-sheet">the cheat sheet</a> top-to-bottom once.</li>
        <li><span className="prep-kbd">[ ]</span> Set 7-hour sleep alarm. <strong>Sleep is the highest-leverage prep.</strong></li>
      </ul>

      <h2>1 hour before the call</h2>
      <ul>
        <li><span className="prep-kbd">[ ]</span> Re-read <a href="/met-prep/cheat-sheet">cheat sheet</a> + <a href="/met-prep/vocabulary">vocabulary</a>.</li>
        <li><span className="prep-kbd">[ ]</span> Re-read <a href="/met-prep/vamsi">Vamsi&apos;s profile</a>.</li>
        <li><span className="prep-kbd">[ ]</span> Re-read your <a href="/met-prep/opener">90-sec opener</a> — beats only, no script.</li>
        <li><span className="prep-kbd">[ ]</span> Re-read <a href="/met-prep/risk-disarms">risk disarms</a>.</li>
        <li><span className="prep-kbd">[ ]</span> Hot drink + water bottle within reach.</li>
      </ul>

      <h2>15 minutes before</h2>
      <ul>
        <li><span className="prep-kbd">[ ]</span> Tabs open: <code>github.com/metabase/metabase/actions</code>, <code>run-tests.yml</code>, <code>vamsiperi.com</code> (closed but recently viewed), this prep page.</li>
        <li><span className="prep-kbd">[ ]</span> Phone on Do Not Disturb.</li>
        <li><span className="prep-kbd">[ ]</span> Camera angle / lighting / background check.</li>
        <li><span className="prep-kbd">[ ]</span> Audio test (mic and speaker).</li>
        <li><span className="prep-kbd">[ ]</span> No notes visible on camera. Notes can be on a second screen, eye-line up.</li>
        <li><span className="prep-kbd">[ ]</span> Resume PDF open in another tab — <a href="/ShantanuVichare.pdf" download className="text-[#7dd3fc]">download here</a>.</li>
      </ul>

      <h2>2 minutes before — the energy reset</h2>
      <ul>
        <li><span className="prep-kbd">[ ]</span> Stand up. 30 seconds of fast breathing.</li>
        <li><span className="prep-kbd">[ ]</span> Smile at the camera. (Reset your default face.)</li>
        <li><span className="prep-kbd">[ ]</span> Repeat to yourself: <em>&ldquo;This is a peer conversation, not an interrogation. Match his frequency, not his title.&rdquo;</em></li>
        <li><span className="prep-kbd">[ ]</span> Sit down. Posture up. Hands ready.</li>
      </ul>

      <h2>During the call — the rules</h2>
      <ul>
        <li><strong>Default to brief.</strong> 60-90 seconds per answer. One concrete number. Stop. Let him probe.</li>
        <li><strong>If you don&apos;t know — say so.</strong> Then say what you&apos;d Google or ask. Vamsi values that more than bluffing.</li>
        <li><strong>Numbers, every time.</strong> Zero P0, 70% cut, 80% cut, 4h → 15min, 30+ vulns, 20+ engineers.</li>
        <li><strong>Pre-empt the timezone question.</strong> If 20 minutes in he hasn&apos;t asked, you raise it. &ldquo;5h overlap with US East from day one — happy to put it in writing.&rdquo;</li>
        <li><strong>Reference his commits.</strong> claude.yml. auto-request-review token swap. ET-aligned cron. Chromatic label-gating.</li>
        <li><strong>Never criticize PowerSchool.</strong> 10 years at MS — he respects long tenure.</li>
        <li><strong>Use his vocabulary.</strong> &ldquo;Speed, reliability, efficiency, engagement.&rdquo; &ldquo;Uberjar.&rdquo; &ldquo;App db&rdquo; vs &ldquo;driver target.&rdquo;</li>
      </ul>

      <h2>The closing — 90 seconds, do not skip</h2>
      <p>When he says &ldquo;we&apos;re at time&rdquo;:</p>
      <blockquote>
        <p>
          &ldquo;Thanks Vamsi. Two quick things before we wrap. First, I&apos;d like to send you a one-page write-up
          tonight on how I&apos;d approach the four-axis CI dashboard in the first 90 days — based on what you
          said about [the specific axis he named]. Second, on the timezone — I&apos;d commit to a 5-hour overlap
          with US East starting day one, and I&apos;m happy to put that in writing. Looking forward to next
          steps.&rdquo;
        </p>
      </blockquote>

      <h2>Tonight after the call</h2>
      <ul>
        <li><span className="prep-kbd">[ ]</span> 5 minutes: write down what you said, what he said, what surprised you.</li>
        <li><span className="prep-kbd">[ ]</span> Write the one-pager you promised. Markdown, 1 page, headed &ldquo;CI 4-Axis Dashboard — 90-day plan&rdquo;. Sections: <strong>What I&apos;d measure / Where the data lives today / Week 1, Week 4, Week 12 / Open questions for you.</strong></li>
        <li><span className="prep-kbd">[ ]</span> Send the one-pager + a 3-line follow-up email.</li>
        <li><span className="prep-kbd">[ ]</span> Sleep.</li>
      </ul>

      <h2>The energy mantra</h2>
      <div className="prep-callout prep-callout-good">
        <p>
          <strong>You are interviewing for a job that already does most of the right things.</strong> Your edge
          is showing that you can extend the discipline they already have. You&apos;re not pitching a rebuild —
          you&apos;re joining a team that values careful operators.
        </p>
        <p>
          <strong>Vamsi went from IIT Bombay through Morgan Stanley the same way you went from your B.E.
            through Quick Heal and FireEye.</strong> Match his frequency, not his title.
        </p>
      </div>

      <p className="text-center font-mono text-sm text-[#7dd3fc]">Good luck. You&apos;ve done the work. Now go.</p>
    </article>
  );
}
