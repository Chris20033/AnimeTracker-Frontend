export interface ResetPasswordFormErrors {
  password?: string
  confirmPassword?: string
  form?: string
}

export function validateResetPasswordForm(password: string, confirmPassword: string): ResetPasswordFormErrors {
  const errors: ResetPasswordFormErrors = {}

  if (password.length < 8) {
    errors.password = 'La nueva contrasena debe tener al menos 8 caracteres.'
  }

  if (confirmPassword !== password) {
    errors.confirmPassword = 'Las contrasenas no coinciden.'
  }

  return errors
}
