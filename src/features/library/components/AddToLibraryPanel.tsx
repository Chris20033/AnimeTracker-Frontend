import { isAxiosError } from 'axios'
import { type FormEvent, useState } from 'react'
import { Link } from 'react-router-dom'
import type { AnimeDetail } from '@/features/anime/types/anime.interface'
import { libraryStatusOptions } from '@/features/library/constants/library.constants'
import { useAddLibraryEntry } from '@/features/library/hooks/useAddLibraryEntry'
import type { LibraryStatus } from '@/features/library/types/library.interface'
import { useAuthStore } from '@/store/auth.store'

interface AddToLibraryPanelProps {
  anime: AnimeDetail
}

export function AddToLibraryPanel({ anime }: AddToLibraryPanelProps) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  const addEntry = useAddLibraryEntry()
  const [status, setStatus] = useState<LibraryStatus>('PLAN_TO_WATCH')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setMessage('')
    setError('')

    try {
      await addEntry.mutateAsync({
        source: anime.source,
        externalId: anime.externalId,
        status,
      })
      setMessage('Anime added to your library.')
    } catch (mutationError) {
      setError(getAddLibraryErrorMessage(mutationError))
    }
  }

  if (!isAuthenticated) {
    return (
      <section className="ledger-panel p-5 sm:p-6">
        <p className="ledger-kicker">Library</p>
        <h2 className="mt-2 text-2xl ledger-title">Save your progress</h2>
        <p className="mt-3 text-sm font-semibold leading-7 text-[var(--muted)]">Sign in to add this anime to your library, track episodes, and save private notes.</p>
        <Link to="/login" className="mt-5 inline-flex min-h-11 items-center rounded-[var(--radius-md)] bg-[var(--accent)] px-5 py-2.5 font-black text-[var(--action-ink)] outline-none transition hover:-translate-y-0.5 focus:ring-4 focus:ring-[var(--focus)]">
          Sign in
        </Link>
      </section>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="ledger-panel grid gap-4 p-5 sm:p-6">
      <div>
        <p className="ledger-kicker">Library</p>
        <h2 className="mt-2 text-2xl ledger-title">Add to my list</h2>
        <p className="mt-3 text-sm font-semibold leading-7 text-[var(--muted)]">Create a private entry to update status, episodes, personal score, and notes.</p>
      </div>

      <label className="grid gap-2 text-sm font-black text-[var(--page-fg)]">
        Initial status
        <select value={status} onChange={(event) => setStatus(event.target.value as LibraryStatus)} className="min-h-12 rounded-[var(--radius-md)] border border-[var(--line)] bg-[var(--surface-inset)] px-4 py-3 font-semibold text-[var(--page-fg)] outline-none focus:ring-4 focus:ring-[var(--focus)]">
          {libraryStatusOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
        </select>
        <span className="text-xs font-semibold text-[var(--soft)]">If you choose Completed, all known episodes will be marked.</span>
      </label>

      {error ? <p role="alert" className="state-error px-4 py-3 text-sm font-semibold">{error}</p> : null}
      {message ? <p role="status" className="state-success px-4 py-3 text-sm font-semibold">{message}</p> : null}

      <button type="submit" disabled={addEntry.isPending} className="min-h-12 rounded-[var(--radius-md)] bg-[var(--accent)] px-5 py-3 font-black text-[var(--action-ink)] outline-none transition hover:-translate-y-0.5 focus:ring-4 focus:ring-[var(--focus)] disabled:cursor-not-allowed disabled:translate-y-0 disabled:opacity-60">
        {addEntry.isPending ? 'Adding...' : 'Add to library'}
      </button>
    </form>
  )
}

function getAddLibraryErrorMessage(error: unknown) {
  if (isAxiosError(error)) {
    const code = error.response?.data?.error?.code

    if (code === 'ANIME_ALREADY_IN_LIBRARY') {
      return 'This anime is already in your library.'
    }

    if (code === 'EXTERNAL_ANIME_API_ERROR') {
      return "We couldn't reach Kitsu to save this anime. Try again."
    }

    if (code === 'VALIDATION_ERROR') {
      return "We couldn't add it. Check the selected status and try again."
    }
  }

  return "We couldn't add this anime to your library."
}
