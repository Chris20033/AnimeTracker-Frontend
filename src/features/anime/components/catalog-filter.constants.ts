export const ANIME_CATALOG_LIMIT = 24

export const animeTypes = [
  { value: '', label: 'Todos' },
  { value: 'tv', label: 'TV' },
  { value: 'movie', label: 'Movie' },
  { value: 'ova', label: 'OVA' },
  { value: 'special', label: 'Special' },
  { value: 'ona', label: 'ONA' },
  { value: 'music', label: 'Music' },
]

export const animeStatuses = [
  { value: '', label: 'Todos' },
  { value: 'airing', label: 'En emision' },
  { value: 'complete', label: 'Completados' },
  { value: 'upcoming', label: 'Proximamente' },
]

export const animeRatings = [
  { value: '', label: 'Todas' },
  { value: 'g', label: 'G' },
  { value: 'pg', label: 'PG' },
  { value: 'pg13', label: 'PG-13' },
  { value: 'r17', label: 'R-17' },
  { value: 'r', label: 'R+' },
]

export const orderOptions = [
  { value: 'popularity', label: 'Popularidad' },
  { value: 'score', label: 'Score' },
  { value: 'rank', label: 'Ranking' },
  { value: 'members', label: 'Miembros' },
  { value: 'title', label: 'Titulo' },
]

export interface CatalogFormState {
  q: string
  type: string
  status: string
  rating: string
  genre: string
  orderBy: string
  sort: 'asc' | 'desc'
  minScore: string
  maxScore: string
}
