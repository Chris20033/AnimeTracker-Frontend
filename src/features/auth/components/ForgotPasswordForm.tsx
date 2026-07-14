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
        "Si el correo existe, te enviaremos un enlace para restablecer tu contrasena.",
      );
    } catch (error) {
      setErrors({
        form: isAxiosError(error)
          ? "Revisa el correo ingresado e intenta nuevamente."
          : "No se pudo solicitar la recuperacion.",
      });
    }
  }

  return (
    <form onSubmit={handleSubmit} className="ledger-panel p-5 sm:p-7">
      <div className="mb-6 border-b border-[var(--line)] pb-5">
        <p className="ledger-kicker">Recuperacion segura</p>
        <h2 className="mt-2 text-2xl ledger-title">
          Solicitar enlace temporal
        </h2>
      </div>

      <div className="grid gap-5">
        <TextField
          label="Correo"
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
          loadingLabel="Enviando enlace..."
        >
          Enviar enlace
        </SubmitButton>

        <p className="text-center text-sm text-[var(--muted)]">
          Recordaste tu contrasena?{" "}
          <Link to="/login" className="ledger-link">
            Inicia sesion
          </Link>
        </p>
      </div>
    </form>
  );
}
