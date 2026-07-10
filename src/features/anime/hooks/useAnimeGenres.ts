import { useQuery } from '@tanstack/react-query'
import { getAnimeGenresAction } from '@/features/anime/actions/get-anime-genres.action'

export const animeGenresQueryKey = ['anime', 'genres'] as const

export function useAnimeGenres() {
  return useQuery({
    queryKey: animeGenresQueryKey,
    queryFn: getAnimeGenresAction,
    staleTime: 1000 * 60 * 60,
  })
}
