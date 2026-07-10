import { Link } from 'react-router-dom'
import type { AnimeSearchItem } from '@/features/anime/types/anime.interface'
import { getScoreTone } from '@/shared/utils/get-score-tone'

interface AnimeResultCardProps {
  anime: AnimeSearchItem
}

export function AnimeResultCard({ anime }: AnimeResultCardProps) {
  const scoreTone = getScoreTone(anime.score)

  return (
    <Link to={`/anime/${anime.source}/${anime.externalId}`} className="group ledger-panel overflow-hidden outline-none transition hover:-translate-y-1 hover:shadow-[0_28px_70px_var(--shadow-strong)] focus:ring-4 focus:ring-[var(--focus)]">
      <div className="aspect-[3/4] bg-[var(--surface-inset)]">
        {anime.imageUrl ? <img src={anime.imageUrl} alt={anime.title} className="size-full object-cover transition duration-300 group-hover:scale-105" /> : <div className="grid size-full place-items-center text-sm font-black text-[var(--soft)]">Sin imagen</div>}
      </div>
      <div className="p-4">
        <div className="flex flex-wrap gap-2">
          {anime.type ? <span className="ledger-chip min-h-0 px-2 py-1 text-xs">{anime.type}</span> : null}
          {anime.year ? <span className="ledger-chip min-h-0 px-2 py-1 text-xs">{anime.year}</span> : null}
        </div>
        <h3 className="mt-3 line-clamp-2 min-h-14 text-lg font-black leading-7 text-[var(--page-fg)]">{anime.title}</h3>
        <div className="mt-4 flex items-center justify-between gap-3 text-sm font-bold text-[var(--muted)]">
          <span>{anime.status ?? 'Estado pendiente'}</span>
          <span className={`rounded-full px-2.5 py-1 font-black ring-1 ${scoreTone.className}`} title={scoreTone.label}>{anime.score ?? 'N/A'}</span>
        </div>
      </div>
    </Link>
  )
}
