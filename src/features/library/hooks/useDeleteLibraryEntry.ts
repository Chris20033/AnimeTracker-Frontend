import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteLibraryEntryAction } from '@/features/library/actions/delete-library-entry.action'
import { invalidateLibraryDependentQueries } from '@/features/library/utils/invalidate-library-dependent-queries'

export function useDeleteLibraryEntry() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteLibraryEntryAction,
    onSuccess: async () => {
      await invalidateLibraryDependentQueries(queryClient)
    },
  })
}
