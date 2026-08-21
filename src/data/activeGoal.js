/*
 * Goal screen content, taken verbatim from PRD section 5.
 *
 * Money values are held as numbers and formatted through money.js at render.
 * `targetCaption` is the one exception: PRD section 5 writes it as
 * "of AED 240,000 target" — currency code before the amount and no decimals —
 * which money.js cannot produce, since the house style sets the code after the
 * amount. It is kept as written rather than reformatted.
 */

export const ACTIVE_GOAL = {
  title: 'Home down payment',
  status: 'On track',
  currency: 'AED',

  saved: 15000,
  target: 240000,
  targetCaption: 'of AED 240,000 target',

  summary: [
    { id: 'monthly', label: 'Monthly contribution', value: 5000 },
    { id: 'remaining', label: 'Months remaining', value: '45' },
    { id: 'date', label: 'On track for', value: 'March 2030' },
    { id: 'streak', label: 'Saving streak', value: '3 months' },
  ],

  contributionsHeading: 'Recent contributions',
}

/*
 * Three contributions of AED 5,000, monthly, most recent first.
 *
 * PRD section 5 gives the count and the amount but no dates. These are derived
 * from the PRD's own arithmetic: 45 months remaining against a March 2030
 * completion puts the current month at June 2026, and "three months in" at
 * 3 x 5,000 = the 15,000 already saved. Days default to the 1st.
 */
export const RECENT_CONTRIBUTIONS = [
  { id: 'con-2026-06', date: '2026-06-01', amount: 5000 },
  { id: 'con-2026-05', date: '2026-05-01', amount: 5000 },
  { id: 'con-2026-04', date: '2026-04-01', amount: 5000 },
]

/** PRD section 5, empty state. */
export const EMPTY_GOAL = {
  heading: 'No goals yet',
  body: "Tell the assistant what you're saving for and it'll work out what you need to put aside each month.",
  action: 'Start a goal',
}
