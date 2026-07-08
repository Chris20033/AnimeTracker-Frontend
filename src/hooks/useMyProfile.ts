import { useQuery } from '@tanstack/react-query'
import { getMeAction } from '@/actions/user/get-me.action'

export const myProfileQueryKey = ['users', 'me'] as const

export function useMyProfile() {
  return useQuery({
    queryKey: myProfileQueryKey,
    queryFn: getMeAction,
  })
}
