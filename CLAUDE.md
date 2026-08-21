# CLAUDE.md

Project instructions for Claude Code. Read this fully before writing any code.

---

## 0. Working agreement

- I do not write code. I specify and verify. Explain what you changed in plain English.
- **Do not install new dependencies without asking me first.** Stack is fixed: React + Vite + Tailwind, plain JSX, no TypeScript. No UI kit, no state library, no icon package unless I approve it.
- Build only what I asked for. Don't refactor unrelated files or add features I didn't request.
- When I send a batch of fixes, do all of them, then report back once.
- Commit with conventional prefixes: `feat:`, `fix:`, `style:`, `docs:`, `chore:`.
- One component per file in `src/components`. Helpers in `src/lib`. Seed data in `src/data`.

---

## 1. Design thesis

This is a challenge set by **Deriv**, a multi-asset trading platform. The work should look like it
belongs inside their product — not like a separate identity applied on top.

So: **adopt Deriv's brand language, apply strict systems discipline to it.**

Deriv's product surface is light — white and near-white, with near-black blocks used only for
promotional and onboarding banners. Their brand colour is a coral red. Everything else is neutral.

### The colour collision — this is the central design decision

Deriv's brand colour is red. In a trading product, red already means **loss, down, sell**.
That's a genuine collision inside their own system, and resolving it deliberately is the point.

The rule for this project:

- **Brand red is reserved for primary actions and the logo. Nothing else.**
- **Financial direction gets its own semantic pair**, visually distinct from brand red — a
  deeper, less saturated red for negative, and a green for positive.
- A price going down and a "Sign up" button must never be the same colour.

Never use brand red on a number, a chart element, a badge or a status indicator.

### The signature element: the ledger figure

Deriv already sets money as a large amount with a small, muted currency code after it
(`10,000.00 AED`). Adopt that and apply it consistently everywhere money appears.

```
  10,000.00 AED
  ^large, tabular       ^small, muted, 500 weight
```

Use the large version once per screen for the primary figure. Everywhere else, money is
body-sized with the same structure.

Note: this puts the currency *after* the amount. That's Deriv's convention and it wins here.

---

## 2. Colour

Define as CSS custom properties in `src/index.css` in a Tailwind `@theme` block. Never hardcode
a hex value inside a component.

| Token | Value | Use |
|---|---|---|
| `--color-brand` | `#FF444F` | Primary buttons and logo ONLY |
| `--color-brand-hover` | `#E63946` | Primary button hover |
| `--color-ink` | `#0E0E0E` | Primary text; dark banner backgrounds |
| `--color-muted` | `#6E6E73` | Secondary text, labels, placeholders |
| `--color-paper` | `#FFFFFF` | Page background |
| `--color-surface` | `#F6F7F8` | Cards, panels, hover fills |
| `--color-line` | `#E4E6E8` | All borders and dividers |
| `--color-positive` | `#00822C` | Profit, price up, buy |
| `--color-negative` | `#C40000` | Loss, price down, sell, errors |
| `--color-focus` | `#0E0E0E` | Focus rings |

Verify `--color-brand` against the live site with a colour picker before building and correct it
if it differs. Everything else can stand.

Rules:

- No gradients anywhere.
- Positive and negative appear on numbers, arrows and small badges only — never as a large
  background fill.
- Dark `--color-ink` blocks are for promo and onboarding banners only, matching Deriv's pattern.
  The working interface stays light.

---

## 3. Typography

**Inter** for everything, loaded from Google Fonts in `index.html`. Weights 400, 500, 600.

Matching Deriv's typeface is a deliberate choice, not a default — this work should read as part
of their system.

### Scale

Fixed steps only. Do not invent intermediate sizes.

| Name | Size / line-height | Tracking | Weight | Use |
|---|---|---|---|---|
| `display` | 40px / 1.1 | -0.02em | 600 | The ledger figure |
| `title` | 28px / 1.2 | -0.02em | 600 | Page title |
| `heading` | 20px / 1.3 | -0.01em | 600 | Section headings |
| `body` | 16px / 1.5 | 0 | 400 | Default |
| `small` | 14px / 1.45 | 0 | 400 | Table cells, secondary text |
| `label` | 12px / 1.4 | 0.04em | 500 | Column headers, badges, eyebrows |

Hierarchy comes from size, colour and space — not from stacking weights.

### Numerals — non-negotiable

Every number in the interface gets `font-variant-numeric: tabular-nums` so columns align.
This is the single cheapest craft signal in a trading UI and MT5 currently gets it wrong.

---

## 4. Spacing and shape

- Base 4px. Allowed values only: **4, 8, 12, 16, 24, 32, 48, 64**. Never `p-[13px]`.
- Page container max-width 1200px, 24px side padding (16px below 640px).
- Between major sections: 32px. Inside a card: 16px or 24px.
- Radius: **8px** controls and inputs, **16px** cards and banners, **full** pills and badges.
  Three values, no others. Deriv uses generous radii — match that.
- **Borders and surface fills for separation, not shadows.** One shadow token exists for
  genuinely floating elements only (dropdown, modal): `0 4px 16px rgba(14,14,14,0.08)`.
- Left-align by default. Centre only for empty states.

---

## 5. Components

`src/components`, one file each. Every state listed must exist.

**Button** — `primary` (brand fill, white text), `secondary` (surface fill, line border, ink text),
`ghost` (no fill or border). States: default, hover, focus-visible, active, disabled, loading.
Height 44px, 16px/24px padding, 14px/500 label, full radius (Deriv uses pill buttons).

**Card** — surface or paper fill, 1px line border, 16px radius, 24px padding.

**Field** — label above, input, helper or error below. Input 44px tall, 8px radius, 1px line
border. Focus: 2px ink ring, 2px offset. Error: negative border and negative helper text.
Labels always present and always associated with the input.

**Badge** — pill, `label` type, tones: neutral, positive, negative. Low-opacity tonal
backgrounds, never full saturation. Never brand red.

**StatBlock** — the ledger figure with a `label` eyebrow above, optional delta below in
positive/negative.

**ListRow** — the workhorse. Left: primary label plus muted secondary line. Right: amount in
tabular numerals, coloured by direction. Separated by bottom hairline, not gaps. Hover: surface
fill. Pointer cursor only if genuinely clickable.

**EmptyState** — one heading, one sentence of direction, one action. Never just "No data."

---

## 6. Copy

- Sentence case everywhere. No Title Case buttons.
- Buttons say what happens: "Place order", not "Submit". The name persists through the flow —
  "Place order" produces "Order placed".
- Plain language over platform jargon. If a term like *margin* or *equity* must appear, it gets
  a definition on hover or a one-line explanation. Assume a new trader.
- Errors state what happened and what to do. "Amount exceeds your free margin of 9,999.98 AED",
  not "Invalid input".
- **No lorem ipsum.** Realistic instruments, plausible prices, correct decimal precision
  (crypto pairs run to 5 decimals, not 2).

---

## 7. Money and data

- All currency through one helper, `src/lib/money.js`, using `Intl.NumberFormat`. Never build a
  currency string by concatenation. Comma thousands separators, not spaces.
- Dates through one helper using `Intl.DateTimeFormat`.
- Seed data in `src/data/` as plain arrays. 12–20 rows, enough to look real.
- Negative shows a minus and negative colour; positive shows a plus and positive colour;
  neutral figures stay ink.

---

## 8. Quality floor

Ships by default, don't ask:

- Responsive to 390px. No horizontal overflow.
- Visible keyboard focus on everything interactive — 2px ink ring, 2px offset. Never
  `outline: none` without a replacement.
- Semantic HTML: `button` for actions, `a` for navigation, real `label` elements, one `h1`.
- Text contrast at least 4.5:1.
- Loading, empty and error states for anything showing a collection.
- `prefers-reduced-motion` respected.

---

## 9. Motion

One duration, **150ms**. One easing, **ease-out**. Interactive feedback only — hover, focus,
open/close. No entrance animations, scroll reveals, staggered lists or parallax.

---

## 10. Do not do these

- Brand red on anything that isn't a primary button or the logo.
- The same colour for "sell" and for a call-to-action.
- Purple or indigo. Gradient buttons. Glassmorphism. Blurred backdrops.
- Drop shadows on cards.
- **Attempting to reproduce Deriv's 3D rendered illustrations.** Not achievable in the time and
  a half-convincing version is worse than none. Let type and space carry the page, or use simple
  line icons.
- Emoji as icons.
- Decorative numbered markers (01 / 02 / 03) unless the content is a genuine sequence.
- More than one font size inside a single component.
- Placeholder text used instead of a label.
- Space-separated thousands (`10 000.00`). Commas.
- `console.log` left in shipped code.
