import { apiClient } from '@/shared/lib/apiClient'
import type {
  AnimeCatalogParams,
  AnimeDetail,
  AnimeDetailApiResponse,
  AnimeGenresApiResponse,
  AnimeGenre,
  AnimeSearchApiResponse,
  AnimeSearchParams,
} from '@/features/anime/types/anime.interface'

export async function searchAnimeService(params: AnimeSearchParams): Promise<AnimeSearchApiResponse> {
  const response = await apiClient.get<AnimeSearchApiResponse>('/anime/search', { params })
  return response.data
}

export async function getAnimeCatalogService(params: AnimeCatalogParams): Promise<AnimeSearchApiResponse> {
  const response = await apiClient.get<AnimeSearchApiResponse>('/anime/catalog', { params })
  return response.data
}

export async function getAnimeGenresService(): Promise<AnimeGenre[]> {
  const response = await apiClient.get<AnimeGenresApiResponse>('/anime/genres')
  return response.data.data
}

export async function getAnimeDetailService(source: string, externalId: string): Promise<AnimeDetail> {
  const response = await apiClient.get<AnimeDetailApiResponse>(`/anime/${encodeURIComponent(source)}/${encodeURIComponent(externalId)}`)
  return response.data.data
}
