const DEFAULT_LOCALE = 'en-US'
const DEFAULT_CURRENCY = 'USD'

/**
 * Currencies that carry more precision than the usual two decimals.
 * Crypto pairs run to 5 decimals, not 2.
 */
const FRACTION_DIGITS = {
  BTC: 5,
  ETH: 5,
  LTC: 5,
  XRP: 5,
}

function resolveFractionDigits(currency, decimals) {
  if (Number.isInteger(decimals)) return decimals
  return FRACTION_DIGITS[currency] ?? 2
}

/**
 * "positive" | "negative" | "neutral" — drives colour at the call site.
 */
export function directionOf(value) {
  if (!Number.isFinite(value) || value === 0) return 'neutral'
  return value > 0 ? 'positive' : 'negative'
}

/**
 * Splits a money value into its two rendered pieces so the ledger figure can
 * set the amount large and the currency code small and muted.
 *
 * Returns { amount, currency, direction }.
 */
export function formatMoneyParts(value, options = {}) {
  const {
    currency = DEFAULT_CURRENCY,
    decimals,
    signed = false,
    locale = DEFAULT_LOCALE,
  } = options

  if (!Number.isFinite(value)) {
    return { amount: '—', currency, direction: 'neutral' }
  }

  const fractionDigits = resolveFractionDigits(currency, decimals)

  const parts = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    currencyDisplay: 'code',
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
    signDisplay: signed ? 'exceptZero' : 'auto',
  }).formatToParts(value)

  // Everything except the currency code and the separator Intl puts beside it.
  const amount = parts
    .filter((part) => part.type !== 'currency' && part.type !== 'literal')
    .map((part) => part.value)
    .join('')

  const code = parts.find((part) => part.type === 'currency')?.value ?? currency

  return { amount, currency: code, direction: directionOf(value) }
}

/**
 * Flat string form — "10,000.00 AED". Deriv sets the currency after the
 * amount, so the two Intl-produced parts are re-ordered here. Use this for
 * aria-labels and other plain-text contexts; in JSX prefer formatMoneyParts
 * so the currency code can be styled separately.
 */
export function formatMoney(value, options = {}) {
  const { amount, currency } = formatMoneyParts(value, options)
  return `${amount} ${currency}`
}

/**
 * Grouped number with no currency code — for copy that names an amount
 * without repeating the currency, e.g. "Start with 5,000". Still Intl, so the
 * separators match every other figure.
 */
export function formatAmount(value, options = {}) {
  const { decimals = 0, locale = DEFAULT_LOCALE } = options
  if (!Number.isFinite(value)) return '—'
  return new Intl.NumberFormat(locale, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value)
}
