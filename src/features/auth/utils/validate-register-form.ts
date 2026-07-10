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
    errors.username = 'El username debe tener entre 3 y 30 caracteres.'
  }

  if (!validateEmail(email)) {
    errors.email = 'Ingresa un correo valido.'
  }

  if (password.length < 8) {
    errors.password = 'La contrasena debe tener al menos 8 caracteres.'
  }

  return errors
}
