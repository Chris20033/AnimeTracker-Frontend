import { getPublicStatisticsService } from '@/features/statistics/services/statistics.service'
import type { PublicUserStatistics } from '@/features/statistics/types/statistics.interface'

export function getPublicStatisticsAction(username: string): Promise<PublicUserStatistics> {
  return getPublicStatisticsService(username)
}
