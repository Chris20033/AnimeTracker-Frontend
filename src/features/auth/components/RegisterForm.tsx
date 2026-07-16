import { isAxiosError } from "axios";
import { type FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  validateRegisterForm,
  type RegisterFormErrors,
} from "@/features/auth/utils/validate-register-form";
import { useRegister } from "@/features/auth/hooks/useRegister";
import { SubmitButton } from "@/features/auth/components/SubmitButton";
import { TextField } from "@/features/auth/components/TextField";

export function RegisterForm() {
  const registerMutation = useRegister();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<RegisterFormErrors>({});

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validateRegisterForm(username, email, password);

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setErrors({});

    try {
      await registerMutation.mutateAsync({
        username: username.trim(),
        email,
        password,
      });
      navigate("/dashboard", { replace: true });
    } catch (error) {
      setErrors({
        form: isAxiosError(error)
          ? "That username or email is already in use."
          : "We couldn't create the account.",
      });
    }
  }

  return (
    <form onSubmit={handleSubmit} className="ledger-panel p-5 sm:p-7">
      <div className="mb-6 flex items-start justify-between gap-4 border-b border-[var(--line)] pb-5">
        <div>
          <p className="ledger-kicker">New account</p>
          <h2 className="mt-2 text-2xl ledger-title">Create personal ledger</h2>
        </div>
        <p className="ledger-chip bg-[var(--accent-soft)] text-[var(--accent-strong)]">
          Sign up
        </p>
      </div>
      <div className="grid gap-5">
        <TextField
          label="Username"
          name="username"
          type="text"
          autoComplete="username"
          value={username}
          error={errors.username}
          onChange={(event) => setUsername(event.target.value)}
        />
        <TextField
          label="Email"
          name="email"
          type="email"
          autoComplete="email"
          value={email}
          error={errors.email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          autoComplete="new-password"
          value={password}
          error={errors.password}
          onChange={(event) => setPassword(event.target.value)}
        />
        {errors.form ? (
          <p
            role="alert"
            className="state-error px-4 py-3 text-sm font-semibold"
          >
            {errors.form}
          </p>
        ) : null}
        <SubmitButton
          isLoading={registerMutation.isPending}
          loadingLabel="Creating account..."
        >
          Create account
        </SubmitButton>
        <p className="text-center text-sm text-[var(--muted)]">
          Already have an account?{" "}
          <Link to="/login" className="ledger-link">
            Sign in
          </Link>
        </p>
      </div>
    </form>
  );
}
