export const ANIME_CATALOG_LIMIT = 24

export const animeTypes = [
  { value: '', label: 'All' },
  { value: 'tv', label: 'TV' },
  { value: 'movie', label: 'Movie' },
  { value: 'ova', label: 'OVA' },
  { value: 'special', label: 'Special' },
  { value: 'ona', label: 'ONA' },
  { value: 'music', label: 'Music' },
]

export const animeStatuses = [
  { value: '', label: 'All' },
  { value: 'airing', label: 'Airing' },
  { value: 'complete', label: 'Completed' },
  { value: 'upcoming', label: 'Upcoming' },
]

export const animeRatings = [
  { value: '', label: 'All' },
  { value: 'g', label: 'G' },
  { value: 'pg', label: 'PG' },
  { value: 'pg13', label: 'PG-13' },
  { value: 'r17', label: 'R-17' },
  { value: 'r', label: 'R+' },
]

export const orderOptions = [
  { value: 'popularity', label: 'Popularity' },
  { value: 'score', label: 'Score' },
  { value: 'rank', label: 'Ranking' },
  { value: 'members', label: 'Members' },
  { value: 'title', label: 'Title' },
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
