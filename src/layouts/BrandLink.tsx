import { NavLink } from 'react-router-dom'

export function BrandLink() {
  return (
    <NavLink to="/" className="group inline-flex min-w-0 items-center gap-3 rounded-2xl outline-none focus:ring-4 focus:ring-[var(--focus)]" aria-label="AnimeTracker inicio">
      <span className="relative grid size-12 shrink-0 place-items-center overflow-hidden rounded-[1.1rem] border border-[var(--line-strong)] bg-[var(--page-fg)] text-lg font-black text-[var(--page-bg)] shadow-[0_14px_34px_var(--shadow)] transition group-hover:-translate-y-0.5">
        <span className="absolute inset-x-2 top-1 h-1 rounded-full bg-[var(--accent)]" />
        AT
      </span>
      <span className="min-w-0">
        <span className="block truncate text-sm font-black tracking-[-0.01em] text-[var(--page-fg)]">AnimeTracker</span>
        <span className="block truncate text-xs font-semibold text-[var(--muted)]">Episode ledger</span>
      </span>
    </NavLink>
  )
}
