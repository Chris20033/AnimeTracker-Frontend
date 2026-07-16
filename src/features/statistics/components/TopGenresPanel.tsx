import type { TopGenreStat } from '@/features/statistics/types/statistics.interface'
import { formatStatNumber } from '@/features/statistics/utils/statistics-format.utils'

interface TopGenresPanelProps {
  genres: TopGenreStat[]
}

export function TopGenresPanel({ genres }: TopGenresPanelProps) {
  const maxCount = Math.max(...genres.map((genre) => genre.count), 0)

  return (
    <section className="ledger-panel p-5 sm:p-7">
      <div className="border-b border-[var(--line)] pb-5">
        <p className="ledger-kicker">Genres</p>
        <h2 className="mt-2 text-2xl ledger-title">Your favorite patterns</h2>
      </div>

      {genres.length === 0 ? (
        <div className="mt-5 rounded-[var(--radius-lg)] border border-dashed border-[var(--line-strong)] bg-[var(--surface-inset)] p-6 text-center">
          <p className="text-lg font-black text-[var(--page-fg)]">No dominant genres</p>
          <p className="mt-2 text-sm font-semibold leading-6 text-[var(--muted)]">When your library has more entries, your main genres will appear here.</p>
        </div>
      ) : (
        <div className="mt-5 grid gap-3">
          {genres.map((genre, index) => {
            const percentage = maxCount > 0 ? Math.max((genre.count / maxCount) * 100, 8) : 0

            return (
              <article key={genre.name} className="ledger-inset p-3">
                <div className="flex items-center justify-between gap-3 text-sm font-black">
                  <span className="text-[var(--page-fg)]">{index + 1}. {genre.name}</span>
                  <span className="text-[var(--muted)]">{formatStatNumber(genre.count)}</span>
                </div>
                <div className="mt-3 h-2 overflow-hidden rounded-full bg-[var(--surface)]" aria-label={`${genre.name}: ${genre.count} entries`}>
                  <div className="h-full rounded-full bg-[var(--accent)]" style={{ width: `${percentage}%` }} />
                </div>
              </article>
            )
          })}
        </div>
      )}
    </section>
  )
}
