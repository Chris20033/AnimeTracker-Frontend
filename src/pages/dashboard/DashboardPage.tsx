import { useAuthStore } from '@/store/auth.store'

const nextModules = [
  'Biblioteca personal',
  'Progreso de episodios',
  'Favoritos y notas',
]

export function DashboardPage() {
  const session = useAuthStore((state) => state.session)

  return (
    <section className="grid gap-6 py-8 lg:grid-cols-[1fr_0.72fr] lg:py-14">
      <div className="relative overflow-hidden rounded-[2rem] border border-[var(--line)] bg-[var(--surface-strong)] p-7 shadow-[0_30px_80px_var(--shadow)] backdrop-blur sm:p-8">
        <div className="absolute right-0 top-0 h-full w-28 bg-[linear-gradient(90deg,_transparent,_var(--sakura-soft))]" />
        <p className="text-sm font-black uppercase tracking-[0.22em] text-[var(--accent-strong)]">Panel protegido</p>
        <h1 className="mt-4 text-balance text-4xl font-black tracking-[-0.045em] text-[var(--page-fg)] sm:text-5xl">Bienvenido, {session?.user.username}</h1>
        <p className="mt-4 max-w-2xl text-pretty text-lg leading-8 text-[var(--muted)]">
          Tu sesion esta activa. Desde aqui se conectaran biblioteca, listas y progreso de episodios cuando avance el MVP.
        </p>
        <dl className="mt-8 grid gap-4 sm:grid-cols-2">
          <div className="rounded-3xl border border-[var(--line)] bg-[var(--surface-inset)] p-5">
            <dt className="text-xs font-black uppercase tracking-[0.2em] text-[var(--soft)]">Email</dt>
            <dd className="mt-2 break-words font-semibold text-[var(--page-fg)]">{session?.user.email}</dd>
          </div>
          <div className="rounded-3xl border border-[var(--line)] bg-[var(--surface-inset)] p-5">
            <dt className="text-xs font-black uppercase tracking-[0.2em] text-[var(--soft)]">Rol</dt>
            <dd className="mt-2 font-semibold text-[var(--page-fg)]">{session?.user.role}</dd>
          </div>
        </dl>
      </div>

      <aside className="rounded-[2rem] border border-[var(--line)] bg-[var(--surface)] p-6 shadow-[0_24px_60px_var(--shadow)] backdrop-blur">
        <p className="text-xs font-black uppercase tracking-[0.2em] text-[var(--soft)]">Proximos modulos</p>
        <div className="mt-5 grid gap-3">
          {nextModules.map((moduleName) => (
            <div key={moduleName} className="flex items-center gap-3 rounded-2xl border border-[var(--line)] bg-[var(--surface-inset)] p-4">
              <span className="size-2 rounded-full bg-[var(--sakura)]" />
              <span className="font-bold text-[var(--page-fg)]">{moduleName}</span>
            </div>
          ))}
        </div>
      </aside>
    </section>
  )
}
