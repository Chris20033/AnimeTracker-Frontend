import { isAxiosError } from 'axios'
import { type FormEvent, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { formatAnimeType } from '@/features/anime/utils/anime-display.utils'
import { FavoriteToggleButton } from '@/features/favorites/components/FavoriteToggleButton'
import { libraryStatusLabels, libraryStatusOptions } from '@/features/library/constants/library.constants'
import { useDeleteLibraryEntry } from '@/features/library/hooks/useDeleteLibraryEntry'
import { useUpdateLibraryEntry } from '@/features/library/hooks/useUpdateLibraryEntry'
import type { LibraryEntry } from '@/features/library/types/library.interface'
import { getLibraryEntryFormState, validateLibraryEntryForm, type LibraryEntryFormErrors, type LibraryEntryFormState } from '@/features/library/utils/library-form.utils'
import { getLibraryStatusTone } from '@/features/library/utils/library-status-tone'
import { getScoreTone } from '@/shared/utils/get-score-tone'

interface LibraryEntryCardProps {
  entry: LibraryEntry
}

export function LibraryEntryCard({ entry }: LibraryEntryCardProps) {
  const updateEntry = useUpdateLibraryEntry()
  const deleteEntry = useDeleteLibraryEntry()
  const animeScoreTone = getScoreTone(entry.anime.score)
  const statusTone = getLibraryStatusTone(entry.status)
  const typeLabel = formatAnimeType(entry.anime.type)
  const alternativeTitles = entry.anime.alternativeTitles ?? []
  const secondaryTitle = entry.anime.titleEnglish && entry.anime.titleEnglish !== entry.anime.title ? entry.anime.titleEnglish : alternativeTitles.find((title) => title !== entry.anime.title) ?? null
  const [formState, setFormState] = useState<LibraryEntryFormState>(() => getLibraryEntryFormState(entry))
  const [errors, setErrors] = useState<LibraryEntryFormErrors>({})
  const [successMessage, setSuccessMessage] = useState('')

  useEffect(() => {
    setFormState(getLibraryEntryFormState(entry))
    setErrors({})
    setSuccessMessage('')
  }, [entry])

  function updateField(field: keyof LibraryEntryFormState, value: string) {
    setFormState((currentState) => {
      if (field === 'status' && value === 'COMPLETED' && entry.anime.episodes !== null) {
        return { ...currentState, status: value, episodesWatched: String(entry.anime.episodes) }
      }

      return { ...currentState, [field]: value }
    })
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const nextErrors = validateLibraryEntryForm(entry, formState)

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors)
      setSuccessMessage('')
      return
    }

    setErrors({})
    setSuccessMessage('')

    try {
      await updateEntry.mutateAsync({
        id: entry.id,
        payload: {
          status: formState.status,
          episodesWatched: Number(formState.episodesWatched),
          personalScore: formState.personalScore === '' ? null : Number(formState.personalScore),
          notes: formState.notes.trim() || null,
        },
      })
      setSuccessMessage('Entry updated.')
    } catch (error) {
      setErrors({ form: getLibraryErrorMessage(error, "We couldn't update this entry.") })
    }
  }

  async function handleDelete() {
    const confirmed = window.confirm(`Remove ${entry.anime.title} from your library?`)

    if (!confirmed) {
      return
    }

    setErrors({})
    setSuccessMessage('')

    try {
      await deleteEntry.mutateAsync(entry.id)
    } catch (error) {
      setErrors({ form: getLibraryErrorMessage(error, "We couldn't remove this entry.") })
    }
  }

  return (
    <article className={`ledger-panel overflow-hidden border-l-4 p-3 sm:p-4 ${statusTone.accentClassName}`}>
      <div className="grid grid-cols-[5.25rem_minmax(0,1fr)] gap-3 sm:grid-cols-[5.5rem_minmax(0,1fr)_auto] sm:items-start">
        <Link to={`/anime/${entry.anime.source}/${entry.anime.externalId}`} className="group block w-full overflow-hidden rounded-[var(--radius-md)] bg-[var(--surface-inset)] outline-none focus:ring-4 focus:ring-[var(--focus)]">
          <div className="aspect-[3/4]">
            {entry.anime.imageUrl ? <img src={entry.anime.imageUrl} alt={entry.anime.title} className="size-full object-cover transition duration-300 group-hover:scale-105" /> : <div className="grid size-full place-items-center text-xs font-black text-[var(--soft)]">No image</div>}
          </div>
        </Link>

        <div className="min-w-0 self-start">
          <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-black ring-1 ${statusTone.badgeClassName}`}>{libraryStatusLabels[entry.status]}</span>
          <Link to={`/anime/${entry.anime.source}/${entry.anime.externalId}`} className="mt-1 block text-lg ledger-title outline-none transition hover:text-[var(--accent-strong)] focus:ring-4 focus:ring-[var(--focus)] sm:truncate sm:text-2xl">
            {entry.anime.title}
          </Link>
          {secondaryTitle ? <p className="mt-1 truncate text-sm font-semibold text-[var(--soft)]">{secondaryTitle}</p> : null}
          <div className="mt-2 flex flex-wrap gap-2 text-xs font-black">
            {typeLabel ? <span className="ledger-chip min-h-0 px-2 py-1 text-xs">{typeLabel}</span> : null}
            {entry.anime.year ? <span className="ledger-chip min-h-0 px-2 py-1 text-xs">{entry.anime.year}</span> : null}
            <span className={`rounded-full px-2 py-1 ring-1 ${animeScoreTone.className}`} title={animeScoreTone.label}>{entry.anime.score ?? 'No score'}</span>
          </div>

        </div>

        <dl className="col-span-2 grid gap-2 text-sm font-bold text-[var(--muted)] sm:col-span-1 sm:col-start-2 sm:row-start-2 sm:grid-cols-3">
          <div className="ledger-inset px-3 py-2">
            <dt className="text-xs font-black tracking-[0.1em] text-[var(--soft)]">Progress</dt>
            <dd className="mt-1 text-[var(--page-fg)]">{entry.episodesWatched} / {entry.anime.episodes ?? '??'}</dd>
          </div>
          <div className="ledger-inset px-3 py-2">
            <dt className="text-xs font-black tracking-[0.1em] text-[var(--soft)]">My score</dt>
            <dd className="mt-1 text-[var(--page-fg)]">{entry.personalScore ?? 'No score'}</dd>
          </div>
          <div className="ledger-inset px-3 py-2">
            <dt className="text-xs font-black tracking-[0.1em] text-[var(--soft)]">Notes</dt>
            <dd className="mt-1 truncate text-[var(--page-fg)]">{entry.notes || 'No notes'}</dd>
          </div>
        </dl>

        <div className="col-span-2 flex flex-wrap items-start gap-2 sm:col-span-1 sm:col-start-3 sm:row-start-1 sm:grid sm:justify-items-end">
          <FavoriteToggleButton source={entry.anime.source} externalId={entry.anime.externalId} title={entry.anime.title} />
          <button type="button" onClick={handleDelete} disabled={deleteEntry.isPending} className="min-h-10 rounded-full border border-[var(--line)] px-4 py-2 text-sm font-black text-[var(--danger)] outline-none transition hover:bg-[var(--surface-inset)] focus:ring-4 focus:ring-[var(--focus)] disabled:cursor-not-allowed disabled:opacity-60">
            {deleteEntry.isPending ? 'Removing...' : 'Remove'}
          </button>
        </div>
      </div>

      <details className="mt-3 rounded-[var(--radius-md)] border border-[var(--line)] bg-[var(--surface-inset)]">
        <summary className="cursor-pointer px-4 py-3 text-sm font-black text-[var(--page-fg)] outline-none transition hover:text-[var(--accent-strong)] focus:ring-4 focus:ring-[var(--focus)]">
          Edit progress
        </summary>

        <form onSubmit={handleSubmit} className="grid gap-4 border-t border-[var(--line)] p-4">

          <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_minmax(10rem,0.8fr)_minmax(10rem,0.8fr)]">
            <label className="grid gap-2 text-sm font-black text-[var(--page-fg)]">
              Status
              <select value={formState.status} onChange={(event) => updateField('status', event.target.value)} className="min-h-11 rounded-[var(--radius-md)] border border-[var(--line)] bg-[var(--surface-inset)] px-3 py-2 font-semibold text-[var(--page-fg)] outline-none focus:ring-4 focus:ring-[var(--focus)]">
                {libraryStatusOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
              </select>
            </label>

            <label className="grid gap-2 text-sm font-black text-[var(--page-fg)]">
              Episodes
              <div className="flex min-h-11 items-center overflow-hidden rounded-[var(--radius-md)] border border-[var(--line)] bg-[var(--surface-inset)] focus-within:ring-4 focus-within:ring-[var(--focus)]">
                <input type="number" min="0" max={entry.anime.episodes ?? undefined} step="1" value={formState.episodesWatched} onChange={(event) => updateField('episodesWatched', event.target.value)} className="min-w-0 flex-1 bg-transparent px-3 py-2 font-semibold text-[var(--page-fg)] outline-none" />
                <span className="shrink-0 border-l border-[var(--line)] px-3 text-sm font-black text-[var(--soft)]">/ {entry.anime.episodes ?? '??'}</span>
              </div>
              {errors.episodesWatched ? <span className="text-xs font-semibold text-[var(--danger)]">{errors.episodesWatched}</span> : null}
            </label>

            <label className="grid gap-2 text-sm font-black text-[var(--page-fg)]">
              My score
              <select value={formState.personalScore} onChange={(event) => updateField('personalScore', event.target.value)} className="min-h-11 rounded-[var(--radius-md)] border border-[var(--line)] bg-[var(--surface-inset)] px-3 py-2 font-semibold text-[var(--page-fg)] outline-none focus:ring-4 focus:ring-[var(--focus)]">
                <option value="">No score</option>
                {Array.from({ length: 10 }, (_, index) => String(index + 1)).map((score) => <option key={score} value={score}>{score}</option>)}
              </select>
              {errors.personalScore && <span className="text-xs font-semibold text-[var(--danger)]">{errors.personalScore}</span>}
            </label>
          </div>

          <label className="grid gap-2 text-sm font-black text-[var(--page-fg)]">
            Notes
            <textarea rows={3} maxLength={500} value={formState.notes} onChange={(event) => updateField('notes', event.target.value)} placeholder="Reactions, pending arcs, or why you paused it..." className="resize-none rounded-[var(--radius-md)] border border-[var(--line)] bg-[var(--surface-inset)] px-3 py-2 font-semibold text-[var(--page-fg)] outline-none focus:ring-4 focus:ring-[var(--focus)]" />
            <span className="text-xs font-semibold text-[var(--soft)]">{formState.notes.length}/500</span>
            {errors.notes ? <span className="text-xs font-semibold text-[var(--danger)]">{errors.notes}</span> : null}
          </label>

          {errors.form ? <p role="alert" className="state-error px-4 py-3 text-sm font-semibold">{errors.form}</p> : null}
          {successMessage ? <p role="status" className="state-success px-4 py-3 text-sm font-semibold">{successMessage}</p> : null}

          <div className="flex justify-end">
            <button type="submit" disabled={updateEntry.isPending} className="min-h-11 rounded-[var(--radius-md)] bg-[var(--accent)] px-5 py-2.5 font-black text-[var(--action-ink)] outline-none transition hover:-translate-y-0.5 focus:ring-4 focus:ring-[var(--focus)] disabled:cursor-not-allowed disabled:translate-y-0 disabled:opacity-60">
              {updateEntry.isPending ? 'Saving...' : 'Save changes'}
            </button>
          </div>
        </form>
      </details>
    </article>
  )
}

function getLibraryErrorMessage(error: unknown, fallback: string) {
  if (isAxiosError(error)) {
    const code = error.response?.data?.error?.code
    const message = error.response?.data?.error?.message

    if (code === 'VALIDATION_ERROR') {
      return 'Review episodes, score, and notes. Score must be 1 to 10 or No score.'
    }

    if (code === 'RESOURCE_NOT_FOUND') {
      return "We couldn't find this entry in your library. Refresh the page."
    }

    return typeof message === 'string' ? message : fallback
  }

  return fallback
}
