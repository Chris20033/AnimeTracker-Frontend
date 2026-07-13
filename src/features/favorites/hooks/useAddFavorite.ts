import { useMutation, useQueryClient } from '@tanstack/react-query'
import { addFavoriteAction } from '@/features/favorites/actions/add-favorite.action'
import { favoritesQueryKey } from '@/features/favorites/hooks/useFavorites'

export function useAddFavorite() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: addFavoriteAction,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: favoritesQueryKey })
      await queryClient.invalidateQueries({ queryKey: ['users', 'public'] })
    },
  })
}
