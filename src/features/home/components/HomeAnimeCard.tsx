import { Link } from 'react-router-dom'
import { formatAnimeStatus, formatAnimeType } from '@/features/anime/utils/anime-display.utils'
import type { HomeAnimeItem } from '@/features/home/types/home.interface'
import { getScoreTone } from '@/shared/utils/get-score-tone'

interface HomeAnimeCardProps {
  anime: HomeAnimeItem
}

export function HomeAnimeCard({ anime }: HomeAnimeCardProps) {
  const scoreTone = getScoreTone(anime.score)
  const metaLabel = formatAnimeType(anime.type) ?? formatAnimeStatus(anime.status) ?? 'Anime'

  return (
    <Link to={`/anime/${anime.source}/${anime.externalId}`} className="group grid overflow-hidden rounded-[var(--radius-lg)] border border-[var(--line)] bg-[var(--surface)] shadow-[0_18px_48px_var(--shadow)] outline-none transition hover:-translate-y-1 focus:ring-4 focus:ring-[var(--focus)]">
      <div className="aspect-[3/4] bg-[var(--surface-inset)]">
        {anime.imageUrl ? <img src={anime.imageUrl} alt={anime.title} className="size-full object-cover transition duration-300 group-hover:scale-105" /> : <div className="grid size-full place-items-center text-sm font-black text-[var(--soft)]">Sin imagen</div>}
      </div>
      <div className="grid gap-2 p-4">
        <h3 className="line-clamp-2 min-h-12 text-base font-black leading-6 text-[var(--page-fg)]">{anime.title}</h3>
        <div className="flex items-center justify-between gap-3 text-xs font-bold text-[var(--muted)]">
          <span>{metaLabel}</span>
          <span className={`rounded-full px-2 py-1 font-black ring-1 ${scoreTone.className}`} title={scoreTone.label}>{anime.score ?? 'N/A'}</span>
        </div>
      </div>
    </Link>
  )
}
