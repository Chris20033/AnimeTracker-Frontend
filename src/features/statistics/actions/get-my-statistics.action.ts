import { getMyStatisticsService } from '@/features/statistics/services/statistics.service'
import type { UserStatisticsSummary } from '@/features/statistics/types/statistics.interface'

export function getMyStatisticsAction(): Promise<UserStatisticsSummary> {
  return getMyStatisticsService()
}
