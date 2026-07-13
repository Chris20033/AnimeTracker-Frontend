import { useMutation, useQueryClient } from '@tanstack/react-query'
import { addLibraryEntryAction } from '@/features/library/actions/add-library-entry.action'
import { invalidateLibraryDependentQueries } from '@/features/library/utils/invalidate-library-dependent-queries'

export function useAddLibraryEntry() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: addLibraryEntryAction,
    onSuccess: async () => {
      await invalidateLibraryDependentQueries(queryClient)
    },
  })
}
