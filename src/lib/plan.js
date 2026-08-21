/** Share of income the assistant proposes putting aside. */
export const CONTRIBUTION_RATE = 0.28

/** The gentler alternative the assistant offers alongside it. */
export const SLOWER_RATE = 0.2

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
 * The gentler option. Rounding can land it on the same figure as the 28%
 * one, which would offer two identical choices, so it is nudged one step
 * down when that happens.
 */
export function slowerContribution(income) {
  const fast = monthlyContribution(income)
  const slow = atRate(income, SLOWER_RATE)
  if (slow < fast) return slow
  return Math.max(CONTRIBUTION_STEP, fast - CONTRIBUTION_STEP)
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
