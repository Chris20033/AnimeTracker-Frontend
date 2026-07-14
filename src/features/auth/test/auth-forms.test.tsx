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

    fireEvent.click(screen.getByRole('button', { name: 'Iniciar sesión' }))

    expect(screen.getByText('Ingresa un correo valido.')).toBeInTheDocument()
    expect(screen.getByText('Ingresa tu contrasena.')).toBeInTheDocument()
  })

  it('shows register validation errors', () => {
    renderWithProviders(<RegisterForm />)

    fireEvent.click(screen.getByRole('button', { name: 'Crear cuenta' }))

    expect(screen.getByText('El username debe tener entre 3 y 30 caracteres.')).toBeInTheDocument()
    expect(screen.getByText('Ingresa un correo valido.')).toBeInTheDocument()
    expect(screen.getByText('La contrasena debe tener al menos 8 caracteres.')).toBeInTheDocument()
  })

  it('shows forgot password validation errors', () => {
    renderWithProviders(<ForgotPasswordForm />)

    fireEvent.click(screen.getByRole('button', { name: 'Enviar enlace' }))

    expect(screen.getByText('Ingresa un correo valido.')).toBeInTheDocument()
  })

  it('shows reset password validation errors', () => {
    renderWithProviders(<ResetPasswordForm token="valid-token" />)

    fireEvent.click(screen.getByRole('button', { name: 'Restablecer contrasena' }))

    expect(screen.getByText('La nueva contrasena debe tener al menos 8 caracteres.')).toBeInTheDocument()
  })
})
