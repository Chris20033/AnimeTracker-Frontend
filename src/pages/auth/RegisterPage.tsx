import { RegisterForm } from '@/components/auth/RegisterForm'

export function RegisterPage() {
  return (
    <section className="grid gap-8 py-8 lg:grid-cols-[1fr_1fr] lg:items-center lg:py-14">
      <div className="relative overflow-hidden rounded-[2rem] border border-[var(--line)] bg-[var(--surface)] p-7 shadow-[0_28px_70px_var(--shadow)] backdrop-blur sm:p-9">
        <div className="absolute -right-10 top-8 size-36 rounded-full border border-[var(--line)] bg-[radial-gradient(circle,_var(--aura-soft),_var(--sakura-soft),_transparent_68%)]" />
        <p className="text-sm font-black uppercase tracking-[0.22em] text-[var(--accent-strong)]">Nueva ficha</p>
        <h1 className="mt-5 text-balance text-5xl font-black tracking-[-0.055em] text-[var(--page-fg)] sm:text-6xl">Crea tu perfil de temporada.</h1>
        <p className="mt-5 max-w-xl text-pretty text-lg leading-8 text-[var(--muted)]">
          Tu cuenta abre espacio para biblioteca, favoritos, perfil publico y estadisticas con una interfaz moderna y facil de seguir.
        </p>
      </div>

      <RegisterForm />
    </section>
  )
}
