import type { QueryClient } from '@tanstack/react-query'

export async function invalidateLibraryDependentQueries(queryClient: QueryClient) {
  await Promise.all([
    queryClient.invalidateQueries({ queryKey: ['library'] }),
    queryClient.invalidateQueries({ queryKey: ['statistics'] }),
    queryClient.invalidateQueries({ queryKey: ['users', 'public'] }),
  ])
}
