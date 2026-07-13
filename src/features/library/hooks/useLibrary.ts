import { useQuery } from '@tanstack/react-query'
import { getLibraryAction } from '@/features/library/actions/get-library.action'
import type { LibraryQueryParams } from '@/features/library/types/library.interface'

export function libraryQueryKey(params: LibraryQueryParams) {
  return ['library', params.status ?? 'ALL', params.q ?? '', params.page, params.limit] as const
}

export function useLibrary(params: LibraryQueryParams) {
  return useQuery({
    queryKey: libraryQueryKey(params),
    queryFn: () => getLibraryAction(params),
    placeholderData: (previousData) => previousData,
    staleTime: 1000 * 60 * 5,
  })
}
