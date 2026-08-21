export default function App() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-6 bg-slate-950 text-slate-100">
      <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
        Hello from Vite + Tailwind v4
      </h1>
      <button
        type="button"
        onClick={() => alert('The button works.')}
        className="rounded-lg bg-indigo-500 px-6 py-3 font-medium text-white shadow-lg transition hover:bg-indigo-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300"
      >
        Click me
      </button>
    </main>
  )
}
