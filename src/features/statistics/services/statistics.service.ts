import { apiClient } from '@/shared/lib/apiClient'
import type { MyStatisticsApiResponse, PublicStatisticsApiResponse, PublicUserStatistics, UserStatisticsSummary } from '@/features/statistics/types/statistics.interface'

export async function getMyStatisticsService(): Promise<UserStatisticsSummary> {
  const response = await apiClient.get<MyStatisticsApiResponse>('/statistics/me')
  return response.data.data
}

export async function getPublicStatisticsService(username: string): Promise<PublicUserStatistics> {
  const response = await apiClient.get<PublicStatisticsApiResponse>(`/statistics/users/${encodeURIComponent(username)}`)
  return response.data.data
}
