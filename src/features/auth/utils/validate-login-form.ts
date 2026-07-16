import { validateEmail } from '@/features/auth/utils/validate-email'

export interface LoginFormErrors {
  email?: string
  password?: string
  form?: string
}

export function validateLoginForm(email: string, password: string): LoginFormErrors {
  const errors: LoginFormErrors = {}

  if (!validateEmail(email)) {
    errors.email = 'Enter a valid email address.'
  }

  if (!password) {
    errors.password = 'Enter your password.'
  }

  return errors
}
