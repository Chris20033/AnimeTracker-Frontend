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
    errors.episodesWatched = 'Use an integer greater than or equal to 0.'
  }

  if (entry.anime.episodes !== null && episodesWatched > entry.anime.episodes) {
    errors.episodesWatched = `Cannot exceed ${entry.anime.episodes} episodes.`
  }

  if (personalScore !== null && (!Number.isInteger(personalScore) || personalScore < 1 || personalScore > 10)) {
    errors.personalScore = 'Choose a score from 1 to 10 or leave No score.'
  }

  if (formState.notes.length > 500) {
    errors.notes = 'Notes cannot exceed 500 characters.'
  }

  return errors
}
