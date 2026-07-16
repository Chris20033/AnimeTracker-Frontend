import { formatAverageScore, formatStatNumber } from '@/features/statistics/utils/statistics-format.utils'

interface StatisticsCardsProps {
  totalAnime: number
  completedAnime: number
  totalEpisodesWatched: number
  averageScore: number | null
  variant?: 'default' | 'compact'
}

export function StatisticsCards({ totalAnime, completedAnime, totalEpisodesWatched, averageScore, variant = 'default' }: StatisticsCardsProps) {
  const cards = [
    { label: 'Total anime', value: formatStatNumber(totalAnime), caption: 'Library entries' },
    { label: 'Completed', value: formatStatNumber(completedAnime), caption: 'Finished stories' },
    { label: 'Episodes watched', value: formatStatNumber(totalEpisodesWatched), caption: 'Time invested' },
    { label: 'Average score', value: formatAverageScore(averageScore), caption: 'Personal rating' },
  ]

  const gridClassName = variant === 'compact' ? 'grid gap-3 sm:grid-cols-2' : 'grid gap-3 sm:grid-cols-2 xl:grid-cols-4'
  const valueClassName = variant === 'compact' ? 'mt-3 text-3xl font-black tracking-[-0.04em] text-[var(--page-fg)]' : 'mt-3 text-3xl font-black tracking-[-0.04em] text-[var(--page-fg)] sm:text-4xl'

  return (
    <section className={gridClassName} aria-label="Statistics summary">
      {cards.map((card) => (
        <article key={card.label} className="ledger-panel p-4 sm:p-5">
          <p className="text-xs font-black uppercase tracking-[0.14em] text-[var(--soft)]">{card.label}</p>
          <p className={valueClassName}>{card.value}</p>
          <p className="mt-2 text-sm font-semibold text-[var(--muted)]">{card.caption}</p>
        </article>
      ))}
    </section>
  )
}
