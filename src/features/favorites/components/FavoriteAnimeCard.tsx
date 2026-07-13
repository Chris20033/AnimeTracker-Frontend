import { Link } from 'react-router-dom'
import starFilledUrl from '@/assets/star-filled.svg'
import type { FavoriteEntry } from '@/features/favorites/types/favorite.interface'

interface FavoriteAnimeCardProps {
  favorite: FavoriteEntry
}

export function FavoriteAnimeCard({ favorite }: FavoriteAnimeCardProps) {
  const anime = favorite.anime
  const secondaryTitle = anime.titleEnglish && anime.titleEnglish !== anime.title ? anime.titleEnglish : (anime.alternativeTitles ?? []).find((title) => title !== anime.title) ?? null

  return (
    <Link to={`/anime/${anime.source}/${anime.externalId}`} className="group ledger-inset grid grid-cols-[3.5rem_minmax(0,1fr)_auto] items-center gap-3 p-2.5 outline-none transition hover:-translate-y-0.5 hover:bg-[var(--surface)] focus:ring-4 focus:ring-[var(--focus)]">
      <div className="overflow-hidden rounded-[0.8rem] bg-[var(--surface-inset)]">
        <div className="aspect-[3/4]">
          {anime.imageUrl ? <img src={anime.imageUrl} alt={anime.title} className="size-full object-cover transition duration-300 group-hover:scale-105" /> : <div className="grid size-full place-items-center text-xs font-black text-[var(--soft)]">Sin imagen</div>}
        </div>
      </div>
      <div className="min-w-0">
        <p className="line-clamp-1 text-sm font-black leading-5 text-[var(--page-fg)] sm:text-base">{anime.title}</p>
        {secondaryTitle ? <p className="mt-1 line-clamp-1 text-xs font-semibold text-[var(--soft)]">{secondaryTitle}</p> : null}
      </div>
      <span className="grid size-8 place-items-center rounded-full border border-amber-300/60 bg-amber-400/15" title="Favorito" aria-label="Favorito">
        <img src={starFilledUrl} alt="" className="size-4" />
      </span>
    </Link>
  )
}
