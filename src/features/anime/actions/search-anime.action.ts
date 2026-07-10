import { searchAnimeService } from '@/features/anime/services/anime.service'
import type { AnimeSearchApiResponse, AnimeSearchParams } from '@/features/anime/types/anime.interface'

export function searchAnimeAction(params: AnimeSearchParams): Promise<AnimeSearchApiResponse> {
  return searchAnimeService(params)
}
