import { Link } from 'react-router-dom'
import { useAuthStore } from '@/store/auth.store'

const nextModules = [
  'Biblioteca personal',
  'Progreso de episodios',
  'Favoritos y notas',
]

export function DashboardPage() {
  const session = useAuthStore((state) => state.session)

  return (
    <section className="grid gap-6 py-8 lg:grid-cols-[minmax(0,1fr)_22rem] lg:py-12">
      <div className="ledger-panel relative overflow-hidden p-6 sm:p-8">
        <div className="absolute right-0 top-0 h-full w-32 bg-[linear-gradient(90deg,_transparent,_var(--surface-tint))]" />
        <p className="ledger-kicker">Command center</p>
        <h1 className="ledger-title relative mt-4 text-4xl sm:text-5xl">Bienvenido, {session?.user.username}</h1>
        <p className="ledger-copy relative mt-4 text-lg">
          Tu sesion esta activa. Este panel sera el punto de entrada para biblioteca, listas y progreso de episodios.
        </p>
        <Link to="/anime" className="relative mt-6 inline-flex min-h-12 items-center justify-center rounded-[var(--radius-md)] bg-[var(--accent)] px-5 py-3 font-black text-[var(--action-ink)] outline-none transition hover:-translate-y-0.5 focus:ring-4 focus:ring-[var(--focus)]">
          Buscar anime
        </Link>
        <dl className="relative mt-8 grid gap-4 sm:grid-cols-2">
          <div className="ledger-inset p-5">
            <dt className="text-xs font-black tracking-[0.12em] text-[var(--soft)]">Email</dt>
            <dd className="mt-2 break-words font-semibold text-[var(--page-fg)]">{session?.user.email}</dd>
          </div>
          <div className="ledger-inset p-5">
            <dt className="text-xs font-black tracking-[0.12em] text-[var(--soft)]">Rol</dt>
            <dd className="mt-2 font-semibold text-[var(--page-fg)]">{session?.user.role}</dd>
          </div>
        </dl>
      </div>

      <aside className="ledger-surface p-6">
        <p className="text-xs font-black tracking-[0.12em] text-[var(--soft)]">Proximos modulos</p>
        <div className="mt-5 grid gap-3">
          {nextModules.map((moduleName) => (
            <div key={moduleName} className="ledger-inset flex items-center gap-3 p-4">
              <span className="size-2 rounded-full bg-[var(--sakura)]" />
              <span className="font-bold text-[var(--page-fg)]">{moduleName}</span>
            </div>
          ))}
        </div>
      </aside>
    </section>
  )
}
