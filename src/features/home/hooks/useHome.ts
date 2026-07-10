import { useQuery } from '@tanstack/react-query'
import { getHomeAction } from '@/features/home/actions/get-home.action'

export const homeQueryKey = ['home'] as const

export function useHome() {
  return useQuery({
    queryKey: homeQueryKey,
    queryFn: getHomeAction,
    staleTime: 1000 * 60 * 15,
  })
}
