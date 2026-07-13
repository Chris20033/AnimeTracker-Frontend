import { FavoriteListPanel } from '@/features/favorites/components/FavoriteListPanel'
import { useFavorites } from '@/features/favorites/hooks/useFavorites'

export function FavoritesSection() {
  const favoritesQuery = useFavorites()
  const favorites = favoritesQuery.data ?? []

  return (
    <FavoriteListPanel
      eyebrow="Favoritos"
      title="Mis anime destacados"
      favorites={favorites}
      isLoading={favoritesQuery.isLoading}
      isError={favoritesQuery.isError}
      emptyTitle="Todavia no tienes favoritos"
      emptyDescription="Marca una estrella desde el detalle o desde tu biblioteca para destacar tus anime preferidos."
    />
  )
}
