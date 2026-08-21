import AppShell from './AppShell.jsx'
import AssistantScreen from './AssistantScreen.jsx'
import GoalScreen from './GoalScreen.jsx'
import { isGoalsPath } from './data/navigation.js'
import { usePath } from './lib/router.js'

/**
 * The spec sheet stays available at ./SpecSheet.jsx.
 * Pass `goal={null}` to GoalScreen to see the empty rendering path.
 */
export default function App() {
  const path = usePath()

  return (
    <AppShell>
      {isGoalsPath(path) ? <GoalScreen /> : <AssistantScreen />}
    </AppShell>
  )
}
