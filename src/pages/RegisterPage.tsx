import { isAxiosError } from 'axios'
import { type FormEvent, useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { AuthSubmitButton } from '../features/auth/components/AuthSubmitButton'
import { AuthTextField } from '../features/auth/components/AuthTextField'
import { useAuth } from '../features/auth/hooks/useAuth'

type RegisterErrors = {
  username?: string
  email?: string
  password?: string
  form?: string
}

function validateRegister(username: string, email: string, password: string): RegisterErrors {
  const errors: RegisterErrors = {}

  if (username.trim().length < 3 || username.trim().length > 30) {
    errors.username = 'El username debe tener entre 3 y 30 caracteres.'
  }

  if (!email.includes('@')) {
    errors.email = 'Ingresa un correo valido.'
  }

  if (password.length < 8) {
    errors.password = 'La contrasena debe tener al menos 8 caracteres.'
  }

  return errors
}

export function RegisterPage() {
  const { isAuthenticated, register } = useAuth()
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState<RegisterErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const nextErrors = validateRegister(username, email, password)

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors)
      return
    }

    setIsSubmitting(true)
    setErrors({})

    try {
      await register({ username: username.trim(), email, password })
      navigate('/dashboard', { replace: true })
    } catch (error) {
      setErrors({ form: isAxiosError(error) ? 'El username o correo ya esta en uso.' : 'No se pudo crear la cuenta.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="grid gap-8 py-10 lg:grid-cols-[1fr_1fr] lg:items-center lg:py-16">
      <div>
        <p className="text-sm font-bold uppercase tracking-[0.3em] text-amber-200">Registro</p>
        <h1 className="mt-5 text-5xl font-black tracking-tight text-white sm:text-6xl">Crea tu identidad otaku.</h1>
        <p className="mt-5 max-w-xl text-lg leading-8 text-stone-300">
          Tu cuenta prepara el espacio para biblioteca, favoritos, perfil publico y estadisticas.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="rounded-[2rem] border border-white/10 bg-white/[0.07] p-6 shadow-2xl shadow-black/30 backdrop-blur sm:p-8">
        <div className="grid gap-5">
          <AuthTextField
            label="Username"
            name="username"
            type="text"
            autoComplete="username"
            value={username}
            error={errors.username}
            onChange={(event) => setUsername(event.target.value)}
          />
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
            autoComplete="new-password"
            value={password}
            error={errors.password}
            onChange={(event) => setPassword(event.target.value)}
          />
          {errors.form ? <p className="rounded-2xl border border-red-300/20 bg-red-400/10 px-4 py-3 text-sm font-semibold text-red-100">{errors.form}</p> : null}
          <AuthSubmitButton isLoading={isSubmitting} loadingLabel="Creando cuenta...">
            Crear cuenta
          </AuthSubmitButton>
          <p className="text-center text-sm text-stone-400">
            Ya tienes cuenta?{' '}
            <Link to="/login" className="font-bold text-amber-200 hover:text-amber-100">
              Inicia sesion
            </Link>
          </p>
        </div>
      </form>
    </section>
  )
}
