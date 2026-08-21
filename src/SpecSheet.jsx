import Badge from './components/Badge.jsx'
import Button from './components/Button.jsx'
import Card from './components/Card.jsx'
import EmptyState from './components/EmptyState.jsx'
import Field from './components/Field.jsx'
import ListRow from './components/ListRow.jsx'
import ProgressBar from './components/ProgressBar.jsx'
import StatBlock from './components/StatBlock.jsx'

/** Section wrapper — layout only, local to this page. */
function Section({ title, note, children }) {
  return (
    <section className="mt-8 border-t border-line pt-8">
      <h2 className="text-heading text-ink">{title}</h2>
      {note ? <p className="mt-2 max-w-2xl text-small text-muted">{note}</p> : null}
      <div className="mt-6">{children}</div>
    </section>
  )
}

/** Caption above each specimen. */
function Spec({ label, children, className = '' }) {
  return (
    <div className={className}>
      <p className="mb-3 text-label text-muted">{label}</p>
      {children}
    </div>
  )
}

const CONTRIBUTIONS = [
  { month: 'June', date: '1 June 2026', amount: 5000 },
  { month: 'May', date: '1 May 2026', amount: 5000 },
  { month: 'April', date: '1 April 2026', amount: 5000 },
  { month: 'March', date: '1 March 2026', amount: 5000 },
]

export default function SpecSheet() {
  return (
    <div className="min-h-screen bg-paper">
      <div className="mx-auto max-w-page px-4 py-12 sm:px-6">
        <header>
          <p className="text-label text-muted">Nawa</p>
          <h1 className="mt-2 text-title text-ink">Component spec sheet</h1>
          <p className="mt-4 max-w-2xl text-body text-muted">
            Every component in every state, as the savings product uses them.
            Hover, tab and click through — hover, focus and active states are
            live rather than simulated, so keyboard focus rings are visible by
            tabbing.
          </p>
        </header>

        {/* Button ---------------------------------------------------------- */}
        <Section
          title="Button"
          note="44px tall, 24px horizontal padding, pill radius, 14px/500 label. Brand green is reserved for the primary variant."
        >
          <div className="flex flex-col gap-6">
            <Spec label="Default">
              <div className="flex flex-wrap items-center gap-4">
                <Button variant="primary">Start with 5,000</Button>
                <Button variant="secondary">Adjust my plan</Button>
                <Button variant="ghost">Cancel</Button>
              </div>
            </Spec>

            <Spec label="Disabled">
              <div className="flex flex-wrap items-center gap-4">
                <Button variant="primary" disabled>
                  Start with 5,000
                </Button>
                <Button variant="secondary" disabled>
                  Adjust my plan
                </Button>
                <Button variant="ghost" disabled>
                  Cancel
                </Button>
              </div>
            </Spec>

            <Spec label="Loading">
              <div className="flex flex-wrap items-center gap-4">
                <Button variant="primary" loading>
                  Setting up your plan
                </Button>
                <Button variant="secondary" loading>
                  Saving
                </Button>
                <Button variant="ghost" loading>
                  Cancelling
                </Button>
              </div>
            </Spec>
          </div>
        </Section>

        {/* Card ------------------------------------------------------------ */}
        <Section
          title="Card"
          note="1px line border, 16px radius, 24px padding, and the card shadow token so it lifts off the page."
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <Spec label="Paper fill">
              <Card>
                <h3 className="text-heading text-ink">Savings plan</h3>
                <p className="mt-2 text-small text-muted">
                  Sits directly on the page background, held by its border.
                </p>
              </Card>
            </Spec>

            <Spec label="Surface fill">
              <Card tone="surface">
                <h3 className="text-heading text-ink">Contribution history</h3>
                <p className="mt-2 text-small text-muted">
                  Reads as recessed. Use when a panel sits inside another surface.
                </p>
              </Card>
            </Spec>
          </div>
        </Section>

        {/* Field ----------------------------------------------------------- */}
        <Section
          title="Field"
          note="Label above, input, helper or error below. The label is always present and always tied to the input — placeholder text never stands in for it."
        >
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <Spec label="Default">
              <Field label="Monthly take-home" defaultValue="" />
            </Spec>

            <Spec label="With helper">
              <Field
                label="Monthly take-home"
                defaultValue="18,000"
                helper="We'll work out what you can put aside"
              />
            </Spec>

            <Spec label="Error">
              <Field
                label="Monthly take-home"
                defaultValue="eighteen thousand"
                error="That doesn't look like a number — how much do you take home each month?"
              />
            </Spec>

            <Spec label="Disabled">
              <Field
                label="Account currency"
                defaultValue="AED"
                disabled
                helper="Set when the account was opened."
              />
            </Spec>
          </div>
        </Section>

        {/* Badge ----------------------------------------------------------- */}
        <Section
          title="Badge"
          note="Pill, 12px label type, low-opacity tonal fill. Direction colours only — brand green never appears on a status indicator."
        >
          <div className="flex flex-wrap items-center gap-4">
            <Badge tone="neutral">On track</Badge>
            <Badge tone="positive">Ahead</Badge>
            <Badge tone="negative">Behind</Badge>
          </div>
        </Section>

        {/* StatBlock ------------------------------------------------------- */}
        <Section
          title="StatBlock"
          note="The ledger figure: large tabular amount, small muted currency code after it. The display size is used once per screen — every other figure drops to body size."
        >
          <div className="flex flex-col gap-6">
            <Spec label="Display — primary figure, once per screen">
              <Card>
                <StatBlock label="Saved so far" value={15000} currency="AED" />
              </Card>
            </Spec>

            <Spec label="Body size — money and plain figures side by side">
              <Card>
                <div className="grid gap-6 sm:grid-cols-3">
                  <StatBlock
                    label="Monthly contribution"
                    value={5000}
                    currency="AED"
                    size="body"
                  />
                  <StatBlock label="Months remaining" value="45" size="body" />
                  <StatBlock label="Saving streak" value="3 months" size="body" />
                </div>
              </Card>
            </Spec>
          </div>
        </Section>

        {/* ProgressBar ----------------------------------------------------- */}
        <Section
          title="ProgressBar"
          note="Progress toward a target. Brand fill on a brand-soft track; on a brand-filled card it flips to white on a white-at-25% track."
        >
          <div className="grid gap-6 lg:grid-cols-2">
            <Spec label="Default — on paper">
              <Card>
                <StatBlock
                  label="Saved so far"
                  value={15000}
                  currency="AED"
                  size="body"
                />
                <div className="mt-6">
                  <ProgressBar
                    value={15000}
                    max={240000}
                    label="Home down payment progress"
                  />
                  <p className="mt-2 text-small text-muted">
                    of 240,000 AED target
                  </p>
                </div>
              </Card>
            </Spec>

            <Spec label="On a brand fill">
              <Card tone="brand">
                <StatBlock
                  label="Saved so far"
                  value={15000}
                  currency="AED"
                  size="body"
                  tone="brand"
                />
                <div className="mt-6">
                  <ProgressBar
                    value={15000}
                    max={240000}
                    label="Home down payment progress"
                    tone="onBrand"
                  />
                  <p className="mt-2 text-small text-paper/90">
                    of 240,000 AED target
                  </p>
                </div>
              </Card>
            </Spec>
          </div>
        </Section>

        {/* ListRow --------------------------------------------------------- */}
        <Section
          title="ListRow"
          note="Rows are separated by a hairline, not by gaps. Amounts are tabular so the decimal points line up down the column."
        >
          <div className="grid gap-6 lg:grid-cols-2">
            <Spec label="Clickable — pointer cursor and hover fill">
              <div className="overflow-hidden rounded-card border border-line shadow-card">
                {CONTRIBUTIONS.map((row) => (
                  <ListRow
                    key={row.month}
                    label={row.month}
                    secondary={row.date}
                    value={row.amount}
                    currency="AED"
                    signed={false}
                    onClick={() => {}}
                  />
                ))}
              </div>
            </Spec>

            <Spec label="Static — no pointer, with a badge">
              <div className="overflow-hidden rounded-card border border-line shadow-card">
                {CONTRIBUTIONS.map((row) => (
                  <ListRow
                    key={row.month}
                    label={row.month}
                    secondary={row.date}
                    value={row.amount}
                    currency="AED"
                    signed={false}
                    badge={
                      row.month === 'June' ? (
                        <Badge tone="positive">Ahead</Badge>
                      ) : undefined
                    }
                  />
                ))}
              </div>
            </Spec>
          </div>
        </Section>

        {/* EmptyState ------------------------------------------------------ */}
        <Section
          title="EmptyState"
          note="One heading, one sentence of direction, one action. Centred — the only place centring is used."
        >
          <Card>
            <EmptyState
              heading="No goals yet"
              description="Tell Hamood what you're saving for and he'll work out what you need to put aside each month."
              actionLabel="Start a goal"
              onAction={() => {}}
            />
          </Card>
        </Section>
      </div>
    </div>
  )
}
