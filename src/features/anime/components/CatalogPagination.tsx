interface CatalogPaginationProps {
  page: number
  totalPages: number
  total: number
  onPageChange: (page: number) => void
}

export function CatalogPagination({ page, totalPages, total, onPageChange }: CatalogPaginationProps) {
  const safeTotalPages = Math.max(totalPages, 1)
  const pages = getVisiblePages(page, safeTotalPages)

  return (
    <nav className="ledger-surface flex flex-wrap items-center justify-between gap-3 p-3 sm:p-4" aria-label="Catalog pagination">
      <p className="w-full text-sm font-bold text-[var(--muted)] sm:w-auto">{total} results found</p>

      <div className="flex flex-wrap items-center justify-center gap-2 sm:justify-end">
        <button type="button" disabled={page <= 1} onClick={() => onPageChange(page - 1)} className="min-h-11 rounded-[var(--radius-md)] border border-[var(--line)] px-4 py-2 font-black text-[var(--page-fg)] outline-none transition hover:bg-[var(--surface-inset)] focus:ring-4 focus:ring-[var(--focus)] disabled:cursor-not-allowed disabled:opacity-50">
        Previous
        </button>

        <div className="flex flex-wrap items-center gap-1" aria-label={`Page ${page} of ${safeTotalPages}`}>
          {pages.map((pageItem, index) =>
            pageItem === 'ellipsis' ? (
              <span key={`ellipsis-${index}`} className="grid min-h-11 min-w-10 place-items-center px-1 text-sm font-black text-[var(--soft)]" aria-hidden="true">
                ...
              </span>
            ) : (
              <button
                key={pageItem}
                type="button"
                aria-current={pageItem === page ? 'page' : undefined}
                onClick={() => onPageChange(pageItem)}
                className={`grid min-h-11 min-w-11 place-items-center rounded-[var(--radius-md)] px-3 py-2 text-sm font-black outline-none transition focus:ring-4 focus:ring-[var(--focus)] ${
                  pageItem === page
                    ? 'bg-[var(--accent)] text-[var(--action-ink)] shadow-[0_12px_28px_var(--shadow)]'
                    : 'border border-[var(--line)] bg-[var(--surface)] text-[var(--page-fg)] hover:bg-[var(--surface-inset)]'
                }`}
              >
                {pageItem}
              </button>
            ),
          )}
        </div>

        <button type="button" disabled={totalPages === 0 || page >= totalPages} onClick={() => onPageChange(page + 1)} className="min-h-11 rounded-[var(--radius-md)] bg-[var(--accent)] px-4 py-2 font-black text-[var(--action-ink)] outline-none transition hover:-translate-y-0.5 focus:ring-4 focus:ring-[var(--focus)] disabled:cursor-not-allowed disabled:translate-y-0 disabled:bg-[var(--surface-inset)] disabled:text-[var(--soft)]">
        Next
        </button>
      </div>
    </nav>
  )
}

type PaginationItem = number | 'ellipsis'

function getVisiblePages(currentPage: number, totalPages: number): PaginationItem[] {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, index) => index + 1)
  }

  const pages = new Set([1, totalPages, currentPage - 1, currentPage, currentPage + 1])

  if (currentPage <= 4) {
    pages.add(2)
    pages.add(3)
    pages.add(4)
    pages.add(5)
  }

  if (currentPage >= totalPages - 3) {
    pages.add(totalPages - 4)
    pages.add(totalPages - 3)
    pages.add(totalPages - 2)
    pages.add(totalPages - 1)
  }

  const sortedPages = Array.from(pages)
    .filter((page) => page >= 1 && page <= totalPages)
    .sort((firstPage, secondPage) => firstPage - secondPage)

  return sortedPages.reduce<PaginationItem[]>((items, nextPage) => {
    const previousPage = items.at(-1)

    if (typeof previousPage === 'number' && nextPage - previousPage > 1) {
      items.push('ellipsis')
    }

    items.push(nextPage)
    return items
  }, [])
}
