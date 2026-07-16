import type { LibraryStatus } from '@/features/library/types/library.interface'
import { libraryStatusOptions } from '@/features/library/constants/library.constants'
import { getLibraryStatusTone } from '@/features/library/utils/library-status-tone'

interface LibraryStatusTabsProps {
  activeStatus?: LibraryStatus
  onStatusChange: (status?: LibraryStatus) => void
}

export function LibraryStatusTabs({ activeStatus, onStatusChange }: LibraryStatusTabsProps) {
  return (
    <div className="ledger-surface flex gap-2 overflow-x-auto p-2" role="tablist" aria-label="Filter library by status">
      <button type="button" role="tab" aria-selected={!activeStatus} onClick={() => onStatusChange(undefined)} className={`min-h-11 shrink-0 rounded-full px-4 py-2 text-sm font-black outline-none transition focus:ring-4 focus:ring-[var(--focus)] ${!activeStatus ? 'bg-[var(--accent)] text-[var(--action-ink)]' : 'text-[var(--muted)] hover:bg-[var(--surface-inset)] hover:text-[var(--page-fg)]'}`}>
        All
      </button>
      {libraryStatusOptions.map((option) => {
        const tone = getLibraryStatusTone(option.value)

        return (
          <button key={option.value} type="button" role="tab" aria-selected={activeStatus === option.value} onClick={() => onStatusChange(option.value)} className={`inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full px-4 py-2 text-sm font-black outline-none transition focus:ring-4 focus:ring-[var(--focus)] ${activeStatus === option.value ? 'bg-[var(--accent)] text-[var(--action-ink)]' : 'text-[var(--muted)] hover:bg-[var(--surface-inset)] hover:text-[var(--page-fg)]'}`}>
            <span className={`size-2 rounded-full ${tone.dotClassName}`} aria-hidden="true" />
            {option.label}
          </button>
        )
      })}
    </div>
  )
}
