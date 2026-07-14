import { getAnimeCatalogService } from '@/features/anime/services/anime.service'
import type { AnimeCatalogParams, AnimeSearchApiResponse } from '@/features/anime/types/anime.interface'

export function getAnimeCatalogAction(params: AnimeCatalogParams): Promise<AnimeSearchApiResponse> {
  return getAnimeCatalogService(params)
}
