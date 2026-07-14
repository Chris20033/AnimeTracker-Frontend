interface HomeErrorStateProps {
  onRetry: () => void
}

export function HomeErrorState({ onRetry }: HomeErrorStateProps) {
  return (
    <section role="alert" className="screen-state my-8 p-6 text-center sm:p-8">
      <p className="ledger-kicker">Home broadcast</p>
      <h1 className="mt-3 text-3xl ledger-title">No se pudo cargar la cartelera</h1>
      <p className="mx-auto mt-3 max-w-2xl text-sm font-semibold leading-7 text-[var(--muted)]">La API externa no respondio correctamente. Puedes intentar recargar las secciones.</p>
      <button type="button" onClick={onRetry} className="mt-6 min-h-12 rounded-[var(--radius-md)] bg-[var(--accent)] px-5 py-3 font-black text-[var(--action-ink)] outline-none transition hover:-translate-y-0.5 focus:ring-4 focus:ring-[var(--focus)]">
        Reintentar
      </button>
    </section>
  )
}

export function HomeSkeleton() {
  return (
    <section className="grid gap-7 py-6 sm:py-9 lg:py-12" aria-busy="true">
      <div className="ledger-panel skeleton-shimmer h-[34rem]" />
      {Array.from({ length: 4 }).map((_, index) => (
        <div key={index} className="grid gap-4">
          <div className="skeleton-shimmer h-10 w-64 rounded-full" />
          <div className="flex gap-4 overflow-hidden">
            {Array.from({ length: 5 }).map((__, cardIndex) => (
              <div key={cardIndex} className="skeleton-shimmer h-80 w-52 shrink-0 rounded-[var(--radius-lg)]" />
            ))}
          </div>
        </div>
      ))}
    </section>
  )
}
