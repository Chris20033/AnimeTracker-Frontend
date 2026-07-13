import { deleteFavoriteService } from '@/features/favorites/services/favorite.service'

export function deleteFavoriteAction(id: string): Promise<void> {
  return deleteFavoriteService(id)
}
