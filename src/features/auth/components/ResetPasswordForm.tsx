import { isAxiosError } from "axios";
import { type FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SubmitButton } from "@/features/auth/components/SubmitButton";
import { TextField } from "@/features/auth/components/TextField";
import {
  useResetPassword,
  useResetTokenStatus,
} from "@/features/auth/hooks/useResetPassword";
import {
  validateResetPasswordForm,
  type ResetPasswordFormErrors,
} from "@/features/auth/utils/validate-reset-password-form";

interface ResetPasswordFormProps {
  token: string;
}

export function ResetPasswordForm({ token }: ResetPasswordFormProps) {
  const resetPasswordMutation = useResetPassword();
  const resetTokenStatus = useResetTokenStatus(token);
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<ResetPasswordFormErrors>({});
  const [successMessage, setSuccessMessage] = useState("");

  const isTokenMissing = !token;
  const isTokenChecking = resetTokenStatus.isLoading;
  const isTokenInvalid = isTokenMissing || resetTokenStatus.isError;
  const isFormDisabled =
    resetPasswordMutation.isPending || Boolean(successMessage);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validateResetPasswordForm(password, confirmPassword);

    if (isTokenInvalid) {
      nextErrors.form =
        "The recovery link is invalid, expired, or has already been used.";
    }

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      setSuccessMessage("");
      return;
    }

    setErrors({});
    setSuccessMessage("");

    try {
      await resetPasswordMutation.mutateAsync({ token, newPassword: password });
      setSuccessMessage(
        "Password updated. You can now sign in with your new password.",
      );
      window.setTimeout(() => navigate("/login", { replace: true }), 1200);
    } catch (error) {
      setErrors({
        form: isAxiosError(error)
          ? "The link is invalid, expired, or has already been used."
          : "We couldn't reset the password.",
      });
    }
  }

  if (isTokenChecking) {
    return (
      <section className="ledger-panel p-8 text-center sm:p-10">
        <p className="ledger-kicker">Checking link</p>
        <h2 className="mt-4 text-3xl ledger-title">Validating request</h2>
        <p className="ledger-copy mx-auto mt-4 max-w-md">
          Wait a moment while we check that the recovery link is still
          available.
        </p>
      </section>
    );
  }

  if (isTokenInvalid) {
    return (
      <section className="ledger-panel p-8 text-center sm:p-10">
        <p className="text-sm font-black tracking-[0.12em] text-[var(--danger)]">
          Link unavailable
        </p>
        <h2 className="mt-4 text-4xl ledger-title sm:text-5xl">
          This link can no longer be used.
        </h2>
        <p className="ledger-copy mx-auto mt-5 max-w-md">
          The token is invalid, expired, or was already used to change the
          password. Request a new link to continue.
        </p>
        <Link
          to="/forgot-password"
          className="mt-7 inline-flex min-h-12 items-center justify-center rounded-[var(--radius-md)] bg-[var(--accent)] px-5 py-3 font-black text-white shadow-[0_14px_28px_var(--shadow)] outline-none transition hover:-translate-y-0.5 hover:brightness-105 focus:ring-4 focus:ring-[var(--focus)]"
        >
          Go to forgot password
        </Link>
      </section>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="ledger-panel p-5 sm:p-7">
      <div className="mb-6 border-b border-[var(--line)] pb-5">
        <p className="ledger-kicker">New access</p>
        <h2 className="mt-2 text-2xl ledger-title">Create new password</h2>
      </div>

      <div className="grid gap-5">
        <TextField
          label="New password"
          name="password"
          type="password"
          autoComplete="new-password"
          value={password}
          error={errors.password}
          disabled={isFormDisabled}
          onChange={(event) => setPassword(event.target.value)}
        />
        <TextField
          label="Confirm password"
          name="confirmPassword"
          type="password"
          autoComplete="new-password"
          value={confirmPassword}
          error={errors.confirmPassword}
          disabled={isFormDisabled}
          onChange={(event) => setConfirmPassword(event.target.value)}
        />

        {successMessage ? (
          <p
            role="status"
            className="state-success px-4 py-3 text-sm font-semibold"
          >
            {successMessage}
          </p>
        ) : null}
        {errors.form ? (
          <p
            role="alert"
            className="state-error px-4 py-3 text-sm font-semibold"
          >
            {errors.form}
          </p>
        ) : null}

        <SubmitButton
          isLoading={resetPasswordMutation.isPending}
          loadingLabel="Updating..."
          disabled={isFormDisabled}
        >
          Reset password
        </SubmitButton>

        <p className="text-center text-sm text-[var(--muted)]">
          Already have access?{" "}
          <Link to="/login" className="ledger-link">
            Sign in
          </Link>
        </p>
      </div>
    </form>
  );
}
