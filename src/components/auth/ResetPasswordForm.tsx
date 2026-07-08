import { isAxiosError } from 'axios'
import { type FormEvent, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { SubmitButton } from '@/components/auth/shared/SubmitButton'
import { TextField } from '@/components/auth/shared/TextField'
import { useResetPassword, useResetTokenStatus } from '@/hooks/useResetPassword'
import { validateResetPasswordForm, type ResetPasswordFormErrors } from '@/utils/validate-reset-password-form'

interface ResetPasswordFormProps {
  token: string
}

export function ResetPasswordForm({ token }: ResetPasswordFormProps) {
  const resetPasswordMutation = useResetPassword()
  const resetTokenStatus = useResetTokenStatus(token)
  const navigate = useNavigate()
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [errors, setErrors] = useState<ResetPasswordFormErrors>({})
  const [successMessage, setSuccessMessage] = useState('')

  const isTokenMissing = !token
  const isTokenChecking = resetTokenStatus.isLoading
  const isTokenInvalid = isTokenMissing || resetTokenStatus.isError
  const isFormDisabled = resetPasswordMutation.isPending || Boolean(successMessage)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const nextErrors = validateResetPasswordForm(password, confirmPassword)

    if (isTokenInvalid) {
      nextErrors.form = 'El enlace de recuperacion es invalido, expiro o ya fue usado.'
    }

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors)
      setSuccessMessage('')
      return
    }

    setErrors({})
    setSuccessMessage('')

    try {
      await resetPasswordMutation.mutateAsync({ token, newPassword: password })
      setSuccessMessage('Contrasena actualizada. Ya puedes iniciar sesion con tu nueva clave.')
      window.setTimeout(() => navigate('/login', { replace: true }), 1200)
    } catch (error) {
      setErrors({ form: isAxiosError(error) ? 'El enlace es invalido, expiro o ya fue usado.' : 'No se pudo restablecer la contrasena.' })
    }
  }

  if (isTokenChecking) {
    return (
      <section className="ledger-panel p-8 text-center sm:p-10">
        <p className="ledger-kicker">Verificando enlace</p>
        <h2 className="mt-4 text-3xl ledger-title">Validando solicitud</h2>
        <p className="ledger-copy mx-auto mt-4 max-w-md">Espera un momento mientras comprobamos que el enlace de recuperacion siga disponible.</p>
      </section>
    )
  }

  if (isTokenInvalid) {
    return (
      <section className="ledger-panel p-8 text-center sm:p-10">
        <p className="text-sm font-black tracking-[0.12em] text-[var(--danger)]">Enlace no disponible</p>
        <h2 className="mt-4 text-4xl ledger-title sm:text-5xl">Este enlace ya no se puede usar.</h2>
        <p className="ledger-copy mx-auto mt-5 max-w-md">El token es invalido, expiro o ya fue usado para cambiar la contrasena. Solicita un nuevo enlace para continuar.</p>
        <Link to="/forgot-password" className="mt-7 inline-flex min-h-12 items-center justify-center rounded-[var(--radius-md)] bg-[var(--accent)] px-5 py-3 font-black text-white shadow-[0_14px_28px_var(--shadow)] outline-none transition hover:-translate-y-0.5 hover:brightness-105 focus:ring-4 focus:ring-[var(--focus)]">
          Ir a olvidé mi contrasena
        </Link>
      </section>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="ledger-panel p-5 sm:p-7">
      <div className="mb-6 border-b border-[var(--line)] pb-5">
        <p className="ledger-kicker">Nuevo acceso</p>
        <h2 className="mt-2 text-2xl ledger-title">Crear contrasena nueva</h2>
      </div>

      <div className="grid gap-5">
        <TextField
          label="Nueva contrasena"
          name="password"
          type="password"
          autoComplete="new-password"
          value={password}
          error={errors.password}
          disabled={isFormDisabled}
          onChange={(event) => setPassword(event.target.value)}
        />
        <TextField
          label="Confirmar contrasena"
          name="confirmPassword"
          type="password"
          autoComplete="new-password"
          value={confirmPassword}
          error={errors.confirmPassword}
          disabled={isFormDisabled}
          onChange={(event) => setConfirmPassword(event.target.value)}
        />

        {successMessage ? <p role="status" className="state-success px-4 py-3 text-sm font-semibold">{successMessage}</p> : null}
        {errors.form ? <p role="alert" className="state-error px-4 py-3 text-sm font-semibold">{errors.form}</p> : null}

        <SubmitButton isLoading={resetPasswordMutation.isPending} loadingLabel="Actualizando..." disabled={isFormDisabled}>
          Restablecer contrasena
        </SubmitButton>

        <p className="text-center text-sm text-[var(--muted)]">
          Ya tienes acceso?{' '}
          <Link to="/login" className="ledger-link">
            Inicia sesion
          </Link>
        </p>
      </div>
    </form>
  )
}
