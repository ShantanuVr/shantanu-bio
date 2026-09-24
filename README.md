# shantanu-bio

Personal site for Shantanu Vichare, built as a live departures board for software quality. Every fact arrives on split-flap modules, and the name board in the hero breaks under your cursor and repairs itself, the way the self-healing test agents it describes repair tests.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build (static prerender)
npm run preview    # Cloudflare Workers preview via OpenNext
npm run deploy     # deploy to Cloudflare Workers
npm run resume     # rebuild public/ShantanuVichare.pdf from resume/resume.html
```

## Edit the content

Every fact on the page lives in [`src/content/profile.ts`](src/content/profile.ts): the hero statement, the Lab pipeline stages, the results board, the toolkit, roles, education, and contact details. The resume ([`resume/resume.html`](resume/resume.html), built to `public/ShantanuVichare.pdf` with `npm run resume`) is the source of truth for the numbers; keep the two in step. The resume shares the site's type and colours but stays ATS-safe; the comments at the top of that file list the rules.

Board text is uppercase and limited to the characters in the drum (`src/lib/drum.ts`); anything else renders as a blank module. Keep board strings within the cell counts used by each section (for example 12 characters for Lab suite names and 7 for results).

## How it works

- **Hero board** (`src/components/hero/`): a hand-written WebGL2 renderer draws every module as three instanced quads (upper card, lower card, falling leaf) with pointer-driven lighting. `board-model.ts` is the state machine: the intro shuffle, knocking flaps loose (red), and repairing them forward through the drum (amber). The server-rendered DOM board defines the geometry and doubles as the fallback for reduced motion and browsers without WebGL2.
- **Every other board** (`src/components/flap/`): DOM split-flaps driven by one shared animation loop in `engine.ts`, which writes a single CSS custom property per module per frame.
- **Scroll**: Lenis for smooth scrolling (off under reduced motion), IntersectionObserver for reveals and the Lab's four stages, and a CSS scroll-driven animation for the hero board tipping back as you scroll away.
- **Sound**: opt-in flap clicks synthesized with Web Audio; off on every visit until enabled.

Design tokens and rules are documented in [`DESIGN.md`](DESIGN.md); product context in [`PRODUCT.md`](PRODUCT.md).
