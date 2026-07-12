import { useEffect, useMemo, useState } from 'react'
import { HomeAnimeCard } from '@/features/home/components/HomeAnimeCard'
import { HomeRecommendationCard } from '@/features/home/components/HomeRecommendationCard'
import type { HomeAnimeItem, HomeRecommendationItem } from '@/features/home/types/home.interface'

interface HomeCarouselProps {
  title: string
  eyebrow: string
  items: HomeAnimeItem[] | HomeRecommendationItem[]
  variant?: 'anime' | 'recommendation'
}

export function HomeCarousel({ title, eyebrow, items, variant = 'anime' }: HomeCarouselProps) {
  const [startIndex, setStartIndex] = useState(0)
  const visibleCount = variant === 'recommendation' ? 3 : 5
  const uniqueItems = useMemo(() => getUniqueItems(items), [items])
  const maxStartIndex = Math.max(uniqueItems.length - visibleCount, 0)
  const visibleItems = uniqueItems.slice(startIndex, startIndex + visibleCount)

  useEffect(() => {
    setStartIndex((currentIndex) => Math.min(currentIndex, maxStartIndex))
  }, [maxStartIndex])

  function goPrevious() {
    setStartIndex((currentIndex) => Math.max(currentIndex - 1, 0))
  }

  function goNext() {
    setStartIndex((currentIndex) => Math.min(currentIndex + 1, maxStartIndex))
  }

  if (uniqueItems.length === 0) {
    return null
  }

  return (
    <section className="grid gap-4">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="ledger-kicker">{eyebrow}</p>
          <h2 className="mt-2 text-3xl ledger-title">{title}</h2>
        </div>
        <div className="flex items-center gap-2">
          <span className="ledger-chip">{uniqueItems.length} titulos</span>
          <button type="button" onClick={goPrevious} disabled={startIndex === 0} aria-label={`Ver anteriores en ${title}`} className="grid size-10 place-items-center rounded-full border border-[var(--line)] bg-[var(--surface)] font-black text-[var(--page-fg)] outline-none transition hover:bg-[var(--surface-inset)] focus:ring-4 focus:ring-[var(--focus)] disabled:cursor-not-allowed disabled:opacity-40">
            ‹
          </button>
          <button type="button" onClick={goNext} disabled={startIndex >= maxStartIndex} aria-label={`Ver siguientes en ${title}`} className="grid size-10 place-items-center rounded-full bg-[var(--accent)] font-black text-[var(--action-ink)] outline-none transition hover:-translate-y-0.5 focus:ring-4 focus:ring-[var(--focus)] disabled:cursor-not-allowed disabled:translate-y-0 disabled:bg-[var(--surface-inset)] disabled:text-[var(--soft)]">
            ›
          </button>
        </div>
      </div>
      <div className={`grid gap-4 ${variant === 'recommendation' ? 'sm:grid-cols-2 lg:grid-cols-3' : 'sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5'}`}>
        {variant === 'recommendation'
          ? (visibleItems as HomeRecommendationItem[]).map((item) => <HomeRecommendationCard key={`${item.source}-${item.externalId}-${item.recommendationUrl ?? item.title}`} recommendation={item} />)
          : (visibleItems as HomeAnimeItem[]).map((item) => <HomeAnimeCard key={`${item.source}-${item.externalId}`} anime={item} />)}
      </div>
    </section>
  )
}

function getUniqueItems(items: HomeAnimeItem[] | HomeRecommendationItem[]) {
  const seen = new Set<string>()

  return items.filter((item) => {
    const key = `${item.source}-${item.externalId}`

    if (seen.has(key)) {
      return false
    }

    seen.add(key)
    return true
  })
}
