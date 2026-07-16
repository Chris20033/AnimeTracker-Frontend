import type { LibraryStatus } from '@/features/library/types/library.interface'

export const LIBRARY_PAGE_LIMIT = 12

export const libraryStatusOptions: Array<{ value: LibraryStatus; label: string; description: string }> = [
  { value: 'WATCHING', label: 'Watching', description: 'Currently in progress' },
  { value: 'COMPLETED', label: 'Completed', description: 'Finished' },
  { value: 'ON_HOLD', label: 'On hold', description: 'Saved for later' },
  { value: 'DROPPED', label: 'Dropped', description: 'Not continuing' },
  { value: 'PLAN_TO_WATCH', label: 'Plan to watch', description: 'Pending' },
]

export const libraryStatusLabels = libraryStatusOptions.reduce<Record<LibraryStatus, string>>((labels, option) => {
  labels[option.value] = option.label
  return labels
}, {} as Record<LibraryStatus, string>)
