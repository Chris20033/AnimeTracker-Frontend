import { LoginForm } from '@/components/auth/LoginForm'

export function LoginPage() {
  return (
    <section className="grid gap-8 py-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:py-16">
      <div>
        <p className="text-sm font-bold uppercase tracking-[0.3em] text-amber-200">Acceso</p>
        <h1 className="mt-5 text-5xl font-black tracking-tight text-white sm:text-6xl">Vuelve a tu lista anime.</h1>
        <p className="mt-5 max-w-xl text-lg leading-8 text-stone-300">
          Inicia sesion para entrar a rutas privadas y preparar tu biblioteca personal.
        </p>
      </div>

      <LoginForm />
    </section>
  )
}
