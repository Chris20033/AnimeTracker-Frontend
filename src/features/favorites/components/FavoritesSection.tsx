import { FavoriteListPanel } from '@/features/favorites/components/FavoriteListPanel'
import { useFavorites } from '@/features/favorites/hooks/useFavorites'

export function FavoritesSection() {
  const favoritesQuery = useFavorites()
  const favorites = favoritesQuery.data ?? []

  return (
    <FavoriteListPanel
      eyebrow="Favorites"
      title="My featured anime"
      favorites={favorites}
      isLoading={favoritesQuery.isLoading}
      isError={favoritesQuery.isError}
      emptyTitle="You do not have favorites yet"
      emptyDescription="Mark a star from the detail page or your library to feature your favorite anime."
    />
  )
}
