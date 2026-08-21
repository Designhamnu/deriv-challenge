import { formatMoney } from '../lib/money.js'

/*
 * Goal types for the savings assistant.
 *
 * Assumed conversation shape — turn 1 is the person saying what they are
 * saving for ("I want to buy a home"). Turn 2 is the assistant naming a
 * realistic target and showing where the number comes from. Turn 3 proposes
 * the monthly contribution and hands control back. Adjust `turn2`/`turn3`
 * below if the real flow splits differently.
 *
 * Every figure in the copy is derived from `target` / `monthly` and formatted
 * through the money helper, so the prose cannot drift out of step with the
 * numbers.
 */

const CURRENCY = 'AED'

const aed = (value) => formatMoney(value, { currency: CURRENCY })

/** "3 years" / "a year" / "18 months" — keeps copy in step with the numbers. */
function duration(target, monthly) {
  const months = Math.ceil(target / monthly)
  if (months % 12 !== 0) return `${months} months`
  const years = months / 12
  return years === 1 ? 'a year' : `${years} years`
}

function goal({ id, label, screenTitle, prompt, keywords = [], target, monthly, turn2, turn3 }) {
  const context = {
    target: aed(target),
    monthly: aed(monthly),
    duration: duration(target, monthly),
  }

  return {
    id,
    label,
    screenTitle: screenTitle ?? label,
    prompt,
    keywords,
    target,
    monthly,
    currency: CURRENCY,
    months: Math.ceil(target / monthly),
    response: {
      turn2: turn2(context),
      turn3: turn3(context),
    },
  }
}

export const GOALS = [
  goal({
    id: 'home',
    keywords: ['home', 'house', 'apartment', 'flat', 'villa', 'property', 'down payment', 'deposit'],
    label: 'Home',
    screenTitle: 'Home down payment',
    prompt: 'I want to buy a home',
    target: 420000,
    monthly: 7000,
    turn2: ({ target }) =>
      `Buying in Dubai usually means a 20% deposit plus roughly 7% in fees — land department registration, agency commission and mortgage setup. On a ${aed(1750000)} apartment that comes to ${target} you need up front.`,
    turn3: ({ monthly, duration }) =>
      `Setting aside ${monthly} a month gets you there in ${duration}. If that feels steep, we can stretch the timeline or aim at a smaller property — nothing is locked in yet.`,
  }),

  goal({
    id: 'car',
    keywords: ['car', 'vehicle', 'suv', 'motor'],
    label: 'Car',
    prompt: 'I want to buy a car',
    target: 90000,
    monthly: 2500,
    turn2: ({ target }) =>
      `A dependable new compact car in the UAE lands around ${target} on the road, once you include registration, plates and the first year of insurance.`,
    turn3: ({ monthly, duration }) =>
      `At ${monthly} a month you would own it outright in ${duration} with no financing, so none of your money goes to interest. Worth comparing against a loan before you decide.`,
  }),

  goal({
    id: 'wedding',
    keywords: ['wedding', 'marriage', 'married', 'engagement'],
    label: 'Wedding',
    prompt: 'I am saving for my wedding',
    target: 180000,
    monthly: 5000,
    turn2: ({ target }) =>
      `A mid-range UAE wedding — venue, catering and photography for around 200 guests — tends to come in near ${target}. Guest count moves this number more than anything else.`,
    turn3: ({ monthly, duration }) =>
      `That is ${monthly} a month over ${duration}. Most couples split this between two savers, which halves what each of you puts in.`,
  }),

  goal({
    id: 'travel',
    keywords: ['travel', 'trip', 'holiday', 'vacation', 'flight'],
    label: 'Travel',
    prompt: 'I want to save for a trip',
    target: 24000,
    monthly: 2000,
    turn2: ({ target }) =>
      `For two people on a two-week trip — flights, hotels and spending money — ${target} is a comfortable budget rather than a tight one.`,
    turn3: ({ monthly, duration }) =>
      `Put away ${monthly} a month and you are ready in ${duration}. Book flights early and you will likely come in under; whatever is left rolls into the next trip.`,
  }),

  goal({
    id: 'emergency-fund',
    keywords: ['emergency', 'rainy day', 'safety net', 'buffer'],
    label: 'Emergency fund',
    prompt: 'I want to build an emergency fund',
    target: 72000,
    monthly: 3000,
    turn2: ({ target }) =>
      `An emergency fund is money that covers your essentials if your income stops — rent, food, school fees. Six months at ${aed(12000)} a month means ${target} set aside.`,
    turn3: ({ monthly, duration }) =>
      `${monthly} a month builds that in ${duration}. Keep it separate from your other goals so it is genuinely there when you need it.`,
  }),
]

/** Used when the goal does not match any of the five above. */
export const GENERIC_GOAL = goal({
  id: 'generic',
  label: 'Something else',
  screenTitle: 'Savings goal',
  prompt: 'I am saving for something else',
  target: 48000,
  monthly: 2000,
  turn2: ({ target }) =>
    `Tell me roughly what it costs and I will work backwards from there. If you are not sure yet, ${target} is a sensible place to start.`,
  turn3: ({ monthly, duration }) =>
    `That works out at ${monthly} a month over ${duration}. You can change the target or the monthly amount whenever you like and I will recalculate.`,
})

/** Look up a goal by id, falling back to the generic one. */
export function goalFor(id) {
  return GOALS.find((entry) => entry.id === id) ?? GENERIC_GOAL
}

/**
 * Keyword-match free text against the goal types, falling back to the generic
 * goal. Whole-word matching so "car" does not fire on "scared".
 */
export function matchGoal(text) {
  const answer = String(text ?? '').toLowerCase()
  const hit = GOALS.find((entry) =>
    entry.keywords.some((keyword) => new RegExp(`\\b${keyword}\\b`).test(answer)),
  )
  return hit ?? GENERIC_GOAL
}

/** Lookup by id, including the generic fallback. */
export const GOALS_BY_ID = Object.fromEntries(
  [...GOALS, GENERIC_GOAL].map((entry) => [entry.id, entry]),
)
