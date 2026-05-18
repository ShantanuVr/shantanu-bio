export const metadata = { title: "Resume highlights · Met Prep" };

export default function Resume() {
  return (
    <article>
      <div className="mb-2 font-mono text-[11px] uppercase tracking-[0.2em] text-[#a78bfa]">
        Resume-grounded · Highlights
      </div>
      <h1>Resume — fast recall</h1>

      <div className="prep-callout">
        <a
          href="/ShantanuVichare.pdf"
          download
          className="font-semibold text-[#7dd3fc] hover:text-white"
        >
          Download Shantanu Vichare.pdf →
        </a>
        <br />
        Have it open in a tab during the call. Reference page numbers if Vamsi asks.
      </div>

      <h2>Headline</h2>
      <p>
        <strong>Shantanu Vichare — Lead SDET / QA Engineering, AI Quality Engineering Pioneer.</strong>
        Bengaluru, India. 10+ years of QA / SDET work. Currently <em>Lead QA Engineer</em> for{" "}
        <strong>Schoology at PowerSchool</strong> (6 years).
      </p>

      <h2>The numbers to drop into conversation</h2>
      <ul>
        <li><strong>Zero P0 incidents over 4 straight years</strong> for Schoology — used by tens of millions of students.</li>
        <li><strong>70% regression runtime cut</strong> via containerised Playwright/WebdriverIO across ephemeral environments.</li>
        <li><strong>~80% manual QA effort cut</strong> via the agentic platform.</li>
        <li><strong>55% → 95% regression coverage</strong> with the same agentic platform.</li>
        <li><strong>90%+ first-pass test-generation accuracy</strong> after grounding LLMs in OpenAPI specs.</li>
        <li><strong>4h → 15min</strong> release checklist via the MERN release cockpit.</li>
        <li><strong>Prompts-per-task: 15 → 2-3</strong> (predictable $/PR for AI gen).</li>
        <li><strong>30+ vulnerabilities caught pre-prod</strong> via the DevSecOps blueprint (OWASP ZAP, Burp, SAST, dependency audits).</li>
        <li><strong>20+ engineers mentored across 6 squads.</strong></li>
        <li>Earlier role at FireEye: instrumented a <strong>35% defect reduction</strong>.</li>
      </ul>

      <h2>Career arc</h2>
      <table>
        <thead>
          <tr><th>Org</th><th>Role</th><th>What it proves</th></tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>PowerSchool / Schoology</strong> (6 yr)</td>
            <td>Lead QA Engineer</td>
            <td>Multi-year ownership, large SaaS, agentic platform shipped, MERN cockpit shipped.</td>
          </tr>
          <tr>
            <td><strong>FireEye</strong></td>
            <td>SDET</td>
            <td>Security-tinged DevSecOps work; 35% defect reduction via instrumentation.</td>
          </tr>
          <tr>
            <td><strong>Quick Heal</strong></td>
            <td>Earlier QA / SDET</td>
            <td>Foundational; cybersecurity domain.</td>
          </tr>
        </tbody>
      </table>

      <h2>Education in flight</h2>
      <ul>
        <li><strong>MSc AI/ML</strong> — Liverpool John Moores University (LJMU), part-time, 1+ year in.</li>
        <li><strong>PGDip</strong> — IIIT Bangalore, part-time, 1+ year in.</li>
        <li>B.E. (foundational engineering degree).</li>
      </ul>

      <h2>The agentic platform — the headline project</h2>
      <ul>
        <li><strong>AI Context Graph</strong> (your name for the grounding layer).</li>
        <li><strong>Copilot Background Agents</strong> as the orchestrator.</li>
        <li><strong>Playwright MCP</strong>, <strong>Browser MCP</strong>, <strong>Jira MCP</strong> as tools.</li>
        <li>Anchored to live <strong>OpenAPI</strong> contracts → agents can&apos;t hallucinate endpoints.</li>
        <li>Cut manual QA effort ~80%, lifted regression coverage 55% → 95%.</li>
      </ul>

      <h2>The release cockpit — MERN, observability-first</h2>
      <ul>
        <li>MongoDB / Express / React / Node.</li>
        <li>Unified API layer pulling from Bamboo (CI), Jira (defects), Sonar (coverage), build artefacts.</li>
        <li>Compresses release checklist 4h → 15min.</li>
        <li><strong>Map to Metabase</strong>: same shape as the four-axis CI dashboard you&apos;ll pitch.</li>
      </ul>

      <h2>DevSecOps stack you can name-drop</h2>
      <ul>
        <li>OWASP ZAP, Burp Suite for DAST.</li>
        <li>SAST (SonarQube / similar) gated in CI.</li>
        <li>Dependency / SCA audits as gated CI stages.</li>
        <li>30+ vulnerabilities caught pre-prod.</li>
      </ul>

      <h2>Tools / stacks fluent in</h2>
      <ul>
        <li><strong>Test:</strong> Playwright, WebdriverIO, Selenium, Cypress (literate, not deep), Jest.</li>
        <li><strong>Languages:</strong> JavaScript / TypeScript, Python, some Java / Go for tooling.</li>
        <li><strong>CI/CD:</strong> Bamboo (deep), Jenkins, GitHub Actions, Docker, Kubernetes.</li>
        <li><strong>Cloud:</strong> AWS (EC2, S3, Lambda, ECR, OIDC), basic GCP.</li>
        <li><strong>Observability:</strong> custom dashboards (MERN cockpit), Grafana, Datadog basics.</li>
        <li><strong>Languages on the periphery:</strong> Clojure (read, not ship), Ruby (Rails familiarity).</li>
      </ul>

      <h2>What to lead with — verbal version</h2>
      <blockquote>
        <p>
          &ldquo;Decade in QE/SDET. Last 6 years owning Schoology — zero P0 over 4 years, 70% regression runtime
          cut, then the last 2 years spent shifting from people-running-tests to agents — 80% effort cut, 95%
          regression coverage, anchored to OpenAPI so agents don&apos;t hallucinate. Built a MERN release cockpit
          that compresses 4 hours to 15 minutes — basically a CI observability dashboard for the whole tribe.
          That&apos;s the muscle I want to apply at Metabase.&rdquo;
        </p>
      </blockquote>
    </article>
  );
}
