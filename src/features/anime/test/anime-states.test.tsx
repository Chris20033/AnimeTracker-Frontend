import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { AnimeDetailError, AnimeDetailSkeleton } from '@/features/anime/components/AnimeDetailStates'
import { AnimeErrorState, AnimeResultSkeleton, EmptyAnimeState } from '@/features/anime/components/AnimeSearchStates'
import { renderWithProviders } from '@/test/test-utils'

describe('anime states', () => {
  it('renders catalog empty, error and loading states', () => {
    const onRetry = vi.fn()

    render(<EmptyAnimeState />)
    expect(screen.getByText('No encontramos anime con esos filtros')).toBeInTheDocument()

    render(<AnimeErrorState onRetry={onRetry} />)
    expect(screen.getByRole('alert')).toHaveTextContent('No se pudo cargar el catalogo.')
    expect(screen.getByRole('button', { name: 'Reintentar' })).toBeInTheDocument()

    render(<AnimeResultSkeleton />)
    expect(screen.getByText('No encontramos anime con esos filtros')).toBeInTheDocument()
  })

  it('renders detail error and skeleton states', () => {
    renderWithProviders(<AnimeDetailError notFound />)
    expect(screen.getByText('Anime no encontrado')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Volver al catalogo' })).toHaveAttribute('href', '/anime')

    render(<AnimeDetailSkeleton />)
    expect(document.querySelector('[aria-busy="true"]')).toBeInTheDocument()
  })
})
