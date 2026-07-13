import type { AnimePagination } from '@/features/anime/types/anime.interface'

export type LibraryStatus = 'WATCHING' | 'COMPLETED' | 'ON_HOLD' | 'DROPPED' | 'PLAN_TO_WATCH'

export interface LibraryAnime {
  id: string
  externalId: string
  source: 'KITSU'
  title: string
  titleEnglish: string | null
  alternativeTitles: string[]
  imageUrl: string | null
  episodes: number | null
  status: string | null
  type: string | null
  year: number | null
  score: number | null
}

export interface LibraryEntry {
  id: string
  status: LibraryStatus
  episodesWatched: number
  personalScore: number | null
  notes: string | null
  startedAt: string | null
  finishedAt: string | null
  createdAt: string
  updatedAt: string
  anime: LibraryAnime
}

export interface LibraryQueryParams {
  status?: LibraryStatus
  q?: string
  page: number
  limit: number
}

export interface AddLibraryEntryPayload {
  source: 'KITSU'
  externalId: string
  status: LibraryStatus
}

export interface UpdateLibraryEntryPayload {
  status?: LibraryStatus
  episodesWatched?: number
  personalScore?: number | null
  notes?: string | null
  startedAt?: string | null
  finishedAt?: string | null
}

export interface LibraryApiResponse {
  data: LibraryEntry[]
  pagination: AnimePagination
}

export interface LibraryEntryApiResponse {
  data: LibraryEntry
}
