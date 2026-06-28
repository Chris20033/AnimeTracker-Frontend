import { StatCard } from '../components/ui/StatCard'

const sprintStats = [
  {
    label: 'Sprint actual',
    value: '02',
    detail: 'Registro, login, sesion persistente y rutas privadas del frontend.',
  },
  {
    label: 'Stack',
    value: 'Vite',
    detail: 'React, TypeScript y Tailwind listos para crecer por modulos.',
  },
  {
    label: 'Estado',
    value: 'MVP',
    detail: 'Autenticacion conectada con backend mediante axios.',
  },
]

export function HomePage() {
  return (
    <section className="grid gap-8 py-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:py-20">
      <div>
        <p className="inline-flex rounded-full border border-amber-300/30 bg-amber-300/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.28em] text-amber-100">
          Sprint 2 Frontend
        </p>
        <h1 className="mt-6 max-w-3xl text-5xl font-black tracking-tight text-white sm:text-6xl lg:text-7xl">
          Entra a tu cuenta y protege tu biblioteca anime.
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-stone-300">
          AnimeTracker ya cuenta con registro, login, logout y una ruta privada lista para conectar el resto del MVP.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
        {sprintStats.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </div>
    </section>
  )
}
