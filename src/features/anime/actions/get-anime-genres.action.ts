import { getAnimeGenresService } from '@/features/anime/services/anime.service'
import type { AnimeGenre } from '@/features/anime/types/anime.interface'

export function getAnimeGenresAction(): Promise<AnimeGenre[]> {
  return getAnimeGenresService()
}
