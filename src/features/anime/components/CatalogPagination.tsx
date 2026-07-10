interface CatalogPaginationProps {
  page: number
  totalPages: number
  total: number
  onPageChange: (page: number) => void
}

export function CatalogPagination({ page, totalPages, total, onPageChange }: CatalogPaginationProps) {
  return (
    <div className="ledger-surface flex flex-wrap items-center justify-between gap-3 p-3 sm:p-4">
      <button type="button" disabled={page <= 1} onClick={() => onPageChange(page - 1)} className="min-h-11 rounded-[var(--radius-md)] border border-[var(--line)] px-4 py-2 font-black text-[var(--page-fg)] outline-none transition hover:bg-[var(--surface-inset)] focus:ring-4 focus:ring-[var(--focus)] disabled:cursor-not-allowed disabled:opacity-50">
        Anterior
      </button>
      <p className="text-sm font-bold text-[var(--muted)]">{total} resultados encontrados</p>
      <button type="button" disabled={totalPages === 0 || page >= totalPages} onClick={() => onPageChange(page + 1)} className="min-h-11 rounded-[var(--radius-md)] bg-[var(--accent)] px-4 py-2 font-black text-[var(--action-ink)] outline-none transition hover:-translate-y-0.5 focus:ring-4 focus:ring-[var(--focus)] disabled:cursor-not-allowed disabled:translate-y-0 disabled:bg-[var(--surface-inset)] disabled:text-[var(--soft)]">
        Siguiente
      </button>
    </div>
  )
}
