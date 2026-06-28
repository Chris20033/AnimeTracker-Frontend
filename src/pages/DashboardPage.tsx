import { useAuth } from '../features/auth/hooks/useAuth'

export function DashboardPage() {
  const { session } = useAuth()

  return (
    <section className="py-10 lg:py-16">
      <div className="rounded-[2rem] border border-amber-200/20 bg-amber-200/10 p-8 shadow-2xl shadow-black/20">
        <p className="text-sm font-bold uppercase tracking-[0.3em] text-amber-100">Ruta protegida</p>
        <h1 className="mt-4 text-4xl font-black text-white sm:text-5xl">Bienvenido, {session?.user.username}</h1>
        <p className="mt-4 max-w-2xl text-lg leading-8 text-stone-300">
          Esta pantalla confirma que el token quedo guardado de forma controlada y que la sesion puede proteger rutas del frontend.
        </p>
        <dl className="mt-8 grid gap-4 sm:grid-cols-2">
          <div className="rounded-3xl border border-white/10 bg-stone-950/40 p-5">
            <dt className="text-xs font-bold uppercase tracking-[0.25em] text-stone-400">Email</dt>
            <dd className="mt-2 font-semibold text-white">{session?.user.email}</dd>
          </div>
          <div className="rounded-3xl border border-white/10 bg-stone-950/40 p-5">
            <dt className="text-xs font-bold uppercase tracking-[0.25em] text-stone-400">Rol</dt>
            <dd className="mt-2 font-semibold text-white">{session?.user.role}</dd>
          </div>
        </dl>
      </div>
    </section>
  )
}
