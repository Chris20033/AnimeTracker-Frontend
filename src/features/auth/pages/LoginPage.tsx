import { LoginForm } from "@/features/auth/components/LoginForm";

export function LoginPage() {
  return (
    <section className="grid gap-6 py-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(22rem,0.72fr)] lg:items-stretch lg:py-12">
      <div className="ledger-panel relative overflow-hidden p-6 sm:p-8 lg:p-10">
        <div className="absolute right-6 top-6 hidden h-36 w-24 rounded-[1.4rem] border border-[var(--line)] bg-[linear-gradient(160deg,_var(--surface-tint),_var(--accent-soft),_transparent)] sm:block" />
        <p className="ledger-kicker">Acceso de temporada</p>
        <h1 className="ledger-title mt-5 max-w-2xl text-5xl sm:text-6xl">
          Vuelve al punto exacto donde pausaste.
        </h1>
        <p className="ledger-copy mt-5 text-lg">
          Entra para recuperar tu dashboard, continuar tu biblioteca y preparar
          el seguimiento de episodios sin perder contexto.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <span className="ledger-chip">JWT activo</span>
          <span className="ledger-chip">Rutas protegidas</span>
          <span className="ledger-chip">Progreso listo</span>
        </div>
      </div>

      <LoginForm />
    </section>
  );
}
