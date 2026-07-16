export interface ScoreTone {
  label: string
  className: string
}

export function getScoreTone(score: number | null | undefined): ScoreTone {
  if (score === null || score === undefined) {
    return {
      label: 'No score',
      className: 'bg-[var(--surface-inset)] text-[var(--muted)] ring-[var(--line)]',
    }
  }

  if (score >= 8.5) {
    return {
      label: 'Excellent',
      className: 'bg-emerald-500/15 text-emerald-600 ring-emerald-500/30 dark:text-emerald-300',
    }
  }

  if (score >= 7) {
    return {
      label: 'Good',
      className: 'bg-sky-500/15 text-sky-600 ring-sky-500/30 dark:text-sky-300',
    }
  }

  if (score >= 5.5) {
    return {
      label: 'Average',
      className: 'bg-orange-500/15 text-orange-600 ring-orange-500/30 dark:text-orange-300',
    }
  }

  return {
    label: 'Low',
    className: 'bg-red-500/15 text-red-600 ring-red-500/30 dark:text-red-300',
  }
}
