import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateLibraryEntryAction } from '@/features/library/actions/update-library-entry.action'

export function useUpdateLibraryEntry() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateLibraryEntryAction,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['library'] })
    },
  })
}
