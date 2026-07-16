import { isAxiosError } from "axios";
import { type FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import { SubmitButton } from "@/features/auth/components/SubmitButton";
import { TextField } from "@/features/auth/components/TextField";
import { useForgotPassword } from "@/features/auth/hooks/useForgotPassword";
import {
  validateForgotPasswordForm,
  type ForgotPasswordFormErrors,
} from "@/features/auth/utils/validate-forgot-password-form";

export function ForgotPasswordForm() {
  const forgotPasswordMutation = useForgotPassword();
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<ForgotPasswordFormErrors>({});
  const [successMessage, setSuccessMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validateForgotPasswordForm(email);

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      setSuccessMessage("");
      return;
    }

    setErrors({});
    setSuccessMessage("");

    try {
      await forgotPasswordMutation.mutateAsync({ email });
      setSuccessMessage(
        "If the email exists, we will send a link to reset your password.",
      );
    } catch (error) {
      setErrors({
        form: isAxiosError(error)
          ? "Check the email you entered and try again."
          : "We couldn't request password recovery.",
      });
    }
  }

  return (
    <form onSubmit={handleSubmit} className="ledger-panel p-5 sm:p-7">
      <div className="mb-6 border-b border-[var(--line)] pb-5">
        <p className="ledger-kicker">Secure recovery</p>
        <h2 className="mt-2 text-2xl ledger-title">
          Request temporary link
        </h2>
      </div>

      <div className="grid gap-5">
        <TextField
          label="Email"
          name="email"
          type="email"
          autoComplete="email"
          value={email}
          error={errors.email}
          onChange={(event) => setEmail(event.target.value)}
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
          isLoading={forgotPasswordMutation.isPending}
          loadingLabel="Sending link..."
        >
          Send link
        </SubmitButton>

        <p className="text-center text-sm text-[var(--muted)]">
          Remembered your password?{" "}
          <Link to="/login" className="ledger-link">
            Sign in
          </Link>
        </p>
      </div>
    </form>
  );
}
