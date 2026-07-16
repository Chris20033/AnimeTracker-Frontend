import { Link } from 'react-router-dom'

export function LibrarySkeleton() {
  return (
    <div className="grid gap-4 lg:grid-cols-2" aria-busy="true">
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className="ledger-panel skeleton-shimmer h-80" />
      ))}
    </div>
  )
}

interface LibraryErrorStateProps {
  onRetry: () => void
}

export function LibraryErrorState({ onRetry }: LibraryErrorStateProps) {
  return (
    <div role="alert" className="state-error grid gap-4 p-6 text-center font-semibold">
      <div>
        <p>We couldn't load your library.</p>
        <p className="mt-1 text-sm opacity-85">Check your session or try again in a few seconds.</p>
      </div>
      <button type="button" onClick={onRetry} className="mx-auto min-h-11 rounded-[var(--radius-md)] bg-[var(--accent)] px-5 py-2.5 font-black text-[var(--action-ink)] outline-none transition hover:-translate-y-0.5 focus:ring-4 focus:ring-[var(--focus)]">
        Retry
      </button>
    </div>
  )
}

interface EmptyLibraryStateProps {
  query?: string
}

export function EmptyLibraryState({ query }: EmptyLibraryStateProps) {
  return (
    <div className="screen-state p-6 text-center sm:p-10">
      <p className="ledger-kicker">{query ? 'No matches' : 'Empty library'}</p>
      <h2 className="mt-3 text-3xl ledger-title">{query ? `We couldn't find "${query}"` : 'Start with your first anime'}</h2>
      <p className="mx-auto mt-3 max-w-2xl text-sm font-semibold leading-7 text-[var(--muted)]">{query ? 'Try the English, romanized, or Japanese title if it is available in Kitsu.' : 'Search for a series, open its detail page, and add it to your personal list to track episodes, status, and notes.'}</p>
      <Link to="/anime" className="mt-6 inline-flex min-h-12 items-center rounded-[var(--radius-md)] bg-[var(--accent)] px-6 py-3 font-black text-[var(--action-ink)] outline-none transition hover:-translate-y-0.5 focus:ring-4 focus:ring-[var(--focus)]">
        Explore anime
      </Link>
    </div>
  )
}
