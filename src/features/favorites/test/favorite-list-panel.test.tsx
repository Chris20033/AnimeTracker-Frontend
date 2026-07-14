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
    const { rerender } = renderWithProviders(<FavoriteListPanel eyebrow="Favoritos" title="Anime destacados" favorites={[]} emptyTitle="Sin favoritos" emptyDescription="Marca tus anime favoritos." />)

    expect(screen.getByText('Sin favoritos')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Explorar catalogo' })).toBeInTheDocument()

    rerender(<FavoriteListPanel eyebrow="Favoritos" title="Anime destacados" favorites={[]} isError emptyTitle="Sin favoritos" emptyDescription="Marca tus anime favoritos." />)
    expect(screen.getByRole('alert')).toHaveTextContent('No se pudieron cargar los favoritos.')
  })

  it('renders favorite anime rows', () => {
    renderWithProviders(<FavoriteListPanel eyebrow="Favoritos" title="Anime destacados" favorites={[favorite]} emptyTitle="Sin favoritos" emptyDescription="Marca tus anime favoritos." />)

    expect(screen.getByText('Kimi no Na wa.')).toBeInTheDocument()
    expect(screen.getByText('Your Name.')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Kimi no Na wa./ })).toHaveAttribute('href', '/anime/KITSU/1')
  })
})
