import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { SubmitButton } from '@/features/auth/components/SubmitButton'
import { TextField } from '@/features/auth/components/TextField'

describe('auth form components', () => {
  it('renders text field labels and accessible errors', () => {
    render(<TextField label="Email" name="email" value="" error="Enter a valid email address." onChange={vi.fn()} />)

    expect(screen.getByLabelText('Email')).toBeInTheDocument()
    expect(screen.getByRole('alert')).toHaveTextContent('Enter a valid email address.')
    expect(screen.getByLabelText('Email')).toHaveAttribute('aria-invalid', 'true')
  })

  it('toggles password visibility with an accessible button', () => {
    render(<TextField label="Password" name="password" type="password" value="secret123" onChange={vi.fn()} />)

    const input = screen.getByLabelText('Password')
    const toggle = screen.getByRole('button', { name: 'Show password' })

    expect(input).toHaveAttribute('type', 'password')
    fireEvent.click(toggle)
    expect(input).toHaveAttribute('type', 'text')
    expect(screen.getByRole('button', { name: 'Hide password' })).toHaveAttribute('aria-pressed', 'true')
  })

  it('shows submit loading state', () => {
    render(<SubmitButton isLoading loadingLabel="Signing in...">Sign in</SubmitButton>)

    expect(screen.getByRole('button', { name: 'Signing in...' })).toBeDisabled()
    expect(screen.getByRole('button')).toHaveAttribute('aria-busy', 'true')
  })
})
