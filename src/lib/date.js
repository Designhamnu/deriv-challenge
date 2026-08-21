const DEFAULT_LOCALE = 'en-GB'

function parse(value) {
  if (value instanceof Date) return value
  // Anchor plain ISO dates to local midnight so the day never shifts.
  const date = new Date(`${value}T00:00:00`)
  return Number.isNaN(date.getTime()) ? null : date
}

/** "1 June 2026" */
export function formatDate(value, options = {}) {
  const { locale = DEFAULT_LOCALE } = options
  const date = parse(value)
  if (!date) return '—'
  return new Intl.DateTimeFormat(locale, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date)
}

/** "June" */
export function formatMonth(value, options = {}) {
  const { locale = DEFAULT_LOCALE } = options
  const date = parse(value)
  if (!date) return '—'
  return new Intl.DateTimeFormat(locale, { month: 'long' }).format(date)
}
