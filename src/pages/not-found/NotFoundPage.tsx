import { Link } from 'react-router-dom'

export function NotFoundPage() {
  return (
    <section className="grid min-h-[60vh] place-items-center py-16 text-center">
      <div className="relative max-w-xl overflow-hidden rounded-[2rem] border border-[var(--line)] bg-[var(--surface-strong)] p-8 shadow-[0_30px_80px_var(--shadow)] backdrop-blur">
        <div className="absolute inset-x-8 top-0 h-1 rounded-b-full bg-[linear-gradient(90deg,_var(--sakura),_var(--accent),_var(--aura))]" />
        <p className="text-sm font-black uppercase tracking-[0.22em] text-[var(--accent-strong)]">404 / episodio perdido</p>
        <h1 className="mt-4 text-balance text-4xl font-black tracking-[-0.045em] text-[var(--page-fg)]">Ruta no encontrada</h1>
        <p className="mt-4 text-pretty text-[var(--muted)]">Esta escena todavia no existe en el roadmap del frontend.</p>
        <Link
          to="/"
          className="mt-8 inline-flex rounded-full bg-[var(--accent)] px-5 py-3 text-sm font-black text-[#271018] outline-none transition hover:brightness-105 focus:ring-4 focus:ring-[var(--focus)]"
        >
          Volver al inicio
        </Link>
      </div>
    </section>
  )
}
