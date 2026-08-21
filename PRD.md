# PRD — Deriv Save

## 1. The problem

**In the user's words:**

> "I know I should be saving. I don't know what I'm saving for, how much, or whether what
> I'm putting aside is anywhere near enough."

People don't fail at saving because they lack discipline. They fail because "save more" isn't a
plan. A goal you haven't made concrete — how much, by when, out of what income — can't be acted
on. Every savings product assumes you arrive already knowing your number. Almost nobody does.

**Who exactly:** A salaried professional in the UAE, mid-twenties to mid-thirties, earning
AED 15–25k a month. Money accumulates in a current account with no plan attached to it. Has a
vague intention — "a house eventually" — and no idea what that costs or what monthly figure
would get there. More likely to open a trading app than a savings account, because saving feels
static and trading at least feels like progress.

**The one job:** Turn a vague intention into a specific monthly number, then show progress
against it.

**How I'd know it worked:** The user can state their monthly savings figure and target date from
memory after one session. That's the difference between having a goal and having a plan.

---

## 2. Scope

**Building:**

- **Goal screen (primary).** App shell with sidebar navigation. The active goal as the primary
  ledger figure, progress toward target, the plan the assistant produced, recent contributions,
  and a next-step card in the assistant's voice.
- **Conversation screen.** Three turns: what are you saving for (free text) → estimated cost and
  a question about income (number) → proposed monthly contribution and completion date →
  confirm. Confirming lands on the goal screen.
- **States:** empty (no goals yet), loading (assistant thinking), success (plan created).

**Deliberately NOT building, and why:**

| Not building | Why |
|---|---|
| Emirates ID login / auth | Brief says mock all data, no auth. A login screen costs real time and shows nothing about design systems. |
| Real LLM integration | Brief forbids real APIs. Responses are keyword-matched across five goal types with a fallback. README notes where a model call would slot in. |
| Multiple concurrent goals | One goal proves the concept. A goals list is a different problem and another screen. |
| Bank connection flow | Assumed connected. The interesting problem is the plan, not the plumbing. |
| Learning / content modules | A second content type designed from scratch. Out of scope for a ~2 hour build. |
| Withdrawing from a goal | A real product needs it; the core idea doesn't. |

**The one thing that must work end to end if everything else fails:**

> Type a goal in free text → assistant returns a concrete monthly figure and date → land on the
> goal screen showing that plan.

---

## 3. Design system change — savings accent

Deriv's coral is a trading colour: urgency, action, execution. Savings is the opposite posture —
patience and accumulation. So the brand token changes and nothing else does. The type scale,
spacing scale, radii, component structure and every layout rule stay exactly as they are. This is
the point of tokens: swap the value, the system holds.

Update in `tokens.css` only:

| Token | Was | Now |
|---|---|---|
| `--color-brand` | `#FF444F` | `#0F7A56` |
| `--color-brand-hover` | `#E63946` | `#0C6446` |
| `--color-brand-soft` | — | `#E7F3EE` (progress track, subtle fills) |

`--color-negative` (`#C40000`) remains, used for error states only. There is no gain/loss duality
in a savings product — every movement is progress — so directional colour is not needed here.
That absence is deliberate, not an omission.

Everything else in CLAUDE.md stands unchanged.

---

## 4. The screens

**App shell.** Fixed left sidebar, 260px, paper fill, 1px right border. Wordmark at top. Nav
items: Assistant, Goals (active), Activity. Each is a ListRow variant — active state gets a
brand-soft fill and brand text. Sidebar is fixed on desktop and collapses above the content
below 768px. Main content area, max 960px, 32px padding.

**Goal screen.** Page title `Home down payment` with a Badge reading `On track`.

Below that, a row of three summary Cards: monthly contribution, months remaining, on track for
— each a body-size StatBlock with a `label` eyebrow.

Then the primary Card: `Saved so far` as a label, the amount as the display-size ledger figure
(large tabular, small muted `AED` after it), a progress bar beneath filled in brand green on a
brand-soft track, and `of AED 240,000 target` as small muted text below.

Then `Recent contributions` as ListRows — month and date on the left, amount on the right, all
tabular, hairline separators.

Right column or below on narrow screens: a `Your next step` Card, brand fill, white text,
containing the assistant's nudge and a secondary Button.

**Conversation screen.** Single centred column, max 640px. Assistant messages in surface-fill
Cards on the left, user messages in paper-fill Cards on the right. Composer at the bottom uses
Field — text input for turn 1, number input for turn 2. When the assistant proposes a plan it
renders a StatBlock inside its message Card, with two Buttons beneath.

**Components used:** Button, Card, Field, Badge, StatBlock, ListRow, EmptyState. New: progress
bar only, built from existing tokens.

---

## 5. Content

**Sidebar:** `Deriv Save` · `Assistant` · `Goals` · `Activity`

**Goal screen**

- Title: `Home down payment` · Badge: `On track`
- Summary labels: `Monthly contribution` / `Months remaining` / `On track for`
- Values: `5,000.00 AED` / `45` / `March 2030`
- Primary: label `Saved so far`, figure `15,000.00 AED`, sub `of AED 240,000 target`
- Section heading: `Recent contributions`
- Next step Card heading: `Your next step`
- Nudge: `You're three months in and on schedule. Adding AED 800 a month would bring your
  target forward by eight months.`
- Button: `Adjust my plan`

**Conversation**

- Turn 1: `What are you saving for?` · placeholder `A home, a car, a wedding — anything.`
- Turn 2 (home): `A home in Dubai averages AED 1.2M. You'd need around AED 240,000 for a 20%
  down payment. What do you earn a month?`
- Turn 3: `Setting aside AED 5,000 a month gets you there by March 2030. That's 28% of your
  income — comfortable, but not painless.`
- Buttons: `Yes, set it up` / `Adjust the amount`
- Loading: `Working out your numbers`

**Empty state**

- Heading: `No goals yet`
- Body: `Tell the assistant what you're saving for and it'll work out what you need to put aside
  each month.`
- Action: `Start a goal`

**Error state**

- `Amount must be less than your monthly income of AED 18,000`

**Seed data**

Goal types with realistic UAE figures: home (AED 240,000 down payment), car (AED 85,000),
wedding (AED 150,000), travel (AED 20,000), emergency fund (six months of income). Generic
fallback for anything else.

Three recent contributions, AED 5,000 each, monthly, most recent first. All formatted through
`money.js` — comma separators, currency code after the amount, tabular numerals.
