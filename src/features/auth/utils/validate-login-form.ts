import { validateEmail } from '@/features/auth/utils/validate-email'

export interface LoginFormErrors {
  email?: string
  password?: string
  form?: string
}

export function validateLoginForm(email: string, password: string): LoginFormErrors {
  const errors: LoginFormErrors = {}

  if (!validateEmail(email)) {
    errors.email = 'Ingresa un correo valido.'
  }

  if (!password) {
    errors.password = 'Ingresa tu contrasena.'
  }

  return errors
}
