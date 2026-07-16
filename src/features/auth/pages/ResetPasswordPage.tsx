import { useSearchParams } from "react-router-dom";
import { ResetPasswordForm } from "@/features/auth/components/ResetPasswordForm";

export function ResetPasswordPage() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token") ?? "";

  return (
    <section className="grid gap-6 py-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(22rem,0.72fr)] lg:items-stretch lg:py-12">
      <div className="ledger-panel relative overflow-hidden p-6 sm:p-8 lg:p-10">
        <div className="absolute right-5 top-5 h-32 w-24 rounded-[1.4rem] border border-[var(--line)] bg-[linear-gradient(160deg,_var(--cyan-soft),_var(--surface-tint),_transparent)]" />
        <p className="ledger-kicker">Reset password</p>
        <h1 className="ledger-title mt-5 max-w-2xl text-5xl sm:text-6xl">
          Change your password without resetting your ledger.
        </h1>
        <p className="ledger-copy mt-5 text-lg">
          We will use the link token to validate your request before saving
          your new password.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <span className="ledger-chip">Temporary token</span>
          <span className="ledger-chip">Single use</span>
          <span className="ledger-chip">Minimum 8 characters</span>
        </div>
      </div>

      <ResetPasswordForm token={token} />
    </section>
  );
}
