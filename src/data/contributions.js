import { formatMoney } from '../lib/money.js'

/*
 * The eight most recent contributions, newest first. `goalId` matches the ids
 * in ./goals.js.
 *
 * Amounts are held as raw numbers so they can still be summed; `formatted` is
 * the display string, produced by the money helper rather than written by hand.
 * Dates are stored as plain ISO strings — formatting them needs the
 * Intl.DateTimeFormat helper described in CLAUDE.md section 7, which does not
 * exist yet.
 */

const CURRENCY = 'AED'

const RECENT = [
  { id: 'con-01', goalId: 'home', amount: 7000, date: '2026-08-20', method: 'Monthly transfer' },
  { id: 'con-02', goalId: 'wedding', amount: 5000, date: '2026-08-18', method: 'Monthly transfer' },
  { id: 'con-03', goalId: 'emergency-fund', amount: 3000, date: '2026-08-15', method: 'Monthly transfer' },
  { id: 'con-04', goalId: 'travel', amount: 2000, date: '2026-08-12', method: 'Monthly transfer' },
  { id: 'con-05', goalId: 'car', amount: 2500, date: '2026-08-09', method: 'Monthly transfer' },
  { id: 'con-06', goalId: 'home', amount: 12500, date: '2026-08-05', method: 'Bonus top-up' },
  { id: 'con-07', goalId: 'emergency-fund', amount: 642.5, date: '2026-08-01', method: 'Round-up' },
  { id: 'con-08', goalId: 'travel', amount: 1187.25, date: '2026-07-28', method: 'Bonus top-up' },
]

export const CONTRIBUTIONS = RECENT.map((entry) => ({
  ...entry,
  currency: CURRENCY,
  formatted: formatMoney(entry.amount, { currency: CURRENCY }),
}))
