import { screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { FavoriteListPanel } from '@/features/favorites/components/FavoriteListPanel'
import type { FavoriteEntry } from '@/features/favorites/types/favorite.interface'
import { renderWithProviders } from '@/test/test-utils'

const favorite: FavoriteEntry = {
  id: 'favorite-1',
  createdAt: '2026-01-01T00:00:00.000Z',
  anime: {
    externalId: '1',
    source: 'KITSU',
    title: 'Kimi no Na wa.',
    titleEnglish: 'Your Name.',
    alternativeTitles: [],
    imageUrl: null,
  },
}

describe('FavoriteListPanel', () => {
  it('renders empty and error states', () => {
    const { rerender } = renderWithProviders(<FavoriteListPanel eyebrow="Favorites" title="Featured anime" favorites={[]} emptyTitle="No favorites" emptyDescription="Mark your favorite anime." />)

    expect(screen.getByText('No favorites')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Explore catalog' })).toBeInTheDocument()

    rerender(<FavoriteListPanel eyebrow="Favorites" title="Featured anime" favorites={[]} isError emptyTitle="No favorites" emptyDescription="Mark your favorite anime." />)
    expect(screen.getByRole('alert')).toHaveTextContent("We couldn't load favorites.")
  })

  it('renders favorite anime rows', () => {
    renderWithProviders(<FavoriteListPanel eyebrow="Favorites" title="Featured anime" favorites={[favorite]} emptyTitle="No favorites" emptyDescription="Mark your favorite anime." />)

    expect(screen.getByText('Kimi no Na wa.')).toBeInTheDocument()
    expect(screen.getByText('Your Name.')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Kimi no Na wa./ })).toHaveAttribute('href', '/anime/KITSU/1')
  })
})
