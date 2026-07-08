import { isAxiosError } from 'axios'
import { type FormEvent, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { validateLoginForm, type LoginFormErrors } from '@/utils/validate-login-form'
import { useLogin } from '@/hooks/useLogin'
import { SubmitButton } from '@/components/auth/shared/SubmitButton'
import { TextField } from '@/components/auth/shared/TextField'

export function LoginForm() {
  const loginMutation = useLogin()
  const navigate = useNavigate()
  const location = useLocation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState<LoginFormErrors>({})
  const redirectTo = (location.state as { from?: { pathname?: string } } | null)?.from?.pathname ?? '/dashboard'

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const nextErrors = validateLoginForm(email, password)

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors)
      return
    }

    setErrors({})

    try {
      await loginMutation.mutateAsync({ email, password })
      navigate(redirectTo, { replace: true })
    } catch (error) {
      setErrors({ form: isAxiosError(error) ? 'Credenciales invalidas o usuario inactivo.' : 'No se pudo iniciar sesion.' })
    }
  }

  return (
    <form onSubmit={handleSubmit} className="ledger-panel p-5 sm:p-7">
      <div className="mb-6 flex items-start justify-between gap-4 border-b border-[var(--line)] pb-5">
        <div>
          <p className="ledger-kicker">Acceso</p>
          <h2 className="mt-2 text-2xl ledger-title">Continuar temporada</h2>
        </div>
        <p className="ledger-chip bg-[var(--accent-soft)] text-[var(--accent-strong)]">Login</p>
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
        <TextField
          label="Contraseña"
          name="password"
          type="password"
          autoComplete="current-password"
          value={password}
          error={errors.password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <div className="-mt-2 text-right">
          <Link to="/forgot-password" className="ledger-link text-sm">
            Olvide mi contrasena
          </Link>
        </div>
        {errors.form ? <p role="alert" className="state-error px-4 py-3 text-sm font-semibold">{errors.form}</p> : null}
        <SubmitButton isLoading={loginMutation.isPending} loadingLabel="Entrando...">
          Iniciar sesión
        </SubmitButton>
        <p className="text-center text-sm text-[var(--muted)]">
          Aun no tienes cuenta?{' '}
          <Link to="/registro" className="ledger-link">
            Registrate
          </Link>
        </p>
      </div>
    </form>
  )
}
