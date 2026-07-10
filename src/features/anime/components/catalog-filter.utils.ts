import type { AnimeCatalogParams } from '@/features/anime/types/anime.interface'
import { ANIME_CATALOG_LIMIT, type CatalogFormState } from './catalog-filter.constants'

export function getCatalogParams(searchParams: URLSearchParams, page: number): AnimeCatalogParams {
  return removeEmptyValues({
    page,
    limit: ANIME_CATALOG_LIMIT,
    q: searchParams.get('q')?.trim() || undefined,
    type: searchParams.get('type') || undefined,
    status: searchParams.get('status') || undefined,
    rating: searchParams.get('rating') || undefined,
    genres: searchParams.get('genres') || undefined,
    order_by: searchParams.get('order_by') || 'popularity',
    sort: (searchParams.get('sort') as 'asc' | 'desc' | null) ?? 'asc',
    min_score: toOptionalNumber(searchParams.get('min_score')),
    max_score: toOptionalNumber(searchParams.get('max_score')),
  })
}

export function getFormState(searchParams: URLSearchParams): CatalogFormState {
  return {
    q: searchParams.get('q') ?? '',
    type: searchParams.get('type') ?? '',
    status: searchParams.get('status') ?? '',
    rating: searchParams.get('rating') ?? '',
    genre: searchParams.get('genres') ?? '',
    orderBy: searchParams.get('order_by') ?? 'popularity',
    sort: (searchParams.get('sort') as 'asc' | 'desc' | null) ?? 'asc',
    minScore: searchParams.get('min_score') ?? '',
    maxScore: searchParams.get('max_score') ?? '',
  }
}

export function buildSearchParams(formState: CatalogFormState, page: number) {
  const nextParams = new URLSearchParams()
  nextParams.set('page', String(page))
  appendIfPresent(nextParams, 'q', formState.q.trim())
  appendIfPresent(nextParams, 'type', formState.type)
  appendIfPresent(nextParams, 'status', formState.status)
  appendIfPresent(nextParams, 'rating', formState.rating)
  appendIfPresent(nextParams, 'genres', formState.genre)
  appendIfPresent(nextParams, 'order_by', formState.orderBy)
  appendIfPresent(nextParams, 'sort', formState.sort)
  appendIfPresent(nextParams, 'min_score', formState.minScore)
  appendIfPresent(nextParams, 'max_score', formState.maxScore)
  return nextParams
}

export function getActiveFilterCount(searchParams: URLSearchParams) {
  return ['q', 'type', 'status', 'rating', 'genres', 'order_by', 'sort', 'min_score', 'max_score'].filter((key) => {
    const value = searchParams.get(key)
    return Boolean(value && !(key === 'order_by' && value === 'popularity') && !(key === 'sort' && value === 'asc'))
  }).length
}

function appendIfPresent(params: URLSearchParams, key: string, value: string) {
  if (value) {
    params.set(key, value)
  }
}

function toOptionalNumber(value: string | null) {
  if (!value) {
    return undefined
  }

  const numberValue = Number(value)
  return Number.isFinite(numberValue) ? numberValue : undefined
}

function removeEmptyValues(params: AnimeCatalogParams): AnimeCatalogParams {
  return Object.fromEntries(Object.entries(params).filter(([, value]) => value !== undefined && value !== '')) as AnimeCatalogParams
}
