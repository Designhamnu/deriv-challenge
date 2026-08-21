import Badge from './components/Badge.jsx'
import Button from './components/Button.jsx'
import Card from './components/Card.jsx'
import EmptyState from './components/EmptyState.jsx'
import Field from './components/Field.jsx'
import ListRow from './components/ListRow.jsx'
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

const OPEN_POSITIONS = [
  { label: 'Volatility 75 Index', secondary: 'Buy · 0.50 lots', value: 248.6 },
  { label: 'EUR/USD', secondary: 'Sell · 1.00 lot', value: -82.15 },
  { label: 'BTC/USD', secondary: 'Buy · 0.02 lots', value: 1204.88 },
  { label: 'Gold/USD', secondary: 'Sell · 0.30 lots', value: -15.4 },
  { label: 'Boom 1000 Index', secondary: 'Buy · 1.00 lot', value: 0 },
]

const ACCOUNTS = [
  { label: 'MT5 Financial', secondary: 'Real · USD', value: 10000 },
  { label: 'MT5 Standard', secondary: 'Demo · USD', value: 50000 },
  { label: 'Deriv Apps', secondary: 'Real · AED', value: 3672.4, currency: 'AED' },
]

export default function App() {
  return (
    <div className="min-h-screen bg-paper">
      <div className="mx-auto max-w-page px-4 py-12 sm:px-6">
        <header>
          <p className="text-label text-muted">Deriv challenge</p>
          <h1 className="mt-2 text-title text-ink">Component spec sheet</h1>
          <p className="mt-4 max-w-2xl text-body text-muted">
            Every component in every state. Hover, tab and click through — hover,
            focus and active states are live rather than simulated, so keyboard
            focus rings are visible by tabbing.
          </p>
        </header>

        {/* Button ---------------------------------------------------------- */}
        <Section
          title="Button"
          note="44px tall, 24px horizontal padding, pill radius, 14px/500 label. Brand red is reserved for the primary variant."
        >
          <div className="flex flex-col gap-6">
            <Spec label="Default">
              <div className="flex flex-wrap items-center gap-4">
                <Button variant="primary">Place order</Button>
                <Button variant="secondary">Edit order</Button>
                <Button variant="ghost">Cancel</Button>
              </div>
            </Spec>

            <Spec label="Disabled">
              <div className="flex flex-wrap items-center gap-4">
                <Button variant="primary" disabled>
                  Place order
                </Button>
                <Button variant="secondary" disabled>
                  Edit order
                </Button>
                <Button variant="ghost" disabled>
                  Cancel
                </Button>
              </div>
            </Spec>

            <Spec label="Loading">
              <div className="flex flex-wrap items-center gap-4">
                <Button variant="primary" loading>
                  Placing order
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
          note="1px line border, 16px radius, 24px padding. Separation comes from the border and fill — no shadow."
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <Spec label="Paper fill">
              <Card>
                <h3 className="text-heading text-ink">Account summary</h3>
                <p className="mt-2 text-small text-muted">
                  Sits directly on the page background, held by its border.
                </p>
              </Card>
            </Spec>

            <Spec label="Surface fill">
              <Card tone="surface">
                <h3 className="text-heading text-ink">Margin details</h3>
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
              <Field label="Order amount" placeholder="0.00" defaultValue="" />
            </Spec>

            <Spec label="With helper">
              <Field
                label="Order amount"
                defaultValue="250.00"
                helper="Free margin available: 9,999.98 AED"
              />
            </Spec>

            <Spec label="Error">
              <Field
                label="Order amount"
                defaultValue="12,400.00"
                error="Amount exceeds your free margin of 9,999.98 AED"
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
          note="Pill, 12px label type, low-opacity tonal fill. Direction colours only — brand red never appears on a status indicator."
        >
          <div className="flex flex-wrap items-center gap-4">
            <Badge tone="neutral">Pending</Badge>
            <Badge tone="positive">Filled</Badge>
            <Badge tone="negative">Rejected</Badge>
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
                <StatBlock
                  label="Total balance"
                  value={10000}
                  currency="AED"
                  delta={248.6}
                  deltaNote="today"
                />
              </Card>
            </Spec>

            <Spec label="Body size — positive delta, negative delta, no delta">
              <Card>
                <div className="grid gap-6 sm:grid-cols-3">
                  <StatBlock
                    label="Open profit"
                    value={1355.93}
                    size="body"
                    delta={248.6}
                    deltaNote="today"
                  />
                  <StatBlock
                    label="Free margin"
                    value={9999.98}
                    size="body"
                    delta={-82.15}
                    deltaNote="today"
                  />
                  <StatBlock label="Equity" value={11355.93} size="body" />
                </div>
              </Card>
            </Spec>

            <Spec label="Crypto precision — 5 decimals, not 2">
              <Card>
                <StatBlock label="Wallet balance" value={0.0512345} currency="BTC" size="body" />
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
            <Spec label="Directional — signed and coloured, clickable">
              <div className="overflow-hidden rounded-card border border-line">
                {OPEN_POSITIONS.map((row) => (
                  <ListRow
                    key={row.label}
                    label={row.label}
                    secondary={row.secondary}
                    value={row.value}
                    onClick={() => {}}
                  />
                ))}
              </div>
            </Spec>

            <Spec label="Neutral — plain balances, static, with a badge">
              <div className="overflow-hidden rounded-card border border-line">
                {ACCOUNTS.map((row) => (
                  <ListRow
                    key={row.label}
                    label={row.label}
                    secondary={row.secondary}
                    value={row.value}
                    currency={row.currency}
                    signed={false}
                    badge={
                      row.secondary.startsWith('Demo') ? (
                        <Badge tone="neutral">Demo</Badge>
                      ) : (
                        <Badge tone="positive">Active</Badge>
                      )
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
              heading="No open positions"
              description="When you place your first order it will appear here with its live profit or loss."
              actionLabel="Place order"
              onAction={() => {}}
            />
          </Card>
        </Section>
      </div>
    </div>
  )
}
