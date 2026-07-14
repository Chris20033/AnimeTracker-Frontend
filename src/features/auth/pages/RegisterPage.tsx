import { RegisterForm } from "@/features/auth/components/RegisterForm";

export function RegisterPage() {
  return (
    <section className="grid gap-6 py-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(22rem,0.72fr)] lg:items-stretch lg:py-12">
      <div className="ledger-panel relative overflow-hidden p-6 sm:p-8 lg:p-10">
        <div className="absolute -right-10 top-8 size-44 rounded-full border border-[var(--line)] bg-[radial-gradient(circle,_var(--surface-tint),_var(--cyan-soft),_transparent_68%)]" />
        <p className="ledger-kicker">Nueva ficha</p>
        <h1 className="ledger-title mt-5 max-w-2xl text-5xl sm:text-6xl">
          Abre tu ledger personal de anime.
        </h1>
        <p className="ledger-copy mt-5 text-lg">
          Crea una cuenta para desbloquear perfil, biblioteca, favoritos y
          estadisticas cuando el MVP avance.
        </p>
        <div className="mt-8 grid gap-3 sm:grid-cols-3 lg:max-w-2xl">
          <span className="ledger-inset px-4 py-3 text-sm font-bold text-[var(--muted)]">
            Perfil
          </span>
          <span className="ledger-inset px-4 py-3 text-sm font-bold text-[var(--muted)]">
            Biblioteca
          </span>
          <span className="ledger-inset px-4 py-3 text-sm font-bold text-[var(--muted)]">
            Favoritos
          </span>
        </div>
      </div>

      <RegisterForm />
    </section>
  );
}
