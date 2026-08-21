import AppShell from './AppShell.jsx'
import AssistantScreen from './AssistantScreen.jsx'
import GoalScreen from './GoalScreen.jsx'
import SpecSheet from './SpecSheet.jsx'
import { isGoalsPath, ROUTES } from './data/navigation.js'
import { usePath } from './lib/router.js'

/**
 * The spec sheet renders at /spec.
 * Pass `goal={null}` to GoalScreen to see the empty rendering path.
 */
export default function App() {
  const path = usePath()

  // The spec sheet is a design-system reference, so it renders on its own
  // rather than inside the product shell.
  if (path === ROUTES.spec) return <SpecSheet />

  return (
    <AppShell>
      {isGoalsPath(path) ? <GoalScreen /> : <AssistantScreen />}
    </AppShell>
  )
}
