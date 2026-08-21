import { useSyncExternalStore } from 'react'

/*
 * Minimal history router. CLAUDE.md fixes the stack at React + Vite +
 * Tailwind with no state library, so this is a few lines over the History API
 * rather than a routing dependency.
 */

const listeners = new Set()

function emit() {
  for (const listener of listeners) listener()
}

function subscribe(callback) {
  listeners.add(callback)
  window.addEventListener('popstate', callback)
  return () => {
    listeners.delete(callback)
    window.removeEventListener('popstate', callback)
  }
}

function getSnapshot() {
  return window.location.pathname
}

export function navigate(path) {
  if (path === window.location.pathname) return
  window.history.pushState({}, '', path)
  emit()
}

export function usePath() {
  return useSyncExternalStore(subscribe, getSnapshot, () => '/')
}
