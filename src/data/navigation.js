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
  // Not available yet — no route, so it renders as a static row with a
  // "Soon" badge rather than a dead link.
  { id: 'courses', label: 'Courses', path: null, matches: [], badge: 'Soon' },
]

/** The goal screen owns exactly one path; everything else lands on the assistant. */
export function isGoalsPath(path) {
  return path === ROUTES.goals
}
