export interface AnimePagination {
  page: number
  limit: number
  total: number
  totalPages: number
}

export interface AnimeSearchItem {
  externalId: string
  source: 'KITSU'
  title: string
  imageUrl: string | null
  type: string | null
  year: number | null
  status: string | null
  score: number | null
}

export interface AnimeDetail {
  externalId: string
  source: 'KITSU'
  title: string
  titleEnglish: string | null
  synopsis: string | null
  imageUrl: string | null
  episodes: number | null
  duration: string | null
  status: string | null
  type: string | null
  season: string | null
  year: number | null
  score: number | null
  genres: string[]
  studio: string | null
  airedFrom: string | null
}

export interface AnimeSearchParams {
  q: string
  page: number
  limit: number
}

export interface AnimeCatalogParams {
  page: number
  limit: number
  q?: string
  type?: string
  status?: string
  rating?: string
  genres?: string
  genres_exclude?: string
  order_by?: string
  sort?: 'asc' | 'desc'
  min_score?: number
  max_score?: number
  start_date?: string
  end_date?: string
}

export interface AnimeGenre {
  id: number
  name: string
  count: number
}

export interface AnimeSearchApiResponse {
  data: AnimeSearchItem[]
  pagination: AnimePagination
}

export interface AnimeDetailApiResponse {
  data: AnimeDetail
}

export interface AnimeGenresApiResponse {
  data: AnimeGenre[]
}
