/** Share of income the assistant proposes putting aside. */
export const CONTRIBUTION_RATE = 0.28

/** Contribution rounds to the nearest 500 so the figure reads as a plan, not a calculation. */
export const CONTRIBUTION_STEP = 500

/**
 * Roughly 28% of monthly income, to the nearest 500.
 *
 * Floored at one step: the literal rounding returns 0 for very small incomes,
 * and a plan that asks for nothing is not a plan.
 */
export function monthlyContribution(income) {
  if (!Number.isFinite(income) || income <= 0) return CONTRIBUTION_STEP
  const raw = (income * CONTRIBUTION_RATE) / CONTRIBUTION_STEP
  return Math.max(CONTRIBUTION_STEP, Math.round(raw) * CONTRIBUTION_STEP)
}
