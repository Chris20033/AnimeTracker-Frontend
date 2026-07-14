import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { FavoriteAnimeCard } from '@/features/favorites/components/FavoriteAnimeCard'
import type { FavoriteEntry } from '@/features/favorites/types/favorite.interface'

interface FavoriteListPanelProps {
  title: string
  eyebrow: string
  favorites: FavoriteEntry[]
  isLoading?: boolean
  isError?: boolean
  emptyTitle: string
  emptyDescription: string
  action?: ReactNode
  panelClassName?: string
  listClassName?: string
}

export function FavoriteListPanel({ title, eyebrow, favorites, isLoading = false, isError = false, emptyTitle, emptyDescription, action, panelClassName, listClassName }: FavoriteListPanelProps) {
  const favoritePanelClassName = panelClassName ?? 'ledger-panel overflow-hidden p-5 sm:p-7'
  const favoritesListClassName = listClassName ?? 'mt-5 max-h-none space-y-2 overflow-visible lg:max-h-[28rem] lg:overflow-y-auto lg:pr-1'

  return (
    <section className={favoritePanelClassName}>
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-[var(--line)] pb-5">
        <div>
          <p className="ledger-kicker">{eyebrow}</p>
          <h2 className="mt-2 text-2xl ledger-title">{title}</h2>
        </div>
        <span className="ledger-chip">{favorites.length} favoritos</span>
      </div>

      {isLoading ? <FavoriteListSkeleton /> : null}
      {isError ? <p role="alert" className="state-error mt-5 px-4 py-3 text-sm font-semibold">No se pudieron cargar los favoritos.</p> : null}

      {!isLoading && !isError && favorites.length === 0 ? (
        <div className="mt-5 rounded-[var(--radius-lg)] border border-dashed border-[var(--line-strong)] bg-[var(--surface-inset)] p-6 text-center">
          <p className="text-lg font-black text-[var(--page-fg)]">{emptyTitle}</p>
          <p className="mt-2 text-sm font-semibold leading-6 text-[var(--muted)]">{emptyDescription}</p>
          {action === undefined ? <Link to="/anime" className="ledger-link mt-4 inline-flex min-h-11 items-center px-4">Explorar catalogo</Link> : action}
        </div>
      ) : null}

      {favorites.length > 0 ? (
        <div className={favoritesListClassName} aria-label="Lista de favoritos">
          {favorites.map((favorite) => <FavoriteAnimeCard key={favorite.id} favorite={favorite} />)}
        </div>
      ) : null}
    </section>
  )
}

function FavoriteListSkeleton() {
  return (
    <div className="mt-5 grid gap-2" aria-busy="true">
      {Array.from({ length: 4 }, (_, index) => <div key={index} className="skeleton-shimmer h-20 rounded-[var(--radius-md)]" />)}
    </div>
  )
}
