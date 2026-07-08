import { validateEmail } from '@/utils/validate-email'

export interface ForgotPasswordFormErrors {
  email?: string
  form?: string
}

export function validateForgotPasswordForm(email: string): ForgotPasswordFormErrors {
  const errors: ForgotPasswordFormErrors = {}

  if (!validateEmail(email)) {
    errors.email = 'Ingresa un correo valido.'
  }

  return errors
}
