import { validateEmail } from '@/features/auth/utils/validate-email'

export interface RegisterFormErrors {
  username?: string
  email?: string
  password?: string
  form?: string
}

export function validateRegisterForm(username: string, email: string, password: string): RegisterFormErrors {
  const errors: RegisterFormErrors = {}

  if (username.trim().length < 3 || username.trim().length > 30) {
    errors.username = 'Username must be between 3 and 30 characters.'
  }

  if (!validateEmail(email)) {
    errors.email = 'Enter a valid email address.'
  }

  if (password.length < 8) {
    errors.password = 'Password must be at least 8 characters.'
  }

  return errors
}
