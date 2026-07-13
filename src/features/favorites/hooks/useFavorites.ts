import { useQuery } from '@tanstack/react-query'
import { getFavoritesAction } from '@/features/favorites/actions/get-favorites.action'

export const favoritesQueryKey = ['favorites'] as const

export function useFavorites(enabled = true) {
  return useQuery({
    queryKey: favoritesQueryKey,
    queryFn: getFavoritesAction,
    enabled,
    staleTime: 1000 * 60 * 5,
  })
}
