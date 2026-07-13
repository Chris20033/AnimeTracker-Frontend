import { type FormEvent, useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { CatalogPagination } from '@/features/anime/components/CatalogPagination'
import { LIBRARY_PAGE_LIMIT, libraryStatusLabels } from '@/features/library/constants/library.constants'
import { LibraryEntryCard } from '@/features/library/components/LibraryEntryCard'
import { EmptyLibraryState, LibraryErrorState, LibrarySkeleton } from '@/features/library/components/LibraryStates'
import { LibraryStatusTabs } from '@/features/library/components/LibraryStatusTabs'
import { useLibrary } from '@/features/library/hooks/useLibrary'
import type { LibraryStatus } from '@/features/library/types/library.interface'
import { useScrollIntoViewOnChange } from '@/shared/hooks/useScrollIntoViewOnChange'

export function LibraryPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const pageParam = Number(searchParams.get('page') ?? '1')
  const page = Number.isFinite(pageParam) && pageParam > 0 ? pageParam : 1
  const status = getStatusParam(searchParams.get('status'))
  const query = searchParams.get('q')?.trim() ?? ''
  const [searchValue, setSearchValue] = useState(query)
  const libraryQuery = useLibrary({ status, q: query || undefined, page, limit: LIBRARY_PAGE_LIMIT })
  const entries = libraryQuery.data?.data ?? []
  const pagination = libraryQuery.data?.pagination
  const pageTopRef = useScrollIntoViewOnChange<HTMLElement>(page)

  useEffect(() => {
    setSearchValue(query)
  }, [query])

  function handleStatusChange(nextStatus?: LibraryStatus) {
    const nextParams = new URLSearchParams()
    nextParams.set('page', '1')

    if (nextStatus) {
      nextParams.set('status', nextStatus)
    }

    if (query) {
      nextParams.set('q', query)
    }

    setSearchParams(nextParams)
  }

  function handleSearchSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const nextParams = new URLSearchParams()
    const nextQuery = searchValue.trim()

    nextParams.set('page', '1')

    if (status) {
      nextParams.set('status', status)
    }

    if (nextQuery) {
      nextParams.set('q', nextQuery)
    }

    setSearchParams(nextParams)
  }

  function handleClearSearch() {
    const nextParams = new URLSearchParams()
    nextParams.set('page', '1')

    if (status) {
      nextParams.set('status', status)
    }

    setSearchParams(nextParams)
  }

  function handlePageChange(nextPage: number) {
    const nextParams = new URLSearchParams(searchParams)
    nextParams.set('page', String(nextPage))
    setSearchParams(nextParams)
  }

  return (
    <section ref={pageTopRef} className="grid scroll-mt-4 gap-6 py-8 lg:scroll-mt-6 lg:py-10">
      <div className="ledger-panel relative overflow-hidden p-5 sm:p-8 lg:p-10">
        <div className="absolute inset-y-0 right-0 hidden w-1/3 bg-[radial-gradient(circle_at_70%_35%,var(--accent-soft),transparent_18rem)] lg:block" />
        <div className="relative max-w-3xl">
          <p className="ledger-kicker">Mi biblioteca</p>
          <h1 className="mt-3 text-4xl ledger-title sm:text-5xl lg:text-6xl">Tu bitacora de anime</h1>
          <p className="ledger-copy mt-4 text-base sm:text-lg">Organiza lo que ves, actualiza episodios y deja notas privadas sin perder el ritmo de temporada.</p>
        </div>
      </div>

      <LibraryStatusTabs activeStatus={status} onStatusChange={handleStatusChange} />

      <form onSubmit={handleSearchSubmit} className="ledger-surface grid gap-3 p-3 sm:grid-cols-[minmax(0,1fr)_auto_auto] sm:p-4" role="search">
        <label className="grid gap-2 text-sm font-black text-[var(--page-fg)]">
          Buscar en mi biblioteca
          <input value={searchValue} onChange={(event) => setSearchValue(event.target.value)} placeholder="Attack on Titan, Shingeki no Kyojin, 進撃の巨人..." className="min-h-12 rounded-[var(--radius-md)] border border-[var(--line)] bg-[var(--surface-inset)] px-4 py-3 font-semibold text-[var(--page-fg)] outline-none placeholder:text-[var(--soft)] focus:ring-4 focus:ring-[var(--focus)]" />
        </label>
        <button type="submit" className="min-h-12 self-end rounded-[var(--radius-md)] bg-[var(--accent)] px-5 py-3 font-black text-[var(--action-ink)] outline-none transition hover:-translate-y-0.5 focus:ring-4 focus:ring-[var(--focus)]">
          Buscar
        </button>
        {query ? (
          <button type="button" onClick={handleClearSearch} className="min-h-12 self-end rounded-[var(--radius-md)] border border-[var(--line)] px-5 py-3 font-black text-[var(--page-fg)] outline-none transition hover:bg-[var(--surface-inset)] focus:ring-4 focus:ring-[var(--focus)]">
            Limpiar
          </button>
        ) : null}
      </form>

      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="ledger-kicker">Entradas</p>
          <h2 className="mt-2 text-2xl ledger-title">{query ? `Busqueda: ${query}` : status ? libraryStatusLabels[status] : 'Toda la biblioteca'}</h2>
        </div>
        {pagination ? <p className="ledger-chip">Pagina {pagination.page} de {pagination.totalPages || 1}</p> : null}
      </div>

      {libraryQuery.isLoading ? <LibrarySkeleton /> : null}
      {libraryQuery.isError ? <LibraryErrorState onRetry={() => void libraryQuery.refetch()} /> : null}
      {!libraryQuery.isLoading && !libraryQuery.isError && entries.length === 0 ? <EmptyLibraryState query={query || undefined} /> : null}

      {entries.length > 0 ? (
        <>
          <div className="grid gap-4 xl:grid-cols-2">
            {entries.map((entry) => <LibraryEntryCard key={entry.id} entry={entry} />)}
          </div>

          {pagination ? <CatalogPagination page={pagination.page} totalPages={pagination.totalPages} total={pagination.total} onPageChange={handlePageChange} /> : null}
        </>
      ) : null}
    </section>
  )
}

function getStatusParam(value: string | null): LibraryStatus | undefined {
  if (value === 'WATCHING' || value === 'COMPLETED' || value === 'ON_HOLD' || value === 'DROPPED' || value === 'PLAN_TO_WATCH') {
    return value
  }

  return undefined
}
