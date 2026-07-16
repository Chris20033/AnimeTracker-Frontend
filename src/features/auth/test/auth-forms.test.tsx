import { fireEvent, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { ForgotPasswordForm } from '@/features/auth/components/ForgotPasswordForm'
import { LoginForm } from '@/features/auth/components/LoginForm'
import { RegisterForm } from '@/features/auth/components/RegisterForm'
import { ResetPasswordForm } from '@/features/auth/components/ResetPasswordForm'
import { renderWithProviders } from '@/test/test-utils'

vi.mock('@/features/auth/hooks/useResetPassword', async () => {
  const actual = await vi.importActual<typeof import('@/features/auth/hooks/useResetPassword')>('@/features/auth/hooks/useResetPassword')

  return {
    ...actual,
    useResetTokenStatus: () => ({ isLoading: false, isError: false }),
  }
})

describe('auth forms', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('shows login validation errors', () => {
    renderWithProviders(<LoginForm />)

    fireEvent.click(screen.getByRole('button', { name: 'Sign in' }))

    expect(screen.getByText('Enter a valid email address.')).toBeInTheDocument()
    expect(screen.getByText('Enter your password.')).toBeInTheDocument()
  })

  it('shows register validation errors', () => {
    renderWithProviders(<RegisterForm />)

    fireEvent.click(screen.getByRole('button', { name: 'Create account' }))

    expect(screen.getByText('Username must be between 3 and 30 characters.')).toBeInTheDocument()
    expect(screen.getByText('Enter a valid email address.')).toBeInTheDocument()
    expect(screen.getByText('Password must be at least 8 characters.')).toBeInTheDocument()
  })

  it('shows forgot password validation errors', () => {
    renderWithProviders(<ForgotPasswordForm />)

    fireEvent.click(screen.getByRole('button', { name: 'Send link' }))

    expect(screen.getByText('Enter a valid email address.')).toBeInTheDocument()
  })

  it('shows reset password validation errors', () => {
    renderWithProviders(<ResetPasswordForm token="valid-token" />)

    fireEvent.click(screen.getByRole('button', { name: 'Reset password' }))

    expect(screen.getByText('New password must be at least 8 characters.')).toBeInTheDocument()
  })
})
