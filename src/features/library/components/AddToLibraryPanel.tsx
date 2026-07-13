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
      setMessage('Anime agregado a tu biblioteca.')
    } catch (mutationError) {
      setError(getAddLibraryErrorMessage(mutationError))
    }
  }

  if (!isAuthenticated) {
    return (
      <section className="ledger-panel p-5 sm:p-6">
        <p className="ledger-kicker">Biblioteca</p>
        <h2 className="mt-2 text-2xl ledger-title">Guarda tu progreso</h2>
        <p className="mt-3 text-sm font-semibold leading-7 text-[var(--muted)]">Inicia sesion para agregar este anime a tu biblioteca, seguir episodios y guardar notas privadas.</p>
        <Link to="/login" className="mt-5 inline-flex min-h-11 items-center rounded-[var(--radius-md)] bg-[var(--accent)] px-5 py-2.5 font-black text-[var(--action-ink)] outline-none transition hover:-translate-y-0.5 focus:ring-4 focus:ring-[var(--focus)]">
          Iniciar sesion
        </Link>
      </section>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="ledger-panel grid gap-4 p-5 sm:p-6">
      <div>
        <p className="ledger-kicker">Biblioteca</p>
        <h2 className="mt-2 text-2xl ledger-title">Agregar a mi lista</h2>
        <p className="mt-3 text-sm font-semibold leading-7 text-[var(--muted)]">Crea una entrada privada para actualizar estado, episodios, score personal y notas.</p>
      </div>

      <label className="grid gap-2 text-sm font-black text-[var(--page-fg)]">
        Estado inicial
        <select value={status} onChange={(event) => setStatus(event.target.value as LibraryStatus)} className="min-h-12 rounded-[var(--radius-md)] border border-[var(--line)] bg-[var(--surface-inset)] px-4 py-3 font-semibold text-[var(--page-fg)] outline-none focus:ring-4 focus:ring-[var(--focus)]">
          {libraryStatusOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
        </select>
        <span className="text-xs font-semibold text-[var(--soft)]">Si eliges Completado, se marcaran todos los episodios conocidos.</span>
      </label>

      {error ? <p role="alert" className="state-error px-4 py-3 text-sm font-semibold">{error}</p> : null}
      {message ? <p role="status" className="state-success px-4 py-3 text-sm font-semibold">{message}</p> : null}

      <button type="submit" disabled={addEntry.isPending} className="min-h-12 rounded-[var(--radius-md)] bg-[var(--accent)] px-5 py-3 font-black text-[var(--action-ink)] outline-none transition hover:-translate-y-0.5 focus:ring-4 focus:ring-[var(--focus)] disabled:cursor-not-allowed disabled:translate-y-0 disabled:opacity-60">
        {addEntry.isPending ? 'Agregando...' : 'Agregar a biblioteca'}
      </button>
    </form>
  )
}

function getAddLibraryErrorMessage(error: unknown) {
  if (isAxiosError(error)) {
    const code = error.response?.data?.error?.code

    if (code === 'ANIME_ALREADY_IN_LIBRARY') {
      return 'Este anime ya esta en tu biblioteca.'
    }

    if (code === 'EXTERNAL_ANIME_API_ERROR') {
      return 'No se pudo consultar Kitsu para guardar este anime. Intenta de nuevo.'
    }

    if (code === 'VALIDATION_ERROR') {
      return 'No se pudo agregar. Revisa el estado seleccionado e intenta de nuevo.'
    }
  }

  return 'No se pudo agregar este anime a tu biblioteca.'
}
