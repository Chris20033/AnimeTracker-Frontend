import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateLibraryEntryAction } from '@/features/library/actions/update-library-entry.action'
import { invalidateLibraryDependentQueries } from '@/features/library/utils/invalidate-library-dependent-queries'

export function useUpdateLibraryEntry() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateLibraryEntryAction,
    onSuccess: async () => {
      await invalidateLibraryDependentQueries(queryClient)
    },
  })
}
