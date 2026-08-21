export const WORDMARK = 'Nawa'

export const ROUTES = {
  assistant: '/',
  goals: '/goals',
}

export const NAV_ITEMS = [
  // The assistant is the landing screen; /assistant still resolves to it.
  {
    id: 'assistant',
    label: 'Talk with Hamood',
    path: ROUTES.assistant,
    matches: [ROUTES.assistant, '/assistant'],
  },
  { id: 'goals', label: 'My savings', path: ROUTES.goals, matches: [ROUTES.goals] },
  // No route yet — renders as a static row rather than a dead link.
  { id: 'activity', label: 'Activity', path: null, matches: [] },
]

/** The goal screen owns exactly one path; everything else lands on the assistant. */
export function isGoalsPath(path) {
  return path === ROUTES.goals
}
