import { Link } from 'react-router-dom'
import { FavoriteAnimeCard } from '@/features/favorites/components/FavoriteAnimeCard'
import { useFavorites } from '@/features/favorites/hooks/useFavorites'
import type { FavoriteEntry } from '@/features/favorites/types/favorite.interface'
import { libraryStatusLabels } from '@/features/library/constants/library.constants'
import { useLibrary } from '@/features/library/hooks/useLibrary'
import type { LibraryEntry } from '@/features/library/types/library.interface'
import { StatisticsCards } from '@/features/statistics/components/StatisticsCards'
import { StatusDistributionPanel } from '@/features/statistics/components/StatusDistributionPanel'
import { TopGenresPanel } from '@/features/statistics/components/TopGenresPanel'
import { useMyStatistics } from '@/features/statistics/hooks/useMyStatistics'
import { useAuthStore } from '@/store/auth.store'

export function DashboardPage() {
  const session = useAuthStore((state) => state.session)
  const statisticsQuery = useMyStatistics()
  const watchingQuery = useLibrary({ status: 'WATCHING', page: 1, limit: 3 })
  const favoritesQuery = useFavorites()
  const watchingEntries = watchingQuery.data?.data ?? []
  const recentFavorites = (favoritesQuery.data ?? []).slice(0, 4)

  if (statisticsQuery.isLoading) {
    return <DashboardSkeleton />
  }

  if (statisticsQuery.isError || !statisticsQuery.data) {
    return <DashboardErrorState onRetry={() => void statisticsQuery.refetch()} />
  }

  const statistics = statisticsQuery.data
  const isNewUser = statistics.totalAnime === 0

  return (
    <section className="grid gap-6 py-8 lg:py-10">
      <div className="ledger-panel relative overflow-hidden p-5 sm:p-8 lg:p-10">
        <div className="absolute inset-y-0 right-0 hidden w-1/3 bg-[radial-gradient(circle_at_70%_35%,var(--accent-soft),transparent_18rem)] lg:block" />
        <div className="relative max-w-4xl">
          <p className="ledger-kicker">Dashboard</p>
          <h1 className="mt-3 text-4xl ledger-title sm:text-5xl lg:text-6xl">Your command center, {session?.user.username}</h1>
          <p className="ledger-copy mt-4 text-base sm:text-lg">
            Review your progress, spot genre patterns, and resume what you were watching without losing the thread.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link to="/library" className="inline-flex min-h-12 items-center justify-center rounded-[var(--radius-md)] bg-[var(--accent)] px-5 py-3 font-black text-[var(--action-ink)] outline-none transition hover:-translate-y-0.5 focus:ring-4 focus:ring-[var(--focus)]">Open library</Link>
            <Link to="/anime" className="inline-flex min-h-12 items-center justify-center rounded-[var(--radius-md)] border border-[var(--line)] px-5 py-3 font-black text-[var(--page-fg)] outline-none transition hover:bg-[var(--surface-inset)] focus:ring-4 focus:ring-[var(--focus)]">Explore anime</Link>
          </div>
        </div>
      </div>

      {isNewUser ? <NewUserCallout /> : null}

      <StatisticsCards totalAnime={statistics.totalAnime} completedAnime={statistics.completedAnime} totalEpisodesWatched={statistics.totalEpisodesWatched} averageScore={statistics.averageScore} />

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(20rem,0.72fr)]">
        <StatusDistributionPanel distribution={statistics.statusDistribution} />
        <TopGenresPanel genres={statistics.topGenres} />
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <WatchingPanel entries={watchingEntries} isLoading={watchingQuery.isLoading} isError={watchingQuery.isError} />
        <RecentFavoritesPanel favorites={recentFavorites} isLoading={favoritesQuery.isLoading} isError={favoritesQuery.isError} />
      </div>
    </section>
  )
}

function NewUserCallout() {
  return (
    <section className="ledger-panel border-dashed p-5 text-center sm:p-7">
      <p className="ledger-kicker">First entry</p>
      <h2 className="mt-2 text-2xl ledger-title">Your dashboard is ready to fill up</h2>
      <p className="mx-auto mt-3 max-w-2xl text-sm font-semibold leading-7 text-[var(--muted)]">Add anime to your library, mark favorites, and update episodes to unlock useful stats.</p>
      <Link to="/anime" className="mt-5 inline-flex min-h-11 items-center justify-center rounded-[var(--radius-md)] bg-[var(--accent)] px-5 py-2.5 font-black text-[var(--action-ink)] outline-none transition hover:-translate-y-0.5 focus:ring-4 focus:ring-[var(--focus)]">Find first anime</Link>
    </section>
  )
}

interface WatchingPanelProps {
  entries: LibraryEntry[]
  isLoading: boolean
  isError: boolean
}

function WatchingPanel({ entries, isLoading, isError }: WatchingPanelProps) {
  return (
    <section className="ledger-panel p-5 sm:p-7">
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-[var(--line)] pb-5">
        <div>
          <p className="ledger-kicker">In progress</p>
          <h2 className="mt-2 text-2xl ledger-title">Continue your season</h2>
        </div>
        <span className="ledger-chip">{entries.length} visible</span>
      </div>

      {isLoading ? <PanelSkeleton /> : null}
      {isError ? <p role="alert" className="state-error mt-5 px-4 py-3 text-sm font-semibold">We couldn't load anime in progress.</p> : null}
      {!isLoading && !isError && entries.length === 0 ? <PanelEmptyState title="No anime in progress" description="Mark an anime as Watching from your library to resume it here." actionLabel="Go to library" to="/library" /> : null}

      {entries.length > 0 ? (
        <div className="mt-5 grid gap-3">
          {entries.map((entry) => <WatchingEntryRow key={entry.id} entry={entry} />)}
        </div>
      ) : null}
    </section>
  )
}

function WatchingEntryRow({ entry }: { entry: LibraryEntry }) {
  const totalEpisodes = entry.anime.episodes ?? null
  const progress = totalEpisodes && totalEpisodes > 0 ? Math.min((entry.episodesWatched / totalEpisodes) * 100, 100) : 0

  return (
    <Link to={`/anime/${entry.anime.source}/${entry.anime.externalId}`} className="ledger-inset grid grid-cols-[4rem_minmax(0,1fr)] gap-3 p-3 outline-none transition hover:-translate-y-0.5 hover:bg-[var(--surface)] focus:ring-4 focus:ring-[var(--focus)]">
      <div className="overflow-hidden rounded-[var(--radius-md)] bg-[var(--surface-inset)]">
        <div className="aspect-[3/4]">
          {entry.anime.imageUrl ? <img src={entry.anime.imageUrl} alt={entry.anime.title} className="size-full object-cover" /> : <div className="grid size-full place-items-center text-xs font-black text-[var(--soft)]">No image</div>}
        </div>
      </div>
      <div className="min-w-0 py-1">
        <p className="line-clamp-1 text-base font-black text-[var(--page-fg)]">{entry.anime.title}</p>
        <p className="mt-1 text-xs font-semibold text-[var(--muted)]">{libraryStatusLabels[entry.status]} · {entry.episodesWatched} / {totalEpisodes ?? '??'} episodes</p>
        <div className="mt-3 h-2 overflow-hidden rounded-full bg-[var(--surface)]" aria-label={`Progress for ${entry.anime.title}: ${entry.episodesWatched} of ${totalEpisodes ?? 'unknown episodes'}`}>
          <div className="h-full rounded-full bg-[var(--accent)]" style={{ width: `${progress}%` }} />
        </div>
      </div>
    </Link>
  )
}

interface RecentFavoritesPanelProps {
  favorites: FavoriteEntry[]
  isLoading: boolean
  isError: boolean
}

function RecentFavoritesPanel({ favorites, isLoading, isError }: RecentFavoritesPanelProps) {
  return (
    <section className="ledger-panel p-5 sm:p-7">
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-[var(--line)] pb-5">
        <div>
          <p className="ledger-kicker">Favorites</p>
          <h2 className="mt-2 text-2xl ledger-title">Recent highlights</h2>
        </div>
        <Link to="/profile" className="ledger-link inline-flex min-h-10 items-center px-3">View profile</Link>
      </div>

      {isLoading ? <PanelSkeleton /> : null}
      {isError ? <p role="alert" className="state-error mt-5 px-4 py-3 text-sm font-semibold">We couldn't load recent favorites.</p> : null}
      {!isLoading && !isError && favorites.length === 0 ? <PanelEmptyState title="No recent favorites" description="Mark stars from detail pages or your library to create your personal showcase." actionLabel="Explore anime" to="/anime" /> : null}
      {favorites.length > 0 ? <div className="mt-5 grid gap-2">{favorites.map((favorite) => <FavoriteAnimeCard key={favorite.id} favorite={favorite} />)}</div> : null}
    </section>
  )
}

function PanelSkeleton() {
  return <div className="mt-5 grid gap-3" aria-busy="true">{Array.from({ length: 3 }, (_, index) => <div key={index} className="skeleton-shimmer h-20 rounded-[var(--radius-md)]" />)}</div>
}

interface PanelEmptyStateProps {
  title: string
  description: string
  actionLabel: string
  to: string
}

function PanelEmptyState({ title, description, actionLabel, to }: PanelEmptyStateProps) {
  return (
    <div className="mt-5 rounded-[var(--radius-lg)] border border-dashed border-[var(--line-strong)] bg-[var(--surface-inset)] p-6 text-center">
      <p className="text-lg font-black text-[var(--page-fg)]">{title}</p>
      <p className="mt-2 text-sm font-semibold leading-6 text-[var(--muted)]">{description}</p>
      <Link to={to} className="ledger-link mt-4 inline-flex min-h-11 items-center px-4">{actionLabel}</Link>
    </div>
  )
}

function DashboardSkeleton() {
  return (
    <section className="grid gap-6 py-8 lg:py-10" aria-busy="true">
      <div className="ledger-panel skeleton-shimmer h-72" />
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">{Array.from({ length: 4 }, (_, index) => <div key={index} className="ledger-panel skeleton-shimmer h-36" />)}</div>
      <div className="grid gap-6 xl:grid-cols-2"><div className="ledger-panel skeleton-shimmer h-80" /><div className="ledger-panel skeleton-shimmer h-80" /></div>
    </section>
  )
}

function DashboardErrorState({ onRetry }: { onRetry: () => void }) {
  return (
    <section className="ledger-panel my-8 p-6 text-center sm:p-8">
      <p className="ledger-kicker">Dashboard</p>
      <h1 className="mt-3 text-3xl ledger-title">We couldn't load your stats</h1>
      <p className="mx-auto mt-3 max-w-2xl text-sm font-semibold leading-7 text-[var(--muted)]">Try again to rebuild your activity summary.</p>
      <button type="button" onClick={onRetry} className="mt-6 min-h-12 rounded-[var(--radius-md)] bg-[var(--accent)] px-5 py-3 font-black text-[var(--action-ink)] outline-none transition hover:-translate-y-0.5 focus:ring-4 focus:ring-[var(--focus)]">Retry</button>
    </section>
  )
}
