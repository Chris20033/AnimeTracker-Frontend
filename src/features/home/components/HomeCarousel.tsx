import { useMemo } from 'react'
import { HomeAnimeCard } from '@/features/home/components/HomeAnimeCard'
import { HomeRecommendationCard } from '@/features/home/components/HomeRecommendationCard'
import type { HomeAnimeItem, HomeRecommendationItem } from '@/features/home/types/home.interface'
import { ResponsiveCarousel } from '@/shared/components/ui/ResponsiveCarousel'

interface HomeCarouselProps {
  title: string
  eyebrow: string
  items: HomeAnimeItem[] | HomeRecommendationItem[]
  variant?: 'anime' | 'recommendation'
}

export function HomeCarousel({ title, eyebrow, items, variant = 'anime' }: HomeCarouselProps) {
  const uniqueItems = useMemo(() => getUniqueItems(items), [items])

  return (
    <ResponsiveCarousel
      title={title}
      eyebrow={eyebrow}
      items={uniqueItems}
      getKey={getItemKey}
      renderItem={(item) => renderHomeItem(item, variant)}
      visibleCount={variant === 'recommendation' ? 3 : 5}
      desktopAt={variant === 'recommendation' ? 'lg' : 'xl'}
      desktopColumns={variant === 'recommendation' ? 3 : 5}
      mobileItemClassName={variant === 'recommendation' ? 'w-[min(84vw,22rem)] sm:w-[24rem]' : 'w-[min(72vw,15rem)] sm:w-64'}
    />
  )
}

function renderHomeItem(item: HomeAnimeItem | HomeRecommendationItem, variant: 'anime' | 'recommendation') {
  if (variant === 'recommendation') {
    return <HomeRecommendationCard recommendation={item as HomeRecommendationItem} />
  }

  return <HomeAnimeCard anime={item as HomeAnimeItem} />
}

function getItemKey(item: HomeAnimeItem | HomeRecommendationItem) {
  if ('recommendationUrl' in item) {
    return `${item.source}-${item.externalId}-${item.recommendationUrl ?? item.title}`
  }

  return `${item.source}-${item.externalId}`
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
