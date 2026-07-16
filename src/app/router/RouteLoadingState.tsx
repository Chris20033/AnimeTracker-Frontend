export function RouteLoadingState() {
  return (
    <section className="grid min-h-[24rem] place-items-center py-10" aria-live="polite" aria-busy="true">
      <div className="screen-state w-full max-w-xl p-6 text-center sm:p-8">
        <p className="ledger-kicker">Loading route</p>
        <h1 className="mt-3 text-3xl ledger-title">Preparing the view</h1>
        <p className="mt-3 text-sm font-semibold leading-7 text-[var(--muted)]">We are loading only the module needed for this screen.</p>
      </div>
    </section>
  );
}
