export interface PrivateUserProfile {
  id: string
  username: string
  email: string
  role: 'USER' | 'ADMIN'
  avatarUrl: string | null
  bannerUrl: string | null
  bio: string | null
  createdAt: string
}

export interface UserStatistics {
  totalAnime: number
  completedAnime: number
  totalEpisodesWatched: number
  averageScore: number | null
}

export interface PublicUserProfile {
  id: string
  username: string
  avatarUrl: string | null
  bannerUrl: string | null
  bio: string | null
  favorites: unknown[]
  statistics: UserStatistics
}

export interface UpdateUserProfilePayload {
  username: string
  bio: string | null
  avatar?: File
  banner?: File
}

export interface PrivateUserProfileApiResponse {
  data: PrivateUserProfile
}

export interface PublicUserProfileApiResponse {
  data: PublicUserProfile
}

export interface UpdateUserProfileApiResponse {
  data: Omit<PrivateUserProfile, 'role' | 'createdAt'>
}
