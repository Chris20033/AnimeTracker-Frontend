import { useQuery } from '@tanstack/react-query'
import { getPublicStatisticsAction } from '@/features/statistics/actions/get-public-statistics.action'

export function publicStatisticsQueryKey(username: string) {
  return ['statistics', 'public', username] as const
}

export function usePublicStatistics(username: string | undefined) {
  return useQuery({
    queryKey: publicStatisticsQueryKey(username ?? ''),
    queryFn: () => getPublicStatisticsAction(username ?? ''),
    enabled: Boolean(username),
    staleTime: 1000 * 60 * 5,
  })
}
