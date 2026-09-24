---
name: Shantanu Vichare
description: A live departures board for software quality. Every fact arrives on split-flap modules, and the name board repairs itself.
colors:
  signal-amber: "#ffb224"
  on-amber: "#16130b"
  fault-red: "#ec5a50"
  concourse-aluminium: "#e6e8eb"
  graphite-ink: "#15171a"
  slate: "#3b3f46"
  timetable-grey: "#585d66"
  hairline: "#c9cdd3"
  hairline-strong: "#9ba1a9"
  housing-graphite: "#232528"
  housing-edge: "#3a3d42"
  board-well: "#0c0d0e"
  flap-black: "#1c1d1f"
  flap-upper: "#232427"
  flap-lower: "#18191b"
  flap-paint: "#f1ede3"
  printed-label: "#aaa69c"
  night-ground: "#0e1012"
  night-ink: "#eceef0"
  night-slate: "#b9bec5"
  night-timetable-grey: "#8f959e"
  night-hairline: "#262a2f"
  night-hairline-strong: "#3b4047"
  night-housing: "#1e2124"
  night-housing-edge: "#3d4248"
typography:
  flap:
    fontFamily: "Sofia Sans Extra Condensed, Sofia Sans, ui-sans-serif, sans-serif"
    fontSize: "calc(module width * 1.22); cap height about 58% of the module"
    fontWeight: 800
    lineHeight: 1
  headline:
    fontFamily: "Sofia Sans Extra Condensed, Sofia Sans, ui-sans-serif, sans-serif"
    fontSize: "clamp(2.6rem, 1.7rem + 3.6vw, 5.4rem)"
    fontWeight: 800
    lineHeight: 0.96
    letterSpacing: "0.005em, uppercase"
  title:
    fontFamily: "Sofia Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.5rem, 1.2rem + 1.2vw, 2.25rem)"
    fontWeight: 620
    lineHeight: 1.12
    letterSpacing: "-0.028em"
  lede:
    fontFamily: "Sofia Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.28rem, 1.05rem + 0.95vw, 1.9rem)"
    fontWeight: 420
    lineHeight: 1.34
    letterSpacing: "-0.015em"
  body:
    fontFamily: "Sofia Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.02rem, 0.97rem + 0.22vw, 1.14rem)"
    fontWeight: 400
    lineHeight: 1.55
  label:
    fontFamily: "Sofia Sans Extra Condensed, Sofia Sans, ui-sans-serif, sans-serif"
    fontSize: "0.8rem to 1.18rem"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "0.06em to 0.08em, uppercase"
rounded:
  module: "7% of module width"
  hinge: "1px"
  control: "4px"
  well: "6px"
  housing: "14px"
spacing:
  gutter: "clamp(16px, 4vw, 56px)"
  section: "clamp(104px, 13vw, 184px)"
  nav: "64px"
  module-gap: "10% of module width on text boards, 5% on the hero board"
components:
  button-primary:
    backgroundColor: "{colors.signal-amber}"
    textColor: "{colors.on-amber}"
    typography: "{typography.label}"
    rounded: "{rounded.control}"
    padding: "0 22px"
    height: "52px"
  button-board:
    backgroundColor: "{colors.flap-black}"
    textColor: "{colors.flap-paint}"
    typography: "{typography.label}"
    rounded: "{rounded.control}"
    padding: "0 22px"
    height: "52px"
  button-small:
    padding: "0 16px"
    height: "40px"
  board-housing:
    backgroundColor: "{colors.housing-graphite}"
    rounded: "{rounded.housing}"
    padding: "clamp(8px, 1.1vw, 18px)"
  board-well:
    backgroundColor: "{colors.board-well}"
    rounded: "{rounded.well}"
  flap-module:
    backgroundColor: "{colors.flap-black}"
    textColor: "{colors.flap-paint}"
    typography: "{typography.flap}"
    rounded: "{rounded.module}"
  nav-link:
    textColor: "{colors.slate}"
    typography: "{typography.label}"
  nav-link-current:
    textColor: "{colors.graphite-ink}"
---

# Design System: Shantanu Vichare

## Overview

**Creative North Star: "The Departures Board That Repairs Itself"**

The page is a concourse in daylight: a pale aluminium ground, graphite type, and black split-flap boards mounted on it like station signage. Every fact that matters (the name, the pipeline states, the measured results, the current role, the email address) arrives on flap modules that fall forward through a fixed character drum. The boards are the primary imagery. A 3D repair agent beside the introduction extends the mechanical world with a character, floating test cartridges, and a machined dock.

The system is dense only on the boards and quiet everywhere else. Sections alternate between a black board carrying data and calm typographic passages on the aluminium ground, so the eye rests between boards. Board motion happens when information changes: a board flips when it arrives, when a stage advances, or when a role scrolls into reading position. Visitors can knock the hero letters loose and watch them repair themselves. The companion repair agent adds optional, pausable idle motion and a separate simulated repair interaction.

Dark mode is the same concourse at night. The ground and type invert; the boards never change.

**Key Characteristics:**
- Black split-flap boards on a light aluminium ground; boards are theme-invariant.
- One condensed grotesque on every flap, every label, every button.
- Colour is state: amber for live, healing, current, and the one primary action; dim red only for failure.
- Motion is information arriving, never decoration.
- Numbers keep their honesty: approximate figures carry "~", demonstration data is labelled simulated.

## Colors

A neutral concourse with one signal colour and one fault colour, both reserved for state.

### Primary
- **Signal Amber** (#ffb224): the lamp of the system. Healing flaps, the current stage and current role lamp, the nav marker for the section in view, and the single primary action ("Email me"). Nothing decorative is ever amber.

### Secondary
- **Fault Red** (#ec5a50): flaps knocked out of place, a failed status, a missing locator. Appears on boards and test cartridges only for failure, and resolves to paint or amber during repair.

### Neutral
- **Concourse Aluminium** (#e6e8eb): the page ground in daylight.
- **Graphite Ink** (#15171a): headings, body text on the ground, focus rings, the selection highlight.
- **Slate** (#3b3f46): secondary text, lede and captions, list items.
- **Timetable Grey** (#585d66): tertiary text such as readouts, hints, dates, and the footer.
- **Hairline** (#c9cdd3) and **Strong Hairline** (#9ba1a9): dividers, underline colour for text links, inactive stage lamps.
- **Housing Graphite** (#232528), **Housing Edge** (#3a3d42), **Board Well** (#0c0d0e): the board object, its bezel, and the recess behind the modules.
- **Flap Black** (#1c1d1f), **Flap Upper** (#232427), **Flap Lower** (#18191b): the module faces; upper cards catch a touch more light than lower cards.
- **Flap Paint** (#f1ede3): every glyph on every flap; warm, never pure white.
- **Printed Label** (#aaa69c): static labels printed on a board (column headers, row captions).
- **Night variants** (night-ground #0e1012, night-ink #eceef0 and the rest of the night keys): the dark-mode swap for ground, ink, hairlines, and housing only.

### Named Rules
**The Colour Is State Rule.** Amber and red appear only when something is live, healing, current, failing, or is the primary action. A static element that is coloured is a defect.

**The Invariant Board Rule.** Boards keep their black flaps, paint glyphs, amber, and red in both themes. Only the concourse around them changes.

## Typography

**Signage font:** Sofia Sans Extra Condensed (weights 700 and 800): flaps, section headings, labels, controls
**Reading font:** Sofia Sans (variable weight; 400 to 620 in use): statements, captions, highlights, titles

**Character:** A tall, tight signage condensed for everything that is a sign (boards, section headings, controls), set against a friendly, open grotesque for everything that is read. One superfamily, two widths.

### Hierarchy
- **Flap** (800, sized from the module: about 58% cap height, uppercase by construction): every character on every board, including the hero name.
- **Headline** (condensed 800, clamp(2.6rem, 1.7rem + 3.6vw, 5.4rem), 0.96, capitals): one per section, set as a concourse sign. The closing contact statement is the one sentence-case exception.
- **Title** (620, clamp(1.5rem, 1.2rem + 1.2vw, 2.25rem), 1.12): role titles and pipeline stage names.
- **Lede** (420, clamp(1.28rem, 1.05rem + 0.95vw, 1.9rem), 1.34): the hero statement and section introductions, 28 to 40ch.
- **Body** (400, clamp(1.02rem, 0.97rem + 0.22vw, 1.14rem), 1.55): highlights and descriptions, capped near 64ch.
- **Label** (700, 0.8rem to 1.18rem, 0.06em to 0.08em, uppercase): nav, buttons, board column headers, toolkit group names, dates.

### Named Rules
**The One Face On The Board Rule.** Nothing on a board is set in anything but the condensed flap face. Body text never appears on a flap.

**The Signs And Reading Rule.** If it names a place on the page (a section, a column, a control), it is a sign: condensed capitals. If it explains, it is reading: Sofia Sans in sentence case.

**The Clear Hinge Rule.** A glyph whose stroke sits on the hinge ("+", "~") is lifted 0.13em so the split cannot erase it. A value that misreads on the board is a factual error, not a styling one.

**The No Kicker Rule.** No section heading carries a small label above it. Labels exist only where they name data (a column, a group, a board row).

## Layout

A single column of sections inside a 1440px container with fluid gutters (clamp(16px, 4vw, 56px)) and generous section spacing (clamp(104px, 13vw, 184px)). The nav is a fixed 64px bar that takes the ground colour once the page scrolls.

The hero board spans the container with tight 5% gutters so it reads as one mechanism. Its column count comes from the viewport's aspect ratio (8 columns up to 1.75:1, then 9, 10, 11, 12 on wider screens) so the board stays near 55% of viewport height. Portrait screens keep two rows but switch to tall modules (aspect 0.5), because width caps the column size. The Lab pins a board for about 3.8 viewports of scroll and advances one stage per equal quarter. Experience keeps a role board sticky beside the text on desktop and as a solid band under the nav on narrow screens. Results is a full-width board table. Toolkit is a ruled timetable on paper: one row per category, the category in condensed capitals on the left and the tools running along the row (stacked below 820px). Every multi-column layout collapses to one column below its breakpoint.

## Elevation & Depth

Depth belongs to the boards and the repair-agent exhibit. The page ground is flat. Board housings read as physical signage with a top bevel highlight, a bottom inner shadow, a hairline edge, and a long soft drop shadow tinted to the ground. Inside, the well is recessed with an inner shadow and the modules sit in it. On the WebGL hero, a pointer-driven light adds a moving sheen and each falling leaf casts a shadow onto the card below it.

Three boards carry extra physical depth, and nothing else does:
- **Hero:** the housing leans up to 2° away from the pointer. Its side wall shows below and on whichever side comes closer, and the well's inner shadow follows the lean. Knocked modules hang a little crooked. Modules under repair project forward about 3% and brighten, then settle back.
- **Lab:** the broken module goes out of line on Fail. On Diagnose it lifts out on a top hinge and a cavity opens behind it, showing an illustrative schematic: the failing spec wired to the context graph, which fans out to tests and API contracts. On Repair the wires light amber, one hop at a time, as the module seats itself again. On Review everything closes.
- **Contact:** the email board is a key. It travels down onto its skirt while pressed and springs back with a small overshoot as the confirmation flips in.

Result modules have an edge, a contact shadow, and axle pins at the hinge. A hovered row's modules lift 2px while the board stays still. Reduced motion shows every board still and closed.

### Shadow Vocabulary
- **Board housing** (`box-shadow: inset 0 1px 0 rgb(255 255 255 / .09), inset 0 -2px 0 rgb(0 0 0 / .45), 0 0 0 1px housing-edge, 0 30px 60px -30px rgb(24 30 38 / .55), 0 10px 20px -12px rgb(24 30 38 / .35)`): every board.
- **Board well** (`box-shadow: inset 0 2px 6px rgb(0 0 0 / .6)`): the recess behind modules.

### Named Rules
**The Only Objects Cast Shadows Rule.** Text, links, lists, and sections are flat. Boards and the repair agent's physical parts cast shadows.

## Shapes

Small, mechanical radii. Flap cards are rounded at their outer corners (about 7% of the module width) and nearly square at the hinge (1px), split by a one-pixel dark hinge line through every glyph. Controls use 4px. The board well is 6px and the housing 14px. Status lamps are 1px-rounded squares, never circles.

## Components

### Buttons
- **Shape:** a split-flap module (4px). The hinge shows only in the side padding and breaks behind the label, so it never reads as a strikethrough.
- **Primary:** Signal Amber with near-black text, 52px tall, 22px side padding; used once per context for "Email me".
- **Board:** Flap Black with Flap Paint text and a hairline edge so it holds its shape on dark grounds.
- **Hover:** the upper leaf drops once (280ms, gravity ease); leaving resets it invisibly. **Active:** 1px press.
- **Small:** 40px tall, 16px padding, used in the nav.

### Navigation
- Condensed uppercase links in Slate, Graphite Ink on hover and when current; the current section carries a 2px amber underline. The bar is transparent at the top and takes the ground colour with a hairline once scrolled. On narrow screens a Menu button opens a full-height board whose links flip in.

### Split-flap board (signature)
- Housing, well, and a grid of modules in fixed character cells; ruled rows and columns are the whole composition.
- Modules flip forward through the drum (" A-Z 0-9" then punctuation), about 46 to 58ms per step, so a cascade settles in drum order. Long trips run up through the last few characters before the target.
- Tone per module: paint by default, red for failure, amber for live or healing.
- The hero board is a WebGL2 instanced renderer; every other board is DOM, driven by one shared animation loop writing a single custom property per module.

### Status readout
- A small square lamp plus one sentence reporting real board state ("7 flaps out of place. Repairing." then "Repaired 7 flaps in 1.8 s."). Never decorative.

### Text links
- Graphite Ink with a Strong Hairline underline at 0.25em offset that darkens to the text colour on hover; external links end in an up-right arrow.

### Icons
- Lucide line icons only, in the text colour, never brand-coloured. LinkedIn and GitHub are drawn on lucide's grid to match (`src/components/icons.tsx`), because lucide no longer ships brand marks.
- Contact links lead with the icon for their channel (18px, 1.75 stroke). "Email me" buttons carry a mail icon and "Resume" buttons a document icon (2 stroke, as the label is heavy). Nav text links stay text only.

## Do's and Don'ts

### Do:
- **Do** put new facts on a board when they are data (numbers, statuses, names, dates) and in Sofia Sans prose when they need reading.
- **Do** keep boards black with Flap Paint glyphs in both themes.
- **Do** reserve Signal Amber for live state and the single primary action, and Fault Red for failure.
- **Do** keep "~" on approximate figures and label demonstration data as simulated.
- **Do** give every animated board a reduced-motion rendering that shows its final state immediately.
- **Do** check every board value at 390px and 1440px for glyphs the hinge could erase.

### Don't:
- **Don't** put a kicker or eyebrow label above a section heading.
- **Don't** colour anything amber or red for decoration.
- **Don't** set body copy, italics, or a second typeface on a flap.
- **Don't** animate text blocks on scroll; boards flip, prose stays put.
- **Don't** use em or en dashes in copy; use hyphens for ranges.

## Repair agent / SV 01

Added at the owner's request for a distinct 3D character and objects, alongside the existing boards. The agent uses ivory shell panels, graphite displays, metal joints, amber eyes, and split test cartridges. It is an illustrative companion, not a representation of production telemetry. The Run a repair action scans, aligns, and clears a simulated faulty cartridge; completion remains subject to human review in the caption.

The Three.js scene is generated locally and loaded near the viewport. Drag and named rotation/reset buttons inspect the object; the pause control stops ambient motion. Reduced motion renders a still pose and resolves the simulated interaction immediately. Rendering pauses offscreen and in hidden tabs. An inline SVG preserves the character when WebGL cannot initialize. Prose and contact actions remain independent of the scene.
