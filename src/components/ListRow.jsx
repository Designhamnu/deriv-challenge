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
  active = false,
  muted = false,
  onClick,
  className = '',
}) {
  // Navigation rows carry no amount — the figure is optional.
  const hasValue = value !== undefined && value !== null
  const figure = hasValue
    ? formatMoneyParts(value, { currency, decimals, signed })
    : null

  const tone = signed && figure ? DIRECTION_TONE[figure.direction] : 'text-ink'
  const interactive = typeof onClick === 'function'

  const body = (
    <>
      <span className="flex min-w-0 flex-col">
        <span className="flex items-center gap-2">
          <span
            className={[
              'truncate text-body',
              active ? 'text-brand' : muted ? 'text-muted' : 'text-ink',
            ].join(' ')}
          >
            {label}
          </span>
          {badge}
        </span>
        {secondary ? (
          <span className="mt-1 truncate text-small text-muted">
            {secondary}
          </span>
        ) : null}
      </span>

      {figure ? (
        <span className={['shrink-0 text-body tabular-nums', tone].join(' ')}>
          {figure.amount}{' '}
          <span className="text-label font-medium text-muted">
            {figure.currency}
          </span>
        </span>
      ) : null}
    </>
  )

  const shared = [
    'flex items-center justify-between gap-4 border-b border-line px-4 py-4 last:border-b-0',
    active ? 'bg-brand-soft' : '',
  ].join(' ')

  if (interactive) {
    return (
      <button
        type="button"
        onClick={onClick}
        aria-current={active ? 'page' : undefined}
        className={[
          shared,
          'w-full cursor-pointer text-left transition-fill',
          active ? '' : 'hover:bg-surface',
          'focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-focus',
          className,
        ].join(' ')}
      >
        {body}
      </button>
    )
  }

  return (
    <div aria-current={active ? 'page' : undefined} className={[shared, className].join(' ')}>
      {body}
    </div>
  )
}
