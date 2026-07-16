import { ForgotPasswordForm } from "@/features/auth/components/ForgotPasswordForm";

export function ForgotPasswordPage() {
  return (
    <section className="grid gap-6 py-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(22rem,0.72fr)] lg:items-stretch lg:py-12">
      <div className="ledger-panel relative overflow-hidden p-6 sm:p-8 lg:p-10">
        <div className="absolute -right-8 top-8 size-40 rounded-full border border-[var(--line)] bg-[radial-gradient(circle,_var(--sakura-soft),_var(--accent-soft),_transparent_68%)]" />
        <p className="ledger-kicker">Recover access</p>
        <h1 className="ledger-title mt-5 max-w-2xl text-5xl sm:text-6xl">
          Generate a secure temporary pass.
        </h1>
        <p className="ledger-copy mt-5 text-lg">
          Enter your email and we will process the request without revealing
          whether an account exists.
        </p>
        <div className="mt-8 ledger-inset p-4 text-sm font-semibold leading-6 text-[var(--muted)]">
          The recovery link expires and can only be used once.
        </div>
      </div>

      <ForgotPasswordForm />
    </section>
  );
}
