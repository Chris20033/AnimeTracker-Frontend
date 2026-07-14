import { getScoreTone } from '@/shared/utils/get-score-tone'

interface MetricCardProps {
  label: string
  value: string | number
  score?: number | null
}

export function MetricCard({ label, value, score }: MetricCardProps) {
  const scoreTone = getScoreTone(score)
  const toneClassName = score === undefined ? '' : scoreTone.className

  return (
    <div className={`ledger-inset p-4 text-center ${toneClassName ? `ring-1 ${toneClassName}` : ''}`}>
      <p className="text-xs font-black tracking-[0.12em] text-[var(--soft)]">{label}</p>
      <p className="mt-2 text-2xl font-black text-[var(--page-fg)]">{value}</p>
    </div>
  )
}
