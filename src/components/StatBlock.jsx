import { formatMoneyParts } from '../lib/money.js'

const TONE = {
  ink: { label: 'text-muted', amount: 'text-ink', code: 'text-muted' },
  brand: { label: 'text-paper/90', amount: 'text-paper', code: 'text-paper/90' },
}

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
  tone = 'ink',
  icon,
  className = '',
}) {
  const palette = TONE[tone] ?? TONE.ink
  // Summary figures are not always money — "45" and "March 2030" are shown
  // verbatim, with no currency code beside them.
  const isText = typeof value === 'string'
  const figure = isText ? null : formatMoneyParts(value, { currency, decimals })

  const hasDelta = Number.isFinite(delta)
  const deltaFigure = hasDelta
    ? formatMoneyParts(delta, { currency, decimals, signed: true })
    : null

  return (
    <div className={['flex flex-col', className].join(' ')}>
      {icon ? (
        <span className={`mb-2 block ${palette.label}`}>{icon}</span>
      ) : null}
      <span className={`text-label ${palette.label}`}>{label}</span>

      <p className="mt-2 flex items-baseline gap-2">
        <span
          className={[
            size === 'display' ? 'text-display' : 'text-body',
            'tabular-nums',
            palette.amount,
          ].join(' ')}
        >
          {isText ? value : figure.amount}
        </span>
        {figure ? (
          <span
            className={[
              size === 'display' ? 'text-small' : 'text-label',
              'font-medium',
              palette.code,
            ].join(' ')}
          >
            {figure.currency}
          </span>
        ) : null}
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
