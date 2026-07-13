import { Link } from 'react-router-dom'

export function LibrarySkeleton() {
  return (
    <div className="grid gap-4 lg:grid-cols-2" aria-busy="true">
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className="ledger-panel h-80 animate-pulse" />
      ))}
    </div>
  )
}

interface LibraryErrorStateProps {
  onRetry: () => void
}

export function LibraryErrorState({ onRetry }: LibraryErrorStateProps) {
  return (
    <div className="state-error grid gap-4 p-6 text-center font-semibold">
      <div>
        <p>No se pudo cargar tu biblioteca.</p>
        <p className="mt-1 text-sm opacity-85">Revisa tu sesion o intenta de nuevo en unos segundos.</p>
      </div>
      <button type="button" onClick={onRetry} className="mx-auto min-h-11 rounded-[var(--radius-md)] bg-[var(--accent)] px-5 py-2.5 font-black text-[var(--action-ink)] outline-none transition hover:-translate-y-0.5 focus:ring-4 focus:ring-[var(--focus)]">
        Reintentar
      </button>
    </div>
  )
}

interface EmptyLibraryStateProps {
  query?: string
}

export function EmptyLibraryState({ query }: EmptyLibraryStateProps) {
  return (
    <div className="ledger-panel p-6 text-center sm:p-10">
      <p className="ledger-kicker">{query ? 'Sin coincidencias' : 'Biblioteca vacia'}</p>
      <h2 className="mt-3 text-3xl ledger-title">{query ? `No encontramos "${query}"` : 'Empieza con tu primer anime'}</h2>
      <p className="mx-auto mt-3 max-w-2xl text-sm font-semibold leading-7 text-[var(--muted)]">{query ? 'Prueba con el titulo en ingles, romanizado o japones si esta disponible en Kitsu.' : 'Busca una serie, entra al detalle y agregala a tu lista personal para seguir episodios, estado y notas.'}</p>
      <Link to="/anime" className="mt-6 inline-flex min-h-12 items-center rounded-[var(--radius-md)] bg-[var(--accent)] px-6 py-3 font-black text-[var(--action-ink)] outline-none transition hover:-translate-y-0.5 focus:ring-4 focus:ring-[var(--focus)]">
        Explorar anime
      </Link>
    </div>
  )
}
