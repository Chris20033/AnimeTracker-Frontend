import { describe, expect, it } from 'vitest'
import { validateForgotPasswordForm } from '@/features/auth/utils/validate-forgot-password-form'
import { validateLoginForm } from '@/features/auth/utils/validate-login-form'
import { validateRegisterForm } from '@/features/auth/utils/validate-register-form'
import { validateResetPasswordForm } from '@/features/auth/utils/validate-reset-password-form'

describe('auth form validation', () => {
  it('validates login email and password', () => {
    expect(validateLoginForm('bad-email', '')).toEqual({
      email: 'Enter a valid email address.',
      password: 'Enter your password.',
    })
    expect(validateLoginForm('user@example.com', 'password123')).toEqual({})
  })

  it('validates register username, email and password', () => {
    expect(validateRegisterForm('ab', 'bad-email', 'short')).toEqual({
      username: 'Username must be between 3 and 30 characters.',
      email: 'Enter a valid email address.',
      password: 'Password must be at least 8 characters.',
    })
    expect(validateRegisterForm('chris', 'chris@example.com', 'password123')).toEqual({})
  })

  it('validates forgot password email', () => {
    expect(validateForgotPasswordForm('nope')).toEqual({ email: 'Enter a valid email address.' })
    expect(validateForgotPasswordForm('user@example.com')).toEqual({})
  })

  it('validates reset password length and confirmation', () => {
    expect(validateResetPasswordForm('short', 'different')).toEqual({
      password: 'New password must be at least 8 characters.',
      confirmPassword: 'Passwords do not match.',
    })
    expect(validateResetPasswordForm('password123', 'password123')).toEqual({})
  })
})
