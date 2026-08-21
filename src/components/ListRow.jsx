import { formatMoneyParts } from '../lib/money.js'

const DIRECTION_TONE = {
  positive: 'text-positive',
  negative: 'text-negative',
  neutral: 'text-ink',
}

export default function ListRow({
  label,
  secondary,
  value,
  currency = 'USD',
  decimals,
  signed = true,
  badge,
  onClick,
  className = '',
}) {
  const figure = formatMoneyParts(value, { currency, decimals, signed })
  const tone = signed ? DIRECTION_TONE[figure.direction] : 'text-ink'
  const interactive = typeof onClick === 'function'

  const body = (
    <>
      <span className="flex min-w-0 flex-col">
        <span className="flex items-center gap-2">
          <span className="truncate text-body text-ink">{label}</span>
          {badge}
        </span>
        {secondary ? (
          <span className="mt-1 truncate text-small text-muted">
            {secondary}
          </span>
        ) : null}
      </span>

      <span className={['shrink-0 text-body tabular-nums', tone].join(' ')}>
        {figure.amount}{' '}
        <span className="text-label font-medium text-muted">
          {figure.currency}
        </span>
      </span>
    </>
  )

  const shared =
    'flex items-center justify-between gap-4 border-b border-line px-4 py-4 last:border-b-0'

  if (interactive) {
    return (
      <button
        type="button"
        onClick={onClick}
        className={[
          shared,
          'w-full cursor-pointer text-left transition-fill',
          'hover:bg-surface',
          'focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-focus',
          className,
        ].join(' ')}
      >
        {body}
      </button>
    )
  }

  return <div className={[shared, className].join(' ')}>{body}</div>
}
