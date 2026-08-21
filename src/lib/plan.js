/** Share of income the assistant proposes putting aside. */
export const CONTRIBUTION_RATE = 0.28

/** The gentler alternative the assistant offers alongside it. */
export const SLOWER_RATE = 0.2

/**
 * Above this share of income a plan costs more than it is reasonable to ask,
 * so the assistant declines to produce one.
 */
export const AFFORDABILITY_CEILING = 0.4

/** Contribution rounds to the nearest 500 so the figure reads as a plan, not a calculation. */
export const CONTRIBUTION_STEP = 500

/**
 * Roughly 28% of monthly income, to the nearest 500.
 *
 * Floored at one step: the literal rounding returns 0 for very small incomes,
 * and a plan that asks for nothing is not a plan.
 */
function atRate(income, rate) {
  if (!Number.isFinite(income) || income <= 0) return CONTRIBUTION_STEP
  const raw = (income * rate) / CONTRIBUTION_STEP
  return Math.max(CONTRIBUTION_STEP, Math.round(raw) * CONTRIBUTION_STEP)
}

export function monthlyContribution(income) {
  return atRate(income, CONTRIBUTION_RATE)
}

/**
 * The two suggested contributions, guaranteed to differ. Rounding can land
 * both rates on the same figure; when it does the gentler one drops a step,
 * and if that would breach the floor the faster one rises instead.
 */
export function planOptions(income) {
  let faster = monthlyContribution(income)
  let slower = atRate(income, SLOWER_RATE)

  if (slower >= faster) {
    slower = faster - CONTRIBUTION_STEP
    if (slower < CONTRIBUTION_STEP) {
      slower = CONTRIBUTION_STEP
      faster = CONTRIBUTION_STEP * 2
    }
  }

  return { faster, slower }
}

/**
 * Whether the contribution the goal actually needs sits within reach of the
 * income. Above the ceiling the assistant offers no plan.
 */
export function isAffordable(requiredMonthly, income) {
  if (!Number.isFinite(income) || income <= 0) return false
  if (!Number.isFinite(requiredMonthly) || requiredMonthly <= 0) return true
  return requiredMonthly <= income * AFFORDABILITY_CEILING
}

/** Months to reach a target at a given monthly contribution. */
export function monthsToTarget(target, monthly) {
  if (!Number.isFinite(target) || target <= 0 || !monthly) return 0
  return Math.ceil(target / monthly)
}

/** What the contribution actually works out to as a share of income. */
export function shareOfIncome(monthly, income) {
  if (!Number.isFinite(income) || income <= 0) return 0
  return Math.round((monthly / income) * 100)
}
