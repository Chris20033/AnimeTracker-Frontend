import { isAxiosError } from 'axios'
import { Link } from 'react-router-dom'
import starFilledUrl from '@/assets/star-filled.svg'
import starOutlineUrl from '@/assets/star-outline.svg'
import { useAddFavorite } from '@/features/favorites/hooks/useAddFavorite'
import { useDeleteFavorite } from '@/features/favorites/hooks/useDeleteFavorite'
import { useFavorites } from '@/features/favorites/hooks/useFavorites'
import type { FavoritePayload } from '@/features/favorites/types/favorite.interface'
import { useAuthStore } from '@/store/auth.store'

interface FavoriteToggleButtonProps extends FavoritePayload {
  title: string
  size?: 'compact' | 'panel'
}

export function FavoriteToggleButton({ source, externalId, title, size = 'compact' }: FavoriteToggleButtonProps) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  const favoritesQuery = useFavorites(isAuthenticated)
  const addFavorite = useAddFavorite()
  const deleteFavorite = useDeleteFavorite()
  const favorite = favoritesQuery.data?.find((entry) => entry.anime.source === source && entry.anime.externalId === externalId)
  const isFavorite = Boolean(favorite)
  const isPending = addFavorite.isPending || deleteFavorite.isPending || favoritesQuery.isLoading
  const error = addFavorite.error ?? deleteFavorite.error

  async function handleToggle() {
    if (isPending) {
      return
    }

    if (favorite) {
      await deleteFavorite.mutateAsync(favorite.id)
      return
    }

    await addFavorite.mutateAsync({ source, externalId })
  }

  if (!isAuthenticated) {
    return (
      <Link to="/login" className={getLinkClassName(size)}>
        <FavoriteIcon filled={false} />
        <span>Sign in to save favorite</span>
      </Link>
    )
  }

  return (
    <div className={size === 'panel' ? 'grid gap-2' : 'grid justify-items-end gap-1'}>
      <button type="button" onClick={() => void handleToggle()} disabled={isPending} aria-pressed={isFavorite} aria-label={isFavorite ? `Remove ${title} from favorites` : `Mark ${title} as favorite`} className={getButtonClassName(size, isFavorite)}>
        <FavoriteIcon filled={isFavorite} />
        <span>{getButtonLabel(isPending, isFavorite)}</span>
      </button>
      {error ? <p role="alert" className="text-xs font-semibold text-[var(--danger)]">{getFavoriteErrorMessage(error)}</p> : null}
    </div>
  )
}

function FavoriteIcon({ filled }: { filled: boolean }) {
  return <img src={filled ? starFilledUrl : starOutlineUrl} alt="" className="size-5" />
}

function getButtonLabel(isPending: boolean, isFavorite: boolean) {
  if (isPending) {
    return 'Updating...'
  }

  return isFavorite ? 'Favorite' : 'Mark favorite'
}

function getButtonClassName(size: 'compact' | 'panel', isFavorite: boolean) {
  const toneClassName = isFavorite ? 'border-amber-300/70 bg-amber-400/15 text-amber-700 dark:text-amber-200' : 'border-[var(--line)] bg-[var(--surface)] text-[var(--page-fg)] hover:bg-[var(--surface-inset)]'
  const baseClassName = `inline-flex items-center justify-center gap-2 rounded-full border font-black outline-none transition focus:ring-4 focus:ring-[var(--focus)] disabled:cursor-not-allowed disabled:opacity-60 ${toneClassName}`

  return size === 'panel' ? `${baseClassName} min-h-12 px-5 py-3` : `${baseClassName} min-h-10 px-3 py-2 text-sm`
}

function getLinkClassName(size: 'compact' | 'panel') {
  const baseClassName = 'inline-flex items-center justify-center gap-2 rounded-full border border-[var(--line)] bg-[var(--surface)] font-black text-[var(--page-fg)] outline-none transition hover:bg-[var(--surface-inset)] focus:ring-4 focus:ring-[var(--focus)]'

  return size === 'panel' ? `${baseClassName} min-h-12 px-5 py-3` : `${baseClassName} min-h-10 px-3 py-2 text-sm`
}

function getFavoriteErrorMessage(error: unknown) {
  if (isAxiosError(error)) {
    const code = error.response?.data?.error?.code

    if (code === 'FAVORITE_ALREADY_EXISTS') {
      return 'This anime is already in favorites.'
    }

    if (code === 'RESOURCE_NOT_FOUND') {
      return "We couldn't find this favorite. Refresh the page."
    }

    if (code === 'EXTERNAL_ANIME_API_ERROR') {
      return "We couldn't reach Kitsu to save the favorite."
    }
  }

  return "We couldn't update favorites."
}
