import { isAxiosError } from 'axios'
import { type FormEvent, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { validateLoginForm, type LoginFormErrors } from '@/utils/validate-login-form'
import { useLogin } from '@/hooks/useLogin'
import { SubmitButton } from '@/components/shared/SubmitButton'
import { TextField } from '@/components/shared/TextField'

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
    <form onSubmit={handleSubmit} className="rounded-[2rem] border border-white/10 bg-white/[0.07] p-6 shadow-2xl shadow-black/30 backdrop-blur sm:p-8">
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
          label="Contrasena"
          name="password"
          type="password"
          autoComplete="current-password"
          value={password}
          error={errors.password}
          onChange={(event) => setPassword(event.target.value)}
        />
        {errors.form ? <p className="rounded-2xl border border-red-300/20 bg-red-400/10 px-4 py-3 text-sm font-semibold text-red-100">{errors.form}</p> : null}
        <SubmitButton isLoading={loginMutation.isPending} loadingLabel="Entrando...">
          Iniciar sesion
        </SubmitButton>
        <p className="text-center text-sm text-stone-400">
          Aun no tienes cuenta?{' '}
          <Link to="/registro" className="font-bold text-amber-200 hover:text-amber-100">
            Registrate
          </Link>
        </p>
      </div>
    </form>
  )
}
