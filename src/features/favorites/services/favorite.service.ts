import { apiClient } from '@/shared/lib/apiClient'
import type { FavoriteEntry, FavoriteEntryApiResponse, FavoritePayload, FavoritesApiResponse } from '@/features/favorites/types/favorite.interface'

export async function getFavoritesService(): Promise<FavoriteEntry[]> {
  const response = await apiClient.get<FavoritesApiResponse>('/favorites')
  return response.data.data
}

export async function addFavoriteService(payload: FavoritePayload): Promise<FavoriteEntry> {
  const response = await apiClient.post<FavoriteEntryApiResponse>('/favorites', payload)
  return response.data.data
}

export async function deleteFavoriteService(id: string): Promise<void> {
  await apiClient.delete(`/favorites/${id}`)
}
