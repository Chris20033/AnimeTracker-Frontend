import { Link } from 'react-router-dom'

export function NotFoundPage() {
  return (
    <section className="grid min-h-[60vh] place-items-center py-16 text-center">
      <div className="screen-state relative max-w-xl overflow-hidden p-8">
        <p className="ledger-kicker">404 / missing episode</p>
        <h1 className="ledger-title mt-4 text-4xl">Route not found</h1>
        <p className="ledger-copy mx-auto mt-4">This scene does not exist in the frontend roadmap yet.</p>
        <Link
          to="/"
          className="mt-8 inline-flex min-h-12 items-center justify-center rounded-[var(--radius-md)] bg-[var(--accent)] px-5 py-3 text-sm font-black text-[var(--action-ink)] outline-none transition hover:-translate-y-0.5 hover:brightness-105 focus:ring-4 focus:ring-[var(--focus)]"
        >
          Back to home
        </Link>
      </div>
    </section>
  )
}
