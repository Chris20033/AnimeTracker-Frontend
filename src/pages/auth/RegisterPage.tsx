import { RegisterForm } from '@/components/auth/RegisterForm'

export function RegisterPage() {
  return (
    <section className="grid gap-8 py-10 lg:grid-cols-[1fr_1fr] lg:items-center lg:py-16">
      <div>
        <p className="text-sm font-bold uppercase tracking-[0.3em] text-amber-200">Registro</p>
        <h1 className="mt-5 text-5xl font-black tracking-tight text-white sm:text-6xl">Crea tu identidad otaku.</h1>
        <p className="mt-5 max-w-xl text-lg leading-8 text-stone-300">
          Tu cuenta prepara el espacio para biblioteca, favoritos, perfil publico y estadisticas.
        </p>
      </div>

      <RegisterForm />
    </section>
  )
}
