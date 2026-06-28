import { isAxiosError } from 'axios'
import { type FormEvent, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { validateRegisterForm, type RegisterFormErrors } from '@/utils/validate-register-form'
import { useRegister } from '@/hooks/useRegister'
import { SubmitButton } from '@/components/shared/SubmitButton'
import { TextField } from '@/components/shared/TextField'

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
    <form onSubmit={handleSubmit} className="rounded-[2rem] border border-white/10 bg-white/[0.07] p-6 shadow-2xl shadow-black/30 backdrop-blur sm:p-8">
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
          label="Contrasena"
          name="password"
          type="password"
          autoComplete="new-password"
          value={password}
          error={errors.password}
          onChange={(event) => setPassword(event.target.value)}
        />
        {errors.form ? <p className="rounded-2xl border border-red-300/20 bg-red-400/10 px-4 py-3 text-sm font-semibold text-red-100">{errors.form}</p> : null}
        <SubmitButton isLoading={registerMutation.isPending} loadingLabel="Creando cuenta...">
          Crear cuenta
        </SubmitButton>
        <p className="text-center text-sm text-stone-400">
          Ya tienes cuenta?{' '}
          <Link to="/login" className="font-bold text-amber-200 hover:text-amber-100">
            Inicia sesion
          </Link>
        </p>
      </div>
    </form>
  )
}
