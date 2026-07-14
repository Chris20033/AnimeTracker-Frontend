import { apiClient } from '@/shared/lib/apiClient'
import type { HomeApiResponse, HomePayload } from '@/features/home/types/home.interface'

export async function getHomeService(): Promise<HomePayload> {
  const response = await apiClient.get<HomeApiResponse>('/home')
  return response.data.data
}
