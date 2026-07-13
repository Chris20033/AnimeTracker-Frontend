import { useQuery } from '@tanstack/react-query'
import { getMyStatisticsAction } from '@/features/statistics/actions/get-my-statistics.action'

export const myStatisticsQueryKey = ['statistics', 'me'] as const

export function useMyStatistics() {
  return useQuery({
    queryKey: myStatisticsQueryKey,
    queryFn: getMyStatisticsAction,
    staleTime: 1000 * 60 * 5,
  })
}
