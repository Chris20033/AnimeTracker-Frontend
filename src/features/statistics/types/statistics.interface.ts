import type { LibraryStatus } from '@/features/library/types/library.interface'

export interface TopGenreStat {
  name: string
  count: number
}

export interface StatusDistribution {
  WATCHING: number
  COMPLETED: number
  ON_HOLD: number
  DROPPED: number
  PLAN_TO_WATCH: number
}

export interface UserStatisticsSummary {
  totalAnime: number
  completedAnime: number
  totalEpisodesWatched: number
  averageScore: number | null
  topGenres: TopGenreStat[]
  statusDistribution: StatusDistribution
}

export interface PublicUserStatistics extends UserStatisticsSummary {
  username: string
}

export interface MyStatisticsApiResponse {
  data: UserStatisticsSummary
}

export interface PublicStatisticsApiResponse {
  data: PublicUserStatistics
}

export interface StatusDistributionItem {
  status: LibraryStatus
  label: string
  value: number
  toneClassName: string
}
