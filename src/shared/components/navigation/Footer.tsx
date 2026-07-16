import { Link } from 'react-router-dom'

export function Footer() {
  return (
    <footer className="relative mx-auto w-full pt-2">
      <div className="ledger-panel grid gap-6 p-5 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end sm:p-6">
        <div>
          <p className="ledger-kicker">AnimeTracker</p>
          <p className="mt-2 max-w-2xl text-sm font-semibold leading-7 text-[var(--muted)]">
            Anime catalog, profiles, and progress tracking built as a portfolio project. Data is served from the Kitsu API.
          </p>
          <p className="mt-3 text-xs font-black uppercase tracking-[0.14em] text-[var(--soft)]">Portfolio project</p>
        </div>

        <nav aria-label="Footer links" className="flex flex-wrap gap-2">
          <Link to="/" className="ledger-link min-h-10 px-3 py-2">Home</Link>
          <Link to="/anime" className="ledger-link min-h-10 px-3 py-2">Anime</Link>
          <Link to="/login" className="ledger-link min-h-10 px-3 py-2">Login</Link>
          <Link to="/registro" className="ledger-link min-h-10 px-3 py-2">Sign up</Link>
        </nav>
      </div>
    </footer>
  )
}
