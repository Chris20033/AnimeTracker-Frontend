import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { RouteLoadingState } from '@/app/router/RouteLoadingState'
import { NotFoundPage } from '@/shared/pages/NotFoundPage'
import { renderWithProviders } from '@/test/test-utils'

describe('route states', () => {
  it('renders accessible route loading state', () => {
    render(<RouteLoadingState />)

    expect(screen.getByText('Preparing the view')).toBeInTheDocument()
    expect(document.querySelector('[aria-busy="true"]')).toBeInTheDocument()
  })

  it('renders not found page with recovery link', () => {
    renderWithProviders(<NotFoundPage />)

    expect(screen.getByText('Route not found')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Back to home' })).toHaveAttribute('href', '/')
  })
})
