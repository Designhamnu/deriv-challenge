import AppShell from './AppShell.jsx'
import GoalScreen from './GoalScreen.jsx'

/**
 * The spec sheet stays available at ./SpecSheet.jsx.
 * Pass `goal={null}` to GoalScreen to see the empty rendering path.
 */
export default function App() {
  return (
    <AppShell>
      <GoalScreen />
    </AppShell>
  )
}
