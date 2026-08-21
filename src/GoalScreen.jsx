import Card from './components/Card.jsx'
import EmptyState from './components/EmptyState.jsx'
import Icon from './components/Icon.jsx'
import ListRow from './components/ListRow.jsx'
import ProgressBar from './components/ProgressBar.jsx'
import StatBlock from './components/StatBlock.jsx'
import { formatDate, formatMonth } from './lib/date.js'
import {
  ACTIVE_GOAL,
  EMPTY_GOAL,
  RECENT_CONTRIBUTIONS,
} from './data/activeGoal.js'

const SUMMARY_ICONS = {
  monthly: 'wallet',
  remaining: 'clock',
  date: 'calendar',
  streak: 'flame',
}

/**
 * Pass `goal={null}` to take the empty rendering path.
 */
export default function GoalScreen({
  goal = ACTIVE_GOAL,
  contributions = RECENT_CONTRIBUTIONS,
}) {
  if (!goal) {
    return (
      <Card>
        <EmptyState
          heading={EMPTY_GOAL.heading}
          description={EMPTY_GOAL.body}
          actionLabel={EMPTY_GOAL.action}
        />
      </Card>
    )
  }

  return (
    <div className="flex flex-col gap-8">
      <header>
        <h1 className="text-title text-ink">{goal.title}</h1>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {goal.summary.map((item) => (
          <Card key={item.id}>
            <StatBlock
              label={item.label}
              value={item.value}
              currency={goal.currency}
              size="body"
              icon={<Icon name={SUMMARY_ICONS[item.id]} />}
            />
          </Card>
        ))}
      </div>

      <div className="flex flex-col gap-8">
        <Card tone="brand">
          <StatBlock
            label="Saved so far"
            value={goal.saved}
            currency={goal.currency}
            size="display"
            tone="brand"
          />
          <div className="mt-6">
            <ProgressBar
              value={goal.saved}
              max={goal.target}
              label={`${goal.title} progress`}
              tone="onBrand"
            />
            <p className="mt-2 text-small text-paper/90">{goal.targetCaption}</p>
          </div>
        </Card>

        <section>
          <h2 className="text-heading text-ink">{goal.contributionsHeading}</h2>
          <div className="mt-4 overflow-hidden rounded-card border border-line shadow-card">
            {contributions.map((entry) => (
              <ListRow
                key={entry.id}
                label={formatMonth(entry.date)}
                secondary={formatDate(entry.date)}
                value={entry.amount}
                currency={goal.currency}
                signed={false}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
