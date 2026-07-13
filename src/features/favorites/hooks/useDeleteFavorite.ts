import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteFavoriteAction } from '@/features/favorites/actions/delete-favorite.action'
import { favoritesQueryKey } from '@/features/favorites/hooks/useFavorites'

export function useDeleteFavorite() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteFavoriteAction,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: favoritesQueryKey })
      await queryClient.invalidateQueries({ queryKey: ['users', 'public'] })
    },
  })
}
