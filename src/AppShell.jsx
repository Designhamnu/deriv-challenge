import ListRow from './components/ListRow.jsx'
import { NAV_ITEMS, WORDMARK } from './data/navigation.js'
import { navigate, usePath } from './lib/router.js'

/**
 * Fixed 260px sidebar on desktop; below 768px it collapses to a band above
 * the content. Nav items are ListRows — the active one takes a brand-soft
 * fill and brand text.
 */
export default function AppShell({ children }) {
  const path = usePath()

  return (
    <div className="min-h-screen bg-paper">
      <header className="border-b border-line bg-paper py-6 md:fixed md:inset-y-0 md:left-0 md:w-[260px] md:overflow-y-auto md:border-r md:border-b-0 md:py-8">
        <p className="px-4 text-heading text-brand">{WORDMARK}</p>

        <nav aria-label="Main" className="mt-6">
          {NAV_ITEMS.map((item) => (
            <ListRow
              key={item.id}
              label={item.label}
              active={item.path === path}
              onClick={item.path ? () => navigate(item.path) : undefined}
            />
          ))}
        </nav>
      </header>

      <main className="md:ml-[260px]">
        <div className="mx-auto max-w-[960px] p-4 sm:p-8">{children}</div>
      </main>
    </div>
  )
}
