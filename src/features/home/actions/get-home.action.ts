import { getHomeService } from '@/features/home/services/home.service'
import type { HomePayload } from '@/features/home/types/home.interface'

export function getHomeAction(): Promise<HomePayload> {
  return getHomeService()
}
