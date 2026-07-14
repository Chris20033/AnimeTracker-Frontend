import { useQuery } from '@tanstack/react-query'
import { getAnimeCatalogAction } from '@/features/anime/actions/get-anime-catalog.action'
import type { AnimeCatalogParams } from '@/features/anime/types/anime.interface'

export function animeCatalogQueryKey(params: AnimeCatalogParams) {
  return [
    'anime',
    'catalog',
    params.page,
    params.limit,
    params.q ?? '',
    params.type ?? '',
    params.status ?? '',
    params.rating ?? '',
    params.genres ?? '',
    params.genres_exclude ?? '',
    params.order_by ?? '',
    params.sort ?? '',
    params.min_score ?? '',
    params.max_score ?? '',
    params.start_date ?? '',
    params.end_date ?? '',
  ] as const
}

export function useAnimeCatalog(params: AnimeCatalogParams) {
  return useQuery({
    queryKey: animeCatalogQueryKey(params),
    queryFn: () => getAnimeCatalogAction(params),
    placeholderData: (previousData) => previousData,
    staleTime: 1000 * 60 * 10,
  })
}
