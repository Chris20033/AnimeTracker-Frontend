import { validateEmail } from '@/features/auth/utils/validate-email'

export interface ForgotPasswordFormErrors {
  email?: string
  form?: string
}

export function validateForgotPasswordForm(email: string): ForgotPasswordFormErrors {
  const errors: ForgotPasswordFormErrors = {}

  if (!validateEmail(email)) {
    errors.email = 'Enter a valid email address.'
  }

  return errors
}
