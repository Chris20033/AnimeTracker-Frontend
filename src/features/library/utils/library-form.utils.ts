import type { LibraryEntry } from '@/features/library/types/library.interface'

export interface LibraryEntryFormState {
  status: LibraryEntry['status']
  episodesWatched: string
  personalScore: string
  notes: string
}

export interface LibraryEntryFormErrors {
  episodesWatched?: string
  personalScore?: string
  notes?: string
  form?: string
}

export function getLibraryEntryFormState(entry: LibraryEntry): LibraryEntryFormState {
  return {
    status: entry.status,
    episodesWatched: String(entry.episodesWatched),
    personalScore: entry.personalScore === null ? '' : String(entry.personalScore),
    notes: entry.notes ?? '',
  }
}

export function validateLibraryEntryForm(entry: LibraryEntry, formState: LibraryEntryFormState): LibraryEntryFormErrors {
  const errors: LibraryEntryFormErrors = {}
  const episodesWatched = Number(formState.episodesWatched)
  const personalScore = formState.personalScore === '' ? null : Number(formState.personalScore)

  if (!Number.isInteger(episodesWatched) || episodesWatched < 0) {
    errors.episodesWatched = 'Usa un numero entero mayor o igual a 0.'
  }

  if (entry.anime.episodes !== null && episodesWatched > entry.anime.episodes) {
    errors.episodesWatched = `No puede superar ${entry.anime.episodes} episodios.`
  }

  if (personalScore !== null && (!Number.isInteger(personalScore) || personalScore < 1 || personalScore > 10)) {
    errors.personalScore = 'Elige un score del 1 al 10 o deja Sin score.'
  }

  if (formState.notes.length > 500) {
    errors.notes = 'Las notas no pueden superar 500 caracteres.'
  }

  return errors
}
