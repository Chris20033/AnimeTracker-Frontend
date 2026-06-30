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
    <form onSubmit={handleSubmit} className="rounded-[2rem] border border-[var(--line)] bg-[var(--surface-strong)] p-6 shadow-[0_30px_80px_var(--shadow)] backdrop-blur sm:p-8">
      <div className="mb-6 flex items-center justify-between border-b border-[var(--line)] pb-4">
        <p className="text-xs font-black uppercase tracking-[0.2em] text-[var(--soft)]">Member pass</p>
        <p className="rounded-full bg-[var(--accent-soft)] px-3 py-1 text-xs font-black text-[var(--accent-strong)]">Login</p>
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
        {errors.form ? <p className="rounded-2xl border border-red-300/30 bg-red-500/10 px-4 py-3 text-sm font-semibold text-[var(--danger)]">{errors.form}</p> : null}
        <SubmitButton isLoading={loginMutation.isPending} loadingLabel="Entrando...">
          Iniciar sesion
        </SubmitButton>
        <p className="text-center text-sm text-[var(--muted)]">
          Aun no tienes cuenta?{' '}
          <Link to="/registro" className="font-black text-[var(--accent-strong)] outline-none hover:text-[var(--accent)] focus:rounded-md focus:ring-4 focus:ring-[var(--focus)]">
            Registrate
          </Link>
        </p>
      </div>
    </form>
  )
}
