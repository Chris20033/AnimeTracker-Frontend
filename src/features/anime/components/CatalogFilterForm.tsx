import type { FormEvent } from 'react'
import type { AnimeGenre } from '@/features/anime/types/anime.interface'
import { TextInput } from '@/shared/components/ui/TextInput'
import { SelectInput } from '@/shared/components/ui/SelectInput'
import { animeTypes, animeStatuses, animeRatings, orderOptions, type CatalogFormState } from './catalog-filter.constants'

interface CatalogFilterFormProps {
  formState: CatalogFormState
  genres: AnimeGenre[]
  genresLoading: boolean
  onChange: (formState: CatalogFormState) => void
  onSubmit: (event: FormEvent<HTMLFormElement>) => void
  onClear: () => void
}

export function CatalogFilterForm({ formState, genres, genresLoading, onChange, onSubmit, onClear }: CatalogFilterFormProps) {
  function updateField(field: keyof CatalogFormState, value: string) {
    onChange({ ...formState, [field]: value })
  }

  return (
    <form onSubmit={onSubmit} className="relative mt-7 grid gap-4" role="search">
      <div className="grid gap-4 lg:grid-cols-[minmax(0,1.2fr)_repeat(3,minmax(0,0.75fr))]">
        <TextInput label="Buscar anime" value={formState.q} onChange={(value) => updateField('q', value)} placeholder="Ej. Frieren, Naruto, Cyberpunk..." />
        <SelectInput label="Tipo" value={formState.type} options={animeTypes} onChange={(value) => updateField('type', value)} />
        <SelectInput label="Estado" value={formState.status} options={animeStatuses} onChange={(value) => updateField('status', value)} />
        <SelectInput label="Rating" value={formState.rating} options={animeRatings} onChange={(value) => updateField('rating', value)} />
      </div>

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)_minmax(0,0.6fr)_minmax(0,0.6fr)]">
        <SelectInput
          label="Genero"
          value={formState.genre}
          disabled={genresLoading}
          options={[{ value: '', label: genresLoading ? 'Cargando generos...' : 'Todos' }, ...genres.slice(0, 40).map((genre) => ({ value: String(genre.id), label: `${genre.name} (${genre.count})` }))]}
          onChange={(value) => updateField('genre', value)}
        />
        <SelectInput label="Ordenar por" value={formState.orderBy} options={orderOptions} onChange={(value) => updateField('orderBy', value)} />
        <SelectInput label="Orden" value={formState.sort} options={[{ value: 'desc', label: 'Mejores primero' }, { value: 'asc', label: 'Menores primero' }]} onChange={(value) => updateField('sort', value as 'asc' | 'desc')} />
        <div className="grid grid-cols-2 gap-3">
          <TextInput label="Score min" type="number" min="0" max="10" step="0.1" value={formState.minScore} onChange={(value) => updateField('minScore', value)} />
          <TextInput label="Score max" type="number" min="0" max="10" step="0.1" value={formState.maxScore} onChange={(value) => updateField('maxScore', value)} />
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
        <button type="button" onClick={onClear} className="min-h-12 rounded-[var(--radius-md)] border border-[var(--line)] px-5 py-3 font-black text-[var(--page-fg)] outline-none transition hover:bg-[var(--surface-inset)] focus:ring-4 focus:ring-[var(--focus)]">
          Limpiar filtros
        </button>
        <button type="submit" className="min-h-12 rounded-[var(--radius-md)] bg-[var(--accent)] px-6 py-3 font-black text-[var(--action-ink)] outline-none transition hover:-translate-y-0.5 focus:ring-4 focus:ring-[var(--focus)]">
          Aplicar filtros
        </button>
      </div>
    </form>
  )
}
