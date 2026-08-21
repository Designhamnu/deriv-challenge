import { useSyncExternalStore } from 'react'

/*
 * The goal the user adopted in the assistant, shared with the goal screen.
 * CLAUDE.md fixes the stack with no state library, so this is the same
 * few-lines-over-a-subscription pattern the router uses.
 */
let selectedGoalId = null
const listeners = new Set()

function subscribe(callback) {
  listeners.add(callback)
  return () => listeners.delete(callback)
}

function getSnapshot() {
  return selectedGoalId
}

export function setSelectedGoalId(id) {
  if (id === selectedGoalId) return
  selectedGoalId = id
  for (const listener of listeners) listener()
}

export function useSelectedGoalId() {
  return useSyncExternalStore(subscribe, getSnapshot, () => null)
}
