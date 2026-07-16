import type { StatusDistribution } from '@/features/statistics/types/statistics.interface'
import { formatStatNumber, getStatusDistributionItems } from '@/features/statistics/utils/statistics-format.utils'

interface StatusDistributionPanelProps {
  distribution: StatusDistribution
}

export function StatusDistributionPanel({ distribution }: StatusDistributionPanelProps) {
  const items = getStatusDistributionItems(distribution)
  const total = items.reduce((sum, item) => sum + item.value, 0)

  return (
    <section className="ledger-panel p-5 sm:p-7">
      <div className="flex flex-wrap items-end justify-between gap-3 border-b border-[var(--line)] pb-5">
        <div>
          <p className="ledger-kicker">Statuses</p>
          <h2 className="mt-2 text-2xl ledger-title">Library distribution</h2>
        </div>
        <span className="ledger-chip">{formatStatNumber(total)} entries</span>
      </div>

      {total === 0 ? (
        <div className="mt-5 rounded-[var(--radius-lg)] border border-dashed border-[var(--line-strong)] bg-[var(--surface-inset)] p-6 text-center">
          <p className="text-lg font-black text-[var(--page-fg)]">No statuses recorded yet</p>
          <p className="mt-2 text-sm font-semibold leading-6 text-[var(--muted)]">Add anime to your library to see how your activity is distributed.</p>
        </div>
      ) : (
        <div className="mt-5 grid gap-4">
          {items.map((item) => {
            const percentage = total > 0 ? Math.round((item.value / total) * 100) : 0

            return (
              <div key={item.status} className="grid gap-2">
                <div className="flex items-center justify-between gap-3 text-sm font-black">
                  <span className="text-[var(--page-fg)]">{item.label}</span>
                  <span className="text-[var(--muted)]">{formatStatNumber(item.value)} · {percentage}%</span>
                </div>
                <div className="h-3 overflow-hidden rounded-full bg-[var(--surface-inset)]" aria-label={`${item.label}: ${item.value} entries, ${percentage} percent`}>
                  <div className={`h-full rounded-full ${item.toneClassName}`} style={{ width: `${percentage}%` }} />
                </div>
              </div>
            )
          })}
        </div>
      )}
    </section>
  )
}
