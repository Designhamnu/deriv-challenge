import { formatMoneyParts } from '../lib/money.js'

const DELTA_TONE = {
  positive: 'text-positive',
  negative: 'text-negative',
  neutral: 'text-muted',
}

export default function StatBlock({
  label,
  value,
  currency = 'USD',
  decimals,
  delta,
  deltaNote,
  size = 'display',
  className = '',
}) {
  const figure = formatMoneyParts(value, { currency, decimals })

  const hasDelta = Number.isFinite(delta)
  const deltaFigure = hasDelta
    ? formatMoneyParts(delta, { currency, decimals, signed: true })
    : null

  return (
    <div className={['flex flex-col', className].join(' ')}>
      <span className="text-label text-muted">{label}</span>

      <p className="mt-2 flex items-baseline gap-2">
        <span
          className={[
            size === 'display' ? 'text-display' : 'text-body',
            'tabular-nums text-ink',
          ].join(' ')}
        >
          {figure.amount}
        </span>
        <span
          className={[
            size === 'display' ? 'text-small' : 'text-label',
            'font-medium text-muted',
          ].join(' ')}
        >
          {figure.currency}
        </span>
      </p>

      {deltaFigure ? (
        <p
          className={[
            'mt-2 text-small tabular-nums',
            DELTA_TONE[deltaFigure.direction],
          ].join(' ')}
        >
          {deltaFigure.amount} {deltaFigure.currency}
          {deltaNote ? <span className="text-muted"> {deltaNote}</span> : null}
        </p>
      ) : null}
    </div>
  )
}
