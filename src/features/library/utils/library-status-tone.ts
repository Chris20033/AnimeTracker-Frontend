import type { LibraryStatus } from '@/features/library/types/library.interface'

export interface LibraryStatusTone {
  badgeClassName: string
  accentClassName: string
  dotClassName: string
}

export const libraryStatusTones: Record<LibraryStatus, LibraryStatusTone> = {
  WATCHING: {
    badgeClassName: 'bg-sky-500/15 text-sky-600 ring-sky-500/30 dark:text-sky-300',
    accentClassName: 'border-l-sky-500',
    dotClassName: 'bg-sky-500',
  },
  COMPLETED: {
    badgeClassName: 'bg-emerald-500/15 text-emerald-600 ring-emerald-500/30 dark:text-emerald-300',
    accentClassName: 'border-l-emerald-500',
    dotClassName: 'bg-emerald-500',
  },
  ON_HOLD: {
    badgeClassName: 'bg-amber-500/15 text-amber-700 ring-amber-500/30 dark:text-amber-300',
    accentClassName: 'border-l-amber-500',
    dotClassName: 'bg-amber-500',
  },
  DROPPED: {
    badgeClassName: 'bg-red-500/15 text-red-600 ring-red-500/30 dark:text-red-300',
    accentClassName: 'border-l-red-500',
    dotClassName: 'bg-red-500',
  },
  PLAN_TO_WATCH: {
    badgeClassName: 'bg-fuchsia-500/15 text-fuchsia-600 ring-fuchsia-500/30 dark:text-fuchsia-300',
    accentClassName: 'border-l-fuchsia-500',
    dotClassName: 'bg-fuchsia-500',
  },
}

export function getLibraryStatusTone(status: LibraryStatus) {
  return libraryStatusTones[status]
}
