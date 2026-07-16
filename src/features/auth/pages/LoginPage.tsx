import { LoginForm } from "@/features/auth/components/LoginForm";

export function LoginPage() {
  return (
    <section className="grid gap-6 py-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(22rem,0.72fr)] lg:items-stretch lg:py-12">
      <div className="ledger-panel relative overflow-hidden p-6 sm:p-8 lg:p-10">
        <div className="absolute right-6 top-6 hidden h-36 w-24 rounded-[1.4rem] border border-[var(--line)] bg-[linear-gradient(160deg,_var(--surface-tint),_var(--accent-soft),_transparent)] sm:block" />
        <p className="ledger-kicker">Season access</p>
        <h1 className="ledger-title mt-5 max-w-2xl text-5xl sm:text-6xl">
          Pick up exactly where you paused.
        </h1>
        <p className="ledger-copy mt-5 text-lg">
          Sign in to recover your dashboard, continue your library, and track
          episodes without losing context.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <span className="ledger-chip">Active JWT</span>
          <span className="ledger-chip">Protected routes</span>
          <span className="ledger-chip">Progress ready</span>
        </div>
      </div>

      <LoginForm />
    </section>
  );
}
