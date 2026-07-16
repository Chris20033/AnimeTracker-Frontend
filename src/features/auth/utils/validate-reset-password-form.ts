export interface ResetPasswordFormErrors {
  password?: string
  confirmPassword?: string
  form?: string
}

export function validateResetPasswordForm(password: string, confirmPassword: string): ResetPasswordFormErrors {
  const errors: ResetPasswordFormErrors = {}

  if (password.length < 8) {
    errors.password = 'New password must be at least 8 characters.'
  }

  if (confirmPassword !== password) {
    errors.confirmPassword = 'Passwords do not match.'
  }

  return errors
}
