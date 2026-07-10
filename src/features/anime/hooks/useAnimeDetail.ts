import { useQuery } from '@tanstack/react-query'
import { getAnimeDetailAction } from '@/features/anime/actions/get-anime-detail.action'

export function animeDetailQueryKey(source: string | undefined, externalId: string | undefined) {
  return ['anime', 'detail', source ?? '', externalId ?? ''] as const
}

export function useAnimeDetail(source: string | undefined, externalId: string | undefined) {
  return useQuery({
    queryKey: animeDetailQueryKey(source, externalId),
    queryFn: () => getAnimeDetailAction(source ?? '', externalId ?? ''),
    enabled: Boolean(source && externalId),
    staleTime: 1000 * 60 * 10,
  })
}
