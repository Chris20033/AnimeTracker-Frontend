import { addFavoriteService } from '@/features/favorites/services/favorite.service'
import type { FavoriteEntry, FavoritePayload } from '@/features/favorites/types/favorite.interface'

export function addFavoriteAction(payload: FavoritePayload): Promise<FavoriteEntry> {
  return addFavoriteService(payload)
}
