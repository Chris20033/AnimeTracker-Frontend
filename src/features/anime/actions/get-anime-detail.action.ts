import { getAnimeDetailService } from '@/features/anime/services/anime.service'
import type { AnimeDetail } from '@/features/anime/types/anime.interface'

export function getAnimeDetailAction(source: string, externalId: string): Promise<AnimeDetail> {
  return getAnimeDetailService(source, externalId)
}
