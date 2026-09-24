// Single source of truth for every fact on the page.
// Source: public/ShantanuVichare.pdf (updated 2026-05-18). Approximate figures keep their "~".

export const person = {
  name: "Shantanu Vichare",
  // Production origin: canonical URL, sitemap, and absolute social-image links build on it.
  url: "https://shantanuvr.com",
  role: "Lead QA Engineer, AI Quality Engineering",
  statement:
    "Lead QA engineer at PowerSchool. I build AI agents that write, run, and repair tests.",
  email: "vichare.shantanu@gmail.com",
  phone: "+91 96739 93987",
  phoneHref: "tel:+919673993987",
  linkedin: "https://www.linkedin.com/in/shantanuvr/",
  github: "https://github.com/ShantanuVr",
  resume: "/ShantanuVichare.pdf",
  // Confirmed by Shantanu (2026-09-24).
  location: "Bengaluru, India",
} as const;

export const lab = {
  heading: "Tests that repair themselves",
  lede: "I lead quality engineering for Schoology at PowerSchool. Our tests are written, run, and repaired by AI agents, and engineers review what they ship. Manual QA effort is down 80%, and Schoology has not had a P0 production incident in over four years.",
  proof: "90%+ of drifted locators are fixed on the first pass, with zero hallucinated steps.",
  simulatedNote: "Simulated run. Suite names and schematic are illustrative.",
  suites: ["GRADEBOOK", "ROSTER SYNC", "ASSIGNMENTS", "CALENDAR", "A11Y AUDIT"],
  // Index into `suites` of the row that breaks and heals.
  brokenRow: 2,
  // Printed behind the broken module: the failing spec, the graph, and what the graph links it to.
  schematic: ["Assignments spec", "Context graph", "10,000+ tests", "OpenAPI contracts"],
  stages: [
    {
      id: "fail",
      label: "Fail",
      status: "FAILED",
      tone: "fault",
      note: "LOCATOR MISSING",
      caption:
        "A UI change breaks a locator in the assignments suite, and the Playwright run goes red.",
    },
    {
      id: "diagnose",
      label: "Diagnose",
      status: "TRIAGE",
      tone: "live",
      note: "GRAPH: 10,000+ TESTS",
      caption:
        "A background agent pulls the logs, screenshots, and pipeline context, then checks the AI Context Graph: 10,000+ indexed tests and live OpenAPI contracts.",
    },
    {
      id: "repair",
      label: "Repair",
      status: "HEALING",
      tone: "live",
      note: "PLAYWRIGHT MCP FIX",
      caption:
        "It writes the fix through Playwright MCP and reruns the suite. The graph grounds every step, so nothing is invented.",
    },
    {
      id: "review",
      label: "Review",
      status: "PASSED",
      tone: "paint",
      note: "PR REVIEWED, MERGED",
      caption:
        "A pull request lands for an engineer to approve and merge. Flaky-test repair time drops to near zero.",
    },
  ],
} as const;

export type StageTone = (typeof lab.stages)[number]["tone"];

export const results = {
  heading: "Results in production",
  rows: [
    { system: "Multi-agent QA platform", measure: "Manual QA effort", before: "", was: "", after: "-80%" },
    { system: "Schoology quality strategy", measure: "P0 incidents in 4+ years", before: "", was: "", after: "0" },
    { system: "API test synthesis", measure: "Regression coverage", before: "55%", was: "was 55%", after: "95%" },
    { system: "Agent workflows", measure: "Prompts per task", before: "15", was: "was 15", after: "2-3" },
    { system: "Self-healing tests", measure: "Drifted locators fixed on the first pass", before: "", was: "", after: "90%+" },
    { system: "Cloud test runners", measure: "Regression runtime", before: "", was: "", after: "-70%" },
    { system: "Release cockpit", measure: "Release checklist", before: "~4 H", was: "was ~4 hours", after: "~15 MIN" },
    { system: "DevSecOps blueprint", measure: "Vulnerabilities caught before production", before: "", was: "", after: "30+" },
  ],
} as const;

export const toolkit = {
  heading: "Toolkit",
  groups: [
    {
      name: "Agents and LLMs",
      tools: [
        "Claude Code",
        "Cursor",
        "GitHub Copilot agents",
        "LangChain",
        "RAG",
        "Multi-agent orchestration",
        "Claude, OpenAI, Gemini",
        "Lovable",
      ],
    },
    {
      name: "MCP servers",
      tools: ["Playwright MCP", "Browser MCP", "Jira MCP", "AI Context Graphs"],
    },
    {
      name: "Test automation",
      tools: [
        "Playwright",
        "WebdriverIO",
        "Selenium",
        "Robot Framework",
        "Codeception",
        "API testing",
        "Visual regression",
        "BDD",
      ],
    },
    {
      name: "Workflow and CI/CD",
      tools: [
        "n8n",
        "GitHub Actions",
        "GitLab CI",
        "Bamboo",
        "Containerized runners",
        "Ephemeral environments",
      ],
    },
    {
      name: "Security and load",
      tools: ["OWASP ZAP", "Burp Suite", "SAST and DAST", "Dependency scanning", "JMeter", "LoadRunner"],
    },
    {
      name: "Languages",
      tools: ["Python", "TypeScript", "JavaScript", "PHP", "MERN stack"],
    },
  ],
} as const;

export const experience = {
  heading: "Eleven years, three companies",
  roles: [
    {
      id: "powerschool",
      years: "2020 - NOW",
      period: "2020 - present",
      company: "PowerSchool",
      board: "POWERSCHOOL",
      title: "Lead Quality Assurance Engineer",
      boardTitle: "LEAD QA ENGINEER",
      city: "BENGALURU REMOTE",
      place: "Bengaluru, remote",
      current: true,
      highlights: [
        "Promoted into AI quality engineering leadership in 2023 after three years leading Core QA. Own AI test tooling strategy for Schoology and mentor 20+ engineers across 6 Agile squads.",
        "Architected a multi-agent test platform: GitHub Copilot background agents orchestrating Playwright, Browser, and Jira MCPs, with Claude, OpenAI, and Gemini models authoring, running, and triaging tests.",
        "Built the AI Context Graph that anchors agents to live OpenAPI contracts and canonical suites, so tests repair drifted locators with 90%+ first-pass accuracy.",
        "Replaced manual Postman work with agent-generated Playwright API tests from OpenAPI specs, lifting regression coverage from 55% to 95%.",
        "Scaled Cursor and Copilot agent workflows across the tribe: prompts per task down from 15 to 2-3, and 4+ engineer-weeks reclaimed per release cycle.",
        "Ran containerized Playwright and WebdriverIO runners on ephemeral cloud environments, cutting regression runtime by 70% and unlocking same-day production deploys.",
        "Embedded OWASP ZAP, Burp Suite, dependency audits, and policy gates in Bamboo, GitLab, and GitHub Actions, blocking vulnerable code at merge.",
      ],
    },
    {
      id: "fireeye",
      years: "2018 - 2020",
      period: "2018 - 2020",
      company: "FireEye (Mandiant)",
      board: "FIREEYE MANDIANT",
      title: "Software Development Engineer in Test",
      boardTitle: "SDET",
      city: "BENGALURU",
      place: "Bengaluru",
      current: false,
      highlights: [
        "Built UI and security test frameworks from scratch for Linux, Windows, and macOS endpoint products, cutting escaped defects ~35% release over release.",
        "Wrote Python and Nosetests suites that validated detection and prevention across 8+ security releases, shortening regression cycles ~40%.",
        "Triaged complex security bugs with developers and product managers across 5+ distributed teams.",
        "Spread Python, Selenium, and Robot Framework practice to 15+ incoming engineers.",
      ],
    },
    {
      id: "quickheal",
      years: "2015 - 2018",
      period: "2015 - 2018",
      company: "Quick Heal Technologies",
      board: "QUICK HEAL",
      title: "Associate Threat Research Engineer",
      boardTitle: "THREAT RESEARCH",
      city: "PUNE",
      place: "Pune",
      current: false,
      highlights: [
        "Built internal tooling that replaced manual malware analysis, reclaiming ~12 analyst-hours a week.",
        "Led customer escalations and root-cause analysis across 50+ security incidents, feeding fixes into the detection roadmap.",
        "Proposed 2 threat-detection capabilities that shipped in Quick Heal products used by millions.",
      ],
    },
  ],
} as const;

export const education = {
  heading: "Education",
  degrees: [
    {
      title: "MSc, Machine Learning and Artificial Intelligence",
      school: "Liverpool John Moores University, England",
      years: "2025 - 2027",
      inProgress: true,
    },
    {
      title: "Post Graduate Diploma, AI and ML",
      school: "IIIT Bangalore",
      years: "2025 - 2026",
      inProgress: false,
    },
    {
      title: "Bachelor of Engineering, Information Technology",
      school: "Shah and Anchor Kutchhi Engineering College, Mumbai",
      years: "2012 - 2015",
      inProgress: false,
    },
  ],
  certifications: [
    { title: "CopilotXcelerate: AI-Powered Python for Data Science", issuer: "upGrad", year: "2023" },
    { title: "Certified Ethical Hacker (CEH)", issuer: "Simplilearn", year: "2019" },
    { title: "Oracle Certified Expert, Database SQL", issuer: "Oracle", year: "2016" },
  ],
} as const;

export const connect = {
  heading: "Open to conversations about AI quality engineering, multi-agent systems, and automation architecture.",
  copyHint: "Select the board to copy the address.",
  copied: "EMAIL COPIED",
} as const;
