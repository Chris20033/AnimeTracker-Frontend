export interface FavoriteAnime {
  externalId: string
  source: 'KITSU'
  title: string
  titleEnglish: string | null
  alternativeTitles: string[]
  imageUrl: string | null
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
