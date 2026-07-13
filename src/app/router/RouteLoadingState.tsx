export function RouteLoadingState() {
  return (
    <section className="grid min-h-[24rem] place-items-center py-10" aria-live="polite" aria-busy="true">
      <div className="screen-state w-full max-w-xl p-6 text-center sm:p-8">
        <p className="ledger-kicker">Cargando ruta</p>
        <h1 className="mt-3 text-3xl ledger-title">Preparando la vista</h1>
        <p className="mt-3 text-sm font-semibold leading-7 text-[var(--muted)]">Estamos trayendo solo el modulo necesario para esta pantalla.</p>
      </div>
    </section>
  );
}
