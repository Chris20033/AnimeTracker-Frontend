import { type FormEvent, useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useAnimeCatalog } from '@/features/anime/hooks/useAnimeCatalog'
import { useAnimeGenres } from '@/features/anime/hooks/useAnimeGenres'
import type { CatalogFormState } from '@/features/anime/components/catalog-filter.constants'
import { buildSearchParams, getActiveFilterCount, getCatalogParams, getFormState } from '@/features/anime/components/catalog-filter.utils'
import { CatalogFilterForm } from '@/features/anime/components/CatalogFilterForm'
import { AnimeResultCard } from '@/features/anime/components/AnimeResultCard'
import { AnimeErrorState, AnimeResultSkeleton, EmptyAnimeState } from '@/features/anime/components/AnimeSearchStates'
import { CatalogPagination } from '@/features/anime/components/CatalogPagination'

export function AnimeSearchPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const pageParam = Number(searchParams.get('page') ?? '1')
  const page = Number.isFinite(pageParam) && pageParam > 0 ? pageParam : 1
  const catalogParams = getCatalogParams(searchParams, page)
  const catalogQuery = useAnimeCatalog(catalogParams)
  const genresQuery = useAnimeGenres()
  const [formState, setFormState] = useState<CatalogFormState>(() => getFormState(searchParams))
  const results = catalogQuery.data?.data ?? []
  const pagination = catalogQuery.data?.pagination
  const query = searchParams.get('q')?.trim() ?? ''
  const activeFilterCount = getActiveFilterCount(searchParams)

  useEffect(() => {
    setFormState(getFormState(searchParams))
  }, [searchParams])

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSearchParams(buildSearchParams(formState, 1))
  }

  function handleClearFilters() {
    setSearchParams({ page: '1' })
  }

  function goToPage(nextPage: number) {
    const nextParams = new URLSearchParams(searchParams)
    nextParams.set('page', String(nextPage))
    setSearchParams(nextParams)
  }

  return (
    <section className="grid gap-6 py-8 lg:py-10">
      <div className="ledger-panel relative overflow-hidden p-5 sm:p-8 lg:p-10">
        <div className="absolute inset-y-0 right-0 hidden w-1/3 bg-[radial-gradient(circle_at_70%_35%,var(--accent-soft),transparent_18rem)] lg:block" />
        <div className="relative max-w-3xl">
          <p className="ledger-kicker">Anime catalog</p>
          <h1 className="mt-3 text-4xl ledger-title sm:text-5xl lg:text-6xl">{query ? `Resultados para ${query}` : 'Explora el catalogo de anime'}</h1>
          <p className="ledger-copy mt-4 text-base sm:text-lg">
            Descubre anime con busqueda, filtros publicos y paginacion servida por el backend de AnimeTracker.
          </p>
        </div>

        <CatalogFilterForm
          formState={formState}
          genres={genresQuery.data ?? []}
          genresLoading={genresQuery.isLoading}
          onChange={setFormState}
          onSubmit={handleSubmit}
          onClear={handleClearFilters}
        />
      </div>

      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="ledger-kicker">Catalogo</p>
          <h2 className="mt-2 text-2xl ledger-title">{activeFilterCount > 0 ? `${activeFilterCount} filtros activos` : 'Todos los titulos'}</h2>
        </div>
        {pagination ? <p className="ledger-chip">Pagina {pagination.page} de {pagination.totalPages || 1}</p> : null}
      </div>

      {catalogQuery.isLoading ? <AnimeResultSkeleton /> : null}
      {catalogQuery.isError ? <AnimeErrorState /> : null}
      {!catalogQuery.isLoading && !catalogQuery.isError && results.length === 0 ? <EmptyAnimeState /> : null}

      {results.length > 0 ? (
        <>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {results.map((anime) => (
              <AnimeResultCard key={`${anime.source}-${anime.externalId}`} anime={anime} />
            ))}
          </div>

          {pagination ? (
            <CatalogPagination
              page={pagination.page}
              totalPages={pagination.totalPages}
              total={pagination.total}
              onPageChange={goToPage}
            />
          ) : null}
        </>
      ) : null}
    </section>
  )
}
