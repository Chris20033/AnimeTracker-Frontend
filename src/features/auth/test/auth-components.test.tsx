import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { SubmitButton } from '@/features/auth/components/SubmitButton'
import { TextField } from '@/features/auth/components/TextField'

describe('auth form components', () => {
  it('renders text field labels and accessible errors', () => {
    render(<TextField label="Correo" name="email" value="" error="Ingresa un correo valido." onChange={vi.fn()} />)

    expect(screen.getByLabelText('Correo')).toBeInTheDocument()
    expect(screen.getByRole('alert')).toHaveTextContent('Ingresa un correo valido.')
    expect(screen.getByLabelText('Correo')).toHaveAttribute('aria-invalid', 'true')
  })

  it('toggles password visibility with an accessible button', () => {
    render(<TextField label="Contrasena" name="password" type="password" value="secret123" onChange={vi.fn()} />)

    const input = screen.getByLabelText('Contrasena')
    const toggle = screen.getByRole('button', { name: 'Mostrar contrasena' })

    expect(input).toHaveAttribute('type', 'password')
    fireEvent.click(toggle)
    expect(input).toHaveAttribute('type', 'text')
    expect(screen.getByRole('button', { name: 'Ocultar contrasena' })).toHaveAttribute('aria-pressed', 'true')
  })

  it('shows submit loading state', () => {
    render(<SubmitButton isLoading loadingLabel="Entrando...">Entrar</SubmitButton>)

    expect(screen.getByRole('button', { name: 'Entrando...' })).toBeDisabled()
    expect(screen.getByRole('button')).toHaveAttribute('aria-busy', 'true')
  })
})
