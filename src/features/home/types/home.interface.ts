export interface HomeAnimeItem {
  externalId: string
  source: 'KITSU'
  title: string
  imageUrl: string | null
  type: string | null
  year: number | null
  status: string | null
  score: number | null
  synopsis: string | null
  episodes: number | null
  genres: string[]
  trailerUrl: string | null
  rank: number | null
  popularity: number | null
  members: number | null
}

export interface HomeRecommendationItem {
  externalId: string
  source: 'KITSU'
  title: string
  imageUrl: string | null
  recommendationUrl: string | null
  votes: number | null
}

export interface HomeSections {
  featured: HomeAnimeItem[]
  topAiring: HomeAnimeItem[]
  seasonal: HomeAnimeItem[]
  upcoming: HomeAnimeItem[]
  popular: HomeAnimeItem[]
  recommendations: HomeRecommendationItem[]
}

export interface HomePayload {
  hero: HomeAnimeItem | null
  sections: HomeSections
}

export interface HomeApiResponse {
  data: HomePayload
}
