import { useMutation, useQueryClient } from '@tanstack/react-query'
import { addLibraryEntryAction } from '@/features/library/actions/add-library-entry.action'

export function useAddLibraryEntry() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: addLibraryEntryAction,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['library'] })
    },
  })
}
