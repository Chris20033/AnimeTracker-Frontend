import { LoginForm } from '@/components/auth/LoginForm'

export function LoginPage() {
  return (
    <section className="grid gap-8 py-8 lg:grid-cols-[0.88fr_1.12fr] lg:items-center lg:py-14">
      <div className="relative overflow-hidden rounded-[2rem] border border-[var(--line)] bg-[var(--surface)] p-7 shadow-[0_28px_70px_var(--shadow)] backdrop-blur sm:p-9">
        <div className="absolute right-5 top-5 h-28 w-20 rounded-2xl border border-[var(--line)] bg-[linear-gradient(160deg,_var(--sakura-soft),_var(--accent-soft),_transparent)]" />
        <p className="text-sm font-black uppercase tracking-[0.22em] text-[var(--accent-strong)]">Acceso de temporada</p>
        <h1 className="mt-5 max-w-xl text-balance text-5xl font-black tracking-[-0.055em] text-[var(--page-fg)] sm:text-6xl">Vuelve a tu lista sin perder el episodio.</h1>
        <p className="mt-5 max-w-xl text-pretty text-lg leading-8 text-[var(--muted)]">
          Recupera tu sesion y continua construyendo una biblioteca personal preparada para progreso, favoritos y proximos estrenos.
        </p>
      </div>

      <LoginForm />
    </section>
  )
}
