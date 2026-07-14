import { Link } from 'react-router-dom'
import type { HomeRecommendationItem } from '@/features/home/types/home.interface'

interface HomeRecommendationCardProps {
  recommendation: HomeRecommendationItem
}

export function HomeRecommendationCard({ recommendation }: HomeRecommendationCardProps) {
  return (
    <article className="grid overflow-hidden rounded-[var(--radius-lg)] border border-[var(--line)] bg-[var(--surface)] shadow-[0_18px_48px_var(--shadow)]">
      <Link to={`/anime/${recommendation.source}/${recommendation.externalId}`} className="aspect-[16/10] bg-[var(--surface-inset)] outline-none focus:ring-4 focus:ring-[var(--focus)]">
        {recommendation.imageUrl ? <img src={recommendation.imageUrl} alt={recommendation.title} className="size-full object-cover" /> : <div className="grid size-full place-items-center text-sm font-black text-[var(--soft)]">Sin imagen</div>}
      </Link>
      <div className="p-3 sm:p-4">
        <h3 className="line-clamp-2 text-sm font-black leading-5 text-[var(--page-fg)] sm:text-base sm:leading-6">{recommendation.title}</h3>
        <div className="mt-3 flex items-center justify-between gap-3 text-xs font-bold text-[var(--muted)] sm:text-sm">
          <span>{recommendation.votes ?? 0} votos</span>
          {recommendation.recommendationUrl ? <a href={recommendation.recommendationUrl} target="_blank" rel="noreferrer" className="ledger-link">MAL</a> : null}
        </div>
      </div>
    </article>
  )
}
