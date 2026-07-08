import { isAxiosError } from 'axios'
import { type FormEvent, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { validateRegisterForm, type RegisterFormErrors } from '@/utils/validate-register-form'
import { useRegister } from '@/hooks/useRegister'
import { SubmitButton } from '@/components/auth/shared/SubmitButton'
import { TextField } from '@/components/auth/shared/TextField'

export function RegisterForm() {
  const registerMutation = useRegister()
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState<RegisterFormErrors>({})

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const nextErrors = validateRegisterForm(username, email, password)

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors)
      return
    }

    setErrors({})

    try {
      await registerMutation.mutateAsync({ username: username.trim(), email, password })
      navigate('/dashboard', { replace: true })
    } catch (error) {
      setErrors({ form: isAxiosError(error) ? 'El username o correo ya esta en uso.' : 'No se pudo crear la cuenta.' })
    }
  }

  return (
    <form onSubmit={handleSubmit} className="ledger-panel p-5 sm:p-7">
      <div className="mb-6 flex items-start justify-between gap-4 border-b border-[var(--line)] pb-5">
        <div>
          <p className="ledger-kicker">Nueva cuenta</p>
          <h2 className="mt-2 text-2xl ledger-title">Crear ledger personal</h2>
        </div>
        <p className="ledger-chip bg-[var(--accent-soft)] text-[var(--accent-strong)]">Registro</p>
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
          autoComplete="new-password"
          value={password}
          error={errors.password}
          onChange={(event) => setPassword(event.target.value)}
        />
        {errors.form ? <p role="alert" className="state-error px-4 py-3 text-sm font-semibold">{errors.form}</p> : null}
        <SubmitButton isLoading={registerMutation.isPending} loadingLabel="Creando cuenta...">
          Crear cuenta
        </SubmitButton>
        <p className="text-center text-sm text-[var(--muted)]">
          Ya tienes cuenta?{' '}
          <Link to="/login" className="ledger-link">
            Inicia sesion
          </Link>
        </p>
      </div>
    </form>
  )
}
