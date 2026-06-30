import { StatCard } from '@/components/auth/shared/StatCard'

const sprintStats = [
  {
    label: 'Sesion segura',
    value: 'Auth',
    detail: 'Login, registro y rutas privadas ya estan conectadas.',
  },
  {
    label: 'Stack listo',
    value: 'Vite',
    detail: 'React, TypeScript, Query y Zustand preparados para crecer.',
  },
  {
    label: 'Biblioteca',
    value: 'MVP',
    detail: 'Base visual para listas, favoritos y progreso de episodios.',
  },
]

const queueItems = [
  { title: 'Temporada actual', meta: '12 episodios por ordenar', status: 'Watching' },
  { title: 'Lista pendiente', meta: 'Favoritos y prioridad', status: 'Plan' },
  { title: 'Archivo completado', meta: 'Historial y notas', status: 'Done' },
]

export function HomePage() {
  return (
    <section className="grid gap-8 py-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:py-18">
      <div className="relative max-w-3xl">
        <p className="inline-flex rounded-full border border-[var(--line)] bg-[var(--surface)] px-4 py-2 text-xs font-black uppercase tracking-[0.22em] text-[var(--accent-strong)] shadow-[0_14px_35px_var(--shadow)] backdrop-blur">
          Temporada frontend 02
        </p>
        <h1 className="mt-6 text-balance text-5xl font-black tracking-[-0.055em] text-[var(--page-fg)] sm:text-6xl lg:text-7xl">
          Organiza tus temporadas sin perder el hilo.
        </h1>
        <p className="mt-6 max-w-2xl text-pretty text-lg leading-8 text-[var(--muted)]">
          AnimeTracker combina listas, progreso y favoritos en una experiencia clara para seguir tus animes sin convertir tu backlog en caos.
        </p>
        <div className="mt-8 flex flex-wrap gap-3 text-sm font-bold text-[var(--muted)]">
          <span className="rounded-full border border-[var(--line)] bg-[var(--surface)] px-4 py-2">Watching</span>
          <span className="rounded-full border border-[var(--line)] bg-[var(--surface)] px-4 py-2">Plan to watch</span>
          <span className="rounded-full border border-[var(--line)] bg-[var(--surface)] px-4 py-2">Completed</span>
        </div>
      </div>

      <div className="relative overflow-hidden rounded-[2rem] border border-[var(--line)] bg-[var(--surface-strong)] p-4 shadow-[0_30px_80px_var(--shadow)] backdrop-blur">
        <div className="absolute -right-16 -top-16 size-48 rounded-full bg-[radial-gradient(circle,_var(--sakura-soft),_transparent_68%)]" />
        <div className="relative mb-4 flex items-center justify-between px-2 pt-1 text-xs font-black uppercase tracking-[0.2em] text-[var(--soft)]">
          <span>Season board</span>
          <span className="rounded-full bg-[var(--accent-soft)] px-3 py-1 text-[var(--accent-strong)]">AT-02</span>
        </div>
        <div className="relative grid gap-3">
          {queueItems.map((item) => (
            <article key={item.title} className="rounded-[1.4rem] border border-[var(--line)] bg-[var(--surface)] p-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="font-black text-[var(--page-fg)]">{item.title}</h2>
                  <p className="mt-1 text-sm leading-6 text-[var(--muted)]">{item.meta}</p>
                </div>
                <span className="rounded-full bg-[var(--surface-inset)] px-3 py-1 text-xs font-black text-[var(--accent-strong)]">{item.status}</span>
              </div>
            </article>
          ))}
        </div>
        <div className="relative mt-4 grid gap-4 sm:grid-cols-3">
          {sprintStats.map((stat) => (
            <StatCard key={stat.label} {...stat} />
          ))}
        </div>
      </div>
    </section>
  )
}
