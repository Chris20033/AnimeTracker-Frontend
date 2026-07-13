import type { StatusDistribution, StatusDistributionItem } from '@/features/statistics/types/statistics.interface'

export const statusDistributionMeta = {
  WATCHING: { label: 'Viendo', toneClassName: 'bg-sky-400' },
  COMPLETED: { label: 'Completados', toneClassName: 'bg-emerald-400' },
  ON_HOLD: { label: 'En pausa', toneClassName: 'bg-amber-400' },
  DROPPED: { label: 'Abandonados', toneClassName: 'bg-rose-400' },
  PLAN_TO_WATCH: { label: 'Planeados', toneClassName: 'bg-fuchsia-400' },
} as const

export function formatStatNumber(value: number) {
  return new Intl.NumberFormat('es-MX').format(value)
}

export function formatAverageScore(value: number | null) {
  return value === null ? 'Pendiente' : value.toFixed(1)
}

export function getStatusDistributionItems(distribution: StatusDistribution): StatusDistributionItem[] {
  return Object.entries(statusDistributionMeta).map(([status, meta]) => ({
    status: status as keyof StatusDistribution,
    label: meta.label,
    value: distribution[status as keyof StatusDistribution],
    toneClassName: meta.toneClassName,
  }))
}
