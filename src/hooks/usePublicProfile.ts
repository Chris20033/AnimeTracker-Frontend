import { useQuery } from '@tanstack/react-query'
import { getPublicProfileAction } from '@/actions/user/get-public-profile.action'

export function publicProfileQueryKey(username: string) {
  return ['users', 'public', username] as const
}

export function usePublicProfile(username: string | undefined) {
  return useQuery({
    queryKey: publicProfileQueryKey(username ?? ''),
    queryFn: () => getPublicProfileAction(username ?? ''),
    enabled: Boolean(username),
  })
}
