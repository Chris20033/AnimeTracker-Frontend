export interface FavoriteAnime {
  id?: string
  externalId: string
  source: 'KITSU'
  title: string
  titleEnglish: string | null
  alternativeTitles: string[]
  imageUrl: string | null
  type?: string | null
  year?: number | null
  status?: string | null
  score?: number | null
}

export interface FavoriteEntry {
  id: string
  createdAt: string
  anime: FavoriteAnime
}

export interface FavoritePayload {
  source: 'KITSU'
  externalId: string
}

export interface FavoritesApiResponse {
  data: FavoriteEntry[]
}

export interface FavoriteEntryApiResponse {
  data: FavoriteEntry
}
