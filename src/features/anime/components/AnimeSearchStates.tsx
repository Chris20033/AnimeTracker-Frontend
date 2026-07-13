export function EmptyAnimeState() {
  return (
    <div className="screen-state p-6 text-center sm:p-8">
      <p className="ledger-kicker">Sin resultados</p>
      <h2 className="mt-2 text-2xl ledger-title">No encontramos anime con esos filtros</h2>
      <p className="mx-auto mt-3 max-w-2xl text-sm font-semibold leading-7 text-[var(--muted)]">Prueba limpiando filtros, cambiando el genero o usando un titulo mas corto.</p>
    </div>
  )
}

interface AnimeErrorStateProps {
  onRetry?: () => void
}

export function AnimeErrorState({ onRetry }: AnimeErrorStateProps) {
  return (
    <div role="alert" className="state-error grid gap-4 p-5 text-center font-semibold">
      <div>
        <p>No se pudo cargar el catalogo.</p>
        <p className="mt-1 text-sm opacity-85">El proveedor externo de anime no respondio. Intenta de nuevo o cambia los filtros.</p>
      </div>
      {onRetry ? (
        <button type="button" onClick={onRetry} className="mx-auto min-h-11 rounded-[var(--radius-md)] bg-[var(--accent)] px-5 py-2.5 font-black text-[var(--action-ink)] outline-none transition hover:-translate-y-0.5 focus:ring-4 focus:ring-[var(--focus)]">
          Reintentar
        </button>
      ) : null}
    </div>
  )
}

export function AnimeResultSkeleton() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4" aria-busy="true">
      {Array.from({ length: 8 }).map((_, index) => (
        <div key={index} className="ledger-panel skeleton-shimmer h-96" />
      ))}
    </div>
  )
}
