import { Link } from 'react-router-dom'

export function Footer() {
  return (
    <footer className="relative mx-auto w-full pt-2">
      <div className="ledger-panel grid gap-6 p-5 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end sm:p-6">
        <div>
          <p className="ledger-kicker">AnimeTracker</p>
          <p className="mt-2 max-w-2xl text-sm font-semibold leading-7 text-[var(--muted)]">
            Catalogo, perfiles y seguimiento de anime construido como proyecto de portafolio. Los datos se sirven desde el backend de AnimeTracker.
          </p>
          <p className="mt-3 text-xs font-black uppercase tracking-[0.14em] text-[var(--soft)]">Proyecto de portafolio</p>
        </div>

        <nav aria-label="Enlaces del footer" className="flex flex-wrap gap-2">
          <Link to="/" className="ledger-link min-h-10 px-3 py-2">Inicio</Link>
          <Link to="/anime" className="ledger-link min-h-10 px-3 py-2">Anime</Link>
          <Link to="/login" className="ledger-link min-h-10 px-3 py-2">Login</Link>
          <Link to="/registro" className="ledger-link min-h-10 px-3 py-2">Registro</Link>
        </nav>
      </div>
    </footer>
  )
}
