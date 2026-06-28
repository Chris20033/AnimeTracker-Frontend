import { isAxiosError } from 'axios'
import { type FormEvent, useState } from 'react'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import { AuthSubmitButton } from '../features/auth/components/AuthSubmitButton'
import { AuthTextField } from '../features/auth/components/AuthTextField'
import { useAuth } from '../features/auth/hooks/useAuth'

type LoginErrors = {
  email?: string
  password?: string
  form?: string
}

function validateLogin(email: string, password: string): LoginErrors {
  const errors: LoginErrors = {}

  if (!email.includes('@')) {
    errors.email = 'Ingresa un correo valido.'
  }

  if (!password) {
    errors.password = 'Ingresa tu contrasena.'
  }

  return errors
}

export function LoginPage() {
  const { isAuthenticated, login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState<LoginErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const redirectTo = (location.state as { from?: { pathname?: string } } | null)?.from?.pathname ?? '/dashboard'

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const nextErrors = validateLogin(email, password)

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors)
      return
    }

    setIsSubmitting(true)
    setErrors({})

    try {
      await login({ email, password })
      navigate(redirectTo, { replace: true })
    } catch (error) {
      setErrors({ form: isAxiosError(error) ? 'Credenciales invalidas o usuario inactivo.' : 'No se pudo iniciar sesion.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="grid gap-8 py-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:py-16">
      <div>
        <p className="text-sm font-bold uppercase tracking-[0.3em] text-amber-200">Acceso</p>
        <h1 className="mt-5 text-5xl font-black tracking-tight text-white sm:text-6xl">Vuelve a tu lista anime.</h1>
        <p className="mt-5 max-w-xl text-lg leading-8 text-stone-300">
          Inicia sesion para entrar a rutas privadas y preparar tu biblioteca personal.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="rounded-[2rem] border border-white/10 bg-white/[0.07] p-6 shadow-2xl shadow-black/30 backdrop-blur sm:p-8">
        <div className="grid gap-5">
          <AuthTextField
            label="Correo"
            name="email"
            type="email"
            autoComplete="email"
            value={email}
            error={errors.email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <AuthTextField
            label="Contrasena"
            name="password"
            type="password"
            autoComplete="current-password"
            value={password}
            error={errors.password}
            onChange={(event) => setPassword(event.target.value)}
          />
          {errors.form ? <p className="rounded-2xl border border-red-300/20 bg-red-400/10 px-4 py-3 text-sm font-semibold text-red-100">{errors.form}</p> : null}
          <AuthSubmitButton isLoading={isSubmitting} loadingLabel="Entrando...">
            Iniciar sesion
          </AuthSubmitButton>
          <p className="text-center text-sm text-stone-400">
            Aun no tienes cuenta?{' '}
            <Link to="/registro" className="font-bold text-amber-200 hover:text-amber-100">
              Registrate
            </Link>
          </p>
        </div>
      </form>
    </section>
  )
}
