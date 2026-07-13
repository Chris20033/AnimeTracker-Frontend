import { getFavoritesService } from '@/features/favorites/services/favorite.service'
import type { FavoriteEntry } from '@/features/favorites/types/favorite.interface'

export function getFavoritesAction(): Promise<FavoriteEntry[]> {
  return getFavoritesService()
}
