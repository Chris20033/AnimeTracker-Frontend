export function EmptyAnimeState() {
  return (
    <div className="ledger-surface p-6 text-center sm:p-8">
      <p className="ledger-kicker">Sin resultados</p>
      <h2 className="mt-2 text-2xl ledger-title">No encontramos anime con esos filtros</h2>
      <p className="mx-auto mt-3 max-w-2xl text-sm font-semibold leading-7 text-[var(--muted)]">Prueba limpiando filtros, cambiando el genero o usando un titulo mas corto.</p>
    </div>
  )
}

export function AnimeErrorState() {
  return <div className="state-error p-5 text-center font-semibold">No se pudo cargar el catalogo. Intenta de nuevo en unos segundos.</div>
}

export function AnimeResultSkeleton() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4" aria-busy="true">
      {Array.from({ length: 8 }).map((_, index) => (
        <div key={index} className="ledger-panel h-96 animate-pulse" />
      ))}
    </div>
  )
}
