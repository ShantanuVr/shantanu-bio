---
version: 1
slug: "src-app-page-tsx"
primary_target: "src/app/page.tsx"
related_targets: []
---

# Surface brief: home (single-page bio)

Scope: `src/app/page.tsx` and everything it renders. Visitor mode: Persuade.
Audience and job: hiring managers, recruiters, engineering leaders scanning fast; they must learn who Shantanu is, believe he ships production agent systems for software quality, and email him, open LinkedIn, or take the resume.
Constraints: anchor IDs `#hero #lab #experience #education #connect` stay stable; resume at `/ShantanuVichare.pdf`; Cloudflare Workers via OpenNext; WCAG 2.1 AA; reduced motion gets an intentional static path.
Memorable moment: the visitor knocks the name board out of place and watches it repair itself.

## Direction contract

THESIS: The site is a live departures board for software quality. Every fact arrives as split-flap characters, and the hero board breaks under the cursor and repairs itself, the way his agents repair tests. It refuses the category default: neon on black, particle networks, terminal typewriters, glitch text.

OWN-WORLD: Daylight concourse. Pale cool aluminium ground, graphite ink, matte black flap modules with warm off-white paint glyphs in a condensed grotesque, graphite housings with a bevel. Colour is state: amber for healing, current, and the one primary action; dim red only for failure. Radii: modules 3px, controls 4px, housings 14px. Dark mode is the night concourse; boards stay the same.

STORY: Meet the name on a monumental board, break it, watch it heal; learn the real pipeline does this to tests; read measured results on a data board; scan the toolkit and the career timetable; close on a board spelling the email address, which copies on click.

FIRST VIEWPORT: Slim nav: name left; Lab, Experience, Education, Resume; amber "Email me" right. Full-width black board, big modules, SHANTANU over VICHARE, left-aligned, about 55-60% of viewport height. Below it, left: live repair readout and the sentence "Lead QA engineer at PowerSchool. I build AI agents that write, run, and repair tests." Right: amber "Email me", black "Resume".

FORM: Split-flap departure board, candidate 5 of 7 on the ordered list (trace viewer, PR diff, node-graph editor, test instrument, split-flap board, datasheet, crash-test lab). Seed key fc247299.
- Raise (webgl-shader-portal): the hero board is a real WebGL2 instanced flap renderer with pointer-driven light, not a DOM imitation; reduced motion freezes it.
- Kept (split-flap concourse, converged): fixed character cells; ruled rows and columns are the composition; rows are live entities; state restyles a row without breaking the grid; column priority narrows on phones.
- Raise (Saville catalog sleeve): one field owns each viewport; nothing is labelled twice; no eyebrows.
- Raise (punk paste-up + glazier partition): amber is reserved for live state and the single primary action; nothing decorative is coloured.
- Raise (provenance ribbon): measurement honesty; approximate figures keep their "~", demonstration data is labelled simulated.
- Pick not taken: Playwright trace-viewer world (risk: familiar dev-tool look, drifts toward fake screenshots).

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

## Signature interaction and motion grammar

- Hero: cascade from blank to the name in drum order on load; pointer or tap knocks flaps to random glyphs (dim red); after a pause they heal forward through the drum (amber) back to the name; a live readout reports drift and repair time. Optional opt-in flap sound.
- Everything else moves only when information changes: boards flip on arrival, the lab board advances with scroll through Fail, Diagnose, Repair, Review; the experience board flips to the role being read.
- Exit faster than entrance; flaps fall with gravity and a short settle bounce.

## Unresolved

- No portrait photograph exists; none is invented.
- LangChain, n8n, Lovable come from the brief, not the resume: listed as tools only.
