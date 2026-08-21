/*
 * Assistant screen copy.
 *
 * Sources: the questions, placeholder, plan button labels and loading label
 * come from PRD section 5. The suggestion chips, error message and loading
 * behaviour come from the build brief. Two strings had no given source and
 * are derived rather than supplied — see the notes below.
 */

export const CONVERSATION = {
  // PRD section 5, turn 1.
  opening: 'What are you saving for?',
  goalPlaceholder: 'A home, a car, a wedding — anything.',

  // Brief: four suggestion chips.
  suggestions: ['A home', 'A car', 'A wedding', 'An emergency fund'],

  // PRD section 5, turn 2.
  incomeQuestion: 'What do you earn a month?',

  // Brief: error state.
  incomeError: 'Enter your monthly income as a number',

  // PRD section 5, loading.
  loading: 'Working out your numbers',

  // PRD section 5, turn 3 buttons.
  confirm: 'Yes, set it up',
  adjust: 'Adjust the amount',

  // PRD section 5 goal screen labels, reused for the proposed plan.
  planLabels: {
    monthly: 'Monthly contribution',
    date: 'On track for',
  },

  // DERIVED, not supplied. CLAUDE.md section 6: "the name persists through
  // the flow" — "Yes, set it up" produces "Goal set up".
  success: 'Goal set up.',

  // DERIVED, not supplied. No composer button label was given.
  send: 'Send',
}
