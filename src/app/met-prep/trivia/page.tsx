export const metadata = { title: "Bash/GHA trivia · Met Prep" };

const items: { q: string; a: string }[] = [
  {
    q: "Why continue-on-error: true on the test step?",
    a: "Because the analytics uploader (Trunk) controls the real exit code. A quarantined-only failure should not turn the job red. The uploader's previous-step-outcome input checks the quarantine list and decides pass/fail.",
  },
  {
    q: "Why actions/cache/restore@v4 and not actions/cache@v4 in non-generator jobs?",
    a: "Cache immutability. Exactly one writer (cache-generator.yml on Mondays). Every other job is read-only. Two parallel writers would produce non-deterministic caches.",
  },
  {
    q: "Why merge_group: trigger on run-tests.yml?",
    a: "Required for GitHub merge queues. When a PR is queued, GH creates a synthetic merge_group ref and runs CI on it before merging.",
  },
  {
    q: "Why concurrency groups like ${{ github.workflow }}-${{ github.head_ref && github.ref || github.run_id }}-e2e?",
    a: "Cancel-in-progress on the same PR (head_ref makes the group PR-unique), but never collapse two distinct master runs (head_ref empty → falls back to ref, which is unique per master commit). Belt-and-suspenders fallback to run_id.",
  },
  {
    q: "Why permissions: id-token: write?",
    a: "Required for OIDC against AWS in aws-actions/configure-aws-credentials@v4. No long-lived secrets — short-lived federated tokens instead.",
  },
  {
    q: "Difference between github.event.pull_request.head.sha and github.sha?",
    a: "On PRs, github.event.pull_request.head.sha is the actual commit pushed by the engineer. github.sha is the synthetic merge commit GH creates by merging head into base. Use head.sha when you need to fetch artifacts built on the engineer's commit.",
  },
  {
    q: "paths-ignore vs paths — can you combine them?",
    a: "No — they're mutually exclusive on the same event. Use one. Metabase uses dorny/paths-filter as a job-level filter instead, because it's more expressive than the on: trigger filter.",
  },
  {
    q: "What does mage do?",
    a: "In-repo Clojure CLI tool (./bin/mage ...). CI helpers: kondo, eastwood, lint-migrations, driver-decisions. Source: mage/src/mage/. Babashka tasks live alongside in bb.edn (48KB).",
  },
  {
    q: "Why dorny/paths-filter and not the on: trigger paths filter?",
    a: "Two reasons. First, paths-filter at the job level produces outputs that downstream jobs can consume (skip: inputs). Second, file-paths.yaml uses YAML anchors (*shared_ci) for category reuse — paths-filter supports this; on: filters don't.",
  },
  {
    q: "How does a docs-only PR satisfy required checks if tests don't run?",
    a: "Reusable workflows are still called with skip: true. The skip path emits a -tests-result job that returns success-equivalent. Required checks resolve green without actually running the tests.",
  },
  {
    q: "What's :partition/total and :partition/index?",
    a: "Clojure test runner partition flags. Used in app-db.yml to shard backend tests two ways (partition/total 2, partition/index 0|1). Same mechanism is reused for OSS part 1 / part 2.",
  },
  {
    q: "What does dry-run: true mean on the Trunk uploader?",
    a: "JUnit is uploaded but not used to update the quarantine model. Set true on draft PRs and on forks → flakes are not learned from those. Critical for OSS — third-party PRs don't pollute the model.",
  },
  {
    q: "What's cypress-split's contract?",
    a: "Reads SPLIT (total chunks), SPLIT_INDEX (this chunk), SPLIT_FILE (timings JSON), SPLIT_OUTPUT_FILE (where to write new timings), SPLIT_TIME_THRESHOLD (rebalance trigger). Distributes specs to balance chunk wall-clock time.",
  },
  {
    q: "How does the smart retry work in e2e-test.yml?",
    a: "On run_attempt != 1, the job downloads the failed-tests-* artifact from the prior attempt, parses the failed spec list, and writes specs=<csv> to $GITHUB_ENV. The spec runner reads $specs and runs only those.",
  },
  {
    q: "Why fixed ports in e2e-prepare-containers' docker-compose?",
    a: "Cypress and the Metabase backend connect to known endpoints — postgres on 5432, mongo on 27017, etc. Random ports would require dynamic config injection. Fixed ports + per-job runner isolation is the simpler tradeoff.",
  },
];

export default function Trivia() {
  return (
    <article>
      <div className="mb-2 font-mono text-[11px] uppercase tracking-[0.2em] text-[#7dd3fc]">
        Conversation fuel · Bash / GHA trivia
      </div>
      <h1>Probable trivia probes — answer in one breath</h1>

      <p>
        These are the &ldquo;why is this written this way?&rdquo; questions. The CI panel will pick three or four
        of them at random. Don&apos;t over-explain — one breath each, then stop.
      </p>

      <div className="not-prose mt-6 space-y-3">
        {items.map((it, i) => (
          <section key={i} className="prep-card">
            <h3 className="mb-1 text-[15px] font-semibold text-white">
              <span className="font-mono text-[11px] text-[#7dd3fc]">Q{i + 1}.</span> {it.q}
            </h3>
            <p className="m-0 text-[15px] leading-relaxed text-[#cfd6df]">{it.a}</p>
          </section>
        ))}
      </div>
    </article>
  );
}
