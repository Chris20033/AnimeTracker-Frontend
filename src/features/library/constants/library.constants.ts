import type { LibraryStatus } from '@/features/library/types/library.interface'

export const LIBRARY_PAGE_LIMIT = 12

export const libraryStatusOptions: Array<{ value: LibraryStatus; label: string; description: string }> = [
  { value: 'WATCHING', label: 'Viendo', description: 'En emision personal' },
  { value: 'COMPLETED', label: 'Completado', description: 'Terminado' },
  { value: 'ON_HOLD', label: 'En pausa', description: 'Guardado para despues' },
  { value: 'DROPPED', label: 'Abandonado', description: 'No continua' },
  { value: 'PLAN_TO_WATCH', label: 'Por ver', description: 'Pendiente' },
]

export const libraryStatusLabels = libraryStatusOptions.reduce<Record<LibraryStatus, string>>((labels, option) => {
  labels[option.value] = option.label
  return labels
}, {} as Record<LibraryStatus, string>)
