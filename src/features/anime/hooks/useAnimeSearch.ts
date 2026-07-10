import { useQuery } from '@tanstack/react-query'
import { searchAnimeAction } from '@/features/anime/actions/search-anime.action'
import type { AnimeSearchParams } from '@/features/anime/types/anime.interface'

export function animeSearchQueryKey(params: AnimeSearchParams) {
  return ['anime', 'search', params.q, params.page, params.limit] as const
}

export function useAnimeSearch(params: AnimeSearchParams) {
  return useQuery({
    queryKey: animeSearchQueryKey(params),
    queryFn: () => searchAnimeAction(params),
    enabled: Boolean(params.q.trim()),
    placeholderData: (previousData) => previousData,
    staleTime: 1000 * 60 * 10,
  })
}
