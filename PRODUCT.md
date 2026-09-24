# Product

<!-- impeccable:product-schema 1 -->

> Written 2026-09-23 without an interview: the owner delegated every creative decision in the redesign brief. Facts marked *(inferred)* come from the brief, the resume PDF, or the repository and should be confirmed.

## Platform

web

## Users

- Primary *(inferred)*: hiring managers, recruiters, and engineering leaders evaluating Shantanu for senior QA / AI quality engineering roles. They arrive from LinkedIn, a resume link, or an application, scan fast, and decide whether to reach out. Desktop and phone in roughly equal measure.
- Secondary *(inferred)*: peers and collaborators in AI-driven test automation and agentic tooling.

## Product Purpose

Personal bio site for Shantanu Vichare. It has to make one thing obvious within seconds: he ships production AI agent systems for software quality, not demos. Success is a visitor who understands that, believes it from the evidence, and emails, connects on LinkedIn, or downloads the resume.

## Positioning

A lead QA engineer (~11 years: threat research at Quick Heal, SDET at FireEye/Mandiant, lead QA at PowerSchool) who architected a multi-agent QA platform in production: GitHub Copilot background agents orchestrating Playwright, Browser, and Jira MCPs, grounded by an AI Context Graph so tests repair themselves. Security research roots plus agentic QA in production is the combination a neighbouring profile cannot claim.

## Operating Context

- Next.js 16 App Router, Tailwind CSS v4, deployed to Cloudflare Workers through OpenNext (`wrangler.jsonc`).
- Single page. Anchor IDs `#hero`, `#lab`, `#experience`, `#education`, `#connect` may have inbound links and stay stable.
- Resume PDF served at `/ShantanuVichare.pdf`.

## Capabilities and Constraints

- Current location: Bengaluru, India (confirmed by the owner 2026-09-24). The resume PDF header still says "Pune / Mumbai"; that is outdated and must not be used for location.
- Contact channels: email vichare.shantanu@gmail.com, phone +91 9673993987 (on the current site, omitted from the newer resume), GitHub `ShantanuVr`, LinkedIn `in/shantanuvr`.
- Toolkit named in the brief but absent from the resume *(inferred scope)*: LangChain, n8n, Lovable. List them as tools in use; attach no invented achievements to them.
- The resume PDF (updated 2026-05-18) is newer than the site copy (2026-04-08) and is the content source of truth.

## Evidence on Hand

From `public/ShantanuVichare.pdf` unless noted:

- 80% manual QA effort reduction; prompts per task compressed from 15 to 2-3; 4+ engineer-weeks reclaimed per release cycle.
- Regression coverage lifted from 55% to 95% (autonomous API test synthesis from OpenAPI specs).
- Self-healing Playwright tests: 90%+ first-pass accuracy on drifted locators, zero hallucinated steps.
- Regression runtime cut 70% with containerized parallel runners; same-day production deployments.
- Zero P0 production incidents over 4+ years on Schoology; 20+ epics delivered on schedule.
- Mentors 20+ engineers across 6 Agile squads; promoted into AI quality leadership in 2023.
- Release checklist compressed from ~4 hours to ~15 minutes (MERN release cockpit).
- 30+ vulnerabilities caught pre-production (DevSecOps blueprint: OWASP ZAP, Burp Suite, SAST, dependency audits).
- AI Context Graph indexes 10,000+ test cases and full API docs *(site copy)*; adopted by 3+ product teams.
- FireEye: ~35% fewer escaped defects release over release, ~40% shorter regression cycles, 8+ security releases.
- Quick Heal: ~12 analyst-hours per week reclaimed, 50+ incident RCAs, 2 detection capabilities shipped.
- Education: MSc ML & AI, Liverpool John Moores University (2025-2027, in progress); PG Diploma AI & ML, IIIT Bangalore (2025-2026); BE Information Technology, Mumbai (2012-2015). Certifications: CopilotXcelerate (Upgrad 2023), CEH (2019), Oracle Certified Expert SQL (2016).

Absent, and not to be fabricated: portrait photography, testimonials, client logos, public case-study screenshots, open-source project showcases.

## Product Principles

1. Proof over adjectives: every headline claim carries a number from the resume.
2. Show the mechanism: the agent loop (fail, diagnose, repair, pull request) is dramatized, not described.
3. A recruiter gets name, role, and the contact path within one viewport; contact is reachable from anywhere.
4. A quality engineer's own site is itself evidence: it must be fast, accessible, and free of jank on a mid-range phone.

## Accessibility & Inclusion

WCAG 2.1 AA *(inferred: he builds WCAG validation agents, so the site should pass the checks it automates)*. `prefers-reduced-motion` gets an intentional static path; every interaction works by keyboard and touch.
