import { isAxiosError } from 'axios'
import { Link, useParams } from 'react-router-dom'
import { FavoriteListPanel } from '@/features/favorites/components/FavoriteListPanel'
import { StatisticsCards } from '@/features/statistics/components/StatisticsCards'
import { StatusDistributionPanel } from '@/features/statistics/components/StatusDistributionPanel'
import { TopGenresPanel } from '@/features/statistics/components/TopGenresPanel'
import { usePublicStatistics } from '@/features/statistics/hooks/usePublicStatistics'
import type { PublicUserStatistics } from '@/features/statistics/types/statistics.interface'
import { ProfileHeader } from '@/features/user/components/ProfileHeader'
import { usePublicProfile } from '@/features/user/hooks/usePublicProfile'
import type { UserStatistics } from '@/features/user/types/user.interface'

export function PublicProfilePage() {
  const { username } = useParams()
  const profileQuery = usePublicProfile(username)
  const statisticsQuery = usePublicStatistics(username)

  if (profileQuery.isLoading) {
    return <PublicProfileSkeleton />
  }

  if (profileQuery.isError || !profileQuery.data) {
    const isNotFound = isAxiosError(profileQuery.error) && profileQuery.error.response?.status === 404

    return (
      <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="ledger-panel p-6 text-center sm:p-8">
          <p className="ledger-kicker">Public profile</p>
          <h1 className="mt-3 text-3xl ledger-title">{isNotFound ? 'Profile not found' : "We couldn't load the profile"}</h1>
          <p className="mt-3 text-[var(--muted)]">{isNotFound ? 'Check the username or ask for an updated link.' : 'Try again in a few seconds.'}</p>
          <Link to="/" className="ledger-link mt-5 inline-flex min-h-11 items-center px-4">
            Back to home
          </Link>
        </div>
      </section>
    )
  }

  const profile = profileQuery.data

  return (
    <section className="mx-auto grid max-w-6xl gap-6 px-4 py-8 sm:px-6 lg:px-8">
      <ProfileHeader username={profile.username} avatarUrl={profile.avatarUrl} bannerUrl={profile.bannerUrl} bio={profile.bio} eyebrow="Public profile" />

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(24rem,0.68fr)] lg:items-stretch">
        <FavoriteListPanel
          eyebrow="Favorites"
          title="Featured anime"
          favorites={profile.favorites}
          emptyTitle="No public favorites yet"
          emptyDescription="When this user marks favorite anime, they will appear here as a public showcase."
          action={null}
          panelClassName="ledger-panel overflow-hidden p-5 sm:p-7 lg:flex lg:h-full lg:min-h-0 lg:flex-col"
          listClassName="mt-5 max-h-none space-y-2 overflow-visible lg:min-h-0 lg:flex-1 lg:overflow-y-auto lg:pr-1"
        />

        <PublicStatisticsPanel profileStatistics={profile.statistics} statistics={statisticsQuery.data} isLoading={statisticsQuery.isLoading} isError={statisticsQuery.isError} />
      </div>
    </section>
  )
}

interface PublicStatisticsPanelProps {
  profileStatistics: UserStatistics
  statistics: PublicUserStatistics | undefined
  isLoading: boolean
  isError: boolean
}

function PublicStatisticsPanel({ profileStatistics, statistics, isLoading, isError }: PublicStatisticsPanelProps) {
  const summary = statistics ?? {
    totalAnime: profileStatistics.totalAnime,
    completedAnime: profileStatistics.completedAnime,
    totalEpisodesWatched: profileStatistics.totalEpisodesWatched,
    averageScore: profileStatistics.averageScore,
    topGenres: [],
    statusDistribution: {
      WATCHING: 0,
      COMPLETED: 0,
      ON_HOLD: 0,
      DROPPED: 0,
      PLAN_TO_WATCH: 0,
    },
  }

  if (isLoading) {
    return <section className="ledger-panel skeleton-shimmer h-80" aria-busy="true" />
  }

  if (isError) {
    return (
      <section className="ledger-panel p-5 sm:p-7">
        <p className="ledger-kicker">Stats</p>
        <h2 className="mt-2 text-2xl ledger-title">Visible activity</h2>
        <p role="alert" className="state-error mt-5 px-4 py-3 text-sm font-semibold">We couldn't load the full stats.</p>
        <div className="mt-5">
          <StatisticsCards variant="compact" totalAnime={summary.totalAnime} completedAnime={summary.completedAnime} totalEpisodesWatched={summary.totalEpisodesWatched} averageScore={summary.averageScore} />
        </div>
      </section>
    )
  }

  return (
    <>
      <div className="grid h-full gap-4 lg:gap-5">
        <StatisticsCards variant="compact" totalAnime={summary.totalAnime} completedAnime={summary.completedAnime} totalEpisodesWatched={summary.totalEpisodesWatched} averageScore={summary.averageScore} />
        <TopGenresPanel genres={summary.topGenres} />
      </div>
      <div className="lg:col-span-2">
        <StatusDistributionPanel distribution={summary.statusDistribution} />
      </div>
    </>
  )
}

function PublicProfileSkeleton() {
  return (
    <section className="mx-auto grid max-w-6xl gap-6 px-4 py-8 sm:px-6 lg:px-8" aria-busy="true">
      <div className="ledger-panel skeleton-shimmer h-80" />
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(24rem,0.68fr)]">
        <div className="ledger-panel skeleton-shimmer h-64" />
        <div className="ledger-panel skeleton-shimmer h-64" />
      </div>
    </section>
  )
}
