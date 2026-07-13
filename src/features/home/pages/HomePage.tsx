import { HomeCarousel } from '@/features/home/components/HomeCarousel'
import { HomeHero } from '@/features/home/components/HomeHero'
import { HomeErrorState, HomeSkeleton } from '@/features/home/components/HomeStates'
import { useHome } from '@/features/home/hooks/useHome'

export function HomePage() {
  const homeQuery = useHome()

  if (homeQuery.isLoading) {
    return <HomeSkeleton />
  }

  if (homeQuery.isError || !homeQuery.data) {
    return <HomeErrorState onRetry={() => void homeQuery.refetch()} />
  }

  const { hero, sections } = homeQuery.data
  const fallbackHero = hero ?? sections.featured[0] ?? sections.topAiring[0] ?? null

  return (
    <section className="grid gap-7 py-5 sm:gap-8 sm:py-9 lg:py-12">
      <HomeHero anime={fallbackHero} />
      <HomeCarousel eyebrow="Featured reel" title="Destacados de la semana" items={sections.featured} />
      <HomeCarousel eyebrow="On air" title="En emision ahora" items={sections.topAiring} />
      <HomeCarousel eyebrow="Seasonal shelf" title="Temporada actual" items={sections.seasonal} />
      <HomeCarousel eyebrow="Next arc" title="Proximamente" items={sections.upcoming} />
      <HomeCarousel eyebrow="Audience pulse" title="Populares" items={sections.popular} />
      <HomeCarousel eyebrow="Community picks" title="Recomendaciones" items={sections.recommendations} variant="recommendation" />
    </section>
  )
}
