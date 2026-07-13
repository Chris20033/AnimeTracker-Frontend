import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteLibraryEntryAction } from '@/features/library/actions/delete-library-entry.action'

export function useDeleteLibraryEntry() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteLibraryEntryAction,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['library'] })
    },
  })
}
