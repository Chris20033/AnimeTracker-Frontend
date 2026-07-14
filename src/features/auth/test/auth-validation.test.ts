import { describe, expect, it } from 'vitest'
import { validateForgotPasswordForm } from '@/features/auth/utils/validate-forgot-password-form'
import { validateLoginForm } from '@/features/auth/utils/validate-login-form'
import { validateRegisterForm } from '@/features/auth/utils/validate-register-form'
import { validateResetPasswordForm } from '@/features/auth/utils/validate-reset-password-form'

describe('auth form validation', () => {
  it('validates login email and password', () => {
    expect(validateLoginForm('bad-email', '')).toEqual({
      email: 'Ingresa un correo valido.',
      password: 'Ingresa tu contrasena.',
    })
    expect(validateLoginForm('user@example.com', 'password123')).toEqual({})
  })

  it('validates register username, email and password', () => {
    expect(validateRegisterForm('ab', 'bad-email', 'short')).toEqual({
      username: 'El username debe tener entre 3 y 30 caracteres.',
      email: 'Ingresa un correo valido.',
      password: 'La contrasena debe tener al menos 8 caracteres.',
    })
    expect(validateRegisterForm('chris', 'chris@example.com', 'password123')).toEqual({})
  })

  it('validates forgot password email', () => {
    expect(validateForgotPasswordForm('nope')).toEqual({ email: 'Ingresa un correo valido.' })
    expect(validateForgotPasswordForm('user@example.com')).toEqual({})
  })

  it('validates reset password length and confirmation', () => {
    expect(validateResetPasswordForm('short', 'different')).toEqual({
      password: 'La nueva contrasena debe tener al menos 8 caracteres.',
      confirmPassword: 'Las contrasenas no coinciden.',
    })
    expect(validateResetPasswordForm('password123', 'password123')).toEqual({})
  })
})
