import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { AnimeDetailError, AnimeDetailSkeleton } from '@/features/anime/components/AnimeDetailStates'
import { AnimeErrorState, AnimeResultSkeleton, EmptyAnimeState } from '@/features/anime/components/AnimeSearchStates'
import { renderWithProviders } from '@/test/test-utils'

describe('anime states', () => {
  it('renders catalog empty, error and loading states', () => {
    const onRetry = vi.fn()

    render(<EmptyAnimeState />)
    expect(screen.getByText("We couldn't find anime with those filters")).toBeInTheDocument()

    render(<AnimeErrorState onRetry={onRetry} />)
    expect(screen.getByRole('alert')).toHaveTextContent("We couldn't load the catalog.")
    expect(screen.getByRole('button', { name: 'Retry' })).toBeInTheDocument()

    render(<AnimeResultSkeleton />)
    expect(screen.getByText("We couldn't find anime with those filters")).toBeInTheDocument()
  })

  it('renders detail error and skeleton states', () => {
    renderWithProviders(<AnimeDetailError notFound />)
    expect(screen.getByText('Anime not found')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Back to catalog' })).toHaveAttribute('href', '/anime')

    render(<AnimeDetailSkeleton />)
    expect(document.querySelector('[aria-busy="true"]')).toBeInTheDocument()
  })
})
