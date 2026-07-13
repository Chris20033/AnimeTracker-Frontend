import { useEffect, useId, useMemo, useState } from 'react'
import type { ReactNode } from 'react'

interface ResponsiveCarouselProps<TItem> {
  title: string
  eyebrow: string
  items: TItem[]
  getKey: (item: TItem) => string
  renderItem: (item: TItem) => ReactNode
  visibleCount?: number
  desktopAt?: 'lg' | 'xl'
  desktopColumns?: number
  mobileItemClassName?: string
  countLabel?: string
}

export function ResponsiveCarousel<TItem>({ title, eyebrow, items, getKey, renderItem, visibleCount = 5, desktopAt = 'xl', desktopColumns = 5, mobileItemClassName = 'w-[min(72vw,15rem)] sm:w-64', countLabel = 'titulos' }: ResponsiveCarouselProps<TItem>) {
  const titleId = useId()
  const [startIndex, setStartIndex] = useState(0)
  const maxStartIndex = Math.max(items.length - visibleCount, 0)
  const desktopItems = useMemo(() => items.slice(startIndex, startIndex + visibleCount), [items, startIndex, visibleCount])

  useEffect(() => {
    setStartIndex((currentIndex) => Math.min(currentIndex, maxStartIndex))
  }, [maxStartIndex])

  function goPrevious() {
    setStartIndex((currentIndex) => Math.max(currentIndex - 1, 0))
  }

  function goNext() {
    setStartIndex((currentIndex) => Math.min(currentIndex + 1, maxStartIndex))
  }

  if (items.length === 0) {
    return null
  }

  return (
    <section className="grid gap-4" aria-labelledby={titleId}>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="ledger-kicker">{eyebrow}</p>
          <h2 id={titleId} className="mt-2 text-3xl ledger-title">{title}</h2>
        </div>
        <div className="flex items-center gap-2">
          <span className="ledger-chip">{items.length} {countLabel}</span>
          <div className={getControlsClassName(desktopAt)}>
            <button type="button" onClick={goPrevious} disabled={startIndex === 0} aria-label={`Ver anteriores en ${title}`} className="grid size-10 place-items-center rounded-full border border-[var(--line)] bg-[var(--surface)] font-black text-[var(--page-fg)] outline-none transition hover:bg-[var(--surface-inset)] focus:ring-4 focus:ring-[var(--focus)] disabled:cursor-not-allowed disabled:opacity-40">
              ‹
            </button>
            <button type="button" onClick={goNext} disabled={startIndex >= maxStartIndex} aria-label={`Ver siguientes en ${title}`} className="grid size-10 place-items-center rounded-full bg-[var(--accent)] font-black text-[var(--action-ink)] outline-none transition hover:-translate-y-0.5 focus:ring-4 focus:ring-[var(--focus)] disabled:cursor-not-allowed disabled:translate-y-0 disabled:bg-[var(--surface-inset)] disabled:text-[var(--soft)]">
              ›
            </button>
          </div>
        </div>
      </div>

      <ul className={getMobileListClassName(desktopAt)} aria-label={title}>
        {items.map((item) => (
          <li key={getKey(item)} className={`shrink-0 snap-start ${mobileItemClassName}`}>
            {renderItem(item)}
          </li>
        ))}
      </ul>

      <ul className={getDesktopListClassName(desktopAt, desktopColumns)} aria-label={title}>
        {desktopItems.map((item) => (
          <li key={getKey(item)}>{renderItem(item)}</li>
        ))}
      </ul>
    </section>
  )
}

function getControlsClassName(desktopAt: 'lg' | 'xl') {
  return desktopAt === 'lg' ? 'hidden items-center gap-2 lg:flex' : 'hidden items-center gap-2 xl:flex'
}

function getMobileListClassName(desktopAt: 'lg' | 'xl') {
  const baseClassName = '-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-3 sm:-mx-6 sm:px-6'

  return desktopAt === 'lg' ? `${baseClassName} lg:hidden` : `${baseClassName} xl:hidden`
}

function getDesktopListClassName(desktopAt: 'lg' | 'xl', desktopColumns: number) {
  const columnsClassName = getDesktopColumnsClassName(desktopColumns)

  return desktopAt === 'lg' ? `hidden gap-4 lg:grid ${columnsClassName}` : `hidden gap-4 xl:grid ${columnsClassName}`
}

function getDesktopColumnsClassName(desktopColumns: number) {
  if (desktopColumns === 3) {
    return 'grid-cols-3'
  }

  return 'grid-cols-5'
}
