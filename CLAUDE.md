@AGENTS.md

# CLAUDE.md

## What this is

A portfolio site for Samad Mehndi, software engineer. It also functions as a
public code sample: people reviewing me for a job will read the source, not
just look at the rendered page. Code quality is part of the deliverable.

## Stack

- Next.js App Router, TypeScript strict
- Tailwind v4
- Static export (`output: 'export'` in next.config.ts) — no server, no cold
  starts, deployable as flat files
- No component library, no animation library, no state manager
- Ask before adding any dependency, including dev dependencies

## Design tokens

Source of truth, derived directly from `docs/reference/v0.html`. Define as
CSS variables in `src/app/globals.css`.

Core palette (from v0.html's `:root`):

| Token | Value | Used for |
| --- | --- | --- |
| `--ink` | `#070911` | page background |
| `--ink-2` | `#0A0D17` | near-black text on light/accent fills (avatar initials, active chip label) |
| `--fg` | `#EDF0F7` | primary text |
| `--muted` | `#96A0B4` | secondary text, meta lines, mono labels |
| `--accent` | `#7A8CFF` | links, eyebrow rule, definition-list term labels |
| `--hit` | `#F0B429` | highlight: active states, scores, focus ring, "in progress" badges |
| `--line` | `rgba(255,255,255,.09)` | standard hairline border / divider |
| `--line-2` | `rgba(255,255,255,.14)` | stronger hairline: hover states, avatar/button resting border |

Other colors used directly in the markup, not as root variables:

- Ambient background gradients: `rgba(122,140,255,.16 / .08 / .07)`
  (accent-tinted), `rgba(240,180,41,.07)` (highlight-tinted), dot-grid dots
  `rgba(255,255,255,.10)`
- Panel fill is a gradient, `rgba(255,255,255,.055)` → `rgba(255,255,255,.015)`,
  not a flat opacity
- Button (default) fill: flat `rgba(255,255,255,.04)`, hover
  `rgba(255,255,255,.09)`
- Primary-button text: `#080A12` — a third near-black, distinct from `--ink-2`
- Status dot (available): `#5BD8A0`
- Small tag fill: flat `rgba(255,255,255,.04)`

Fonts, loaded with `next/font` (Google Fonts in v0.html: Bricolage
Grotesque 400/600/800 with optical sizing, Inter 400/500/600, IBM Plex Mono
400/500):

- Display (h1–h3): Bricolage Grotesque. h1 weight 800, letter-spacing
  `-0.04em`, size `clamp(2.6rem, 6.4vw, 4.6rem)`; h2 weight 600, size
  `clamp(2rem, 4.2vw, 3.1rem)`; h3 weight 600, `1.22rem`, letter-spacing
  `-0.02em`. Line-height ~1.02–1.15.
- Body: Inter, 16px base, 1.6 line height
- Mono (eyebrows, meta, tags, periods): IBM Plex Mono, letter-spacing
  `.04em`–`.14em` depending on use, usually uppercase

Border and radius treatments:

- Hairline dividers and panel/card borders: 1px solid `--line`; hover or
  emphasis states upgrade to `--line-2`
- Panels/cards: `border-radius: 20px`, `backdrop-filter: blur(16px)`
- Pills (primary/secondary buttons, filter chips, link chips):
  `border-radius: 999px`
- Small tags: `border-radius: 6px`
- Canvas/demo shell: `border-radius: 14px`
- Avatar: circular, `border-radius: 50%`
- Focus ring: `2px solid var(--hit)`, `outline-offset: 3px`,
  `border-radius: 6px` — uses the highlight color, not the accent color

Section spacing rhythm:

- Content max-width `1180px`, 24px side padding
- Section vertical padding: 104px top/bottom; hero is 132px top / 72px
  bottom
- Section heading block: 44px margin before body content starts
- Two-column grids (hero, experience): 56px gap
- Stacked cards / grid cards: 18px gap between them
- Card internal padding: 30px (featured project/education cards), 24px
  (compact cards)
- Divider-separated sub-blocks (definition lists, stat strips, timeline
  rows, footer): hairline `border-top`, ~22–26px padding-top
- Below 940px: section padding drops to 76px (hero 112px/56px), two-column
  grids collapse to one column, nav hides
- Below 560px: email button and location tag hide, avatar shrinks to 50px

Visual direction: near-black canvas, glass panels (gradient fill + 1px
hairline border + backdrop blur), generous vertical rhythm, no drop shadows
except on primary buttons.

## Copy rules

- Conversational and grounded, first person
- No em-dashes in any copy you write. One deliberate exception exists in
  the hero headline in v0.html ("end to end—"). Preserve it exactly and
  never normalise it.
- No marketing superlatives ("cutting-edge," "revolutionary," "seamless,"
  "robust")
- Never write a metric, stat, or number that isn't already sitting in
  `src/content/*` (or, once it exists, v0.html). A nice-sounding number you
  made up is a number I'll get asked about in an interview and won't be able
  to back up. Leave a `// TODO: source this` instead.

## Structure

- All copy and data lives in `src/content/*`. Components never hardcode
  content — adding or editing a project, role, or line of copy should never
  require touching a component file.
- Components stay under 150 lines. Split before crossing it.
- Non-trivial logic (similarity math, projections, ranking, anything with a
  real algorithm) lives outside React as plain functions: arrays in, arrays
  out, no DOM, no hooks. Reviewers will actually read these files.

## Accessibility floor

- Every interactive element reachable by keyboard, with a visible focus ring
- All animation and transitions disabled under `prefers-reduced-motion` —
  content stays fully visible, just static, never hidden mid-transition
- Body text contrast at least 4.5:1 against whatever it sits on

## Working agreement

- One concern per commit. Don't bundle a refactor into a feature commit.
- Run `npm run build` before declaring a phase done — the static export has
  to actually succeed, not just look right in dev.
- At the end of a session, report what changed and what was skipped or left
  as a TODO. Don't let scope quietly disappear.

## Facts of record

Verified against my resume. These override anything else in this repo,
this file included, if a contradiction ever turns up.

- Think Future Technologies is in Gurugram, India. Not Texas.
- Software Engineer Aug 2021 to Apr 2024, intern May to Jul 2021. Close to
  three years total. Never write 2 or 2.5 years.
- Undergrad is B.Tech Electrical and Electronics Engineering, Guru Gobind
  Singh Indraprastha University, Delhi, Sep 2020. Not CS.
- MS Computer Engineering, UT Dallas, May 2026, GPA 3.82.
- Verified metrics: 20K+ requests/day, ~40% API response time reduction,
  ~30% code duplication removed, ~4 releases/month, ~20 issues/month, 500+
  student problems, 143K page corpus, ~0.8s query latency, 87.1%
  validation accuracy at 0.30 loss, up to ~34 ULP variation.
- JobMap's backend is not currently running. Never describe it as live in
  production. "Built and deployed" is accurate.
